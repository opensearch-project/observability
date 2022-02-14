/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiForm, EuiFormRow, EuiAccordion } from '@elastic/eui';
import {
  ConfigPanelOptions,
  ConfigChartOptions,
  ConfigDataLinks,
  ConfigThresholds,
} from './config_controls';

export const VizDataPanel = ({ visualizations, onConfigChange, vizState = {}, tabProps }: any) => {
  const handleConfigEditing = (sectionName) => {
    return (changes) => {
      onConfigChange({
        ...vizState,
        [sectionName]: changes,
      });
    };
  };

  const dynamicContent = tabProps.sections.map((section) => {
    const Editor = section.editor;
    return (
      <EuiFormRow>
        <Editor
          visualizations={visualizations}
          schemas={section.schemas}
          handleConfigChange={() => {}}
          vizState={vizState[section.mapTo] ? vizState[section.mapTo] : {}}
        />
      </EuiFormRow>
    );
  });

  return (
    <div className="visEditorSidebar__config">
      <EuiForm className="visEditorSidebar__form">
        <EuiFormRow>
          <ConfigPanelOptions configState={vizState?.panelOptions} />
        </EuiFormRow>
        {dynamicContent}
        <EuiFormRow>
          <EuiAccordion
            id="configPanel__chartOptions"
            buttonContent="Chart options"
            paddingSize="s"
          >
            <ConfigChartOptions configState={vizState?.chartOptions} />
          </EuiAccordion>
        </EuiFormRow>
        <EuiFormRow>
          <EuiAccordion id="configPanel__dataLinks" buttonContent="Data links" paddingSize="s">
            <ConfigDataLinks configState={vizState?.dataLinks} />
          </EuiAccordion>
        </EuiFormRow>
        <EuiFormRow>
          <EuiAccordion id="configPanel__thresholds" buttonContent="Thresholds" paddingSize="s">
            <ConfigThresholds configState={vizState?.thresholds} />
          </EuiAccordion>
        </EuiFormRow>
      </EuiForm>
    </div>
  );
};
