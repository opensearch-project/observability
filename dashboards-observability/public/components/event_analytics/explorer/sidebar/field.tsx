/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { i18n } from '@osd/i18n';
import { isEqual, toUpper, upperFirst } from 'lodash';
import {
  EuiPopover,
  EuiButtonIcon,
  EuiToolTip,
  EuiMark,
  EuiLoadingSpinner,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
} from '@elastic/eui';
import { FieldButton } from '../../../common/field_button';
import { FieldIcon } from '../../../common/field_icon';
import { IField } from '../../../../../common/types/explorer';
import { FieldInsights } from './field_insights';

interface IFieldProps {
  query: string;
  field: IField;
  selectedPattern: string;
  isOverridingPattern: boolean;
  handleOverridePattern: (pattern: IField) => void;
  selectedTimestamp: string;
  isOverridingTimestamp: boolean;
  handleOverrideTimestamp: (timestamp: IField) => void;
  selected: boolean;
  showToggleButton: boolean;
  showTimestampOverrideButton: boolean;
  isFieldToggleButtonDisabled: boolean;
  onToggleField: (field: IField) => void;
}

export const Field = (props: IFieldProps) => {
  const {
    query,
    field,
    selectedPattern,
    isOverridingPattern,
    handleOverridePattern,
    selectedTimestamp,
    isOverridingTimestamp,
    handleOverrideTimestamp,
    selected,
    isFieldToggleButtonDisabled = false,
    showTimestampOverrideButton = true,
    onToggleField,
  } = props;

  const [isFieldDetailsOpen, setIsFieldDetailsOpen] = useState(false);

  const addLabelAria = i18n.translate('addButtonAriaLabel', {
    defaultMessage: 'Add {field} to table',
    values: { field: field.name },
  });
  const removeLabelAria = i18n.translate('removeButtonAriaLabel', {
    defaultMessage: 'Remove {field} from table',
    values: { field: field.name },
  });

  const togglePopover = () => {
    setIsFieldDetailsOpen((staleState) => !staleState);
  };

  const toggleField = (field: IField) => {
    onToggleField(field);
  };

  const getFieldActionDOM = () => {
    return (
      <>
        <EuiToolTip id="override-pattern" delay="long" content="Override default pattern">
          <>
            {isEqual(field.type, 'string') ? (
              isEqual(selectedPattern, field.name) ? (
                <EuiMark data-test-subj="eventFields__default-pattern-mark">
                  Default Pattern
                </EuiMark>
              ) : isOverridingPattern ? (
                <EuiLoadingSpinner className="override_pattern_loading" size="m" />
              ) : (
                <EuiButtonIcon
                  aria-labelledby="override_pattern"
                  className="dscSidebarItem__action"
                  size="s"
                  color="text"
                  iconType="inputOutput"
                  onClick={() => handleOverridePattern(field)}
                  data-test-subj="eventExplorer__overrideDefaultPattern"
                >
                  Override
                </EuiButtonIcon>
              )
            ) : null}
          </>
        </EuiToolTip>
        <EuiToolTip id="override-timestamp" delay="long" content="Override default timestamp">
          <>
            {showTimestampOverrideButton && isEqual(field.type, 'timestamp') ? (
              isEqual(selectedTimestamp, field.name) ? (
                <EuiMark data-test-subj="eventFields__default-timestamp-mark">
                  Default Timestamp
                </EuiMark>
              ) : isOverridingTimestamp ? (
                <EuiLoadingSpinner className="override_timestamp_loading" size="m" />
              ) : (
                <EuiButtonIcon
                  aria-labelledby="override_timestamp"
                  className="dscSidebarItem__action"
                  size="s"
                  color="text"
                  iconType="inputOutput"
                  onClick={() => handleOverrideTimestamp(field)}
                  data-test-subj="eventExplorer__overrideDefaultTimestamp"
                >
                  Override
                </EuiButtonIcon>
              )
            ) : null}
          </>
        </EuiToolTip>
        <EuiToolTip
          delay="long"
          content={
            isFieldToggleButtonDisabled
              ? "Toggle button is disabled on query contains 'stats' or no hits for the search"
              : selected
              ? 'Remove field from table'
              : 'Add field as column'
          }
        >
          <>
            {isFieldToggleButtonDisabled ? (
              <EuiButtonIcon
                className="dscSidebarItem__action"
                color="ghost"
                display="fill"
                isDisabled
                iconType={selected ? 'cross' : 'plusInCircleFilled'}
                data-test-subj={`fieldToggle-${field.name}`}
                aria-label={selected ? removeLabelAria : addLabelAria}
              />
            ) : (
              <EuiButtonIcon
                color={selected ? 'danger' : 'primary'}
                iconType={selected ? 'cross' : 'plusInCircleFilled'}
                className="dscSidebarItem__action"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (e.type === 'click') {
                    e.currentTarget.focus();
                  }
                  e.preventDefault();
                  e.stopPropagation();
                  toggleField(field);
                }}
                data-test-subj={`fieldToggle-${field.name}`}
                aria-label={selected ? removeLabelAria : addLabelAria}
              />
            )}
          </>
        </EuiToolTip>
      </>
    );
  };

  return (
    <EuiPopover
      ownFocus
      display="block"
      isOpen={isFieldDetailsOpen}
      closePopover={() => setIsFieldDetailsOpen(false)}
      anchorPosition="rightUp"
      panelClassName="dscSidebarItem__fieldPopoverPanel"
      button={
        <FieldButton
          size="m"
          className="shard__fieldSelectorField explorer__fieldSelectorField"
          isActive={isFieldDetailsOpen}
          dataTestSubj={`field-${field.name}-showDetails`}
          fieldIcon={<FieldIcon type={isEqual(field.type, 'timestamp') ? 'date' : field.type} />}
          fieldName={
            <span
              data-test-subj={`field-${field.name}`}
              title={field.name}
              className="dscSidebarField__name"
            >
              {field.name}
            </span>
          }
          fieldAction={getFieldActionDOM()}
          onClick={togglePopover}
        />
      }
    >
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem>
          <EuiTitle size="xs">
            <h4>{toUpper(field.name)}</h4>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{upperFirst(field.type)}</EuiFlexItem>
      </EuiFlexGroup>

      <FieldInsights field={field} query={query} />
    </EuiPopover>
  );
};
