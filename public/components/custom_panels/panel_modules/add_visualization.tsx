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

import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiPanel,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiLink,
  EuiSelect,
  EuiSuperDatePicker,
  EuiTextArea,
  EuiTabbedContent,
  EuiText,
  EuiHorizontalRule,
  EuiCheckableCard,
} from '@elastic/eui';
import React, { Fragment, useState } from 'react';
import { isNameValid } from '../helpers/utils';
import { PlotSample } from '../helpers/plot_sample';
import PPLService from '../../../services/requests/ppl';
import { VisualizationType } from '../../../../common/constants/custom_panels';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

type Props = {
  closeVizWindow: () => void;
  pplService: PPLService;
  setPanelVisualizations: React.Dispatch<React.SetStateAction<VisualizationType[]>>;
  setToast: (title: string, color?: string, text?: string) => void;
};

export const AddVizView = ({
  closeVizWindow,
  pplService,
  setPanelVisualizations,
  setToast,
}: Props) => {
  const radioName = htmlIdGenerator()();
  const [radio, setRadio] = useState('radio1');

  const [radioIdSelected, setRadioIdSelected] = useState('tab1');
  const [previewArea, setPreviewArea] = useState(<></>);
  const [showPreviewArea, setShowPreviewArea] = useState(false);
  const [pplArea, setPplArea] = useState('');
  const [previewIconType, setPreviewIconType] = useState('arrowRight');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [newPPLVisualization, setNewPPLVisualization] = useState([]);
  const [newVisualizationTitle, setNewVisualizationTitle] = useState('');

  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();

  const onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate = recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10 ? recentlyUsedRange.slice(0, 9) : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
  };

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const onStartInputChange = (e) => {
    setStart(e.target.value);
  };

  const onEndInputChange = (e) => {
    setEnd(e.target.value);
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const onChangeTitle = (e) => {
    setNewVisualizationTitle(e.target.value);
  };

  const onChangePPLArea = (e) => {
    setPplArea(e.target.value);
  };

  const onRunPPLArea = async (e) => {
    // let newPPLVisualization = {};
    // if (e.key === 'Enter') {
    //   console.log('query', pplArea);
    //   setPreviewLoading(true);
    //   await pplService
    //     .fetch({
    //       query: pplArea,
    //     })
    //     .then((res) => {
    //       setNewPPLVisualization([
    //         {
    //           x: res.data[res.metadata.xfield.name],
    //           y: res.data[res.metadata.yfield.name],
    //           type: 'bar',
    //         },
    //       ]);
    //       setPreviewArea(
    //         <EuiFlexGroup>
    //           <EuiFlexItem style={{ minHeight: '200' }}>
    //             <PlotSample
    //               data={[
    //                 {
    //                   x: res.data[res.metadata.xfield.name],
    //                   y: res.data[res.metadata.yfield.name],
    //                   type: 'bar',
    //                 },
    //               ]}
    //               layout={{ showlegend: false }}
    //             />
    //           </EuiFlexItem>
    //         </EuiFlexGroup>
    //       );
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     })
    //     .finally(() => {
    //       setPreviewLoading(false);
    //     });
    // }
  };

  const advancedVisualization = () => {
    window.location.assign('#/explorer/events');
  };

  const onPreviewClick = () => {
    setPreviewIconType(previewIconType == 'arrowRight' ? 'arrowUp' : 'arrowRight');

    if (previewIconType == 'arrowRight') {
      setPreviewIconType('arrowUp');
      setShowPreviewArea(true);
    } else {
      setPreviewIconType('arrowRight');
      setShowPreviewArea(false);
    }
  };
  const addVisualization = () => {
    if (!isNameValid(newVisualizationTitle)) {
      setToast('Invalid Visualization Name', 'danger');
      return;
    }
    closeVizWindow();
  };

  const formBody = (
    <EuiForm id="modalFormId" component="form">
      <EuiFlexGroup justifyContent="flexStart">
        <EuiFlexItem grow={false} style={{ minWidth: '12vw' }}>
          <EuiCheckableCard
            id={htmlIdGenerator()()}
            label="Select existing visualization"
            name={radioName}
            value="radio1"
            checked={radio === 'radio1'}
            onChange={() => setRadio('radio1')}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ minWidth: '12vw' }}>
          <EuiCheckableCard
            id={htmlIdGenerator()()}
            label="Create new visualization"
            name={radioName}
            value="radio2"
            checked={radio === 'radio2'}
            onChange={() => setRadio('radio2')}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      {radio === 'radio1' ? (
        <>
          <EuiSpacer size="l" />
          <EuiFormRow label="Visualization name">
            <EuiSelect
              hasNoInitialSelection
              onChange={() => {}}
              options={[
                { value: 'option_one', text: 'Option one' },
                { value: 'option_two', text: 'Option two' },
                { value: 'option_three', text: 'Option three' },
              ]}
            />
          </EuiFormRow>
          <EuiFormRow label="Time Range">
            <EuiSuperDatePicker
              isLoading={isLoading}
              start={start}
              end={end}
              onTimeChange={onTimeChange}
              showUpdateButton={false}
            />
          </EuiFormRow>
          <EuiSpacer size="l" />
          <EuiButtonEmpty
            iconSide="left"
            onClick={onPreviewClick}
            iconType={previewIconType}
            size="s"
          >
            Preview
          </EuiButtonEmpty>
          <EuiSpacer size="m" />
          {/* {previewArea} */}
          <></>
        </>
      ) : (
        <>
          <EuiSpacer size="l" />
          <EuiFormRow
            label="Visualization name"
            helpText="Enter a unique and descriptive name between 1-50 characters."
          >
            <EuiFieldText
              name="Name"
              value={newVisualizationTitle}
              onChange={(e) => onChangeTitle(e)}
            />
          </EuiFormRow>
          <EuiFormRow
            label="PPL Query"
            helpText={
              <Fragment>
                Use [example commands] to draw visaulizations.{' '}
                <EuiLink
                  href="https://opensearch.org/docs/search-plugins/ppl/index/"
                  target="_blank"
                >
                  Learn More
                </EuiLink>{' '}
              </Fragment>
            }
            fullWidth={true}
          >
            <EuiTextArea
              placeholder="Placeholder text"
              aria-label="Use aria labels when no actual label is in use"
              value={pplArea}
              onChange={(e) => onChangePPLArea(e)}
              onKeyPress={(e) => onRunPPLArea(e)}
              fullWidth={true}
              style={{ width: '80%' }}
            />
          </EuiFormRow>
          <EuiFormRow label="Time Range">
            <EuiSuperDatePicker
              isLoading={isLoading}
              start={start}
              end={end}
              onTimeChange={onTimeChange}
              showUpdateButton={false}
            />
          </EuiFormRow>
          <EuiSpacer size="l" />
          <EuiButtonEmpty
            iconSide="left"
            onClick={onPreviewClick}
            iconType={previewIconType}
            size="s"
            isLoading={previewLoading}
          >
            Preview
          </EuiButtonEmpty>
          <EuiSpacer size="m" />
          {showPreviewArea && previewArea}
          <EuiButtonEmpty iconSide="left" iconType="brush" size="s" onClick={advancedVisualization}>
            More advanced edit options in visual editor...
          </EuiButtonEmpty>
        </>
      )}
    </EuiForm>
  );
  return (
    <div>
      <EuiPanel style={{ width: '55vw' }}>
        <EuiText>
          <h4>Add visualization</h4>
        </EuiText>
        <EuiHorizontalRule margin="s" />
        <div>{formBody}</div>
        <EuiSpacer size="m" />
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiButton onClick={addVisualization} fill>
              Add
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={closeVizWindow}>Cancel</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </div>
  );
};