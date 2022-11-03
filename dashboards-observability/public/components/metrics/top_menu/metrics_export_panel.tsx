/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';
import React, { useEffect, useState } from 'react';
import { CoreStart } from '../../../../../../src/core/public';
import {
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFieldText,
  EuiFlexGroup,
  EuiFormRow,
  EuiFlexItem,
  EuiForm,
  EuiSelect,
} from '@elastic/eui';
import { UNITS_OF_MEASURE } from '../../../../common/constants/explorer';
import { createPrometheusMetricById } from '../helpers/utils';
import { MetricType } from '../../../../common/types/metrics';
import { fetchVisualizationById } from '../../custom_panels/helpers/utils';

interface MetricsExportPanelProps {
  http: CoreStart['http'];
  visualizationsMetaData: any;
  setVisualizationsMetaData: React.Dispatch<any>;
  sortedMetricsLayout: MetricType[];
  selectedPanelOptions: EuiComboBoxOptionOption<unknown>[] | undefined;
  setSelectedPanelOptions: React.Dispatch<
    React.SetStateAction<EuiComboBoxOptionOption<unknown>[] | undefined>
  >;
}

interface CustomPanelOptions {
  id: string;
  name: string;
  dateCreated: string;
  dateModified: string;
}

export const MetricsExportPanel = ({
  http,
  visualizationsMetaData,
  setVisualizationsMetaData,
  sortedMetricsLayout,
  selectedPanelOptions,
  setSelectedPanelOptions,
}: MetricsExportPanelProps) => {
  const [options, setOptions] = useState([]);

  const [errorResponse, setErrorResponse] = useState('');

  const getCustomPanelList = async () => {
    http
      .get(`${CUSTOM_PANELS_API_PREFIX}/panels`)
      .then((res: any) => {
        setOptions(res.panels || []);
      })
      .catch((error: any) => console.error(error));
  };

  const fetchAllvisualizationsById = async () => {
    let tempVisualizationsMetaData = await Promise.all(
      sortedMetricsLayout.map(async (metricLayout) => {
        return metricLayout.metricType === 'savedCustomMetric'
          ? await fetchVisualizationById(http, metricLayout.id, setErrorResponse)
          : createPrometheusMetricById(metricLayout.id);
      })
    );
    console.log('tempVisualizationsMetaData', tempVisualizationsMetaData);
    setVisualizationsMetaData(tempVisualizationsMetaData);
  };

  useEffect(() => {
    getCustomPanelList();
    fetchAllvisualizationsById();
  }, []);

  const onNameChange = (index: number, name: string) => {
    let tempVisualizationsMetaData = [...visualizationsMetaData];
    tempVisualizationsMetaData[index].name = name;
    setVisualizationsMetaData(tempVisualizationsMetaData);
  };

  const onMeasureChange = (index: number, measureOption: any) => {
    let tempVisualizationsMetaData = [...visualizationsMetaData];
    tempVisualizationsMetaData[index].units_of_measure = measureOption;
    setVisualizationsMetaData(tempVisualizationsMetaData);
  };

  return (
    <div style={{ minWidth: '25vw' }}>
      <EuiFormRow
        label="Custom operational dashboards/application"
        helpText="Search existing dashboards or applications by name"
      >
        <EuiComboBox
          placeholder="Select dashboards/applications"
          onChange={(options) => {
            setSelectedPanelOptions(options);
          }}
          selectedOptions={selectedPanelOptions}
          options={options.map((option: CustomPanelOptions) => {
            return {
              panel: option,
              label: option.name,
            };
          })}
          isClearable={true}
          data-test-subj="eventExplorer__querySaveComboBox"
        />
      </EuiFormRow>

      {visualizationsMetaData.length > 0 && (
        <div style={{ maxHeight: '30vh', overflowY: 'scroll', width: 'auto', overflowX: 'hidden' }}>
          {visualizationsMetaData.map((metaData: any, index: number) => {
            return (
              <EuiForm component="form">
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiFormRow label={'Metric Name #' + (index + 1)}>
                      <EuiFieldText
                        key={'save-panel-id'}
                        value={visualizationsMetaData[index].name}
                        onChange={(e) => onNameChange(index, e.target.value)}
                        data-test-subj="metrics__querySaveName"
                      />
                    </EuiFormRow>
                  </EuiFlexItem>

                  <EuiFlexItem>
                    <EuiFormRow label="Units of Measure">
                      <EuiSelect
                        id={'selector' + index}
                        options={UNITS_OF_MEASURE.map((i) => {
                          return { value: i, text: i };
                        })}
                        value={visualizationsMetaData[index].units_of_measure}
                        onChange={(e) => onMeasureChange(index, e.target.value)}
                        data-test-subj="metrics__measureSelector"
                        aria-label="metrics__measureSelector"
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiForm>
            );
          })}
        </div>
      )}
    </div>
  );
};
