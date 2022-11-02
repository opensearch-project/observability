/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiForm, EuiFormRow } from '@elastic/eui';
import { ConfigPanelOptions } from './config_controls';

export const VizDataPanel = ({ visualizations, onConfigChange, vizState = {}, tabProps }: any) => {
  const handleConfigEditing = (stateFieldName) => {
    return (changes) => {
      onConfigChange({
        ...vizState,
        [stateFieldName]: changes,
      });
    };
  };

  const dynamicContent = tabProps.sections.map((section) => {
    const Editor = section.editor;
    return (
      <EuiFormRow fullWidth>
        <Editor
          visualizations={visualizations}
          schemas={section.schemas}
          handleConfigChange={handleConfigEditing(section.mapTo)}
          vizState={vizState[section.mapTo] || section.defaultState || {}}
          sectionName={section.name}
          sectionId={section.id}
          props={section.props || {}}
        />
      </EuiFormRow>
    );
  });

  return (
    <div className="visEditorSidebar__config">
      <EuiForm className="visEditorSidebar__form">
        <EuiFormRow>
          <ConfigPanelOptions
            vizState={vizState?.panelOptions}
            visualizations={visualizations}
            handleConfigChange={handleConfigEditing('panelOptions')}
          />
        </EuiFormRow>
        {dynamicContent}
      </EuiForm>
    </div>
  );
};
