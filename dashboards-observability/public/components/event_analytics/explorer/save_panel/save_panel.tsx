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
  EuiIconTip,
  EuiFlexItem,
  EuiToolTip
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
  setMetricMeasure: any;
  setMetricLabel: any;
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
  setMetricMeasure,
  setMetricLabel,
}: ISavedPanelProps) => {
  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [measure, setMeasure] = useState([]);
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

  const onMeasureChange = (selectedMeasures: React.SetStateAction<never[]>) => {
    setMeasure(selectedMeasures);
    setMetricMeasure(selectedMeasures[0].label);
  };

  const onLabelChange = (selectedLabels: React.SetStateAction<never[]>) => {
    setLabel(selectedLabels);
    setMetricLabel(selectedLabels);
  };

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
          {checked && (
            <>
              <EuiSpacer size="s" />
              <EuiTitle size="xxs">
                <h3>{'Units of Measure'}</h3>
              </EuiTitle>
              <EuiFormRow>
                <EuiComboBox
                  placeholder="Select measure"
                  singleSelection={{ asPlainText: true }}
                  onChange={onMeasureChange}
                  selectedOptions={measure}
                  options={UNITS_OF_MEASURE.map((i) => {
                    return {
                      label: i,
                    };
                  })}
                  isClearable={false}
                  data-test-subj="eventExplorer__metricMeasureSaveComboBox"
                />
              </EuiFormRow>
              {/* <EuiSpacer size="s" />
              <EuiTitle size="xxs">
                <h3>{'Labels'}</h3>
              </EuiTitle> */}
              {/* <EuiFormRow>
                <EuiComboBox
                  placeholder="Select labels"
                  onChange={onLabelChange}
                  selectedOptions={label}
                  options={UNITS_OF_MEASURE.map((i) => {
                    return {
                      label: i,
                    };
                  })}
                  isClearable={true}
                  data-test-subj="eventExplorer__metricLabelSaveComboBox"
                />
              </EuiFormRow> */}
            </>
          )}
        </>
      )}
    </>
  );
};
