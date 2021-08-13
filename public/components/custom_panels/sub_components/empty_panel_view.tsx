import { EuiSpacer, EuiText, EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';
import React from 'react';

type Props = {
  addVizWindow: () => void;
};

// EmptyPanelView
// This Sub-component is shown to the user when a custom panel is empty
// Props:
// addVizWindow -> This function shows the add visualization window in Custom panels view

export const EmptyPanelView = ({ addVizWindow }: Props) => {
  return (
    <div>
      <EuiSpacer size="xxl" />
      <EuiText textAlign="center">
        <h2>Start by adding your first visualization</h2>
        <EuiSpacer size="m" />
        <EuiText color="subdued" size="m">
          Use PPL Queries to fetch and filter Observability Data to Create Visualizations
        </EuiText>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiButton fullWidth={false} fill onClick={addVizWindow}>
            Add Visualization
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xxl" />
    </div>
  );
};
