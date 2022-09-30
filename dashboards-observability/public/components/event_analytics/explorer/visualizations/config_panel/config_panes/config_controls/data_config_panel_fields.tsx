/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { Fragment } from 'react';
import { EuiButtonIcon, EuiLink, EuiPanel, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui';
import { isArray } from 'lodash';
import {
  ConfigListEntry,
  DataConfigPanelFieldProps,
} from '../../../../../../../../common/types/explorer';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';
import {
  AGGREGATIONS,
  CUSTOM_LABEL,
  GROUPBY,
} from '../../../../../../../../common/constants/explorer';

export const DataConfigPanelFields = ({
  list,
  sectionName,
  visType,
  addButtonText,
  handleServiceAdd,
  handleServiceRemove,
  handleServiceEdit,
}: DataConfigPanelFieldProps) => {
  const isHeatMapAddButton = (name: string) => {
    if (!list || !isArray(list) || visType !== VIS_CHART_TYPES.HeatMap) return false;
    return name === AGGREGATIONS ? list.length === 1 : !(list?.length < 2);
  };

  return (
    <div className="panel_section">
      <EuiTitle size="xxs" className="panel_title">
        <h3>{sectionName}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {list !== undefined &&
        isArray(list) &&
        list.map((obj: ConfigListEntry, index: number) => (
          <Fragment key={index}>
            <EuiPanel paddingSize="s" className="panelItem_button">
              <EuiText size="s" className="field_text">
                <EuiLink
                  role="button"
                  tabIndex={0}
                  onClick={() => handleServiceEdit(false, index, sectionName)}
                >
                  {obj[CUSTOM_LABEL] ||
                    `${sectionName === AGGREGATIONS ? obj.aggregation : ''} ${obj.label}`}
                </EuiLink>
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
          </Fragment>
        ))}
      {!isHeatMapAddButton(sectionName) && (
        <EuiPanel className="panelItem_button" grow>
          <EuiText size="s">{addButtonText}</EuiText>
          <EuiButtonIcon
            iconType="plusInCircle"
            aria-label="add-field"
            iconSize="s"
            color="primary"
            disabled={sectionName === GROUPBY && visType === VIS_CHART_TYPES.Line}
            onClick={() => handleServiceAdd(sectionName)}
          />
        </EuiPanel>
      )}
      <EuiSpacer size="m" />
    </div>
  );
};
