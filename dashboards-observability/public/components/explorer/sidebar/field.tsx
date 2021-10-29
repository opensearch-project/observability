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

import React, { useState } from 'react';
import { i18n } from '@osd/i18n';
import { isEqual } from 'lodash';
import { 
  EuiPopover,
  EuiButtonIcon,
  EuiToolTip,
  EuiButton,
  EuiMark
} from '@elastic/eui';
import { FieldButton } from '../../common/field_button';
import { FieldIcon } from '../../common/field_icon';
import { IField } from '../../../../common/types/explorer';

interface IFieldProps {
  field: IField;
  selectedTimestamp: string;
  handleOverrideTimestamp: (timestamp: { name: string, type: string }) => void;
  selected: boolean;
  showToggleButton: boolean;
  onToggleField: (field: IField) => void;
}

export const Field = (props: IFieldProps) => {

  const {
    field,
    selectedTimestamp,
    handleOverrideTimestamp,
    selected,
    showToggleButton = true,
    onToggleField
  } = props;

  const [isFieldDetailsOpen, setIsFieldDetailsOpen] = useState(false);

  const addLabelAria = i18n.translate(
    'addButtonAriaLabel', {
    defaultMessage: 'Add {field} to table',
    values: { field: field.name },
  });
  const removeLabelAria = i18n.translate(
    'removeButtonAriaLabel',
    {
      defaultMessage: 'Remove {field} from table',
      values: { field: field.name },
    }
  );

  const togglePopover = () => {
    setIsFieldDetailsOpen(!isFieldDetailsOpen);
  }

  const toggleField = (field: IField) => {
    onToggleField(field);
  };

  const getFieldActionDOM = () => {
    return (
      <EuiToolTip
        delay="long"
        content={
          i18n.translate(
            selected ? 'removeFieldTooltip' : 'addFieldTooltip', 
            { defaultMessage: selected ? 'Remove field from table' : 'Add field as column' }
          )
        }
      >
        <>
        { isEqual(field.type, 'timestamp') ?
          isEqual(selectedTimestamp, field.name) ? <EuiMark>{ 'Default Timestamp' }</EuiMark> :
          <EuiButton
            className="timestamp_override"
            size="s"
            color={'secondary'}
            fill
            onClick={() => handleOverrideTimestamp(field)}
          >
            { 'Override' }
          </EuiButton> : null
        }
        {
          showToggleButton ? (
            <EuiButtonIcon
              color={ selected ? "danger" : "primary" }
              iconType={ selected ? "cross": "plusInCircleFilled" }
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
              aria-label={ selected ? removeLabelAria : addLabelAria }
            />
          ) : null
        }
        </>
      </EuiToolTip>
    );
  };

  return (
    <EuiPopover
      ownFocus
      display="block"
      isOpen={ isFieldDetailsOpen }
      closePopover={ () => togglePopover }
      anchorPosition="rightUp"
      panelClassName="dscSidebarItem__fieldPopoverPanel"
      button={
        <FieldButton 
          size="s"
          className="dscSidebarItem"
          isActive={ isFieldDetailsOpen }
          dataTestSubj={`field-${field.name}-showDetails`}
          fieldIcon={<FieldIcon
                      type={isEqual(field.type, 'timestamp') ? 'date' : field.type}
                    />}
          fieldName={ <span
                        data-test-subj={`field-${field.name}`}
                        title={field.name}
                        className="dscSidebarField__name"
                      >
                        { field.name }
                      </span> 
                    }
          fieldAction={ getFieldActionDOM() }
          onClick={() => {}}
        />
      }
    >
      details
    </EuiPopover>
  );
};