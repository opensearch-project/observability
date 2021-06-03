import React, { useState } from 'react';
import _ from 'lodash';
import { 
  EuiTitle,
  EuiSpacer,
  EuiButtonIcon
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { Field } from './field';

export const Sidebar = (props: any) => {

  const {
    explorerFields,
    handleAddField,
    handleRemoveField
  } = props;

  const [showFields, setShowFields] = useState<Boolean>(false);

  return (
    <I18nProvider>
      <section
        className="sidebar-list"
      >
        {/* index dropdown */}
        <div className="dscSidebar__item">
          {/* field search */}
        </div>
        <div className="sidebar-list">
          { explorerFields && !_.isEmpty(explorerFields) && (
            <>
            <EuiTitle size="xxxs" id="selected_fields">
              <h3>
                <FormattedMessage
                  id="discover.fieldChooser.filter.selectedFieldsTitle"
                  defaultMessage="Selected fields"
                />
              </h3>
            </EuiTitle>
            <EuiSpacer size="xs" />
            <ul
              className="dscSidebarList dscFieldList--selected"
              aria-labelledby="selected_fields"
              data-test-subj={`fieldList-selected`}
            >
              { explorerFields.selectedFields.map(field => {
                return (
                  <li
                    key={`field${field.name}`}
                    data-attr-field={field.name}
                    className="dscSidebar__item"
                  >
                    <Field 
                      field={ field }
                      selected={ true }
                      onRemoveField={ handleRemoveField }
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
                    defaultMessage="Available fields"
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
                explorerFields.unselectedFields.map((col) => {
                  return (
                    <li
                      key={`field${col.name}`}
                      data-attr-field={col.name}
                      className="dscSidebar__item"
                    >
                      <Field 
                        field={ col }
                        onAddField={ handleAddField }
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