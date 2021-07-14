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
  EuiSpacer,
  EuiAccordion,
  EuiFilterGroup
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { FieldList } from './fieldList';

export const DataPanel = (props: any) => {

  const { schema } = props.queryResults;

  // const fieldsGroup = schema

  return (
    <EuiFlexGroup
      gutterSize="none"
      className="lnsInnerIndexPatternDataPanel"
      direction="column"
      responsive={false}
    >
      <EuiFlexItem grow={false}>
        {/* <div className="lnsInnerIndexPatternDataPanel__header">
          index picker
        </div> */}
      </EuiFlexItem>
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
            onClick: () => {
              // trackUiEvent('indexpattern_filters_cleared');
              // clearLocalState();
            },
          }}
        >
          <input
            className="euiFieldText euiFieldText--fullWidth lnsInnerIndexPatternDataPanel__textField"
            data-test-subj="lnsIndexPatternFieldSearch"
            placeholder={i18n.translate('xpack.lens.indexPatterns.filterByNameLabel', {
              defaultMessage: 'Search field names',
              description: 'Search the list of fields in the index pattern for the provided text',
            })}
            // value={localState.nameFilter}
            value={''}
            onChange={(e) => {
              // setLocalState({ ...localState, nameFilter: e.target.value });
            }}
            aria-label={i18n.translate('xpack.lens.indexPatterns.filterByNameAriaLabel', {
              defaultMessage: 'Search fields',
            })}
          />
        </EuiFormControlLayout>

        <EuiSpacer size="xs" />

        <EuiFilterGroup>
          {/* <EuiPopover
            id="dataPanelTypeFilter"
            panelClassName="euiFilterGroup__popoverPanel"
            panelPaddingSize="none"
            anchorPosition="rightUp"
            display="block"
            // isOpen={localState.isTypeFilterOpen}
            closePopover={() => setLocalState(() => ({ ...localState, isTypeFilterOpen: false }))}
            button={
              <EuiFilterButton
                iconType="arrowDown"
                isSelected={localState.isTypeFilterOpen}
                numFilters={localState.typeFilter.length}
                hasActiveFilters={!!localState.typeFilter.length}
                numActiveFilters={localState.typeFilter.length}
                data-test-subj="lnsIndexPatternFiltersToggle"
                onClick={() => {
                  setLocalState((s) => ({
                    ...s,
                    isTypeFilterOpen: !localState.isTypeFilterOpen,
                  }));
                }}
              >
                {fieldFiltersLabel}
              </EuiFilterButton>
            }
          >
            <EuiContextMenuPanel
              watchedItemProps={['icon', 'disabled']}
              data-test-subj="lnsIndexPatternTypeFilterOptions"
              items={(availableFieldTypes as DataType[]).map((type) => (
                <EuiContextMenuItem
                  className="lnsInnerIndexPatternDataPanel__filterType"
                  key={type}
                  icon={localState.typeFilter.includes(type) ? 'check' : 'empty'}
                  data-test-subj={`typeFilter-${type}`}
                  onClick={() => {
                    trackUiEvent('indexpattern_type_filter_toggled');
                    setLocalState((s) => ({
                      ...s,
                      typeFilter: localState.typeFilter.includes(type)
                        ? localState.typeFilter.filter((t) => t !== type)
                        : [...localState.typeFilter, type],
                    }));
                  }}
                >
                  <span className="lnsInnerIndexPatternDataPanel__filterTypeInner">
                    <LensFieldIcon type={type} /> {fieldTypeNames[type]}
                  </span>
                </EuiContextMenuItem>
              ))}
            />
          </EuiPopover> */}
        </EuiFilterGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <FieldList
          id={_.uniqueId()}
          schema={ schema }
        />
        {/* <EuiAccordion
          id={_.uniqueId()}
        >
          <div className="lnsInnerIndexPatternDataPanel__fieldItems">
            {schema && schema.map((item) => item.name)}
          </div>
        </EuiAccordion> */}
      
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}