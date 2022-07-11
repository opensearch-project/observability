/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ReactChildren, ReactChild } from 'react';
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiPopover,
  EuiSwitch,
  EuiIcon,
} from '@elastic/eui';

// theme
import { uiSettingsService } from '../../../../../common/utils';

// constants
import {
  GRID_HEADER_COLUMN_MAX_WIDTH,
  ROW_DENSITIES,
} from '../../../../../common/constants/explorer';

export interface RowConfigType {
  icon: string;
  height: number;
  selected: boolean;
}

export const CustomOverlay = ({
  children,
}: {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}) => {
  return (
    <div
      className={
        uiSettingsService.get('theme:darkMode')
          ? 'custom-overlay custom-overlay-dark'
          : 'custom-overlay custom-overlay-light'
      }
    >
      {children}
    </div>
  );
};

export const GridHeader = ({
  isFullScreen,
  setIsFullScreenHandler,
  selectedRowDensity,
  selectDensityHandler,
  columnVisiblityHandler,
  columns,
  columnVisibility,
}: {
  isFullScreen: boolean;
  setIsFullScreenHandler: (v: boolean) => void;
  selectedRowDensity: any;
  selectDensityHandler: (v: RowConfigType) => void;
  columnVisiblityHandler: (visible: boolean, field: string) => void;
  columns: any;
  columnVisibility: any;
}) => {
  return (
    <EuiFlexGroup
      responsive
      gutterSize="none"
      justifyContent="flexStart"
      style={{ position: 'relative' }}
    >
      <EuiFlexItem style={{ maxWidth: GRID_HEADER_COLUMN_MAX_WIDTH }}>
        <DensityPopover
          selectedDensity={selectedRowDensity}
          selectDensityHandler={selectDensityHandler}
        />
      </EuiFlexItem>
      <EuiFlexItem style={{ maxWidth: GRID_HEADER_COLUMN_MAX_WIDTH }}>
        <ColumnVisiblityPopover
          columnVisiblityHandler={columnVisiblityHandler}
          columns={columns}
          columnVisibility={columnVisibility}
        />
      </EuiFlexItem>
      <EuiFlexItem style={{ maxWidth: GRID_HEADER_COLUMN_MAX_WIDTH }}>
        <EuiButtonEmpty
          iconSize="s"
          color="text"
          aria-label="Next"
          iconType="fullScreen"
          onClick={() => setIsFullScreenHandler(true)}
        >
          Full screen
        </EuiButtonEmpty>
      </EuiFlexItem>
      {isFullScreen && (
        <EuiIcon
          type="cross"
          onClick={() => setIsFullScreenHandler(false)}
          style={{ position: 'absolute', right: 20, cursor: 'pointer', top: 20 }}
        />
      )}
    </EuiFlexGroup>
  );
};

export const DensityPopover = ({
  selectDensityHandler,
  selectedDensity,
}: {
  selectedDensity: any;
  selectDensityHandler: (data: RowConfigType) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconSize="s"
      color="text"
      aria-label="Next"
      iconType={selectedDensity.icon}
      onClick={onButtonClick}
    >
      Density
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover button={button} isOpen={isPopoverOpen} closePopover={closePopover}>
      <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
        {ROW_DENSITIES.map((i: RowConfigType, index: number) => (
          <EuiFlexItem key={index} grow={false}>
            <EuiButtonIcon
              onClick={() => selectDensityHandler(i)}
              display={selectedDensity.icon === i.icon ? 'fill' : 'base'}
              iconType={i.icon}
              aria-label="Next"
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </EuiPopover>
  );
};

export const ColumnVisiblityPopover = ({
  columnVisibility,
  columns,
  columnVisiblityHandler,
}: {
  columns: any;
  columnVisibility: any;
  columnVisiblityHandler: (visible: boolean, field: string) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconSize="s"
      color="text"
      aria-label="Next"
      iconType="listAdd"
      onClick={onButtonClick}
    >
      Columns
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover button={button} isOpen={isPopoverOpen} closePopover={closePopover}>
      <EuiFlexGroup gutterSize="s" direction="column">
        {columns.map((i: any, index: number) => {
          return (
            <EuiFlexItem key={index} grow={false}>
              <EuiSwitch
                label={i.field}
                checked={!columnVisibility.includes(i.field)}
                onChange={(e) => {
                  columnVisiblityHandler(e.target.checked, i.field);
                }}
                compressed
              />
            </EuiFlexItem>
          );
        })}
      </EuiFlexGroup>
    </EuiPopover>
  );
};
