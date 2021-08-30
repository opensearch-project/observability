import { EuiSpacer, EuiFormRow, EuiSelect, EuiSuperDatePicker, EuiButtonEmpty, EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React, { useState } from 'react';
import { VisualizationType } from '../../../../common/constants/custom_panels';
import PPLService from '../../../services/requests/ppl';

//NOTE: working this module is TBD after work on storing ppl visualizations in index is complete

/*
 * "AddSavedVisualizations" component to add saved visualizations
 *
 * closeVizWindow: function to close "add visualization" window
 * pplService: PPLService Requestor 
 * panelVisualizations: panelVisualizations object 
 * setPanelVisualizations: Setter for panelVisualizations object
 * setToast: Create Toast function 
 */

type Props = {
  closeVizWindow: () => void;
  pplService: PPLService;
  panelVisualizations: VisualizationType[];
  setPanelVisualizations: React.Dispatch<React.SetStateAction<VisualizationType[]>>;
  setToast: (title: string, color?: string, text?: string) => void;
};

export const AddSavedVisualizations = ({
  closeVizWindow,
  pplService,
  panelVisualizations,
  setPanelVisualizations,
  setToast,
}: Props) => {
  const [newVisualizationTitle, setNewVisualizationTitle] = useState('');
  const [newVisualizationType, setNewVisualizationType] = useState('bar');
  const [pplQuery, setPPLQuery] = useState('');
  const [previewData, setPreviewData] = useState([]);
  const [previewArea, setPreviewArea] = useState(<></>);
  const [showPreviewArea, setShowPreviewArea] = useState(false);
  const [previewIconType, setPreviewIconType] = useState('arrowRight');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPreviewError, setIsPreviewError] = useState('');

  // DateTimePicker States
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

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
    console.log('time change', start, end);
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };
  const onPreviewClick = () => {
    if (previewIconType == 'arrowRight') {
      setPreviewIconType('arrowUp');
      setShowPreviewArea(true);
    } else {
      setPreviewIconType('arrowRight');
      setShowPreviewArea(false);
    }
  };

  return (
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
      <EuiButtonEmpty iconSide="left" onClick={onPreviewClick} iconType={previewIconType} size="s">
        Preview
      </EuiButtonEmpty>
      <EuiSpacer size="m" />
      {showPreviewArea && previewArea}
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
    </>
  );
};
