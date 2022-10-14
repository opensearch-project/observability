/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
  htmlIdGenerator,
} from '@elastic/eui';
import { uniqueId } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  CHILDFIELD,
  AGGREGATIONS,
  GROUPBY,
  NUMERICAL_TYPES,
  PARENTFIELDS,
  VALUEFIELD,
} from '../../../../../../../../common/constants/explorer';
import { TabContext } from '../../../../../hooks';
import { ConfigTreemapParentFields } from './config_treemap_parents';
import { DataConfigItemClickPanel } from './data_config_item_click_panel';
import {
  DataConfigPanelProps,
  ParentUnitType,
} from '../../../../../../../../common/types/explorer';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';

export const TreemapConfigPanelItem = ({
  fieldOptionList,
  visualizations,
}: DataConfigPanelProps) => {
  const dispatch = useDispatch();
  const { tabId, curVisId, changeVisualizationConfig } = useContext<{
    [key: string]: string | VIS_CHART_TYPES | ActionCreatorWithPayload<string, string>;
  }>(TabContext);

  const { data } = visualizations;
  const { userConfigs } = data;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const newEntry = { label: '', name: '' };
  const initialParentState = {
    name: '',
    label: '',
    type: '',
  };
  const [configList, setConfigList] = useState({
    [GROUPBY]: [{ childField: { ...newEntry }, parentFields: [] }],
    [AGGREGATIONS]: [{ valueField: { ...newEntry } }],
  });
  const [selectedParentItem, setSelectedParentItem] = useState<{
    isClicked: boolean;
    index: number;
  }>({ isClicked: false, index: -1 });

  useEffect(() => {
    if (userConfigs && userConfigs.dataConfig) {
      setConfigList({
        ...userConfigs.dataConfig,
      });
    }
  }, [userConfigs?.dataConfig, visualizations.vis.name]);

  const updateList = (configName: string, fieldName: string, value: string | any[]) => {
    let listItem = { ...configList[configName][0] };

    const newField = {
      label: value,
      name: value,
      type: value !== '' ? fields.find((x) => x.name === value)?.type : '',
    };
    listItem = { ...listItem, [fieldName]: typeof value === 'string' ? newField : value };
    const newList = {
      ...configList,
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
            [GROUPBY]: configList[GROUPBY],
            [AGGREGATIONS]: configList[AGGREGATIONS],
          },
        },
      })
    );
  };

  const getOptionsAvailable = (sectionName: string) => {
    const { dimensions, series } = configList;
    const selectedFields = {};
    let allSelectedFields = [];

    for (const key in configList) {
      if (key === GROUPBY) {
        const [dimElements] = dimensions;
        const { childField, parentFields } = dimElements;
        allSelectedFields = [childField, ...parentFields];
      } else if (key === AGGREGATIONS) {
        const [seriesElement] = series;
        allSelectedFields = [seriesElement.valueField];
      }
      const allValidSelectedFields = allSelectedFields.filter((item) => item?.label);
      allValidSelectedFields.length > 0 &&
        allValidSelectedFields.forEach((field) => (selectedFields[field.label] = true));
    }

    const unselectedFields = fieldOptionList.filter((field) => !selectedFields[field.label]);
    return sectionName === AGGREGATIONS
      ? unselectedFields.filter((field) => NUMERICAL_TYPES?.includes(field.type))
      : unselectedFields;
  };

  const options = getOptionsAvailable(GROUPBY).map((opt) => ({
    label: opt.label,
    name: opt.name,
  }));

  const renderParentPanel = () => {
    const selectedAxis = configList.dimensions[0]?.parentFields;
    const { index } = selectedParentItem;
    return (
      <>
        <DataConfigItemClickPanel
          isSecondary
          title={`Parent ${index + 1}`}
          closeMenu={() => isHandlePanelClickBack(selectedAxis)}
        />
        <EuiComboBox
          id={htmlIdGenerator('axis-select-')}
          placeholder="Select a field"
          options={options}
          selectedOptions={selectedAxis[index].label !== '' ? [selectedAxis[index]] : []}
          isClearable
          singleSelection={{ asPlainText: true }}
          onChange={handleParentChange}
          aria-label="Parent field"
        />
      </>
    );
  };

  /**
   * Update DataConfiguration of parent fields list.
   * @param arr list to be updated
   */
  const handleUpdateParentFields = (arr: ParentUnitType[]) =>
    updateList(GROUPBY, PARENTFIELDS, arr);

  /**
   * function changes the value in parent input field.
   * @param value updated value
   */
  const handleParentChange = (values: Array<EuiComboBoxOptionOption<unknown>>) => {
    const selectedAxis = configList.dimensions[0]?.parentFields;
    const { index } = selectedParentItem;
    const val = [
      ...selectedAxis.slice(0, index),
      (values[0] as ParentUnitType) ?? initialParentState,
      ...selectedAxis.slice(index + 1, selectedAxis.length),
    ];
    handleUpdateParentFields(val);
  };

  /**
   * Changes the array when back button in Data Config panel is clicked.
   * @param parentArray updated array of parent fields.
   */
  const isHandlePanelClickBack = (parentArray: ParentUnitType[]) => {
    const { index } = selectedParentItem;
    if (parentArray[index].name === '') {
      const arr = [
        ...parentArray.slice(0, index),
        ...parentArray.slice(index + 1, parentArray.length),
      ];
      handleUpdateParentFields(arr);
    }
    setSelectedParentItem({ isClicked: false, index: -1 });
  };

  return selectedParentItem.isClicked ? (
    renderParentPanel()
  ) : (
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
              options={getOptionsAvailable(GROUPBY)}
              selectedOptions={
                configList.dimensions[0].childField?.label !== ''
                  ? [{ label: configList.dimensions[0].childField?.label }]
                  : []
              }
              singleSelection={{ asPlainText: true }}
              onChange={(val) =>
                updateList(GROUPBY, CHILDFIELD, val.length > 0 ? val[0].label : '')
              }
            />
          </EuiFormRow>

          <EuiSpacer size="s" />
          <EuiTitle size="xxxs">
            <h3>Parent Fields</h3>
          </EuiTitle>
          <ConfigTreemapParentFields
            selectedAxis={configList.dimensions[0]?.parentFields}
            handleUpdateParentFields={handleUpdateParentFields}
            setSelectedParentItem={setSelectedParentItem}
          />
          <EuiSpacer size="s" />
        </EuiPanel>
      </div>
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Metrics</h3>
      </EuiTitle>
      <div className="first-division">
        <EuiPanel color="subdued">
          <EuiFormRow label="Value Field">
            <EuiComboBox
              placeholder="Select a field"
              options={getOptionsAvailable(AGGREGATIONS)}
              selectedOptions={
                configList[AGGREGATIONS][0].valueField?.label !== ''
                  ? [{ label: configList[AGGREGATIONS][0].valueField?.label }]
                  : []
              }
              singleSelection={{ asPlainText: true }}
              onChange={(val) =>
                updateList(AGGREGATIONS, VALUEFIELD, val.length > 0 ? val[0].label : '')
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
          onClick={() => updateChart()}
          size="s"
        >
          Update chart
        </EuiButton>
      </EuiFlexItem>
    </div>
  );
};
