/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useContext } from 'react';
import {
  EuiTitle,
  EuiComboBox,
  EuiSpacer,
  EuiButton,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
} from '@elastic/eui';
import { useDispatch } from 'react-redux';
import { ConfigTreemapParentFields } from './config_treemap_parents';
import { numericalTypes } from '../../../../../../../../common/constants/explorer';
import { TabContext } from '../../../../../hooks';

export const TreemapConfigPanelItem = ({ fieldOptionList, visualizations, tabID }: any) => {
  const dispatch = useDispatch();
  const { tabId, curVisId, changeVisualizationConfig } = useContext<any>(TabContext);

  const { data } = visualizations;
  const { userConfigs } = data;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const newEntry = { label: '', name: '' };

  const [configList, setConfigList] = useState({
    dimensions: [{ childField: { ...newEntry }, parentFields: [] }],
    metrics: [{ valueField: { ...newEntry } }],
  });

  useEffect(() => {
    if (userConfigs && userConfigs.dataConfig && userConfigs.dataConfig.valueOptions) {
      setConfigList({
        ...userConfigs.dataConfig.valueOptions,
      });
    } else if (data.defaultAxes.xaxis || data.defaultAxes.yaxis) {
      const { xaxis, yaxis } = data.defaultAxes;
      setConfigList({
        dimensions: [{ childField: { ...xaxis[0] }, parentFields: [] }],
        metrics: [{ valueField: { ...yaxis[0] } }],
      });
      dispatch(
        changeVisualizationConfig({
          tabId,
          vizId: curVisId,
          data: {
            ...userConfigs,
            dataConfig: {
              ...userConfigs.dataConfig,
              valueOptions: {
                dimensions: [{ childField: { ...xaxis[0] }, parentFields: [] }],
                metrics: [{ valueField: { ...yaxis[0] } }],
              },
            },
          },
        })
      );
    }
  }, [
    data.defaultAxes,
    data.rawVizData?.[visualizations.vis.name]?.dataConfig,
    visualizations.vis.name,
  ]);

  const updateList = (configName: string, fieldName: string, value: string | any[]) => {
    let list = { ...configList };
    let listItem = { ...list[configName][0] };

    const newField = {
      label: value,
      name: value,
      type: value !== '' ? fields.find((x) => x.name === value)?.type : '',
    };
    listItem = { ...listItem, [fieldName]: typeof value === 'string' ? newField : value };
    const newList = {
      ...list,
      [configName]: [listItem],
    };
    setConfigList(newList);
  };

  const updateChart = () => {
    dispatch(
      changeVisualizationConfig({
        tabId,
        vizId: curVisId,
        data: {
          ...userConfigs,
          dataConfig: {
            ...userConfigs.dataConfig,
            valueOptions: {
              dimensions: configList.dimensions,
              metrics: configList.metrics,
            },
          },
        },
      })
    );
  };

  const getOptionsAvailable = (sectionName: string) => {
    const { dimensions, metrics } = configList;
    let selectedFields = {};
    let allSelectedFields = [];

    for (const key in configList) {
      if (key === 'dimensions') {
        const [dimElements] = dimensions;
        const { childField, parentFields } = dimElements;
        allSelectedFields = [childField, ...parentFields];
      } else if (key === 'metrics') {
        const [metricsElement] = metrics;
        allSelectedFields = [metricsElement.valueField];
      }
      const allValidSelectedFields = allSelectedFields.filter((item) => item?.label);
      allValidSelectedFields.length > 0 &&
        allValidSelectedFields.forEach((field) => (selectedFields[field.label] = true));
    }

    const unselectedFields = fieldOptionList.filter((field) => !selectedFields[field.label]);
    return sectionName === 'metrics'
      ? unselectedFields.filter((field) => numericalTypes.includes(field.type))
      : unselectedFields;
  };

  return (
    <div style={{ height: 'auto' }}>
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
              options={getOptionsAvailable('dimensions')}
              selectedOptions={
                configList.dimensions[0].childField?.label !== ''
                  ? [{ label: configList.dimensions[0].childField?.label }]
                  : []
              }
              singleSelection={{ asPlainText: true }}
              onChange={(val) =>
                updateList('dimensions', 'childField', val.length > 0 ? val[0].label : '')
              }
            />
          </EuiFormRow>

          <EuiSpacer size="s" />
          <ConfigTreemapParentFields
            dropdownList={getOptionsAvailable('dimensions').map((opt) => ({
              label: opt.label,
              name: opt.label,
            }))}
            selectedAxis={configList.dimensions[0]?.parentFields}
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
              options={getOptionsAvailable('metrics')}
              selectedOptions={
                configList.metrics[0].valueField?.label !== ''
                  ? [{ label: configList.metrics[0].valueField?.label }]
                  : []
              }
              singleSelection={{ asPlainText: true }}
              onChange={(val) =>
                updateList('metrics', 'valueField', val.length > 0 ? val[0].label : '')
              }
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
    </div>
  );
};
