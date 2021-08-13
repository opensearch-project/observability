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
} from '@elastic/eui';
import React, { Fragment, useState } from 'react';
import { start } from 'repl';

type Props = {
  closeVizWindow: () => void;
};

export const AddVizView = ({ closeVizWindow }: Props) => {
  const [radioIdSelected, setRadioIdSelected] = useState('radio1');
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

  const onPreviewClick = () => {
    setPreviewIconType(previewIconType == 'arrowRight' ? 'arrowUp' : 'arrowRight');

    if (previewIconType == 'arrowRight') {
      setPreviewIconType('arrowUp');
      setPreviewArea(
        <EuiFlexGroup>
          <EuiFlexItem style={{ minHeight: '300' }}>Dummy Area</EuiFlexItem>
        </EuiFlexGroup>
      );
    } else {
      setPreviewIconType('arrowRight');
      setPreviewArea(<></>);
    }
  };

  const radios = [
    {
      id: 'radio1',
      label: 'Select existing visualization',
    },
    {
      id: 'radio2',
      label: 'Create new visualization',
    },
  ];

  const formBody = (
    <EuiForm id="modalFormId" component="form">
      <EuiFormRow>
        <EuiRadioGroup
          options={radios}
          idSelected={radioIdSelected}
          onChange={(id) => onChangeRadio(id)}
          name="radio group"
          aria-aria-rowcount={1}
        />
      </EuiFormRow>
      {radioIdSelected == 'radio1' ? (
        <>
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
          {previewArea}
        </>
      ) : (
        <>
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
              style={{width:'80%'}}
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
          {previewArea}
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

        <EuiHorizontalRule margin="m" />
        <div>{formBody}</div>

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
