/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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
