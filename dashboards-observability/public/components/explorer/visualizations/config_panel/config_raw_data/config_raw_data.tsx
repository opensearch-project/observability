/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useContext } from 'react';
import { EuiForm, EuiSpacer, EuiTabbedContent } from '@elastic/eui';
import { EuiInMemoryTable } from '@elastic/eui';
import { PanelItem } from '../configPanelItem';
import { PlotlyVizEditor } from '../../shared_components/plotly_viz_editor';
// import { ConfigPanelItems } from '../configPanelItem';

export const VizDataMappingPanel = ({
  spec,
  onConfigUpdate,
  setToast,
  vizVectors,
  columns,
  customVizConfigs,
  xaxis,
  yaxis,
}: any) => {
  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const [hjsonConfig, setHjsonConfig] = useState(spec);
  const panelItems = [
    {
      paddingTitle: 'X-axis',
      advancedTitle: 'Advanced',
      dropdownList: xaxis?.fields,
    },
    {
      paddingTitle: 'Y-axis',
      advancedTitle: 'Advanced',
      dropdownList: yaxis?.fields,
    },
  ];

  const ConfigPanelItems = (props) => {
    const { panelItems } = props;
    return (
      <EuiForm className="lnsConfigPanel">
        {panelItems.map((item, index) => {
          return (
            <section key={index}>
              <PanelItem
                paddingTitle={item.paddingTitle}
                advancedTitle={item.advancedTitle}
                dropdownList={item.dropdownList}
              >
                here goes advanced setting
              </PanelItem>
              <EuiSpacer size="s" />
            </section>
          );
        })}
      </EuiForm>
    );
  };
  return (
    <>
      <ConfigPanelItems panelItems={panelItems} />
      {/* <EuiInMemoryTable
        items={vizVectors.map((row, index) => {
          return {
            ...row,
            index,
          };
        })}
        columns={columns.map((col) => {
          return {
            field: col.name,
            name: col.name,
            sortable: true,
            truncateText: true,
          };
        })}
        pagination={pagination}
        tableCaption="Query data"
      /> */}
    </>
  );
};
