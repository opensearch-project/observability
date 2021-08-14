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

import './datapanel.scss';
import './field_item.scss';
import React from 'react';
import _ from 'lodash';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormControlLayout,
  EuiSpacer
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { FieldList } from './fieldList';

export const DataPanel = (props: any) => {

  const schema = props.explorerFields?.availableFields;

  return (
    <EuiFlexGroup
      gutterSize="none"
      className="lnsInnerIndexPatternDataPanel"
      direction="column"
      responsive={false}
    >
      <EuiFlexItem grow={false}>
        <EuiFormControlLayout
          icon="search"
          fullWidth
          clear={{
            title: i18n.translate('xpack.lens.indexPatterns.clearFiltersLabel', {
              defaultMessage: 'Clear name and type filters',
            }),
            'aria-label': i18n.translate('xpack.lens.indexPatterns.clearFiltersLabel', {
              defaultMessage: 'Clear name and type filters',
            }),
            onClick: () => {},
          }}
        >
          <input
            className="euiFieldText euiFieldText--fullWidth lnsInnerIndexPatternDataPanel__textField"
            data-test-subj="lnsIndexPatternFieldSearch"
            placeholder={i18n.translate('xpack.lens.indexPatterns.filterByNameLabel', {
              defaultMessage: 'Search field names',
              description: 'Search the list of fields in the index pattern for the provided text',
            })}
            value={''}
            onChange={(e) => {}}
            aria-label={i18n.translate('xpack.lens.indexPatterns.filterByNameAriaLabel', {
              defaultMessage: 'Search fields',
            })}
          />
        </EuiFormControlLayout>
        <EuiSpacer size="xs" />
      </EuiFlexItem>
      <EuiFlexItem>
        <FieldList
          id={_.uniqueId()}
          schema={ schema }
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}