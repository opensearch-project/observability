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
  EuiFormRow,
  EuiSelect,
  EuiSuperDatePicker,
  EuiButtonEmpty,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  ShortDate,
  EuiSuperDatePickerProps,
} from '@elastic/eui';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import { UI_DATE_FORMAT } from '..././../../common/constants/shared';
import React, { useState } from 'react';
import { VisualizationType } from '../../../../common/constants/custom_panels';
import PPLService from '../../../services/requests/ppl';
import { onTimeChange } from '../helpers/utils';

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
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [start, setStart] = useState<ShortDate>('now-30m');
  const [end, setEnd] = useState<ShortDate>('now');

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
          dateFormat={UI_DATE_FORMAT}
          start={start}
          end={end}
          onTimeChange={(props: Readonly<EuiSuperDatePickerProps>) =>
            onTimeChange(
              props.start,
              props.end,
              recentlyUsedRanges,
              setRecentlyUsedRanges,
              setStart,
              setEnd
            )
          }
          showUpdateButton={false}
          recentlyUsedRanges={recentlyUsedRanges}
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
