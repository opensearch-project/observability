/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiForm,
  EuiText,
  EuiHorizontalRule,
  EuiCheckableCard,
} from '@elastic/eui';
import React, { useState } from 'react';
import PPLService from '../../../services/requests/ppl';
import { VisualizationType } from '../../../../common/constants/custom_panels';
import { htmlIdGenerator } from '@elastic/eui/lib/services';
import { AddSavedVisualizations } from '../forms/add_saved_visualizations';
import { AddNewVisualizations } from '../forms/add_new_visualizations';

/*
 * "AddNewVisualizations" component to add new visualizations using PPL Queries
 *
 * closeVizWindow: function to close "add visualization" window
 * pplService: PPLService Requestor 
 * panelVisualizations: panelVisualizations object 
 * setPanelVisualizations: Setter for panelVisualizations object
 * setToast: Create Toast function 
 */

type Props = {
  closeVizWindow: () => void;
  pplService: PPLService;
  panelVisualizations: VisualizationType[];
  setPanelVisualizations: React.Dispatch<React.SetStateAction<VisualizationType[]>>;
  setToast: (title: string, color?: string, text?: string) => void;
};

export const AddVizView = ({
  closeVizWindow,
  pplService,
  panelVisualizations,
  setPanelVisualizations,
  setToast,
}: Props) => {
  const radioName = htmlIdGenerator()();
  const [radio, setRadio] = useState('radio1');

  return (
    <div>
      <EuiPanel style={{ width: '55vw' }}>
        <EuiText>
          <h4>Add visualization</h4>
        </EuiText>
        <EuiHorizontalRule margin="s" />
        <div>
            <EuiFlexGroup justifyContent="flexStart">
              <EuiFlexItem grow={false} style={{ minWidth: '12vw' }}>
                <EuiCheckableCard
                  id={htmlIdGenerator()()}
                  label="Select existing visualization"
                  name={radioName}
                  value="radio1"
                  checked={radio === 'radio1'}
                  onChange={() => setRadio('radio1')}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false} style={{ minWidth: '12vw' }}>
                <EuiCheckableCard
                  id={htmlIdGenerator()()}
                  label="Create new visualization"
                  name={radioName}
                  value="radio2"
                  checked={radio === 'radio2'}
                  onChange={() => setRadio('radio2')}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            {radio === 'radio1' ? (
              <AddSavedVisualizations
                closeVizWindow={closeVizWindow}
                pplService={pplService}
                panelVisualizations={panelVisualizations}
                setPanelVisualizations={setPanelVisualizations}
                setToast={setToast}
              />
            ) : (
              <AddNewVisualizations
                closeVizWindow={closeVizWindow}
                pplService={pplService}
                panelVisualizations={panelVisualizations}
                setPanelVisualizations={setPanelVisualizations}
                setToast={setToast}
              />
            )}
        </div>
      </EuiPanel>
    </div>
  );
};
