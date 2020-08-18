/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Input, Prompt, Source } from '@nteract/presentational-components';
import { EuiDatePicker, EuiDatePickerRange, EuiButtonIcon, EuiButtonToggle } from '@elastic/eui';

import { ViewMode } from '../../../../../src/plugins/embeddable/public';
import {
  DashboardStart,
  DashboardContainerInput,
} from '../../../../../src/plugins/dashboard/public';

import { ParaType } from '../../../common';

/*
 * "ParaVisualization" component is used for rendering embeddable dashboard containers with visualizations
 *
 * Props taken in as params are:
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * vizContent - DashboardContainerInput Object as a JSON-String
 * deleteVizualization - Delete Visualization function
 * para - Parsed paragraph
 *
 */
type ParaVisualizationProps = {
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  vizContent: string;
  deleteVizualization: (uniqueId: string) => void;
  vizualizationEditor: (vizContent: string, index: number) => void;
  para: ParaType;
};

export const ParaVisualization = ({
  DashboardContainerByValueRenderer,
  vizContent,
  deleteVizualization,
  vizualizationEditor,
  para,
}: ParaVisualizationProps) => {
  let loadedVizObject: DashboardContainerInput = JSON.parse(vizContent);
  loadedVizObject.viewMode = ViewMode.VIEW;

  const [input, setInput] = useState(loadedVizObject); // input to dashabord container
  const [startDate, setStratDate] = useState(moment(loadedVizObject.timeRange.from)); // time 'from' synced with datepicker
  const [endDate, setEndDate] = useState(moment(loadedVizObject.timeRange.to)); // time 'to' synced with datepicker
  const [toggleEdit, onToggleEdit] = useState(false); // toggle for editing gridsize of visualization

  useEffect(() => {
    if (Object.keys(input.panels).length === 0 && input.panels.constructor === Object) {
      deleteVizualization(para.uniqueId);
    }
  }, [input]);

  // Refresh Visualization Object with new time range from Date Picker
  const refreshVizObject = () => {
    let inputTemp = { ...input };
    const newTimeRange = {
      from: startDate,
      to: endDate,
    };
    inputTemp.timeRange = newTimeRange;
    setInput(inputTemp);
    vizualizationEditor(JSON.stringify(inputTemp), para.id - 1);
  };

  // Toggle to "view" or "edit" mode based on pin button state
  const onToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputTemp = { ...input };
    if (inputTemp.viewMode !== ViewMode.VIEW) {
      inputTemp.viewMode = ViewMode.VIEW;
    } else {
      inputTemp.viewMode = ViewMode.EDIT;
    }
    setInput(inputTemp);
    onToggleEdit(e.target.checked);
    vizualizationEditor(JSON.stringify(inputTemp), para.id - 1);
  };

  const datePicker = (
    <EuiDatePickerRange
      startDateControl={
        <EuiDatePicker
          selected={startDate}
          onChange={setStratDate}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="Start date"
          showTimeSelect
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={endDate}
          onChange={setEndDate}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="End date"
          showTimeSelect
        />
      }
    />
  );

  return (
    <div>
      <Input hidden={para.isInputHidden}>
        <Prompt counter={para.id} running={para.isRunning} queued={para.inQueue} />
        <Source>%visualization</Source>
      </Input>
      <div>
        <table>
          <tbody>
            <tr>
              <td>{datePicker}</td>
              <td>
                <EuiButtonIcon
                  onClick={refreshVizObject}
                  iconType="refresh"
                  iconSize="m"
                  aria-label="Refresh Visualization"
                />
              </td>
              <td>
                <EuiButtonToggle
                  label="Editor Icon"
                  size="m"
                  iconType={toggleEdit ? 'pin' : 'pinFilled'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onToggleChange(e)}
                  isSelected={toggleEdit}
                  isEmpty
                  isIconOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
        <DashboardContainerByValueRenderer input={input} onInputUpdated={setInput} />
      </div>
    </div>
  );
};
