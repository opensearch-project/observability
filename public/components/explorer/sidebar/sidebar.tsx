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

import './sidebar.scss';

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { 
  EuiTitle,
  EuiSpacer,
  EuiButtonIcon,
  EuiFieldSearch
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { Field } from './field';
import { IExplorerFields, IField } from '../../../../common/types/explorer';

interface ISidebarProps {
  explorerFields: IExplorerFields;
  handleAddField: (field: IField) => void;
  handleRemoveField: (field: IField) => void;
}

export const Sidebar = (props: ISidebarProps) => {

  const {
    explorerFields,
    handleAddField,
    handleRemoveField
  } = props;

  const [showFields, setShowFields] = useState<Boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <I18nProvider>
      <section
        className="sidebar-list"
      >
        <EuiSpacer size="m"/>
        <div className="dscSidebar__item">
          <EuiFieldSearch 
            compressed
            fullWidth
            onChange={(e) => { 
              setSearchTerm(e.target.value) 
            }}
            placeholder="Search field names"
            value={searchTerm}
          />
        </div>
        <EuiSpacer size="s"/>
        <div className="sidebar-list">
          { !isEmpty(explorerFields) && (
            <>
              {
                explorerFields?.queriedFields && explorerFields.queriedFields?.length > 0 && (
                  <>
                    <EuiTitle size="xxxs" id="selected_fields">
                      <h3>
                        <FormattedMessage
                          id="discover.fieldChooser.filter.selectedFieldsTitle"
                          defaultMessage="Queried Fields"
                        />
                      </h3>
                    </EuiTitle>
                    <EuiSpacer size="xs" />
                    <ul
                      className="dscSidebarList dscFieldList--selected"
                      aria-labelledby="selected_fields"
                      data-test-subj={`fieldList-selected`}
                    >
                      { explorerFields.queriedFields && explorerFields.queriedFields.map(field => {
                        return (
                          <li
                            key={`field${field.name}`}
                            data-attr-field={field.name}
                            className="dscSidebar__item"
                          >
                            <Field 
                              field={ field }
                              selected={ true }
                              showToggleButton={ false }
                              onToggleField={ handleRemoveField }
                            />
                          </li>
                        )})
                      }
                    </ul>
                  </>
                )
              }
            <EuiTitle size="xxxs" id="selected_fields">
              <h3>
                <FormattedMessage
                  id="discover.fieldChooser.filter.selectedFieldsTitle"
                  defaultMessage="Selected Fields"
                />
              </h3>
            </EuiTitle>
            <EuiSpacer size="xs" />
            <ul
              className="dscSidebarList dscFieldList--selected"
              aria-labelledby="selected_fields"
              data-test-subj={`fieldList-selected`}
            >
              { explorerFields.selectedFields && explorerFields.selectedFields.map(field => {
                return (
                  <li
                    key={`field${field.name}`}
                    data-attr-field={field.name}
                    className="dscSidebar__item"
                  >
                    <Field 
                      field={ field }
                      selected={ true }
                      onToggleField={ handleRemoveField }
                    />
                  </li>
                )})
              }
            </ul>
            <div className="euiFlexGroup euiFlexGroup--gutterMedium">
              <EuiTitle size="xxxs" id="available_fields" className="euiFlexItem">
                <h3>
                  <FormattedMessage
                    id="discover.fieldChooser.filter.availableFieldsTitle"
                    defaultMessage="Available Fields"
                  />
                </h3>
              </EuiTitle>
              <div className="euiFlexItem euiFlexItem--flexGrowZero">
                <EuiButtonIcon
                  className={'visible-xs visible-sm dscFieldChooser__toggle'}
                  iconType={showFields ? 'arrowDown' : 'arrowRight'}
                  onClick={() => setShowFields(!showFields)}
                  aria-label={
                    showFields
                      ? i18n.translate(
                          'discover.fieldChooser.filter.indexAndFieldsSectionHideAriaLabel',
                          {
                            defaultMessage: 'Hide fields',
                          }
                        )
                      : i18n.translate(
                          'discover.fieldChooser.filter.indexAndFieldsSectionShowAriaLabel',
                          {
                            defaultMessage: 'Show fields',
                          }
                        )
                  }
                />
              </div>
            </div>
            <ul
              className={`dscFieldList dscFieldList--unpopular ${
                !showFields ? 'hidden-sm hidden-xs' : ''
              }`}
              aria-labelledby="available_fields"
              data-test-subj={`fieldList-unpopular`}
            >
              {
                explorerFields.availableFields &&
                explorerFields.availableFields.filter(
                  (field) => searchTerm === '' || field.name.indexOf(searchTerm) !== -1)
                  .map((field) => {
                  return (
                    <li
                      key={`field${field.name}`}
                      data-attr-field={field.name}
                      className="dscSidebar__item"
                    >
                      <Field 
                        field={ field }
                        onToggleField={ handleAddField }
                        selected={ false }
                      />
                    </li>
                  )})
              }
            </ul>
          </>
          ) }
        </div>
      </section>
    </I18nProvider>
  );
}