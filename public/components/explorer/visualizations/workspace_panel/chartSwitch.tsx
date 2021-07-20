import './chart_switch.scss';

import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { i18n } from '@osd/i18n';
// import { FormattedMessage } from '@osd/i18n/react';
import {
  EuiPopover,
  EuiPopoverTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiIcon,
  // EuiSelectableMessage
} from '@elastic/eui';
import { ToolbarButton } from '../shared_components/toolbar_button';
// import { LensIconChartBar } from '../assets/chart_bar';
// import { LensIconChartLine } from '../assets/chart_line';

function VisualizationSummary(vis: any) {
  // const visualization = props.visualizationMap[props.visualizationId || ''];

  // if (!visualization) {
  //   return (
  //     <>
  //       {i18n.translate('xpack.lens.configPanel.selectVisualization', {
  //         defaultMessage: 'Select a visualization',
  //       })}
  //     </>
  //   );
  // }

  // const description = visualization.getDescription(props.visualizationState);

  return (
    <>
      
      <EuiIcon size="l" className="lnsChartSwitch__summaryIcon" type={vis.icon} />
      { vis.label }
    </>
  );
}

export const ChartSwitch = ({
  setVis,
  vis,
  visualizationTypes
}: any) => {

  const [flyoutOpen, setFlyoutOpen] = useState<boolean>(false);
  // const [vis, setVis] = useState(visualizationTypes[0]);
  
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
      <EuiPopoverTitle>
        <EuiFlexGroup alignItems="center" responsive={false}>
          <EuiFlexItem>
            {i18n.translate('xpack.lens.configPanel.chartType', {
              defaultMessage: 'Chart type',
            })}
          </EuiFlexItem>
          {/* <EuiFlexItem grow={false}>
            <EuiFieldSearch
              compressed
              fullWidth={false}
              className="lnsChartSwitch__search"
              value={searchTerm}
              data-test-subj="lnsChartSwitchSearch"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </EuiFlexItem> */}
        </EuiFlexGroup>
      </EuiPopoverTitle>
      <EuiKeyPadMenu>
        {(visualizationTypes || []).map((v) => (
          <EuiKeyPadMenuItem
            key={`${v.visualizationId}:${v.id}`}
            label={<span data-test-subj="visTypeTitle">{v.label}</span>}
            title={v.fullLabel}
            role="menuitem"
            data-test-subj={`lnsChartSwitchPopover_${v.id}`}
            // onClick={() => commitSelection(v.selection)}
            onClick={() => { 
              setVis(v);
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
                    defaultMessage: 'Switching to this chart will lose some of the configuration',
                  })
                : undefined
            }
            betaBadgeIconType={v.selection.dataLoss !== 'nothing' ? 'alert' : undefined}
          >
            <EuiIcon className="lnsChartSwitch__chartIcon" type={v.icon || 'empty'} size="l" />
          </EuiKeyPadMenuItem>
        ))}
      </EuiKeyPadMenu>
      {/* {searchTerm && (visualizationTypes || []).length === 0 && (
        <EuiSelectableMessage>
          <FormattedMessage
            id="xpack.lens.chartSwitch.noResults"
            defaultMessage="No results found for {term}."
            values={{
              term: <strong>{searchTerm}</strong>,
            }}
          />
        </EuiSelectableMessage>
      )} */}
    </EuiPopover>
  );

  return (
    <div className="lnsChartSwitch__header">
      { popoverWrappedSwitch }
    </div>
  );
};