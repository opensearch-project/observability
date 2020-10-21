import {
  EuiBadge,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiContextMenu,
  EuiContextMenuPanelDescriptor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPopover,
  EuiPopoverTitle,
  EuiText
} from '@elastic/eui';
import React, { useState } from 'react';
import FilterEditPopover from './filter_edit_popover';

export interface FilterType {
  field: string;
  operator?: string;
  value?: any;
  inverted?: boolean;
  disabled?: boolean;
}

export function Filters() {
  const [filters, setFilters] = useState<FilterType[]>([]);

  // set a filter at an index. if newFilter doesn't exist, remove filter at the index
  const setFilter = (newFilter: FilterType, index: number) => {
    const newFilters = [...filters];
    if (newFilter)
      newFilters.splice(index, 1, newFilter);
    else
      newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const globalPopoverPanels = [
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

  const getFilterPopoverPanels = (filter: FilterType, index: number, closePopover: () => void): EuiContextMenuPanelDescriptor[] => [
    {
      id: 0,
      items: [
        {
          name: 'Edit filter',
          icon: <EuiIcon type="invert" size="m" />,
          panel: 1,
        },
        {
          name: `${filter.inverted ? 'Include' : 'Exclude'} results`,
          icon: <EuiIcon type={filter.inverted ? "plusInCircle" : "minusInCircle"} size="m" />,
          onClick: () => {
            filter.inverted = !filter.inverted;
            setFilter(filter, index);
          },
        },
        {
          name: filter.disabled ? 'Re-enable' : 'Temporarily disable',
          icon: <EuiIcon type={filter.disabled ? "eye" : "eyeClosed"} size="m" />,
          onClick: () => {
            filter.disabled = !filter.disabled;
            setFilter(filter, index);
          },
        },
        {
          name: 'Delete',
          icon: <EuiIcon type="trash" size="m" />,
          onClick: () => setFilter(null, index),
        },
      ],
    },
    {
      id: 1,
      width: 430,
      title: 'Edit filter',
      content: (
        <div style={{ margin: 15 }}>
          <FilterEditPopover
            filter={filter}
            index={filters.length}
            setFilter={setFilter}
            closePopover={closePopover}
          />
        </div>
      ),
    },
  ];

  const GlobalFilterButton = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    return (
      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        button={
          <EuiButtonIcon
            onClick={() => setIsPopoverOpen(true)}
            iconType="filter"
            title="Change all filters"
            aria-label="Change all filters"
          />
        }
        anchorPosition="rightUp"
        panelPaddingSize="none"
        withTitle
      >
        <EuiContextMenu initialPanelId={0} panels={globalPopoverPanels} />
      </EuiPopover>
    );
  };

  const AddFilterButton = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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
        <FilterEditPopover
          index={filters.length}
          setFilter={setFilter}
          closePopover={() => setIsPopoverOpen(false)}
        />
      </EuiPopover>
    );
  };

  const renderFilters = () => {
    const FilterBadge = ({ filter, index }: { filter: FilterType; index: number }) => {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      const badge = (
        <EuiBadge
          style={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}
          onClick={() => setIsPopoverOpen(true)}
          onClickAriaLabel="Open filter settings"
          color={filter.disabled ? "#e7e9f0" : "hollow"}
          iconType="cross"
          iconSide="right"
          iconOnClick={() => { setFilter(null, index) }}
          iconOnClickAriaLabel="Remove filter"
        >{`${filter.field}`}</EuiBadge>
      );
      return (
        <EuiFlexItem grow={false} key={`filter-${index}`}>
          <EuiPopover
            isOpen={isPopoverOpen}
            closePopover={() => setIsPopoverOpen(false)}
            panelPaddingSize="none"
            button={badge}
          >
            <EuiContextMenu initialPanelId={0} panels={getFilterPopoverPanels(filter, index, () => setIsPopoverOpen(false))} />
          </EuiPopover>
        </EuiFlexItem>
      );
    };

    return (
      <>
        {filters.length > 0
          ? filters.map((filter, i) => <FilterBadge filter={filter} index={i} key={i} />)
          : null}
      </>
    );
  };

  return (
    <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <GlobalFilterButton />
      </EuiFlexItem>
      {renderFilters()}
      <EuiFlexItem grow={false}>
        <AddFilterButton />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
