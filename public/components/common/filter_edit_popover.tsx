import { EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiComboBox, EuiSpacer, EuiFieldNumber, EuiButtonEmpty, EuiButton, EuiComboBoxOptionOption, EuiFieldText, EuiButtonIcon, EuiIcon } from '@elastic/eui';
import React, { useState } from 'react'
import { FilterType } from './filters';

export default function FilterEditPopover(props: {
  filter?: FilterType;
  index: number;
  setFilter: (newFilter: FilterType, index: number) => void;
  closePopover: () => void;
}) {
  const fieldOptions = [
    {
      label: 'test',
    },
    {
      label: 'test2',
    },
    {
      label: 'test3',
    },
  ];
  const operatorOptions = [
    {
      label: 'test',
    },
    {
      label: 'test2',
    },
    {
      label: 'test3',
    },
  ];
  const [selectedFieldOptions, setSelectedFieldOptions] = useState<
    Array<EuiComboBoxOptionOption<string>>
  >([]);
  const [selectedOperatorOptions, setSelectedOperatorOptions] = useState<
    Array<EuiComboBoxOptionOption<string>>
  >([]);

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
              options={fieldOptions}
              selectedOptions={selectedFieldOptions}
              onChange={(e) => setSelectedFieldOptions(e)}
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
              options={operatorOptions}
              selectedOptions={selectedOperatorOptions}
              onChange={(e) => setSelectedOperatorOptions(e)}
              singleSelection={{ asPlainText: true }}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      {selectedOperatorOptions.length > 0 ? (
        <>
          <EuiSpacer size="s" />
          <EuiFormRow label={'Value'}>
            <EuiFieldNumber placeholder="Placeholder text" onChange={() => { }} />
          </EuiFormRow>
        </>
      ) : null}
      <EuiSpacer size="m" />
      <EuiFlexGroup gutterSize="s" justifyContent="flexEnd">
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty onClick={props.closePopover}>Cancel</EuiButtonEmpty>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            fill
            onClick={() => {
              // TODO: disable if no selected field/operator/values, use operator/values, add data modal mapping
              props.closePopover();
              props.setFilter({ field: selectedFieldOptions[0].label }, props.index);
            }}
          >
            Save
              </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
