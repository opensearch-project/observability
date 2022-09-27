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
  EuiFlexItem,
  EuiFormRow,
  EuiIcon,
  EuiText,
} from '@elastic/eui';
import { cloneDeep } from 'lodash';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  AGGREGATIONS,
  AVAILABLE_FIELDS,
  GROUPBY,
  SELECTED_FIELDS,
} from '../../../../../../../../common/constants/explorer';
import {
  ConfigList,
  ConfigListEntry,
  DataConfigPanelProps,
} from '../../../../../../../../common/types/explorer';
import { TabContext } from '../../../../../hooks';
import {
  selectFields,
  sortFields,
  updateFields,
} from '../../../../../../event_analytics/redux/slices/field_slice';

export const LogsViewConfigPanelItem = ({
  fieldOptionList,
  visualizations,
}: DataConfigPanelProps) => {
  const dispatch = useDispatch();
  const { tabId, curVisId, changeVisualizationConfig } = useContext<any>(TabContext);
  const explorerFields = useSelector(selectFields)[tabId];
  const { data } = visualizations;
  const { userConfigs } = data;

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
    if (userConfigs && userConfigs.dataConfig) {
      setConfigList({
        ...userConfigs.dataConfig,
      });
    }
  }, [userConfigs?.dataConfig, visualizations.vis.name]);

  useEffect(() => {
    if (fieldOptionList.length === 0) {
      setConfigList({
        [AGGREGATIONS]: [],
        [GROUPBY]: visualizations?.data?.explorer?.explorerFields?.selectedFields.map((field) => ({
          ...field,
          label: field.name,
        })),
      });
    }
  }, [visualizations.data.explorer.explorerFields]);

  const handleServiceRemove = (index: number, name: string) => {
    if (fieldOptionList.length !== 0) {
      return;
    }
    const list = { ...configList };
    const arr = [...list[name]];
    arr.splice(index, 1);
    const updatedList = { ...list, [name]: arr };
    setConfigList(updatedList);
  };

  const handleServiceAdd = (name: string) => {
    const updatedList = { ...configList, [name]: [...configList[name], initialConfigEntry] };
    setConfigList(updatedList);
  };

  const updateChart = () => {
    if ((configList[GROUPBY] as ConfigListEntry[]).some((field) => field.label === '')) {
      return;
    }
    const nextFields = cloneDeep(explorerFields);
    const selectedFields = (configList[GROUPBY] as ConfigListEntry[]).map((field) => ({
      name: field.name,
      type: field.type,
    }));
    const selectedFieldNames = selectedFields.map((field) => field.name);
    const availableFields = nextFields.unselectedFields.filter(
      (field) => !selectedFieldNames.includes(field.name)
    );
    nextFields[SELECTED_FIELDS] = selectedFields;
    nextFields[AVAILABLE_FIELDS] = availableFields;
    batch(() => {
      dispatch(
        updateFields({
          tabId,
          data: {
            ...nextFields,
          },
        })
      );
      dispatch(
        sortFields({
          tabId,
          data: [SELECTED_FIELDS],
        })
      );
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
              [GROUPBY]: configList[GROUPBY],
              [AGGREGATIONS]: configList[AGGREGATIONS],
            },
          },
        },
      })
    );
  };

  const getAvailableLogsViewOptions = () => {
    if (fieldOptionList.length !== 0) {
      return [];
    }
    const dimensionNames = (configList[GROUPBY] as ConfigListEntry[]).map((field) => field.name);
    const availableFields = visualizations?.data?.explorer?.explorerFields?.availableFields.filter(
      (field) => !dimensionNames.includes(field.name)
    );
    return availableFields.map((field) => ({
      ...field,
      label: field.name,
    }));
  };

  const updateLogsViewConfig = (value: string, field: ConfigListEntry) => {
    const list = { ...configList };
    const index = (list[GROUPBY] as ConfigListEntry[]).findIndex(
      (dim) => dim.label === field.label
    );
    const selectedField = visualizations?.data?.explorer?.explorerFields?.availableFields.find(
      (fld) => fld.name === value
    );
    const newField = { ...selectedField, label: value };
    list[GROUPBY][index] = newField;
    setConfigList(list);
  };

  const getLogsViewUI = () => {
    const list = configList[GROUPBY] ? configList[GROUPBY] : [];
    const listUI = list.map((field, index) => (
      <EuiFormRow
        label="Field"
        labelAppend={
          <EuiText size="xs">
            <EuiIcon
              type="cross"
              color="danger"
              onClick={() => handleServiceRemove(index, GROUPBY)}
            />
          </EuiText>
        }
      >
        <EuiComboBox
          aria-label="logsViewField"
          placeholder="Select a field"
          singleSelection={{ asPlainText: true }}
          options={getAvailableLogsViewOptions()}
          selectedOptions={[{ label: field.label }]}
          isDisabled={fieldOptionList.length !== 0}
          onChange={(e) =>
            updateLogsViewConfig(e.length > 0 ? e[0].label : '', field as ConfigListEntry)
          }
        />
      </EuiFormRow>
    ));
    return (
      <Fragment key="logsViewUI">
        {listUI}
        <EuiSpacer size="s" />
        {
          <EuiFlexItem grow>
            <EuiButton
              fullWidth
              iconType="plusInCircleFilled"
              color="primary"
              onClick={() => handleServiceAdd(GROUPBY)}
              disabled={fieldOptionList.length !== 0}
            >
              Add
            </EuiButton>
          </EuiFlexItem>
        }
      </Fragment>
    );
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Configurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <>
        <EuiTitle size="xxs">
          <h3>Columns</h3>
        </EuiTitle>
        {getLogsViewUI()}

        <EuiSpacer size="s" />
      </>
      <EuiFlexItem grow={false}>
        <EuiButton
          data-test-subj="visualizeEditorRenderButton"
          iconType="play"
          onClick={updateChart}
          size="s"
          isDisabled={fieldOptionList.length !== 0}
        >
          Update chart
        </EuiButton>
      </EuiFlexItem>
    </>
  );
};
