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

import React, { useState, Fragment } from 'react';
import moment from 'moment';
import { Cell } from '@nteract/presentational-components';
import {
  EuiButtonEmpty,
  EuiForm,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSelectable,
} from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

import {
  DashboardStart,
  DashboardContainerInput,
} from '../../../../../src/plugins/dashboard/public';
import { ViewMode } from '../../../../../src/plugins/embeddable/public';
import { CoreStart } from '../../../../../src/core/public';

import { ParaOutput } from './para_output';
import { ParaInput } from './para_input';
import { ParaVisualization } from './para_vizualizations';
import { API_PREFIX, ParaType } from '../../../common';

/*
 * "Paragraphs" component is used to render cells of the notebook open and "add para div" between paragraphs
 *
 * Props taken in as params are:
 * para - parsed paragraph from notebook
 * index - index of paragraph in the notebook
 * paragraphSelector - function used to select a para on click
 * paragraphHover - function used to highlight a para on hover
 * paragraphHoverReset - function used to reset all hover-highlighted paras
 * textValueEditor - function for handling input in textarea
 * handleKeyPress - function for handling key press like "Shift-key+Enter" to run paragraph
 * addParagraphHover - function used to detect hover on "Add Para" Div
 * addPara - function to add a new para onclick - "Add Para" Div
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * deleteVizualization -  function to delete a para
 * http object: for making API requests
 *
 * Cell component of nteract used as a container for paragraphs in notebook UI.
 * https://components.nteract.io/#cell
 */
type ParagraphProps = {
  para: ParaType;
  index: number;
  paragraphSelector: (index: number) => void;
  paragraphHover: (para: ParaType) => void;
  paragraphHoverReset: () => void;
  textValueEditor: (evt: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  handleKeyPress: (evt: React.KeyboardEvent<Element>, para: ParaType, index: number) => void;
  addParagraphHover: (para: ParaType) => void;
  addPara: (index: number, newParaContent: string) => void;
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  deleteVizualization: (uniqueId: string) => void;
  vizualizationEditor: (vizContent: string, index: number) => void;
  http: CoreStart['http'];
};
export const Paragraphs = (props: ParagraphProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Boolean for showing visualization modal
  const [options, setOptions] = useState([]); // options for loading saved visualizations
  const [currentPara, setCurrentPara] = useState(0); // set current paragraph

  const {
    para,
    index,
    paragraphSelector,
    paragraphHover,
    paragraphHoverReset,
    textValueEditor,
    handleKeyPress,
    addParagraphHover,
    addPara,
    DashboardContainerByValueRenderer,
    deleteVizualization,
    vizualizationEditor,
    http,
  } = props;

  const createNewVizObject = (objectId: string) => {
    const vizUniqueId = htmlIdGenerator()();

    // a dashboard container object for new visualization
    const newVizObject: DashboardContainerInput = {
      viewMode: ViewMode.VIEW,
      panels: {
        '1': {
          gridData: {
            x: 15,
            y: 0,
            w: 20,
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
        to: moment(),
        from: moment().subtract(30, 'd'),
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

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Function to add visualization to the notebook
  const onSelectViz = (newOptions) => {
    setOptions(newOptions);
    const optedViz = newOptions.filter(filterObj);
    closeModal();
    const newVizObject = createNewVizObject(optedViz[0].key);
    addPara(currentPara, '%sh #' + JSON.stringify(newVizObject));
  };

  // Shows modal with all saved visualizations for the users
  const showModal = async (index: number) => {
    setCurrentPara(index);
    http
      .get(`${API_PREFIX}/visualizations`)
      .then((res) => {
        const opt = res.savedVisualizations.map((vizObject) => ({
          label: vizObject.label,
          key: vizObject.key,
        }));
        setOptions(opt);
        setIsModalVisible(true);
      })
      .catch((err) => console.error('Fetching visualization error', err));
  };

  const filterObj = (vObj: { checked: string }) => {
    if (vObj.checked === 'on') {
      return vObj;
    }
  };

  // Visualizations searchable form for modal
  const formSample = (
    <EuiForm>
      <Fragment>
        <EuiSelectable
          aria-label="Searchable Visualizations"
          searchable
          searchProps={{
            'data-test-subj': 'selectableSearchHere',
          }}
          options={options}
          onChange={(newOptions) => onSelectViz(newOptions)}
        >
          {(list, search) => (
            <Fragment>
              {search}
              {list}
            </Fragment>
          )}
        </EuiSelectable>
      </Fragment>
    </EuiForm>
  );

  // Modal layout if a user wants add Visualizations
  const modalLayout = (
    <EuiOverlayMask>
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Saved Visualizations</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{formSample}</EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );

  const addNewDiv = (
    <div>
      <table className="hoveredDiv">
        <tbody>
          <tr>
            <td className="addParagraphButton" onClick={() => addPara(para.id, '%md\n')}>
              +Para
            </td>
            <td className="addVisualizationButton" onClick={() => showModal(para.id)}>
              +Viz
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {/* Render if para contains code */}
      {!para.isVizualisation && (
        <Cell
          key={index}
          _hovered={para.ishovered}
          isSelected={para.isSelected}
          onClick={() => paragraphSelector(index)}
          onMouseEnter={() => paragraphHover(para)}
          onMouseLeave={() => paragraphHoverReset()}
        >
          <ParaInput
            para={para}
            index={index}
            textValueEditor={textValueEditor}
            handleKeyPress={handleKeyPress}
          />
          <ParaOutput para={para} />
        </Cell>
      )}

      {/* Render if para contains visualization */}
      {para.isVizualisation && (
        <Cell
          key={index}
          _hovered={para.ishovered}
          isSelected={para.isSelected}
          onClick={() => paragraphSelector(index)}
          onMouseEnter={() => paragraphHover(para)}
          onMouseLeave={() => paragraphHoverReset()}
        >
          <ParaVisualization
            DashboardContainerByValueRenderer={DashboardContainerByValueRenderer}
            vizContent={para.vizObjectInput}
            deleteVizualization={deleteVizualization}
            para={para}
            vizualizationEditor={vizualizationEditor}
          />
        </Cell>
      )}

      {/* Div populated on hover for adding a new paragraph in notebook */}
      <div
        className="hoverDiv"
        onMouseEnter={() => addParagraphHover(para)}
        onMouseLeave={() => addParagraphHover(para)}
      >
        {para.showAddPara && addNewDiv}
      </div>
      {isModalVisible && modalLayout}
    </div>
  );
};
