/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './chart_switch.scss';

import React, { useState } from 'react';
import { i18n } from '@osd/i18n';
import {
  EuiPopover,
  EuiPopoverTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiIcon,
} from '@elastic/eui';
import { ToolbarButton } from '../shared_components/toolbar_button';
import { getPlotlyCategory } from '../../../visualizations/charts/shared/shared_configs';

function VisualizationSummary(vis: any) {
  return (
    <>
      <EuiIcon size="l" className="lnsChartSwitch__summaryIcon" type={vis.icon} />
      {vis.label}
    </>
  );
}

const VIS_CATEGORY = getPlotlyCategory('list');

export const ChartSwitch = ({ setVis, vis, visualizationTypes }: any) => {
  const [flyoutOpen, setFlyoutOpen] = useState<boolean>(false);

  const popoverWrappedSwitch = (
    <EuiPopover
      id="lnsChartSwitchPopover"
      ownFocus
      initialFocus=".lnsChartSwitch__popoverPanel"
      panelClassName="lnsChartSwitch__popoverPanel"
      panelPaddingSize="s"
      button={
        <ToolbarButton
          onClick={() => setFlyoutOpen(!flyoutOpen)}
          data-test-subj="lnsChartSwitchPopover"
          fontWeight="bold"
        >
          <VisualizationSummary {...vis} />
        </ToolbarButton>
      }
      isOpen={flyoutOpen}
      closePopover={() => setFlyoutOpen(false)}
      anchorPosition="downLeft"
    >
      {VIS_CATEGORY.map((vis_category) => {
        return (
          <>
            <EuiPopoverTitle>
              <EuiFlexGroup alignItems="center" responsive={false}>
                <EuiFlexItem>
                  {i18n.translate('xpack.lens.configPanel.chartType', {
                    defaultMessage: `${vis_category}`,
                    // defaultMessage: 'Basics',
                  })}
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPopoverTitle>
            <EuiKeyPadMenu>
              {visualizationTypes
                .filter((v) => vis_category === v.category)
                .map((v) => (
                  <EuiKeyPadMenuItem
                    key={`${v.visualizationId}:${v.id}`}
                    label={<span data-test-subj="visTypeTitle">{v.label}</span>}
                    title={v.fullLabel}
                    role="menuitem"
                    data-test-subj={`lnsChartSwitchPopover_${v.id}`}
                    onClick={() => {
                      setVis(v.id);
                      setFlyoutOpen(false);
                    }}
                    betaBadgeLabel={
                      v.selection.dataLoss !== 'nothing'
                        ? i18n.translate('xpack.lens.chartSwitch.dataLossLabel', {
                            defaultMessage: 'Data loss',
                          })
                        : undefined
                    }
                    betaBadgeTooltipContent={
                      v.selection.dataLoss !== 'nothing'
                        ? i18n.translate('xpack.lens.chartSwitch.dataLossDescription', {
                            defaultMessage:
                              'Switching to this chart will lose some of the configuration',
                          })
                        : undefined
                    }
                    betaBadgeIconType={v.selection.dataLoss !== 'nothing' ? 'alert' : undefined}
                  >
                    <EuiIcon
                      className="lnsChartSwitch__chartIcon"
                      type={v.icon || 'empty'}
                      size="l"
                    />
                  </EuiKeyPadMenuItem>
                ))}
            </EuiKeyPadMenu>
          </>
        );
      })}
    </EuiPopover>
  );

  return <div className="lnsChartSwitch__header">{popoverWrappedSwitch}</div>;
};
