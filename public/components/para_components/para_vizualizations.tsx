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
import { ViewMode } from '../../../../../src/plugins/embeddable/public';
import {
  DashboardStart,
  DashboardContainerInput,
} from '../../../../../src/plugins/dashboard/public';
import { EuiDatePicker, EuiDatePickerRange, EuiButtonIcon, EuiButtonToggle } from '@elastic/eui';
import { ParaType } from '../helpers/zeppelin_parser';

/*
 * "DashboardEmbeddableByValue" component is used for rendering embeddable dashboard containers with visualizations
 *
 * Props taken in as params are:
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * vizContent - DashboardContainerInput Object as a JSON-String
 * deleteViz - Delete Visualization function
 * saveViz - Save Visualization function
 * para - Parsed paragraph
 *
 */
type DashboardContainerProps = {
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  vizContent: string;
  deleteViz: (uniqueId: string) => void;
  saveViz: (para: ParaType, visObject: string) => void;
  para: ParaType;
};

export const DashboardEmbeddableByValue = ({
  DashboardContainerByValueRenderer,
  vizContent,
  deleteViz,
  saveViz,
  para,
}: DashboardContainerProps) => {
  let loadedVizObject: DashboardContainerInput = JSON.parse(vizContent);
  loadedVizObject.viewMode = ViewMode.VIEW;
  const [input, setInput] = useState(loadedVizObject);
  const [startDate, setStratDate] = useState(moment(loadedVizObject.timeRange.from));
  const [endDate, setEndDate] = useState(moment(loadedVizObject.timeRange.to));
  const [toggleEdit, onToggleEdit] = useState(false);

  useEffect(() => {
    if (Object.keys(input.panels).length === 0 && input.panels.constructor === Object) {
      deleteViz(para.uniqueId);
    }
  }, [input]);

  const refreshVizObject = () => {
    let inputTemp = { ...input };
    const newTimeRange = {
      from: startDate,
      to: endDate,
    };
    inputTemp.timeRange = newTimeRange;
    setInput(inputTemp);
  };

  const saveVizObject = () => {
    saveViz(para, '%sh #' + JSON.stringify(input));
  };

  const onToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputTemp = { ...input };
    if (inputTemp.viewMode !== ViewMode.VIEW) {
      inputTemp.viewMode = ViewMode.VIEW;
    } else {
      inputTemp.viewMode = ViewMode.EDIT;
    }
    setInput(inputTemp);
    onToggleEdit(e.target.checked);
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
            <td>
              <EuiButtonIcon
                onClick={saveVizObject}
                iconType="save"
                iconSize="m"
                aria-label="Save Visualization"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <DashboardContainerByValueRenderer input={input} onInputUpdated={setInput} />
    </div>
  );
};
