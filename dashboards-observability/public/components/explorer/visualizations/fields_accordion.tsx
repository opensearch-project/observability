/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './datapanel.scss';
import React, { memo, useCallback } from 'react';
import { i18n } from '@osd/i18n';
import {
  EuiText,
  EuiNotificationBadge,
  EuiSpacer,
  EuiAccordion,
  EuiLoadingSpinner,
  EuiIconTip,
} from '@elastic/eui';
import { FieldItem } from './field_item';

export const InnerFieldsAccordion = function InnerFieldsAccordion({
  id,
  label,
  isFiltered,
  paginatedFields,
  showExistenceFetchError,
}: any) {
  const renderField = useCallback(
    (field) => (
      <FieldItem 
        exists={ true }
        field={ field }
        hideDetails={ false }
        key={field.name}
      />
    ),
    []
  );

  return (
    <EuiAccordion
      id={id}
      buttonContent={
        <EuiText size="xs">
          <strong>{label}</strong>
        </EuiText>
      }
      extraAction={
        showExistenceFetchError ? (
          <EuiIconTip
            aria-label={i18n.translate('xpack.lens.indexPattern.existenceErrorAriaLabel', {
              defaultMessage: 'Existence fetch failed',
            })}
            type="alert"
            color="warning"
            content={i18n.translate('xpack.lens.indexPattern.existenceErrorLabel', {
              defaultMessage: "Field information can't be loaded",
            })}
          />
        ) : true ? (
          <EuiNotificationBadge size="m" color={isFiltered ? 'accent' : 'subdued'}>
            {paginatedFields?.length}
          </EuiNotificationBadge>
        ) : (
          <EuiLoadingSpinner size="m" />
        )
      }
    >
      <EuiSpacer size="s" />
      <div className="lnsInnerIndexPatternDataPanel__fieldItems">
        {paginatedFields && paginatedFields.map(renderField)}
      </div>
    </EuiAccordion>
  );
};

export const FieldsAccordion = memo(InnerFieldsAccordion);
