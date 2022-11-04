/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EuiTitle,
  EuiComboBox,
  EuiFormRow,
  EuiSpacer,
  EuiFieldText,
  EuiSwitch,
  EuiToolTip,
  EuiSelect,
} from '@elastic/eui';
import { useEffect } from 'react';
import { isEmpty, isEqual } from 'lodash';
import SavedObjects from '../../../../services/saved_objects/event_analytics/saved_objects';
import { UNITS_OF_MEASURE } from '../../../../../common/constants/explorer';

interface ISavedPanelProps {
  selectedOptions: any;
  handleNameChange: any;
  handleOptionChange: any;
  savedObjects: SavedObjects;
  savePanelName: string;
  showOptionList: boolean;
  curVisId: string;
  spanValue: boolean;
  setSubType: any;
  metricMeasure: string;
  setMetricMeasure: any;
  setMetricLabel: any;
  metricChecked: boolean;
}

interface CustomPanelOptions {
  id: string;
  name: string;
  dateCreated: string;
  dateModified: string;
}

export const SavePanel = ({
  selectedOptions,
  handleNameChange,
  handleOptionChange,
  savedObjects,
  savePanelName,
  showOptionList,
  curVisId,
  spanValue,
  setSubType,
  metricMeasure,
  setMetricMeasure,
  setMetricLabel,
  metricChecked,
}: ISavedPanelProps) => {
  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [measure, setMeasure] = useState('');
  const [label, setLabel] = useState([]);

  const getCustomPabnelList = async (savedObjects: SavedObjects) => {
    const optionRes = await savedObjects
      .fetchCustomPanels()
      .then((res: any) => {
        return res;
      })
      .catch((error: any) => console.error(error));
    setOptions(optionRes?.panels || []);
  };

  useEffect(() => {
    getCustomPabnelList(savedObjects);
  }, []);

  const onToggleChange = (e: { target: { checked: React.SetStateAction<boolean> } }) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setSubType("metric")
    } else {
      setSubType("visualization")
    }
  };

  const onMeasureChange = (selectedMeasures: string) => {
    setMeasure(selectedMeasures);
    setMetricMeasure(selectedMeasures);
  };

  const onLabelChange = (selectedLabels: React.SetStateAction<never[]>) => {
    setLabel(selectedLabels);
    setMetricLabel(selectedLabels);
  };

  useEffect(() => {
    if (metricChecked) {
      setChecked(true);
      setMeasure(metricMeasure);
    }
  }, [])
  
  return (
    <>
      {showOptionList && (
        <>
          <EuiTitle size="xxs">
            <h3>{'Custom operational dashboards/application'}</h3>
          </EuiTitle>
          <EuiFormRow helpText="Search existing dashboards or applications by name">
            <EuiComboBox
              placeholder="Select dashboards/applications"
              onChange={(options) => {
                handleOptionChange(options);
              }}
              selectedOptions={selectedOptions}
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
        </>
      )}
      <EuiTitle size="xxs">
        <h3>Name</h3>
      </EuiTitle>
      <EuiFormRow helpText="Name for your savings">
        <EuiFieldText
          key={'save-panel-id'}
          value={savePanelName}
          isInvalid={isEmpty(savePanelName)}
          onChange={(e) => {
            handleNameChange(e.target.value);
          }}
          data-test-subj="eventExplorer__querySaveName"
        />
      </EuiFormRow>
      {showOptionList && (
        <>
          <EuiFormRow display="columnCompressedSwitch">
          <EuiToolTip
          content="Only Time Series visualization and a query including stats/span can be saved as Metric" >
            <EuiSwitch
              showLabel={true}
              label="Save as Metric"
              checked={checked}
              onChange={onToggleChange}
              compressed
              disabled = {!((isEqual(curVisId, 'line')) && spanValue)}
            />
          </EuiToolTip>
          </EuiFormRow>        
        </>
      )}
    </>
  );
};
