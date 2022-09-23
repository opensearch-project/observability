/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { EuiButtonIcon, EuiPanel, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui';
import { ConfigListEntry } from '../../../../../../../../common/types/explorer';
import { visChartTypes } from '../../../../../../../../common/constants/shared';

export const DataConfigPanelFields = ({
  list,
  sectionName,
  title,
  visType,
  addButtonText,
  handleServiceAdd,
  handleServiceRemove,
  handleServiceEdit,
}: any) => {
  const isHeatMap = visType === visChartTypes.HeatMap && list?.length >= 1;
  return (
    <div className="panel_section">
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {list !== undefined &&
        list.map((obj: ConfigListEntry, index: number) => (
          <>
            <EuiPanel key={index} paddingSize="s" className="panelItem_button">
              <EuiText
                size="s"
                className="field_text"
                onClick={() => handleServiceEdit(false, index, sectionName)}
              >
                <a role="button" tabIndex={0}>
                  {obj?.alias || obj.label}
                </a>
              </EuiText>
              <EuiButtonIcon
                color="subdued"
                iconType="cross"
                aria-label="clear-field"
                iconSize="s"
                onClick={() => handleServiceRemove(index, sectionName)}
              />
            </EuiPanel>
            <EuiSpacer size="s" />
          </>
        ))}
      {!isHeatMap && (
        <EuiPanel className="panelItem_button" grow>
          <EuiText size="s">{addButtonText}</EuiText>
          <EuiButtonIcon
            iconType="plusInCircle"
            aria-label="add-field"
            iconSize="s"
            color="primary"
            disabled={sectionName === 'dimensions' && visType === visChartTypes.Line}
            onClick={() => handleServiceAdd(sectionName)}
          />
        </EuiPanel>
      )}
      <EuiSpacer size="m" />
    </div>
  );
};
