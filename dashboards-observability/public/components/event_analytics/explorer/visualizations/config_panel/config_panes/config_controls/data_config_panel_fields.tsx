/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { Fragment } from 'react';
import {
  EuiButtonIcon,
  EuiIcon,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiToolTip,
} from '@elastic/eui';
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
  const isAggregation = sectionName === AGGREGATIONS;
  const isHeatMapAddButton = (name: string) => {
    if (!list || !isArray(list) || visType !== VIS_CHART_TYPES.HeatMap) return false;
    return name === AGGREGATIONS ? list.length >= 1 : list.length >= 2;
  };

  const tooltipIcon = <EuiIcon type="iInCircle" color="text" size="m" className="info-icon" />;
  const crossIcon = (index: number) => (
    <EuiButtonIcon
      color="subdued"
      iconType="cross"
      aria-label="clear-field"
      iconSize="s"
      onClick={() => handleServiceRemove(index, sectionName)}
    />
  );

  const aggregationToolTip = (iconToDisplay: JSX.Element) => (
    <EuiToolTip
      position="right"
      content="At least one metric is required to render a chart"
      delay="regular"
      anchorClassName="eui-textTruncate"
    >
      {iconToDisplay}
    </EuiToolTip>
  );

  return (
    <div className="panel_section">
      <div style={{ display: 'flex' }}>
        <EuiTitle size="xxs" className="panel_title">
          <h3>{sectionName}</h3>
        </EuiTitle>
        {isAggregation && aggregationToolTip(tooltipIcon)}
      </div>
      <EuiSpacer size="s" />
      {isArray(list) &&
        list.map((obj: ConfigListEntry, index: number) => (
          <Fragment key={index}>
            <EuiPanel paddingSize="s" className="panelItem_button">
              <EuiText size="s" className="field_text">
                <EuiLink
                  role="button"
                  tabIndex={0}
                  onClick={() => handleServiceEdit(false, index, sectionName)}
                >
                  {obj[CUSTOM_LABEL] || `${isAggregation ? obj.aggregation : ''} ${obj.label}`}
                </EuiLink>
              </EuiText>
              {isAggregation ? aggregationToolTip(crossIcon(index)) : crossIcon(index)}
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
            disabled={
              (sectionName === GROUPBY && visType === VIS_CHART_TYPES.Line) ||
              visType === VIS_CHART_TYPES.Scatter
            }
            onClick={() => handleServiceAdd(sectionName)}
          />
        </EuiPanel>
      )}
      <EuiSpacer size="m" />
    </div>
  );
};
