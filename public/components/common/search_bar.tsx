import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiContextMenu,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiPopoverTitle,
  EuiSuperDatePicker,
  EuiSpacer,
  EuiIcon,
  EuiFormRow,
  EuiSuperSelect,
} from '@elastic/eui';
import React, { useState, Dispatch, SetStateAction } from 'react';

export const renderDatePicker = (startTime, setStartTime, endTime, setEndTime) => {
  return (
    <EuiSuperDatePicker
      start={startTime}
      end={endTime}
      showUpdateButton={false}
      onTimeChange={(e) => {
        console.log(e);
        setStartTime(e.start);
        setEndTime(e.end);
      }}
    />
  );
};

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
      // panelPaddingSize="none"
      ownFocus={true}
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
                onChange={() => {}}
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
                onChange={() => {}}
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

export interface SearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
}

export function SearchBar(props: SearchBarProps) {
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

  return (
    <>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFieldSearch
            fullWidth
            placeholder="Trace ID, trace group name, user ID, service name"
            value={props.query}
            onChange={(e) => props.setQuery(e.target.value)}
            onSearch={(e) => console.log(e)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {renderDatePicker(props.startTime, props.setStartTime, props.endTime, props.setEndTime)}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill iconType="refresh">
            Refresh
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="s" />

      <EuiFlexGroup gutterSize="none" alignItems="flexEnd" responsive={false}>
        <EuiFlexItem grow={false}>
          {renderFilters(isFilterPopoverOpen, setIsFilterPopoverOpen, popoverPanels)}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {renderAddFilter(isAddFilterPopoverOpen, setIsAddFilterPopoverOpen)}
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
