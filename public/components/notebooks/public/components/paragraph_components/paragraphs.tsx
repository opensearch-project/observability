/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {
  EuiButton,
  EuiButtonIcon,
  EuiContextMenu,
  EuiContextMenuPanelDescriptor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiIcon,
  EuiLink,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiText,
  htmlIdGenerator,
} from '@elastic/eui';
import { Cell } from '@nteract/presentational-components';
import moment from 'moment';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CoreStart } from '../../../../../../../../src/core/public';
import {
  DashboardContainerInput,
  DashboardStart,
} from '../../../../../../../../src/plugins/dashboard/public';
import { ViewMode } from '../../../../../../../../src/plugins/embeddable/public';
import { API_PREFIX, DATE_FORMAT } from '../../../../../../common/constants/notebooks';
import { ParaType } from '../../../../../../common/types/notebooks';
import { ParaInput } from './para_input';
import { ParaOutput } from './para_output';

/*
 * "Paragraphs" component is used to render cells of the notebook open and "add para div" between paragraphs
 *
 * Props taken in as params are:
 * para - parsed paragraph from notebook
 * dateModified - last modified time of paragraph
 * index - index of paragraph in the notebook
 * paragraphSelector - function used to select a para on click
 * textValueEditor - function for handling input in textarea
 * handleKeyPress - function for handling key press like "Shift-key+Enter" to run paragraph
 * addPara - function to add a new para onclick - "Add Para" Div
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * deleteVizualization - function to delete a para
 * http object - for making API requests
 * selectedViewId - selected view: view_both, input_only, output_only
 * deletePara - function to delete the selected para
 * runPara - function to run the selected para
 * clonePara - function to clone the selected para
 * clearPara - function to clear output of all the paras
 * movePara - function to move a paragraph at an index to another index
 *
 * Cell component of nteract used as a container for paragraphs in notebook UI.
 * https://components.nteract.io/#cell
 */
