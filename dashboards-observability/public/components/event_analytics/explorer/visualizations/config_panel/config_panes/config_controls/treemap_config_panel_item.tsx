/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  EuiTitle,
  EuiComboBox,
  EuiSpacer,
  EuiButton,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
} from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import {
  render as renderExplorerVis,
  selectExplorerVisualization,
} from '../../../../../../event_analytics/redux/slices/visualization_slice';
import { ConfigTreemapParentFields } from './config_treemap_parents';

export const TreemapConfigPanelItem = ({ fieldOptionList, visualizations, tabID }: any) => {
  const dispatch = useDispatch();
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabID];

  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const newEntry = { label: '', name: '' };

  const [configList, setConfigList] = useState({
    dimensions: [{ childField: { ...newEntry }, parentFields: [] }],
    metrics: [{ valueField: { ...newEntry } }],
  });

  useEffect(() => {
    if (data.rawVizData?.dataConfig) {
      setConfigList({
        ...data.rawVizData?.dataConfig,
      });
    } else if (data.defaultAxes.xaxis || data.defaultAxes.yaxis) {
      const { xaxis, yaxis } = data.defaultAxes;
      setConfigList({
        dimensions: [{ childField: { ...xaxis[0] }, parentFields: [] }],
        metrics: [{ valueField: { ...yaxis[0] } }],
      });
    }
  }, [data.defaultAxes, data.rawVizData?.dataConfig]);

  const updateList = (configName: string, fieldName: string, field) => {
    let list = { ...configList };
    let listItem = { ...list[configName][0] };
    listItem = { ...listItem, [fieldName]: field };
    const newList = {
      ...list,
      [configName]: [listItem],
    };
    setConfigList(newList);
  };

  const updateChart = () => {
    dispatch(
      renderExplorerVis({
        tabId: tabID,
        data: {
          ...explorerVisualizations,
          dataConfig: {
            metrics: configList.metrics,
            dimensions: configList.dimensions,
          },
        },
      })
    );
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Configurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Dimensions</h3>
      </EuiTitle>
      <div className="first-division">
        <EuiPanel color="subdued">
          <EuiFormRow label="Child Field">
            <EuiComboBox
              placeholder="Select a field"
              options={fieldOptionList}
              selectedOptions={[configList.dimensions[0].childField]}
              singleSelection={{ asPlainText: true }}
              onChange={(val) => updateList('dimensions', 'childField', val[0])}
            />
          </EuiFormRow>

          <EuiSpacer size="s" />
          <ConfigTreemapParentFields
            dropdownList={fieldOptionList.map((opt) => ({ label: opt.label, name: opt.label }))}
            selectedAxis={configList.dimensions[0].parentFields}
            onSelectChange={(val) => updateList('dimensions', 'parentFields', val)}
          />
          <EuiSpacer size="s" />
        </EuiPanel>
      </div>
      <EuiTitle size="xxs">
        <h3>Metrics</h3>
      </EuiTitle>
      <div className="first-division">
        <EuiPanel color="subdued">
          <EuiFormRow label="Value Field">
            <EuiComboBox
              placeholder="Select a field"
              options={fieldOptionList}
              selectedOptions={[configList.metrics[0].valueField]}
              singleSelection={{ asPlainText: true }}
              onChange={(val) => updateList('metrics', 'valueField', val[0])}
            />
          </EuiFormRow>
        </EuiPanel>
      </div>
      <EuiSpacer size="s" />
      <EuiSpacer size="s" />
      <EuiFlexItem grow={false}>
        <EuiButton
          data-test-subj="visualizeEditorRenderButton"
          iconType="play"
          onClick={updateChart}
          size="s"
        >
          Update chart
        </EuiButton>
      </EuiFlexItem>
    </>
  );
};
