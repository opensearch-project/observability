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
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiHorizontalRule,
  EuiPanel,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiLink,
  EuiRadioGroup,
  EuiSelect,
  EuiSuperDatePicker,
  EuiTextArea,
  EuiTabbedContent,
} from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import React, { Fragment, ReactChild, useState } from 'react';
import { start } from 'repl';
import { isNameValid } from '../helpers/utils';
import { PlotSample } from './plot_sample';

type Props = {
  closeVizWindow: () => void;
  pplService: any;
  setPanelVisualizations: any;
  setVisualizationsData: any;
  setToasts: any;
  toasts: any;
};

export const AddVizView = ({
  closeVizWindow,
  pplService,
  setPanelVisualizations,
  setVisualizationsData,
  setToasts,
  toasts
}: Props) => {
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

  // const onRefreshChange = ({ isPaused, refreshInterval }) => {
  //   setIsPaused(isPaused);
  //   setRefreshInterval(refreshInterval);
  // };

  // const onChangeRadio = (optionId: string) => {
  //   console.log('Radio button click', optionId);
  //   setRadioIdSelected(optionId);
  // };

  const onChangeTitle = (e) => {
    setNewVisualizationTitle(e.target.value);
  };

  const onChangePPLArea = (e) => {
    setPplArea(e.target.value);
  };

  const onRunPPLArea = async (e) => {
    // let newPPLVisualization = {};

    if (e.key === 'Enter') {
      console.log('query', pplArea);
      setPreviewLoading(true);
      await pplService
        .fetch({
          query: pplArea,
        })
        .then((res) => {
          // console.log(res);
          // const newViz = (

          // );
          setNewPPLVisualization([
            {
              x: res.data[res.metadata.xfield.name],
              y: res.data[res.metadata.yfield.name],
              type: 'bar',
            },
          ]);
          setPreviewArea(            <EuiFlexGroup>
            <EuiFlexItem style={{ minHeight: '200' }}>
              <PlotSample
                data={[
                  {
                    x: res.data[res.metadata.xfield.name],
                    y: res.data[res.metadata.yfield.name],
                    type: 'bar',
                  },
                ]}
                layout={{ showlegend: false }}
              />
            </EuiFlexItem>
          </EuiFlexGroup>);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setPreviewLoading(false);
        });
    }
  };

  const advancedVisualization = () => {
    window.location.assign('#/event/explorer');
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

  const setToast = (title: string, color = 'success', text?: ReactChild) => {
    if (!text) text = '';
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  const addVisualization = () => {
    if (!isNameValid(newVisualizationTitle)) {
      setToast('Invalid Visualization Name', 'danger');
      return;
    }
    setPanelVisualizations([{
      id: '1',
      title: newVisualizationTitle,
      x: 0,
      y: 0,
      w: 6,
      h: 3,
    }]);
    setVisualizationsData(newPPLVisualization);
    closeVizWindow();
  };
  

  const tabs = [
    {
      id: 'tab1',
      name: 'Add existing visualization',
      content: (
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
      ),
    },
    {
      id: 'tab2',
      name: 'Create new visualization',
      content: (
        <>
          <EuiSpacer size="l" />
          <EuiFormRow
            label="Visualization name"
            helpText="Enter a unique and descriptive name between 1-50 characters."
          >
            <EuiFieldText name="Name" value={newVisualizationTitle} onChange={(e) => onChangeTitle(e)}/>
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
      ),
    },
  ];

  const formBody = (
    <EuiForm id="modalFormId" component="form">
      <EuiTabbedContent
        tabs={tabs}
        initialSelectedTab={tabs[0]}
        autoFocus="selected"
        // display="condensed"
        // onTabClick={(tab) => {
        //   console.log('clicked tab', tab);
        // }}
      />
    </EuiForm>
  );
  return (
    <div>
      <EuiPanel style={{ width: '55vw' }}>
        {/* <EuiText>
          <h4>Add visualization</h4>
        </EuiText>

        <EuiHorizontalRule margin="xs" /> */}
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