/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './workspace_panel_wrapper.scss';

import React from 'react';
import { i18n } from '@osd/i18n';
import classNames from 'classnames';
import { EuiPageContent, EuiPageContentBody, EuiPageContentHeader, EuiSpacer } from '@elastic/eui';

export function WorkspacePanelWrapper({ children, title, emptyExpression }: any) {
  return (
    <>
      <EuiSpacer size="s" />
      <EuiPageContent className="lnsWorkspacePanelWrapper">
        {(!emptyExpression || title) && (
          <EuiPageContentHeader
            className={classNames('lnsWorkspacePanelWrapper__pageContentHeader', {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'lnsWorkspacePanelWrapper__pageContentHeader--unsaved': !title,
            })}
          >
            <span data-test-subj="lns_ChartTitle">
              {title ||
                i18n.translate('xpack.lens.chartTitle.unsaved', { defaultMessage: 'Unsaved' })}
            </span>
          </EuiPageContentHeader>
        )}
        <EuiPageContentBody className="lnsWorkspacePanelWrapper__pageContentBody">
          {children}
        </EuiPageContentBody>
      </EuiPageContent>
    </>
  );
}
