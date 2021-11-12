/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EuiFlexItem, EuiPopover, EuiIcon, EuiPopoverTitle, IconType } from '@elastic/eui';
import { ToolbarButton, ToolbarButtonProps } from './toolbar_button';
import { EuiIconLegend } from '../assets/legend';

const typeToIconMap: { [type: string]: string | IconType } = {
  legend: EuiIconLegend as IconType,
  values: 'visText',
};

export interface ToolbarPopoverProps {
  /**
   * Determines popover title
   */
  title: string;
  /**
   * Determines the button icon
   */
  type: 'legend' | 'values' | IconType;
  /**
   * Determines if the popover is disabled
   */
  isDisabled?: boolean;
  /**
   * Button group position
   */
  groupPosition?: ToolbarButtonProps['groupPosition'];
  buttonDataTestSubj?: string;
}

export const ToolbarPopover: React.FunctionComponent<ToolbarPopoverProps> = ({
  children,
  title,
  type,
  isDisabled = false,
  groupPosition,
  buttonDataTestSubj,
}) => {
  const [open, setOpen] = useState(false);

  const iconType: string | IconType = typeof type === 'string' ? typeToIconMap[type] : type;
  
  return (
    <EuiFlexItem grow={false}>
      <EuiPopover
        panelClassName="lnsXyToolbar__popover"
        ownFocus
        aria-label={title}
        button={
          <ToolbarButton
            fontWeight="normal"
            onClick={() => {
              setOpen(!open);
            }}
            title={title}
            hasArrow={false}
            isDisabled={isDisabled}
            groupPosition={groupPosition}
            dataTestSubj={buttonDataTestSubj}
          >
            { title }
            <EuiIcon type="arrowDown" />
          </ToolbarButton>
        }
        isOpen={open}
        closePopover={() => {
          setOpen(false);
        }}
        anchorPosition="downRight"
      >
        <EuiPopoverTitle>{title}</EuiPopoverTitle>
        {children}
      </EuiPopover>
    </EuiFlexItem>
  );
};
