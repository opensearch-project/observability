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
  EuiTextColor,
} from '@elastic/eui';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FilterEditPopover } from './filter_edit_popover';
import { getFilterFields, getValidFilterFields } from './filter_helpers';

export interface FilterType {
  field: string;
  operator: string;
  value: any;
  inverted: boolean;
  disabled: boolean;
  custom?: any;
  locked?: boolean;
}

export interface FiltersProps {
  filters: FilterType[];
  setFilters: Dispatch<SetStateAction<FilterType[]>>;
}

interface FiltersOwnProps extends FiltersProps {
  page: 'dashboard' | 'traces' | 'services';
}

export function Filters(props: FiltersOwnProps) {
  // set a filter at an index. if newFilter doesn't exist, remove filter at the index
  // if index doesn't exist, append newFilter to the end
  const setFilter = (newFilter: FilterType, index: number) => {
    const newFilters = [...props.filters];
    if (newFilter) newFilters.splice(index, 1, newFilter);
    else newFilters.splice(index, 1);
    props.setFilters(newFilters);
  };

  const validFilterFields = useMemo(() => getValidFilterFields(props.page), [props.page]);
  const filterFieldOptions = useMemo(
    () => getFilterFields(props.page).map((field) => ({ label: field })),
    [props.page]
  );

  const globalPopoverPanels = [
    {
      id: 0,
      title: 'Change all filters',
      items: [
        {
          name: 'Enable all',
          icon: <EuiIcon type="eye" size="m" />,
          onClick: () => {
            props.setFilters(
              props.filters.map((filter) => ({
                ...filter,
                disabled: filter.locked ? filter.disabled : false,
              }))
            );
          },
        },
        {
          name: 'Disable all',
          icon: <EuiIcon type="eyeClosed" size="m" />,
          onClick: () => {
            props.setFilters(
              props.filters.map((filter) => ({
                ...filter,
                disabled: filter.locked ? filter.disabled : true,
              }))
            );
          },
        },
        {
          name: 'Invert inclusion',
          icon: <EuiIcon type="invert" size="m" />,
          onClick: () => {
            props.setFilters(
              // if filter.custom.query exists, it's a customized filter and "inverted" is alwasy false
              props.filters.map((filter) => ({
                ...filter,
                inverted: filter.locked
                  ? filter.inverted
                  : filter.custom?.query
                  ? false
                  : !filter.inverted,
              }))
            );
          },
        },
        {
          name: 'Invert enabled/disabled',
          icon: <EuiIcon type="eye" size="m" />,
          onClick: () => {
            props.setFilters(
              props.filters.map((filter) => ({
                ...filter,
                disabled: filter.locked ? filter.disabled : !filter.disabled,
              }))
            );
          },
        },
        {
          name: 'Remove all',
          icon: <EuiIcon type="trash" size="m" />,
          onClick: () => {
            props.setFilters([]);
          },
        },
      ],
    },
  ];

  const getFilterPopoverPanels = (
    filter: FilterType,
    index: number,
    closePopover: () => void
  ): EuiContextMenuPanelDescriptor[] => [
    {
      id: 0,
      items: [
        {
          name: 'Edit filter',
          icon: <EuiIcon type="invert" size="m" />,
          disabled: !!filter.custom?.query || validFilterFields.indexOf(filter.field) === -1,
          panel: 1,
        },
        {
          name: `${filter.inverted ? 'Include' : 'Exclude'} results`,
          icon: <EuiIcon type={filter.inverted ? 'plusInCircle' : 'minusInCircle'} size="m" />,
          disabled: !!filter.custom?.query || validFilterFields.indexOf(filter.field) === -1,
          onClick: () => {
            filter.inverted = !filter.inverted;
            setFilter(filter, index);
          },
        },
        {
          name: filter.disabled ? 'Re-enable' : 'Temporarily disable',
          icon: <EuiIcon type={filter.disabled ? 'eye' : 'eyeClosed'} size="m" />,
          disabled: validFilterFields.indexOf(filter.field) === -1,
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
            filterFieldOptions={filterFieldOptions}
            filter={filter}
            index={index}
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
          filterFieldOptions={filterFieldOptions}
          index={props.filters.length}
          setFilter={setFilter}
          closePopover={() => setIsPopoverOpen(false)}
        />
      </EuiPopover>
    );
  };

  const renderFilters = () => {
    const FilterBadge = ({ filter, index }: { filter: FilterType; index: number }) => {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      const disabled = filter.locked || filter.disabled;
      const className =
        'globalFilterItem' +
        (disabled ? ' globalFilterItem-isDisabled' : '') +
        (filter.inverted ? ' globalFilterItem-isExcluded' : '');
      const value =
        typeof filter.value === 'string'
          ? filter.value
          : `${filter.value.from} to ${filter.value.to}`;
      const filterLabel = filter.inverted ? (
        <>
          <EuiTextColor color={disabled ? 'default' : 'danger'}>{'NOT '}</EuiTextColor>
          <EuiTextColor color="default">{`${filter.field}: ${value}`}</EuiTextColor>
        </>
      ) : (
        `${filter.field}: ${value}`
      );

      const badge = (
        <EuiBadge
          className={className}
          onClick={() => setIsPopoverOpen(true)}
          onClickAriaLabel="Open filter settings"
          color={disabled ? '#e7e9f0' : 'hollow'}
          iconType="cross"
          iconSide="right"
          iconOnClick={() => {
            setFilter(null, index);
          }}
          iconOnClickAriaLabel="Remove filter"
        >
          {filterLabel}
        </EuiBadge>
      );
      return (
        <EuiFlexItem grow={false} key={`filter-${index}`}>
          <EuiPopover
            isOpen={isPopoverOpen}
            closePopover={() => setIsPopoverOpen(false)}
            panelPaddingSize="none"
            button={badge}
          >
            <EuiContextMenu
              initialPanelId={0}
              panels={getFilterPopoverPanels(filter, index, () => setIsPopoverOpen(false))}
            />
          </EuiPopover>
        </EuiFlexItem>
      );
    };

    return (
      <>
        {props.filters.length > 0
          ? props.filters.map((filter, i) => <FilterBadge filter={filter} index={i} key={i} />)
          : null}
      </>
    );
  };

  const filterComponents = useMemo(() => renderFilters(), [props.filters]);

  return (
    <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false} style={{ minHeight: 32 }}>
      <EuiFlexItem grow={false}>
        <GlobalFilterButton />
      </EuiFlexItem>
      {filterComponents}
      <EuiFlexItem grow={false}>
        <AddFilterButton />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
