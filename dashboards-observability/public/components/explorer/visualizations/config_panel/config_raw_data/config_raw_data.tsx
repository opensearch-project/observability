/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiForm,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiFormRow,
  EuiAccordion,
} from '@elastic/eui';
import {
  ConfigPanelOptions,
  ConfigChartOptions,
  ConfigDataLinks,
  ConfigThresholds,
} from '../config_editor/config_controls';

export const VizDataPanel = ({ dimensions }: any) => {
  return (
    <div className="visEditorSidebar__config">
      <EuiPanel>
        <EuiForm className="visEditorSidebar__form">
          <EuiFormRow>
            <ConfigPanelOptions />
          </EuiFormRow>
          <EuiFormRow>
            <EuiAccordion
              id="configPanel__ValueOptions"
              buttonContent="Value options"
              paddingSize="s"
            >
              {dimensions}
            </EuiAccordion>
          </EuiFormRow>
          <EuiFormRow>
            <EuiAccordion
              id="configPanel__chartOptions"
              buttonContent="Chart options"
              paddingSize="s"
            >
              <ConfigChartOptions />
            </EuiAccordion>
          </EuiFormRow>
          <EuiFormRow>
            <EuiAccordion id="configPanel__dataLinks" buttonContent="Data links" paddingSize="s">
              <ConfigDataLinks />
            </EuiAccordion>
          </EuiFormRow>
          <EuiFormRow>
            <EuiAccordion id="configPanel__thresholds" buttonContent="Thresholds" paddingSize="s">
              <ConfigThresholds />
            </EuiAccordion>
          </EuiFormRow>
        </EuiForm>
      </EuiPanel>
    </div>
  );
};
