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
  EuiFieldText
} from '@elastic/eui';
import { useEffect } from 'react';
import SavedObjects from '../../../services/saved_objects/event_analytics/saved_objects';
import { isEmpty } from 'lodash';

interface ISavedPanelProps {
  selectedOptions: any;
  handleNameChange: any;
  handleOptionChange: any;
  savedObjects: SavedObjects;
  isTextFieldInvalid: boolean;
  savePanelName: string;
  showOptionList: boolean;
}

type CustomPanelOptions = {
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
  isTextFieldInvalid,
  savePanelName,
  showOptionList,
}: ISavedPanelProps) => {

  const [options, setOptions] = useState([]);

  const getCustomPabnelList = async (savedObjects: SavedObjects) => {
    const optionRes = await savedObjects.fetchCustomPanels()
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => console.error(error));
    setOptions(optionRes?.panels || []);
  };

  useEffect(() => {
    getCustomPabnelList(savedObjects);
  }, []);

  return (
    <>
      { showOptionList && (
        <>
          <EuiTitle size="xxs">
            <h3>{ 'Custom operational dashboards/application' }</h3>
          </EuiTitle>
          <EuiFormRow
            helpText="Search existing dashboards or applications by name"
          >
              <EuiComboBox 
                placeholder="Select dashboards/applications"
                onChange={ (options) => { handleOptionChange(options) } }
                selectedOptions={ selectedOptions }
                options={ options.map((option: CustomPanelOptions) => {
                  return {
                    panel: option,
                    label: option['name'],
                  }
                }) }
                isClearable={true}
                data-test-subj="eventExplorer__querySaveComboBox"
              />
          </EuiFormRow>
        </>
      )}
      <EuiTitle size="xxs">
        <h3>Name</h3>
      </EuiTitle>
      <EuiFormRow
        helpText="Name for your savings">
          <EuiFieldText
            key={"save-panel-id"}
            value={ savePanelName }
            isInvalid={ isEmpty(savePanelName) }
            onChange={(e) => {
              handleNameChange(e.target.value);
            }}
            data-test-subj="eventExplorer__querySaveName"
          />
      </EuiFormRow>
    </>
  );
};