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
import React, { Fragment, useState } from 'react';
import { start } from 'repl';
import { PlotSample } from './plot_sample';

type Props = {
  closeVizWindow: () => void;
};

export const AddVizView = ({ closeVizWindow }: Props) => {
  const [radioIdSelected, setRadioIdSelected] = useState('tab1');
  const [previewArea, setPreviewArea] = useState(<></>);
  const [pplArea, setPplArea] = useState('');
  const [previewIconType, setPreviewIconType] = useState('arrowRight');
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

  const onRefreshChange = ({ isPaused, refreshInterval }) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  const onChangeRadio = (optionId: string) => {
    console.log('Radio button click', optionId);
    setRadioIdSelected(optionId);
  };

  const onChangePPLArea = (e) => {
    setPplArea(e.target.value);
  };

  const advancedVisualization = () => {
    window.location.assign("#/event/explorer");
  }

  const onPreviewClick = () => {
    setPreviewIconType(previewIconType == 'arrowRight' ? 'arrowUp' : 'arrowRight');

    if (previewIconType == 'arrowRight') {
      setPreviewIconType('arrowUp');
      setPreviewArea(
        <EuiFlexGroup>
          <EuiFlexItem style={{ minHeight: '200' }}>
            <PlotSample
              data={[
                {
                  // will move these out of current component
                  x: [
                    '13:00:00',
                    '13:00:30',
                    '13:01:00',
                    '13:01:30',
                    '13:02:00',
                    '13:02:30',
                    '13:03:00',
                    '13:03:30',
                    '13:04:00',
                    '13:04:30',
                    '13:05:00',
                    '13:05:30',
                    '13:06:00',
                    '13:06:30',
                    '13:07:00',
                  ],
                  y: [12, 2, 7, 6, 0, 0, 8, 28, 47, 33, 13, 10, 11, 27, 32],
                  type: 'lines',
                },
              ]}
              layout={{
                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)',
                xaxis: {
                  fixedrange: true,
                  showgrid: false,
                  visible: true,
                },
                yaxis: {
                  fixedrange: true,
                  showgrid: false,
                  visible: true,
                },
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    } else {
      setPreviewIconType('arrowRight');
      setPreviewArea(<></>);
    }
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
          {previewArea}
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
            <EuiFieldText name="Name" />
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
          >
            Preview
          </EuiButtonEmpty>
          <EuiSpacer size="m" />
          {previewArea}
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
            <EuiButton onClick={closeVizWindow} fill>
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
