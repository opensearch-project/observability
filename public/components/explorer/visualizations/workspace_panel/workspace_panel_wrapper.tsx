/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import './workspace_panel_wrapper.scss';

import React from 'react';
import { i18n } from '@osd/i18n';
import classNames from 'classnames';
import {
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { ChartSwitch } from './chart_switch';

export function WorkspacePanelWrapper({
  children,
  title,
  emptyExpression,
  setVis,
  vis,
  visualizationTypes,
}: any) {

  return (
    <>
      <div>
        <EuiFlexGroup
          gutterSize="m"
          direction="row"
          responsive={false}
          wrap={true}
          className="lnsWorkspacePanelWrapper__toolbar"
          justifyContent="spaceBetween"
        >
          <EuiFlexItem grow={false}>
            <ChartSwitch
              data-test-subj="lnsChartSwitcher"
              setVis={ setVis }
              vis={ vis }
              visualizationTypes={ visualizationTypes }
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
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