type ParagraphProps = {
  para: ParaType;
  setPara: (para: ParaType) => void;
  dateModified: string;
  index: number;
  paraCount: number;
  paragraphSelector: (index: number) => void;
  textValueEditor: (evt: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  handleKeyPress: (evt: React.KeyboardEvent<Element>, para: ParaType, index: number) => void;
  addPara: (index: number, newParaContent: string, inputType: string) => void;
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  deleteVizualization: (uniqueId: string) => void;
  http: CoreStart['http'];
  selectedViewId: string;
  setSelectedViewId: (viewId: string, scrollToIndex?: number) => void;
  deletePara: (para: ParaType, index: number) => void;
  runPara: (para: ParaType, index: number, vizObjectInput?: string) => void;
  clonePara: (para: ParaType, index: number) => void;
  movePara: (index: number, targetIndex: number) => void;
  showQueryParagraphError: boolean;
  queryParagraphErrorMessage: string;
};

export const Paragraphs = forwardRef((props: ParagraphProps, ref) => {
  const {
    para,
    index,
    paragraphSelector,
    textValueEditor,
    handleKeyPress,
    addPara,
    DashboardContainerByValueRenderer,
    deleteVizualization,
    showQueryParagraphError,
    queryParagraphErrorMessage,
    http,
  } = props;

  const [visOptions, setVisOptions] = useState([]); // options for loading saved visualizations
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [runParaError, setRunParaError] = useState(false);
  const [selectedVisOption, setSelectedVisOption] = useState([]);
  const [visInput, setVisInput] = useState(undefined);
  const [toggleVisEdit, setToggleVisEdit] = useState(false);

  // output is available if it's not cleared and vis paragraph has a selected visualization
  const isOutputAvailable =
    (para.out.length > 0 && para.out[0] !== '') ||
    (para.isVizualisation && para.typeOut.length > 0 && visInput !== undefined);

  useImperativeHandle(ref, () => ({
    runParagraph() {
      return onRunPara();
    },
  }));

  useEffect(() => {
    if (para.isVizualisation) {
      if (para.visSavedObjId !== '') setVisInput(JSON.parse(para.vizObjectInput));

      http
        .get(`${API_PREFIX}/visualizations`)
        .then((res) => {
          const opt = res.savedVisualizations.map((vizObject) => ({
            label: vizObject.label,
            key: vizObject.key,
          }));
          setVisOptions(opt);
          setSelectedVisOption(opt.filter((o) => o.key === para.visSavedObjId));
        })
        .catch((err) => console.error('Fetching visualization issue', err.body.message));
    }
  }, []);

  const createNewVizObject = (objectId: string) => {
    const vizUniqueId = htmlIdGenerator()();

    // a dashboard container object for new visualization
    const newVizObject: DashboardContainerInput = {
      viewMode: ViewMode.VIEW,
      panels: {
        '1': {
          gridData: {
            x: 0,
            y: 0,
            w: 50,
            h: 20,
            i: '1',
          },
          type: 'visualization',
          explicitInput: {
            id: '1',
            savedObjectId: objectId,
          },
        },
      },
      isFullScreenMode: false,
      filters: [],
      useMargins: false,
      id: vizUniqueId,
      timeRange: {
        to: para.visEndTime,
        from: para.visStartTime,
      },
      title: 'embed_viz_' + vizUniqueId,
      query: {
        query: '',
        language: 'lucene',
      },
      refreshConfig: {
        pause: true,
        value: 15,
      },
    };
    return newVizObject;
  };

  const onRunPara = () => {
    if (
      (!para.isVizualisation && !para.inp) ||
      (para.isVizualisation && selectedVisOption.length === 0)
    ) {
      setRunParaError(true);
      return;
    }
    let newVisObjectInput = undefined;
    if (para.isVizualisation) {
      const inputTemp = createNewVizObject(selectedVisOption[0].key);
      setVisInput(inputTemp);
      setRunParaError(false);
      newVisObjectInput = JSON.stringify(inputTemp);
    }
    setRunParaError(false);
    return props.runPara(para, index, newVisObjectInput);
  };

  const setStartTime = (time: string) => {
    const newPara = props.para;
    newPara.visStartTime = time;
    props.setPara(newPara);
  };
  const setEndTime = (time: string) => {
    const newPara = props.para;
    newPara.visEndTime = time;
    props.setPara(newPara);
  };
  const setIsOutputStale = (isStale: boolean) => {
    const newPara = props.para;
    newPara.isOutputStale = isStale;
    props.setPara(newPara);
  };

  // do not show output if it is a visualization paragraph and visInput is not loaded yet
  const paraOutput = (!para.isVizualisation || visInput) && (
    <ParaOutput
      key={para.uniqueId}
      para={para}
      visInput={visInput}
      setVisInput={setVisInput}
      DashboardContainerByValueRenderer={DashboardContainerByValueRenderer}
    />
  );

  // do not show input and EuiPanel if view mode is output_only
  if (props.selectedViewId === 'output_only') {
    return paraOutput;
  }

  const renderParaHeader = (type: string, index: number) => {
    const panels: EuiContextMenuPanelDescriptor[] = [
      {
        id: 0,
        title: 'Paragraph actions',
        items: [
          {
            name: 'Insert paragraph above',
            panel: 1,
          },
          {
            name: 'Insert paragraph below',
            panel: 2,
          },
          {
            name: 'Run input',
            onClick: () => {
              setIsPopoverOpen(false);
              onRunPara();
            },
          },
          {
            name: 'Move up',
            disabled: index === 0,
            onClick: () => {
              setIsPopoverOpen(false);
              props.movePara(index, index - 1);
            },
          },
          {
            name: 'Move to top',
            disabled: index === 0,
            onClick: () => {
              setIsPopoverOpen(false);
              props.movePara(index, 0);
            },
          },
          {
            name: 'Move down',
            disabled: index === props.paraCount - 1,
            onClick: () => {
              setIsPopoverOpen(false);
              props.movePara(index, index + 1);
            },
          },
          {
            name: 'Move to bottom',
            disabled: index === props.paraCount - 1,
            onClick: () => {
              setIsPopoverOpen(false);
              props.movePara(index, props.paraCount - 1);
            },
          },
          {
            name: 'Duplicate',
            onClick: () => {
              setIsPopoverOpen(false);
              props.clonePara(para, index + 1);
            },
          },
          {
            name: 'Delete',
            onClick: () => {
              setIsPopoverOpen(false);
              props.deletePara(para, index);
            },
          },
        ],
      },
      {
        id: 1,
        title: 'Insert paragraph above',
        items: [
          {
            name: 'Code block',
            onClick: () => {
              setIsPopoverOpen(false);
              props.addPara(index, '', 'CODE');
            },
          },
          {
            name: 'Visualization',
            onClick: () => {
              setIsPopoverOpen(false);
              props.addPara(index, '', 'VISUALIZATION');
            },
          },
        ],
      },
      {
        id: 2,
        title: 'Insert paragraph below',
        items: [
          {
            name: 'Code block',
            onClick: () => {
              setIsPopoverOpen(false);
              props.addPara(index + 1, '', 'CODE');
            },
          },
          {
            name: 'Visualization',
            onClick: () => {
              setIsPopoverOpen(false);
              props.addPara(index + 1, '', 'VISUALIZATION');
            },
          },
        ],
      },
    ];

    return (
      <>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiText style={{ fontSize: 17 }}>
              {`[${index + 1}] ${type} `}
              <EuiButtonIcon
                aria-label="Toggle show input"
                iconType={para.isInputExpanded ? 'arrowUp' : 'arrowDown'}
                onClick={() => {
                  const newPara = props.para;
                  newPara.isInputExpanded = !newPara.isInputExpanded;
                  props.setPara(newPara);
                }}
              />
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPopover
              panelPaddingSize="none"
              withTitle
              button={
                <EuiButtonIcon
                  aria-label="Open paragraph menu"
                  iconType="boxesHorizontal"
                  onClick={() => setIsPopoverOpen(true)}
                />
              }
              isOpen={isPopoverOpen}
              closePopover={() => setIsPopoverOpen(false)}
            >
              <EuiContextMenu initialPanelId={0} panels={panels} />
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
      </>
    );
  };

  const renderOutputTimestampMessage = () => {
    if (props.selectedViewId === 'view_both') {
      return (
        <>
          <EuiFlexItem grow={false} />
          <EuiFlexItem grow={false}>
            {para.isOutputStale ? (
              <EuiIcon type="questionInCircle" color="primary" />
            ) : (
              <EuiIcon type="check" color="secondary" />
            )}
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText color="subdued">
              {`Last successful run ${moment(props.dateModified).format(DATE_FORMAT)}.`}
            </EuiText>
          </EuiFlexItem>
        </>
      );
    } else {
      // render message when view mode is input_only
      return (
        <>
          <EuiFlexItem grow={false} />
          <EuiFlexItem grow={false}>
            <EuiIcon type="questionInCircle" color="primary" />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiText color="subdued">
              {`Output available from ${moment(props.dateModified).format(DATE_FORMAT)}`}
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <EuiLink onClick={() => props.setSelectedViewId('view_both', index)}>
                View both
              </EuiLink>
            </EuiText>
          </EuiFlexItem>
        </>
      );
    }
  };

  const sqlIcon = (
    <EuiLink href="https://opensearch.org/docs/search-plugins/sql/index/" target="_blank">
      {' '}
      SQL <EuiIcon type="popout" size="s" />{' '}
    </EuiLink>
  );

  const pplIcon = (
    <EuiLink href="https://opensearch.org/docs/search-plugins/ppl/index/" target="_blank">
      {' '}
      PPL <EuiIcon type="popout" size="s" />
    </EuiLink>
  );

  const paragraphLabel = !para.isVizualisation ? (
    <EuiText size="s">
      Specify the input language on the first line using %[language type]. Supported languages
      include markdown, {sqlIcon} and {pplIcon}.
    </EuiText>
  ) : null;

  const queryErrorMessage = queryParagraphErrorMessage.includes('SQL') ? (
    <EuiText size="s">
      {queryParagraphErrorMessage}. Learn More{' '}
      <EuiLink href="https://opensearch.org/docs/search-plugins/sql/index/" target="_blank">
        <EuiIcon type="popout" size="s" />
      </EuiLink>
    </EuiText>
  ) : (
    <EuiText size="s">
      {queryParagraphErrorMessage}.{' '}
      <EuiLink href="https://opensearch.org/docs/search-plugins/ppl/index/" target="_blank">
        Learn More <EuiIcon type="popout" size="s" />
      </EuiLink>
    </EuiText>
  );

  return (
    <>
      <EuiPanel>
        {renderParaHeader(
          para.isVizualisation ? 'OpenSearch Dashboards visualization' : 'Code block',
          index
        )}
        <Cell key={index} onClick={() => paragraphSelector(index)}>
          {para.isInputExpanded && (
            <>
              <EuiSpacer size="s" />
              <EuiFormRow
                fullWidth={true}
                helpText={paragraphLabel}
                isInvalid={showQueryParagraphError}
                error={queryErrorMessage}
              >
                <ParaInput
                  para={para}
                  index={index}
                  runParaError={runParaError}
                  textValueEditor={textValueEditor}
                  handleKeyPress={handleKeyPress}
                  startTime={para.visStartTime}
                  setStartTime={setStartTime}
                  endTime={para.visEndTime}
                  setEndTime={setEndTime}
                  setIsOutputStale={setIsOutputStale}
                  visOptions={visOptions}
                  selectedVisOption={selectedVisOption}
                  setSelectedVisOption={setSelectedVisOption}
                />
              </EuiFormRow>
              {runParaError && (
                <EuiText color="danger" size="s">{`${
                  para.isVizualisation ? 'Visualization' : 'Input'
                } is required.`}</EuiText>
              )}
              <EuiSpacer size="m" />
              <EuiFlexGroup alignItems="center" gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiButton onClick={() => onRunPara()} fill>
                    {isOutputAvailable ? 'Refresh' : 'Run'}
                  </EuiButton>
                </EuiFlexItem>
                {isOutputAvailable && renderOutputTimestampMessage()}
              </EuiFlexGroup>
              <EuiSpacer size="m" />
            </>
          )}
          {props.selectedViewId !== 'input_only' && isOutputAvailable && (
            <>
              <EuiHorizontalRule margin="none" />
              <div style={{ opacity: para.isOutputStale ? 0.5 : 1 }}>{paraOutput}</div>
            </>
          )}
        </Cell>
      </EuiPanel>
    </>
  );
});
