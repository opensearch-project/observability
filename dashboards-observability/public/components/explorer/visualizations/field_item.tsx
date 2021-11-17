/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './field_item.scss';

import React, { useState } from 'react';
import {
  EuiIconTip,
  EuiPopover
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { EuiHighlight } from '@elastic/eui';
import { FieldButton } from '../../common/field_button';
import { DragDrop } from './drag_drop';
import { LensFieldIcon } from './lens_field_icon';

import { debouncedComponent } from '../../common/debounced_component';

function wrapOnDot(str?: string) {
  // u200B is a non-width white-space character, which allows
  // the browser to efficiently word-wrap right after the dot
  // without us having to draw a lot of extra DOM elements, etc
  return str ? str.replace(/\./g, '.\u200B') : '';
}

export const InnerFieldItem = function InnerFieldItem(props: any) {
  const {
    field,
    highlight,
    exists,
    hideDetails,
  } = props;

  const [infoIsOpen, setOpen] = useState(false);

  function togglePopover() {}

  const lensFieldIcon = <LensFieldIcon type={field.type} />;
  const lensInfoIcon = (
    <EuiIconTip
      anchorClassName="lnsFieldItem__infoIcon"
      content={
        hideDetails
          ? i18n.translate('xpack.lens.indexPattern.fieldItemTooltip', {
              defaultMessage: 'Drag and drop to visualize.',
            })
          : exists
          ? i18n.translate('xpack.lens.indexPattern.fieldStatsButtonLabel', {
              defaultMessage: 'Click for a field preview, or drag and drop to visualize.',
            })
          : i18n.translate('xpack.lens.indexPattern.fieldStatsButtonEmptyLabel', {
              defaultMessage:
                'This field doesn’t have any data but you can still drag and drop to visualize.',
            })
      }
      type="iInCircle"
      color="subdued"
      size="s"
    />
  );
  return (
    <EuiPopover
      ownFocus
      className="lnsFieldItem__popoverAnchor"
      display="block"
      data-test-subj="lnsFieldListPanelField"
      container={document.querySelector<HTMLElement>('.application') || undefined}
      button={
        <DragDrop
          label={field.displayName}
          data-test-subj={`lnsFieldListPanelField-${field.name}`}
          draggable
        >
          <FieldButton
            className={`lnsFieldItem lnsFieldItem--${field.type} lnsFieldItem--${
              exists ? 'exists' : 'missing'
            }`}
            isActive={infoIsOpen}
            onClick={togglePopover}
            aria-label={i18n.translate('xpack.lens.indexPattern.fieldStatsButtonAriaLabel', {
              defaultMessage: '{fieldName}: {fieldType}. Hit enter for a field preview.',
              values: {
                fieldName: field.displayName,
                fieldType: field.type,
              },
            })}
            fieldIcon={lensFieldIcon}
            fieldName={
              <EuiHighlight search={wrapOnDot(highlight)}>
                {wrapOnDot(field.name)}
              </EuiHighlight>
            }
            fieldInfoIcon={lensInfoIcon}
          />
        </DragDrop>
      }
      isOpen={infoIsOpen}
      closePopover={() => setOpen(false)}
      anchorPosition="rightUp"
      panelClassName="lnsFieldItem__fieldPanel"
    >
    </EuiPopover>
  );
};

export const FieldItem = debouncedComponent(InnerFieldItem);
