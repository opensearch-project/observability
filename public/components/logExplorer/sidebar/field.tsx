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
import { 
  EuiPopover,
  EuiButtonIcon,
  EuiToolTip
} from '@elastic/eui';
import { FieldButton } from '../../common/field_button';
import { FieldIcon } from '../../common/field_icon';

interface FieldProps {
  field: string;
  selected: boolean;
  onRemoveField?: () => void;
  onAddField?: () => void;
}

export const Field = (props: FieldProps) => {

  const [isFieldDetailsOpen, setIsFieldDetailsOpen] = useState(false);

  const addLabelAria = i18n.translate('discover.fieldChooser.discoverField.addButtonAriaLabel', {
    defaultMessage: 'Add {field} to table',
    values: { field: props.field.name },
  });
  const removeLabelAria = i18n.translate(
    'discover.fieldChooser.discoverField.removeButtonAriaLabel',
    {
      defaultMessage: 'Remove {field} from table',
      values: { field: props.field.name },
    }
  );

  const togglePopover = () => {
    setIsFieldDetailsOpen(!isFieldDetailsOpen);
  }

  const toggleField = (field: string) => {
    if (props.selected) {
      props.onRemoveField(field);
    } else {
      props.onAddField(field);
    }
  };

  const getFieldActionDOM = () => {
    return (
      <EuiToolTip
        delay="long"
        content={
          i18n.translate(
            props.selected ? 
            'discover.fieldChooser.discoverField.removeFieldTooltip' :
            'discover.fieldChooser.discoverField.addFieldTooltip', 
            {
              defaultMessage: props.selected ? 'Remove field from table' : 'Add field as column',
            }
          )
        }
      >
        <EuiButtonIcon
          color="danger"
          iconType={ props.selected ? "cross": "plusInCircleFilled" }
          className="dscSidebarItem__action"
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            if (ev.type === 'click') {
              ev.currentTarget.focus();
            }
            ev.preventDefault();
            ev.stopPropagation();
            toggleField(props.field);
          }}
          data-test-subj={`fieldToggle-${props.field.name}`}
          aria-label={ props.selected ? removeLabelAria : addLabelAria }
        />
      </EuiToolTip>
    );
  };

  return (
    <EuiPopover
      ownFocus
      display="block"
      isOpen={ isFieldDetailsOpen }
      closePopover={ () => setIsFieldDetailsOpen(false) }
      anchorPosition="rightUp"
      panelClassName="dscSidebarItem__fieldPopoverPanel"
      button={
        <FieldButton 
          size="s"
          className="dscSidebarItem"
          isActive={ isFieldDetailsOpen }
          dataTestSubj={`field-${props.field.name}-showDetails`}
          fieldIcon={<FieldIcon
                      type={props.field.type}
                    />}
          fieldName={ <span
                        data-test-subj={`field-${props.field.name}`}
                        title={props.field.name}
                        className="dscSidebarField__name"
                      >
                        { props.field.name }
                      </span> 
                    }
          fieldAction={ getFieldActionDOM() }
          onClick={() => { togglePopover() }}
        />
      }
    >
      details
    </EuiPopover>
  );
};