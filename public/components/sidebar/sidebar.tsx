import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { 
  EuiTitle,
  EuiSpacer,
  EuiButtonIcon
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
import { Field } from './field';

export const Sidebar = (props: any) => {

  const {
    fields,
    queryData
  } = props;

  const [showFields, setShowFields] = useState<Boolean>(false);

  return (
    <I18nProvider>
      <section
        className="sidebar-list"
      >
        index dropdown
        <div className="dscSidebar__item">
          field search
        </div>
        <div className="sidebar-list">
          { fields && fields.length > 0 && (
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
              <li
                className="dscSidebar__item"
              >
                list value
              </li>
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
            {/* <>
              <EuiTitle
                size="xxxs"
                className={`dscFieldListHeader ${!showFields ? 'hidden-sm hidden-xs' : ''}`}
              >
                <h4 id="available_fields_popular">
                  <FormattedMessage
                    id="discover.fieldChooser.filter.popularTitle"
                    defaultMessage="Popular"
                  />
                </h4>
              </EuiTitle>
              <ul
                className={`dscFieldList dscFieldList--popular ${
                  !showFields ? 'hidden-sm hidden-xs' : ''
                }`}
                aria-labelledby="available_fields available_fields_popular"
                data-test-subj={`fieldList-popular`}
              >
                { fields.map((col) => {
                return (
                  <li
                    key={`field${col.name}`}
                    data-attr-field={col.name}
                    className="dscSidebar__item"
                  >
                    { col.name }
                  </li>
                );
              }) }
              </ul>
            </>    */}
            <ul
              className={`dscFieldList dscFieldList--unpopular ${
                !showFields ? 'hidden-sm hidden-xs' : ''
              }`}
              aria-labelledby="available_fields"
              data-test-subj={`fieldList-unpopular`}
            >
              {
                fields.map((col) => {
                  return (
                    <li
                      key={`field${col.name}`}
                      data-attr-field={col.name}
                      className="dscSidebar__item"
                    >
                      <Field 
                        field={ col }
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