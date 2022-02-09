/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiButton,
  EuiCheckboxGroup,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiLink,
  EuiRange,
  EuiSelect,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiTextArea,
  EuiAccordion,
} from '@elastic/eui';

const helpText =
  'Repeat this panel for each value in the selected variable. This is not visible while in edit mode. You need to go back to dashboard and then update the variable or reload the dashboard.';

export const ConfigPanelOptions = (props: any) => {
  return (
    <EuiAccordion id="configPanel__panelOptions" buttonContent="Panel options" paddingSize="s">
      <EuiForm component="form">
        <EuiFormRow label="Title" helpText="Name your visualization">
          <EuiFieldText name="first" />
        </EuiFormRow>
        <EuiFormRow label="Description">
          <EuiTextArea
            placeholder="Visualization description"
            aria-label="Use aria labels when no actual label is in use"
            value={''}
            onChange={(e) => {}}
          />
        </EuiFormRow>
        <EuiFormRow label="Transparent background">
          <EuiSwitch label="" checked={false} onChange={(e) => {}} />
        </EuiFormRow>
        <EuiSpacer size="s" />
        <EuiAccordion id="configPanel__panelOptions_" buttonContent="Panel Links" paddingSize="s">
          <EuiSpacer size="s" />
          <EuiFormRow label="">
            <EuiButton size="s">+ Add link</EuiButton>
          </EuiFormRow>
        </EuiAccordion>
        <EuiSpacer size="s" />
        <EuiAccordion
          id="configPanel__panelOptions_"
          buttonContent="Repeat options"
          paddingSize="s"
        >
          <EuiSpacer size="s" />
          <EuiFormRow label="" helpText={<span>{helpText}</span>}>
            <EuiSelect />
          </EuiFormRow>
        </EuiAccordion>
      </EuiForm>
    </EuiAccordion>
  );
};
