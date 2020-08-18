import React, { useState } from 'react'
import { EuiPopover, EuiButtonIcon, EuiContextMenu, EuiButtonEmpty, EuiPopoverTitle, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiSuperSelect, EuiSpacer, EuiButton } from '@elastic/eui';
import { EuiIcon } from '@elastic/eui';

export function Filters() {
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState<boolean>(false);
  const [isAddFilterPopoverOpen, setIsAddFilterPopoverOpen] = useState<boolean>(false);
  const popoverPanels = [
    {
      id: 0,
      title: 'Change all filters',
      items: [
        {
          name: 'Invert inclusion',
          icon: <EuiIcon type="invert" size="m" />,
          onClick: () => {
            window.alert('click');
          },
        },
        {
          name: 'Remove all',
          icon: <EuiIcon type="trash" size="m" />,
          onClick: () => {
            window.alert('click');
          },
        },
      ],
    },
  ];
  const renderFilters = (isPopoverOpen, setIsPopoverOpen, popoverPanels) => {
    return (
      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        button={
          <EuiButtonIcon
            onClick={() => setIsPopoverOpen(true)}
            iconType="filter"
            title="Change all filters"
          />
        }
        anchorPosition="rightUp"
        panelPaddingSize="none"
        withTitle
      >
        <EuiContextMenu initialPanelId={0} panels={popoverPanels} />
      </EuiPopover>
    );
  };

  const renderAddFilter = (isPopoverOpen, setIsPopoverOpen) => {
    const button = (
      <EuiButtonEmpty
        size="xs"
        onClick={() => {
          setIsPopoverOpen(true);
        }}
      >
        + Add filter
      </EuiButtonEmpty>
    );

    return (
      <EuiPopover
        button={button}
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        anchorPosition="downLeft"
        withTitle
      >
        <EuiPopoverTitle>{'Add filter'}</EuiPopoverTitle>
        <div style={{ width: 370 }}>
          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={6}>
              <EuiFormRow label={'Field'}>
                <EuiSuperSelect
                  options={[
                    {
                      value: 'test',
                      inputDisplay: 'test',
                    },
                  ]}
                  valueOfSelected={'test'}
                  onChange={() => { }}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={5}>
              <EuiFormRow label={'Operator'}>
                <EuiSuperSelect
                  options={[
                    {
                      value: 'test',
                      inputDisplay: 'test',
                    },
                  ]}
                  valueOfSelected={'test'}
                  onChange={() => { }}
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="m" />
          <EuiFlexGroup gutterSize="s" justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty>Cancel</EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton fill>Save</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    );
  };

  return (
    <EuiFlexGroup gutterSize="none" alignItems="flexEnd" responsive={false}>
      <EuiFlexItem grow={false}>
        {renderFilters(isFilterPopoverOpen, setIsFilterPopoverOpen, popoverPanels)}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {renderAddFilter(isAddFilterPopoverOpen, setIsAddFilterPopoverOpen)}
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
