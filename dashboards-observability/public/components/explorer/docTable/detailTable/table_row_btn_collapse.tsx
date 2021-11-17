/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
 
import React from 'react';
import { i18n } from '@osd/i18n';
import { EuiToolTip, EuiButtonIcon } from '@elastic/eui';

export interface Props {
  onClick: () => void;
  isCollapsed: boolean;
}

export function DocViewTableRowBtnCollapse({ onClick, isCollapsed }: Props) {
  const label = i18n.translate('discover.docViews.table.toggleFieldDetails', {
    defaultMessage: 'Toggle field details',
  });
  return (
    <EuiToolTip content={label}>
      <EuiButtonIcon
        aria-expanded={!isCollapsed}
        aria-label={label}
        data-test-subj="collapseBtn"
        onClick={() => onClick()}
        iconType={isCollapsed ? 'arrowRight' : 'arrowDown'}
        iconSize={'s'}
      />
    </EuiToolTip>
  );
}
