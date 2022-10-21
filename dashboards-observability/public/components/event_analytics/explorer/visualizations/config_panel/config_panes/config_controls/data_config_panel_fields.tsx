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
import { isArray, isEmpty } from 'lodash';
import {
  AGGREGATIONS,
  CUSTOM_LABEL,
  GROUPBY,
  REQUIRED_FIELDS,
  SPAN,
  DATA_CONFIG_HINTS_INFO
} from '../../../../../../../../common/constants/explorer';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';
import {
  ConfigListEntry,
  DataConfigPanelFieldProps,
} from '../../../../../../../../common/types/explorer';

const HIDE_ADD_BUTTON_VIZ_TYPES = [
  VIS_CHART_TYPES.HeatMap,
  VIS_CHART_TYPES.Line,
  VIS_CHART_TYPES.Scatter,
];

export const DataConfigPanelFields = ({
  list,
  dimensionSpan,
  sectionName,
  isSpanError,
  visType,
  addButtonText,
  handleServiceAdd,
  handleServiceRemove,
  handleServiceEdit,
}: DataConfigPanelFieldProps) => {
  const isAggregation = sectionName === AGGREGATIONS;
  const { time_field } = dimensionSpan;

  // The function hides the click to add button for visualizations included in the const HIDE_ADD_BUTTON_VIZ_TYPES
  const hideClickToAddButton = (name: string) => {
    // returns false when HIDE_ADD_BUTTON_VIZ_TYPES visualizations are not matching with visType.
    if (!isArray(list) || !HIDE_ADD_BUTTON_VIZ_TYPES.includes(visType)) return false;
    // condition for heatmap on the basis of section name
    if (visType === VIS_CHART_TYPES.HeatMap)
      return name === AGGREGATIONS ? list.length >= 1 : list.length >= 2;
  };

  const tooltipIcon = <EuiIcon type="iInCircle" color="text" size="m" className="info-icon" />;
  const crossIcon = (index: number, configName: string) => (
    <EuiButtonIcon
      color="subdued"
      iconType="cross"
      aria-label="clear-field"
      iconSize="s"
      onClick={() => handleServiceRemove(index, configName)}
    />
  );

  const infoToolTip = (iconToDisplay: JSX.Element, content: string) => (
    <EuiToolTip
      position="right"
      content={content}
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
        {infoToolTip(tooltipIcon, DATA_CONFIG_HINTS_INFO[`${sectionName}`])}
      </div>
      <EuiSpacer size="s" />
      {sectionName === GROUPBY && dimensionSpan && !isEmpty(time_field) && (
        <>
          <EuiPanel paddingSize="s" className={isSpanError ? 'error_panel' : 'panelItem_button'}>
            <EuiText size="s" className="field_text">
              <EuiLink
                role="button"
                tabIndex={0}
                onClick={() => handleServiceEdit(list.length, GROUPBY, true)}
              >
                {`${time_field[0]?.name}`}
              </EuiLink>
            </EuiText>
            {crossIcon(-1, SPAN)}
          </EuiPanel>
          {isSpanError && (
            <EuiText size="xs" color="danger">
              {REQUIRED_FIELDS}
            </EuiText>
          )}
        </>
      )}
      <EuiSpacer size="s" />
      {isArray(list) &&
        list.map((obj: ConfigListEntry, index: number) => (
          <Fragment key={index}>
            <EuiPanel paddingSize="s" className="panelItem_button">
              <EuiText size="s" className="field_text">
                <EuiLink
                  role="button"
                  tabIndex={0}
                  onClick={() => handleServiceEdit(index, sectionName, false)}
                >
                  {obj[CUSTOM_LABEL] || `${isAggregation ? obj.aggregation : ''} ${obj.label}`}
                </EuiLink>
              </EuiText>
              {isAggregation
                ? infoToolTip(crossIcon(index, sectionName), DATA_CONFIG_HINTS_INFO[AGGREGATIONS])
                : crossIcon(index, sectionName)}
            </EuiPanel>
            <EuiSpacer size="s" />
          </Fragment>
        ))}
      {!hideClickToAddButton(sectionName) && (
        <EuiPanel className="panelItem_button" grow>
          <EuiText size="s">{addButtonText}</EuiText>
          <EuiButtonIcon
            iconType="plusInCircle"
            aria-label="add-field"
            iconSize="s"
            color="primary"
            onClick={() => handleServiceAdd(sectionName)}
          />
        </EuiPanel>
      )}
      <EuiSpacer size="m" />
    </div>
  );
};
