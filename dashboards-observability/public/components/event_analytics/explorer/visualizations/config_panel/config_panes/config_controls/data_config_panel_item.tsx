/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useContext, useEffect, useState } from 'react';
import { EuiTitle, EuiComboBox, EuiSpacer, EuiButton, EuiFieldText, EuiFlexItem, EuiFormRow, EuiIcon, EuiPanel, EuiText } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { render as renderExplorerVis, selectExplorerVisualization } from '../../../../../../event_analytics/redux/slices/visualization_slice';
import { AGGREGATION_OPTIONS } from '../../../../../../../../common/constants/explorer';
import { ButtonGroupItem } from './config_button_group';
import { visChartTypes } from '../../../../../../../../common/constants/shared';
import { TabContext } from '../../../../../hooks';
export const DataConfigPanelItem = ({
  fieldOptionList,
  visualizations,
}: any) => {
  const dispatch = useDispatch();
  const { tabId } = useContext<any>(TabContext);
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabId];

  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const newEntry = { label: "", aggregation: "", custom_label: "", name: "", side: "right" };

  const [configList, setConfigList] = useState({
    dimensions: [{ ...newEntry }],
    metrics: [{ ...newEntry }],
  });

  useEffect(() => {
    if (data.rawVizData?.dataConfig) {
      setConfigList({
        ...data.rawVizData.dataConfig
      })
    } else if (data.defaultAxes.xaxis || data.defaultAxes.yaxis) {
      const { xaxis, yaxis } = data.defaultAxes;
      setConfigList({
        dimensions: [...xaxis && xaxis],
        metrics: [...yaxis && yaxis],
      })
    }
  }, [data.defaultAxes, data.rawVizData?.dataConfig]);

  const updateList = (value: string, index: number, name: string, field: string) => {
    let list = { ...configList };
    let listItem = { ...list[name][index] };
    listItem = { ...listItem, [field]: value };
    const newList = {
      ...list,
      [name]: [
        ...list[name].slice(0, index),
        listItem,
        ...list[name].slice(index + 1, list[name].length),
      ],
    };
    setConfigList(newList);
  }

  const handleServiceRemove = (index: number, name: string) => {
    const list = { ...configList };
    const arr = [...list[name]];
    arr.splice(index, 1);
    const y = { ...list, [name]: arr }
    setConfigList(y);
  };

  const handleServiceAdd = (name: string) => {
    let newList = { ...configList, [name]: [...configList[name], newEntry] }
    setConfigList(newList);
  };

  const updateChart = () => {
    dispatch(
      renderExplorerVis({
        tabId: tabId,
        data: {
          ...explorerVisualizations,
          dataConfig: {
            metrics: configList.metrics,
            dimensions: configList.dimensions
          }
        }
      })
    );
  }

  const isPositionButtonAllow = (sectionName: string) => sectionName === 'metrics' && (visualizations.vis.name === visChartTypes.Line || visualizations.vis.name === visChartTypes.Bar);

  const getCommonUI = (lists, sectionName: string) => lists.map((singleField, index: number) => (
    <>
      <div key={index} className="services">
        <div className="first-division">
          <EuiPanel color="subdued">
            <EuiFormRow
              label="Aggregation"
              labelAppend={
                lists.length !== 1 && (
                  <EuiText size="xs">
                    <EuiIcon
                      type="cross"
                      color="danger"
                      onClick={() => handleServiceRemove(index, sectionName)}
                    />
                  </EuiText>
                )
              }
            >
              <EuiComboBox
                aria-label="Accessible screen reader label"
                placeholder="Select a aggregation"
                singleSelection={{ asPlainText: true }}
                options={AGGREGATION_OPTIONS}
                selectedOptions={singleField.aggregation ? [{ 'label': singleField.aggregation }] : []}
                onChange={(e) => updateList(e.length > 0 ? e[0].label : '', index, sectionName, 'aggregation')}

              />

            </EuiFormRow>
            <EuiFormRow
              label="Field"
            >
              <EuiComboBox
                aria-label="Accessible screen reader label"
                placeholder="Select a field"
                singleSelection={{ asPlainText: true }}
                options={fieldOptionList}
                selectedOptions={singleField.label ? [{ 'label': singleField.label }] : []}
                onChange={(e) => updateList(e.length > 0 ? e[0].label : '', index, sectionName, 'label')}
              />
            </EuiFormRow>

            <EuiFormRow
              label="Custom label"
            >
              <EuiFieldText
                placeholder="Custom label"
                value={singleField.custom_label}
                onChange={(e) => updateList(e.target.value, index, sectionName, 'custom_label')}
                aria-label="Use aria labels when no actual label is in use" />
            </EuiFormRow>

            {isPositionButtonAllow(sectionName) && (
              <EuiFormRow label="Side">
                <ButtonGroupItem
                  legend="Side"
                  groupOptions={[{ id: 'left', label: 'Left' }, { id: 'right', label: 'Right' }]}
                  idSelected={singleField.side || 'right'}
                  handleButtonChange={(id: string) => updateList(id, index, sectionName, 'side')}
                />
              </EuiFormRow>
            )}

            <EuiSpacer size="s" />
            {lists.length - 1 === index &&
              <EuiFlexItem grow>
                <EuiButton fullWidth iconType="plusInCircleFilled" color='primary' onClick={() => handleServiceAdd(sectionName)}>
                  Add
                </EuiButton>
              </EuiFlexItem>
            }
          </EuiPanel>
        </div>
      </div>
      <EuiSpacer size="s" />
    </>
  ))

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Cofigurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Dimensions</h3>
      </EuiTitle>
      {getCommonUI(configList.dimensions, 'dimensions')}

      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Metrics</h3>
      </EuiTitle>
      {getCommonUI(configList.metrics, 'metrics')}

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
