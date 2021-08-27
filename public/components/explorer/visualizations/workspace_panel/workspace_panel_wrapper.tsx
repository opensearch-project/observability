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

import React, { useState } from 'react';
import { i18n } from '@osd/i18n';
import classNames from 'classnames';
import {
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiButton,
  EuiButtonEmpty,
  EuiPopoverFooter,
  EuiPopoverTitle
} from '@elastic/eui';
import { ChartSwitch } from './chart_switch';
import { SavePanel } from '../shared_components/save_panel'

export function WorkspacePanelWrapper({
  children,
  title,
  emptyExpression,
  setVis,
  vis,
  visualizationTypes
}: any) {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  const button = (
    <EuiButton 
      iconType="arrowDown" 
      iconSide="right" 
      onClick={onButtonClick}
      size="s"
    >
      Save
    </EuiButton>
  );

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
          <EuiFlexItem grow={false}>
            <EuiPopover
              button={button}
              isOpen={isPopoverOpen}
              closePopover={closePopover}>
              <EuiPopoverTitle>{"Save to..."}</EuiPopoverTitle>
              <SavePanel />
              <EuiPopoverFooter>
                <EuiFlexGroup
                  justifyContent="flexEnd"
                >
                  <EuiFlexItem grow={false}>
                    <EuiButtonEmpty
                      size="s"
                      onClick={() => {}}>
                      Cancel
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      size="s"
                      fill
                      onClick={() => {}}>
                      Save
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPopoverFooter>
            </EuiPopover>
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
