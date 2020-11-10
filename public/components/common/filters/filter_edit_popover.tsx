import {
  EuiButton,
  EuiButtonEmpty,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';
import React, { useState } from 'react';
import { FilterType } from './filters';
import { getInvertedOperator, getOperatorOptions, getValueComponent } from './filter_helpers';

export function FilterEditPopover(props: {
  filter?: FilterType;
  index: number;
  setFilter: (newFilter: FilterType, index: number) => void;
  closePopover: () => void;
  filterFieldOptions: Array<{ label: string }>;
}) {
  const [selectedFieldOptions, setSelectedFieldOptions] = useState<
    Array<EuiComboBoxOptionOption<string>>
  >(props.filter ? [{ label: props.filter.field }] : []);
  const [selectedOperatorOptions, setSelectedOperatorOptions] = useState<
    Array<EuiComboBoxOptionOption<string>>
  >(
    props.filter
      ? [{ label: getInvertedOperator(props.filter.operator, props.filter.inverted) }]
      : []
  );
  const [filterValue, setFilterValue] = useState(props.filter?.value || '');

  return (
    <div style={{ width: 400 }}>
      {/* invisible button workaround to prevent auto focus on context menu panel switch */}
      <button style={{ width: 0, height: 0, position: 'fixed', marginLeft: -1000, bottom: 0 }} />
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={6}>
          <EuiFormRow label={'Field'}>
            <EuiComboBox
              placeholder="Select a field first"
              isClearable={false}
              options={props.filterFieldOptions}
              selectedOptions={selectedFieldOptions}
              onChange={(e) => {
                setSelectedFieldOptions(e);
                setSelectedOperatorOptions([]);
                setFilterValue('');
              }}
              singleSelection={{ asPlainText: true }}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={5}>
          <EuiFormRow label={'Operator'}>
            <EuiComboBox
              placeholder={selectedFieldOptions.length === 0 ? 'Waiting' : 'Select'}
              isClearable={false}
              isDisabled={selectedFieldOptions.length === 0}
              options={
                selectedFieldOptions.length === 0
                  ? []
                  : getOperatorOptions(selectedFieldOptions[0].label)
              }
              selectedOptions={selectedOperatorOptions}
              onChange={(e) => {
                setSelectedOperatorOptions(e);
                setFilterValue('');
              }}
              singleSelection={{ asPlainText: true }}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      {selectedOperatorOptions.length > 0 &&
        getValueComponent(selectedOperatorOptions[0].label, filterValue, setFilterValue)}
      <EuiSpacer size="m" />
      <EuiFlexGroup gutterSize="s" justifyContent="flexEnd">
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty onClick={props.closePopover}>Cancel</EuiButtonEmpty>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            fill
            disabled={
              selectedFieldOptions.length === 0 ||
              selectedOperatorOptions.length === 0 ||
              (filterValue.length === 0 && !selectedOperatorOptions[0]?.label?.includes('exist'))
            }
            onClick={() => {
              props.closePopover();
              props.setFilter(
                {
                  field: selectedFieldOptions[0].label,
                  operator: selectedOperatorOptions[0].label,
                  value: selectedOperatorOptions[0].label.includes('exist')
                    ? 'exists'
                    : filterValue,
                  inverted: selectedOperatorOptions[0].label.includes('not'),
                  disabled: props.filter ? props.filter.disabled : false,
                },
                props.index
              );
            }}
          >
            Save
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
