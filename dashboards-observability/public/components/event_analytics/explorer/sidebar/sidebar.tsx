/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './sidebar.scss';

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { EuiTitle, EuiSpacer, EuiFieldSearch, EuiAccordion } from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';
import { Field } from './field';
import { IExplorerFields, IField } from '../../../../../common/types/explorer';

interface ISidebarProps {
  query: string;
  explorerFields: IExplorerFields;
  explorerData: any;
  selectedTimestamp: string;
  isOverridingTimestamp: boolean;
  isFieldToggleButtonDisabled: boolean;
  handleOverrideTimestamp: (timestamp: { name: string; type: string }) => void;
  handleAddField: (field: IField) => void;
  handleRemoveField: (field: IField) => void;
}

export const Sidebar = (props: ISidebarProps) => {
  const {
    query,
    explorerFields,
    explorerData,
    selectedTimestamp,
    isOverridingTimestamp,
    isFieldToggleButtonDisabled,
    handleOverrideTimestamp,
    handleAddField,
    handleRemoveField,
  } = props;

  const [showFields, setShowFields] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <I18nProvider>
      <section className="sidebar-list">
        <div className="dscSidebar__item">
          <EuiFieldSearch
            compressed
            fullWidth
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Search field names"
            value={searchTerm}
            data-test-subj="eventExplorer__sidebarSearch"
          />
        </div>
        <EuiSpacer size="s" />
        <div className="sidebar-list">
          {((explorerData && !isEmpty(explorerData.jsonData) && !isEmpty(explorerFields)) ||
            !isEmpty(explorerFields.availableFields)) && (
            <>
              {explorerFields?.queriedFields && explorerFields.queriedFields?.length > 0 && (
                <EuiAccordion
                  initialIsOpen
                  id="fieldSelector__queriedFields"
                  buttonContent={
                    <EuiTitle size="xxxs">
                      <span>Query fields</span>
                    </EuiTitle>
                  }
                  paddingSize="xs"
                >
                  <ul
                    className="dscSidebarList dscFieldList--selected"
                    aria-labelledby="queried_fields"
                    data-test-subj={`fieldList-selected`}
                  >
                    {explorerFields.queriedFields &&
                      explorerFields.queriedFields.map((field) => {
                        return (
                          <li
                            key={`field${field.name}`}
                            data-attr-field={field.name}
                            className="dscSidebar__item"
                          >
                            <Field
                              query={query}
                              field={field}
                              selectedTimestamp={selectedTimestamp}
                              handleOverrideTimestamp={handleOverrideTimestamp}
                              selected={true}
                              isFieldToggleButtonDisabled={true}
                              showTimestampOverrideButton={false}
                              onToggleField={handleRemoveField}
                            />
                          </li>
                        );
                      })}
                  </ul>
                </EuiAccordion>
              )}
              <EuiSpacer size="s" />
              <EuiAccordion
                initialIsOpen
                id="fieldSelector__selectedFields"
                buttonContent={
                  <EuiTitle size="xxxs">
                    <span>Selected Fields</span>
                  </EuiTitle>
                }
                paddingSize="xs"
              >
                <ul
                  className="dscSidebarList dscFieldList--selected"
                  aria-labelledby="selected_fields"
                  data-test-subj={`fieldList-selected`}
                >
                  {explorerData &&
                    !isEmpty(explorerData.jsonData) &&
                    explorerFields.selectedFields &&
                    explorerFields.selectedFields.map((field) => {
                      return (
                        <li
                          key={`field${field.name}`}
                          data-attr-field={field.name}
                          className="dscSidebar__item"
                        >
                          <Field
                            query={query}
                            field={field}
                            selectedTimestamp={selectedTimestamp}
                            isOverridingTimestamp={isOverridingTimestamp}
                            handleOverrideTimestamp={handleOverrideTimestamp}
                            selected={true}
                            isFieldToggleButtonDisabled={isFieldToggleButtonDisabled}
                            showTimestampOverrideButton={true}
                            onToggleField={handleRemoveField}
                          />
                        </li>
                      );
                    })}
                </ul>
              </EuiAccordion>
              <EuiSpacer size="s" />
              <EuiAccordion
                initialIsOpen
                id="fieldSelector__availableFields"
                buttonContent={
                  <EuiTitle size="xxxs">
                    <span>Available Fields</span>
                  </EuiTitle>
                }
                paddingSize="xs"
              >
                <ul
                  className={`dscFieldList dscFieldList--unpopular ${
                    !showFields ? 'hidden-sm hidden-xs' : ''
                  }`}
                  aria-labelledby="available_fields"
                  data-test-subj={`fieldList-unpopular`}
                >
                  {explorerFields.availableFields &&
                    explorerFields.availableFields
                      .filter((field) => searchTerm === '' || field.name.indexOf(searchTerm) !== -1)
                      .map((field) => {
                        return (
                          <li
                            key={`field${field.name}`}
                            data-attr-field={field.name}
                            className="dscSidebar__item"
                          >
                            <Field
                              query={query}
                              field={field}
                              selectedTimestamp={selectedTimestamp}
                              isOverridingTimestamp={isOverridingTimestamp}
                              handleOverrideTimestamp={handleOverrideTimestamp}
                              onToggleField={handleAddField}
                              selected={false}
                              isFieldToggleButtonDisabled={isFieldToggleButtonDisabled}
                              showTimestampOverrideButton={true}
                            />
                          </li>
                        );
                      })}
                </ul>
              </EuiAccordion>
            </>
          )}
        </div>
      </section>
    </I18nProvider>
  );
};
