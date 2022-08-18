/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
  EuiTitle,
  EuiComboBox,
  EuiSpacer,
  EuiButton,
  EuiFieldText,
  EuiFlexItem,
  EuiFormRow,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiFieldNumber,
  htmlIdGenerator,
} from '@elastic/eui';
import { useDispatch } from 'react-redux';
import {
  AGGREGATION_OPTIONS,
  numericalTypes,
} from '../../../../../../../../common/constants/explorer';
import { ButtonGroupItem } from './config_button_group';
import { visChartTypes } from '../../../../../../../../common/constants/shared';
import { ConfigList, ConfigListEntry } from '../../../../../../../../common/types/explorer';
import { TabContext } from '../../../../../hooks';

export const DataConfigPanelItem = ({ fieldOptionList, visualizations }: any) => {
  const dispatch = useDispatch();
  const { tabId, setToast, curVisId, changeVisualizationConfig } = useContext<any>(TabContext);
  const { data } = visualizations;
  const { userConfigs } = data;

  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const initialConfigEntry = {
    label: '',
    aggregation: '',
    custom_label: '',
    name: '',
    side: 'right',
    type: '',
  };

  const [configList, setConfigList] = useState<ConfigList>({});

  useEffect(() => {
    if (userConfigs && userConfigs.dataConfig && userConfigs.dataConfig.valueOptions) {
      setConfigList({
        ...userConfigs.dataConfig.valueOptions,
      });
    }
  }, [userConfigs?.dataConfig?.valueOptions, visualizations.vis.name]);

  const updateList = (value: string, index: number, name: string, field: string) => {
    let list = { ...configList };
    let listItem = { ...list[name][index] };
    listItem = {
      ...listItem,
      [field]: value,
    };
    if (field === 'label') {
      listItem.type = value !== '' ? fields.find((x) => x.name === value)?.type : '';
      listItem.name = value;
    }
    const updatedList = {
      ...list,
      [name]: [
        ...list[name].slice(0, index),
        listItem,
        ...list[name].slice(index + 1, list[name].length),
      ],
    };
    setConfigList(updatedList);
  };

  const updateHistogramConfig = (configName: string, fieldName: string, value: string) => {
    const list = { ...configList };
    let listItem = { ...list[configName][0] };
    listItem[fieldName] = value;
    const updatedList = {
      ...list,
      [configName]: [listItem],
    };
    setConfigList(updatedList);
  };

  const handleServiceRemove = (index: number, name: string) => {
    const list = { ...configList };
    const arr = [...list[name]];
    arr.splice(index, 1);
    let updatedList = { ...list };
    if (visualizations.vis.name === visChartTypes.Bar && name === 'dimensions') {
      const dimensionLabels = arr.map((field) => field.label);
      const newBreakdown = configList.breakdowns?.filter((field) =>
        dimensionLabels.includes(field.label)
      );
      if (newBreakdown?.length === arr.length) {
        setToast(
          'You cannot remove this dimension as there must be at least one dimension selected which is not part of breakdown.',
          'danger'
        );
        return;
      }
      updatedList = { ...updatedList, breakdowns: newBreakdown };
    }
    updatedList = { ...updatedList, [name]: arr };
    setConfigList(updatedList);
  };

  const handleServiceAdd = (name: string) => {
    const updatedList = { ...configList, [name]: [...configList[name], initialConfigEntry] };
    setConfigList(updatedList);
  };

  const updateChart = () => {
    const isAnyMetricEmpty = configList.metrics?.some((field) => field.label.trim() === '');
    const isAnyDimensionEmpty = configList.dimensions?.some((field) => field.label.trim() === '');
    const isAnyBreakdownEmpty =
      visualizations.vis.name === visChartTypes.Bar &&
      configList.breakdowns?.some((field) => field.label.trim() === '');
    if (isAnyMetricEmpty || isAnyDimensionEmpty || isAnyBreakdownEmpty) {
      setToast('Fill all the fields or remove empty fields.', 'danger');
      return;
    }
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
              breakdowns: configList.breakdowns,
            },
          },
        },
      })
    );
  };

  const isPositionButtonVisible = (sectionName: string) =>
    sectionName === 'metrics' &&
    (visualizations.vis.name === visChartTypes.Line ||
      visualizations.vis.name === visChartTypes.Scatter);

  const getOptionsAvailable = (sectionName: string) => {
    if (sectionName === 'breakdowns') {
      const selectedBreakdownFields: any = {};
      configList['breakdowns']?.forEach((field) => (selectedBreakdownFields[field.label] = true));
      return (
        configList['dimensions'] &&
        (configList['dimensions'] as ConfigListEntry[]).filter(
          (field) => !selectedBreakdownFields[field.label]
        )
      );
    }
    let selectedFields = {};
    for (const key in configList) {
      configList[key] && configList[key].forEach((field) => (selectedFields[field.label] = true));
    }
    const unselectedFields = fieldOptionList.filter((field) => !selectedFields[field.label]);
    return sectionName === 'metrics'
      ? unselectedFields
      : visualizations.vis.name === visChartTypes.Line
      ? unselectedFields.filter((i) => i.type === 'timestamp')
      : unselectedFields;
  };

  const renderAddButton = (isDisabled: boolean, sectionName: string) => (
    <EuiFlexItem grow>
      <EuiButton
        fullWidth
        iconType="plusInCircleFilled"
        color="primary"
        onClick={() => handleServiceAdd(sectionName)}
        disabled={isDisabled}
      >
        Add
      </EuiButton>
    </EuiFlexItem>
  );

  const getCommonUI = (lists: ConfigListEntry[], sectionName: string) =>
    sectionName === 'breakdowns' && lists && lists.length === 0 ? (
      <>
        {renderAddButton(configList.dimensions?.length === 1, sectionName)}
        <EuiSpacer size="s" />
      </>
    ) : (
      lists &&
      lists.map((singleField, index: number) => (
        <>
          <div key={index} className="services">
            <div className="first-division">
              {sectionName === 'dimensions' && visualizations.vis.name === visChartTypes.HeatMap && (
                <EuiTitle size="xxs">
                  <h5>{index === 0 ? 'X-Axis' : 'Y-Axis'}</h5>
                </EuiTitle>
              )}
              <EuiPanel color="subdued" style={{ padding: '0px' }}>
                <EuiFormRow
                  label="Aggregation"
                  labelAppend={
                    sectionName === 'breakdowns' ||
                    (visualizations.vis.name !== visChartTypes.HeatMap && lists.length !== 1) ? (
                      <EuiText size="xs">
                        <EuiIcon
                          type="cross"
                          color="danger"
                          onClick={() => handleServiceRemove(index, sectionName)}
                        />
                      </EuiText>
                    ) : null
                  }
                >
                  <EuiComboBox
                    aria-label="AggregationCommonUI"
                    placeholder="Select a aggregation"
                    singleSelection={{ asPlainText: true }}
                    options={AGGREGATION_OPTIONS}
                    selectedOptions={
                      singleField.aggregation ? [{ label: singleField.aggregation }] : []
                    }
                    onChange={(e) =>
                      updateList(e.length > 0 ? e[0].label : '', index, sectionName, 'aggregation')
                    }
                  />
                </EuiFormRow>
                <EuiFormRow label="Field">
                  <EuiComboBox
                    aria-label="fieldCommonUI"
                    placeholder="Select a field"
                    singleSelection={{ asPlainText: true }}
                    options={getOptionsAvailable(sectionName)}
                    selectedOptions={singleField.label ? [{ label: singleField.label }] : []}
                    onChange={(e) =>
                      updateList(e.length > 0 ? e[0].label : '', index, sectionName, 'label')
                    }
                  />
                </EuiFormRow>

                <EuiFormRow label="Custom label">
                  <EuiFieldText
                    placeholder="Custom label"
                    value={singleField.custom_label}
                    onChange={(e) => updateList(e.target.value, index, sectionName, 'custom_label')}
                    aria-label="customLabelCommonUI"
                  />
                </EuiFormRow>

                {isPositionButtonVisible(sectionName) && (
                  <EuiFormRow label="Side">
                    <ButtonGroupItem
                      legend="Side"
                      groupOptions={[
                        { id: 'left', label: 'Left' },
                        { id: 'right', label: 'Right' },
                      ]}
                      idSelected={(singleField as ConfigListEntry).side || 'right'}
                      handleButtonChange={(id: string) =>
                        updateList(id, index, sectionName, 'side')
                      }
                    />
                  </EuiFormRow>
                )}

                <EuiSpacer size="s" />
                {visualizations.vis.name !== visChartTypes.HeatMap &&
                  lists.length - 1 === index &&
                  renderAddButton(
                    (sectionName === 'breakdowns' &&
                      configList.dimensions!.length - 1 === configList.breakdowns!.length) ||
                      (sectionName === 'dimensions' &&
                        visualizations.vis.name === visChartTypes.Line),
                    sectionName
                  )}
              </EuiPanel>
            </div>
          </div>
          <EuiSpacer size="s" />
        </>
      ))
    );

  const getNumberField = (type: string) => (
    <>
      <EuiFieldNumber
        id={htmlIdGenerator('input-number')()}
        fullWidth
        placeholder="auto"
        value={
          configList?.dimensions &&
          configList?.dimensions.length > 0 &&
          configList.dimensions[0][type]
            ? configList.dimensions[0][type]
            : ''
        }
        onChange={(e) => updateHistogramConfig('dimensions', type, e.target.value)}
        data-test-subj="valueFieldNumber"
      />
      <EuiSpacer size="s" />
    </>
  );

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Configurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {visualizations.vis.name !== visChartTypes.Histogram ? (
        <>
          <EuiTitle size="xxs">
            <h3>Dimensions</h3>
          </EuiTitle>
          {getCommonUI(
            configList?.dimensions !== undefined
              ? (configList.dimensions as ConfigListEntry[])
              : [],
            'dimensions'
          )}

          <EuiSpacer size="s" />
          <EuiTitle size="xxs">
            <h3>Metrics</h3>
          </EuiTitle>
          {getCommonUI(configList.metrics !== undefined ? configList.metrics : [], 'metrics')}

          {visualizations.vis.name === visChartTypes.Bar && (
            <>
              <EuiSpacer size="s" />
              <EuiTitle size="xxs">
                <h3>Breakdown</h3>
              </EuiTitle>
              {getCommonUI(
                configList.breakdowns !== undefined ? configList.breakdowns : [],
                'breakdowns'
              )}
            </>
          )}
        </>
      ) : (
        <>
          <EuiTitle size="xxs">
            <h3>Bucket Size</h3>
          </EuiTitle>
          {getNumberField('bucketSize')}

          <EuiSpacer size="s" />
          <EuiTitle size="xxs">
            <h3>Bucket Offset</h3>
          </EuiTitle>
          {getNumberField('bucketOffset')}
        </>
      )}
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
