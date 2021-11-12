/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './datapanel.scss';
import './field_item.scss';
import React, { useState } from 'react';
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

  const fields = props.explorerFields?.availableFields;

  const [searchTerm, setSearchTerm] = useState<string>('');

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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            aria-label={i18n.translate('xpack.lens.indexPatterns.filterByNameAriaLabel', {
              defaultMessage: 'Search fields',
            })}
          />
        </EuiFormControlLayout>
        <EuiSpacer size="m" />
      </EuiFlexItem>
      <EuiFlexItem>
        <FieldList
          id={_.uniqueId()}
          fields={ fields?.filter((field) => searchTerm === '' || field.name.indexOf(searchTerm) !== -1) }
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}