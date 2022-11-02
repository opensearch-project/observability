import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiSelect,
  EuiSuperDatePicker,
  ShortDate,
  OnTimeChangeProps,
  EuiButton,
  EuiFieldSearch,
  EuiButtonIcon,
} from '@elastic/eui';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import { uiSettingsService } from '../../../../common/utils';
import React, { useState } from 'react';
import { MetricType } from '../../../../common/types/metrics';
import { resolutionOptions } from '../../../../common/constants/metrics';

import './top_menu.scss';

interface TopMenuProps {
  IsTopPanelDisabled: boolean;
  startTime: ShortDate;
  endTime: ShortDate;
  onDatePickerChange: (props: OnTimeChangeProps) => void;
  recentlyUsedRanges: DurationRange[];
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditActionType: React.Dispatch<React.SetStateAction<string>>;
  panelVisualizations: MetricType[];
  setPanelVisualizations: React.Dispatch<React.SetStateAction<MetricType[]>>;
  resolutionValue: string;
  setResolutionValue: React.Dispatch<React.SetStateAction<string>>;
  spanValue: number;
  setSpanValue: React.Dispatch<React.SetStateAction<number>>;
  resolutionSelectId: string;
}

export const TopMenu = ({
  IsTopPanelDisabled,
  startTime,
  endTime,
  onDatePickerChange,
  recentlyUsedRanges,
  editMode,
  setEditActionType,
  setEditMode,
  panelVisualizations,
  setPanelVisualizations,
  resolutionValue,
  setResolutionValue,
  spanValue,
  setSpanValue,
  resolutionSelectId,
}: TopMenuProps) => {
  const [originalPanelVisualizations, setOriginalPanelVisualizations] = useState<MetricType[]>([]);

  // toggle between panel edit mode
  const editPanel = (editType: string) => {
    setEditMode(!editMode);
    switch (editType) {
      case 'edit': {
        setOriginalPanelVisualizations([...panelVisualizations]);
        break;
      }
      case 'cancel': {
        setPanelVisualizations(originalPanelVisualizations);
        setOriginalPanelVisualizations([]);
        break;
      }
      default: {
        break;
      }
    }
    setEditActionType(editType);
  };

  const onResolutionChange = (e) => {
    setResolutionValue(e.target.value);
  };

  const cancelButton = (
    <EuiButton size="s" iconType="cross" color="danger" onClick={() => editPanel('cancel')}>
      Cancel
    </EuiButton>
  );

  const saveButton = (
    <EuiButton size="s" iconType="save" onClick={() => editPanel('save')}>
      Save view
    </EuiButton>
  );

  const editButton = (
    <EuiButton
      size="s"
      iconType="pencil"
      onClick={() => editPanel('edit')}
      isDisabled={IsTopPanelDisabled}
    >
      Edit view
    </EuiButton>
  );
  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiFlexGroup className="search-bar-top-menu">
            <EuiFlexItem>
              <EuiFieldSearch
                placeholder="Search metrics"
                isClearable={true}
                aria-label="Use aria labels when no actual label is in use"
                fullWidth={true}
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon iconType="menuLeft"></EuiButtonIcon>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>
          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={false}>
              <div className="resolutionSelect">
                <EuiFieldText
                  className="resolutionSelectText"
                  prepend="Span Interval"
                  value={spanValue}
                  onChange={(e) => setSpanValue(e.target.value)}
                  append={
                    <EuiSelect
                      id={resolutionSelectId}
                      options={resolutionOptions}
                      value={resolutionValue}
                      onChange={(e) => onResolutionChange(e)}
                      aria-label="resolutionSelect"
                    />
                  }
                  disabled={IsTopPanelDisabled}
                  aria-label="resolutionField"
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiSuperDatePicker
                dateFormat={uiSettingsService.get('dateFormat')}
                start={startTime}
                end={endTime}
                onTimeChange={onDatePickerChange}
                recentlyUsedRanges={recentlyUsedRanges}
                isDisabled={IsTopPanelDisabled}
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton
                iconSide="right"
                onClick={() => {}}
                data-test-subj="metrics__savePopover"
                iconType="arrowDown"
                isDisabled={IsTopPanelDisabled}
              >
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiFlexGroup gutterSize="s" justifyContent="flexEnd">
        {editMode ? (
          <>
            <EuiFlexItem grow={false}>{cancelButton}</EuiFlexItem>
            <EuiFlexItem grow={false}>{saveButton}</EuiFlexItem>
          </>
        ) : (
          <EuiFlexItem grow={false}>{editButton}</EuiFlexItem>
        )}
      </EuiFlexGroup>
    </>
  );
};
