/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiPopover,
  EuiIcon,
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '@elastic/eui';

// pagination
import ReactPaginate from 'react-paginate';

// theme
import { uiSettingsService } from '../../../../../common/utils';

// constants
import {
  GRID_PAGE_RANGE_DISPLAY,
  GRID_PAGE_SIZES,
} from '../../../../../common/constants/explorer';

export const GridFooter = ({
  onPageSizeChanged,
  pageSize,
  activePage,
  goToPage,
  pageCount,
}: {
  onPageSizeChanged: (val: number) => void;
  goToPage: ({ selected }: { selected: number }) => void;
  pageSize: number;
  activePage: number;
  pageCount: number;
}) => {
  return (
    <EuiFlexGroup
      responsive
      gutterSize="none"
      justifyContent="spaceBetween"
      style={{ paddingTop: '10px', position: 'relative' }}
    >
      <EuiFlexItem grow={false}>
        <PageSizePopover onPageSizeChanged={onPageSizeChanged} pageSize={pageSize} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <ReactPaginate
          containerClassName={
            uiSettingsService.get('theme:darkMode')
              ? `custom-pagination-container dark-theme`
              : `custom-pagination-container`
          }
          breakLabel="..."
          nextLabel={<EuiIcon type="arrowRight" />}
          forcePage={activePage}
          onPageChange={goToPage}
          pageRangeDisplayed={GRID_PAGE_RANGE_DISPLAY}
          pageCount={pageCount}
          previousLabel={<EuiIcon type="arrowLeft" />}
          renderOnZeroPageCount={null}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export const PageSizePopover = ({
  onPageSizeChanged,
  pageSize,
}: {
  onPageSizeChanged: (size: number) => void;
  pageSize: number;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconSize="s"
      color="text"
      size="s"
      aria-label="Next"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
    >
      Rows per page: {pageSize}
    </EuiButtonEmpty>
  );

  const items = () => {
    return GRID_PAGE_SIZES.map((i: number) => (
      <EuiContextMenuItem
        layoutAlign="bottom"
        key={`${i}_rows`}
        icon={i === pageSize ? 'check' : 'empty'}
        onClick={() => {
          onPageSizeChanged(i);
          closePopover();
        }}
      >
        {i} rows
      </EuiContextMenuItem>
    ));
  };

  return (
    <EuiPopover
      id="singlePanel"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel items={items()} />
    </EuiPopover>
  );
};
