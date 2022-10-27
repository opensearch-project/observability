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
  AGGREGATION_INFO,
  BREAKDOWNS,
  CUSTOM_LABEL,
  DIMENSION_INFO,
  GROUPBY,
  SPAN,
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
  visType,
  addButtonText,
  handleServiceAdd,
  handleServiceRemove,
  handleServiceEdit,
}: DataConfigPanelFieldProps) => {
  const isAggregation = sectionName === AGGREGATIONS;

  // The function hides the click to add button for visualizations included in the const HIDE_ADD_BUTTON_VIZ_TYPES
  const hideClickToAddButton = (name: string) => {
    // returns false when HIDE_ADD_BUTTON_VIZ_TYPES visualizations are not matching with visType.
    if (!isArray(list) || !HIDE_ADD_BUTTON_VIZ_TYPES.includes(visType)) return false;
    // condition for heatmap on the basis of section name
    if (visType === VIS_CHART_TYPES.HeatMap)
      return name === AGGREGATIONS ? list.length >= 1 : list.length >= 2;
    // condition for line and scatter for dimensions section.
    return name === GROUPBY && (list.length >= 1 || !isEmpty(time_field));
  };

  const { time_field, unit, interval } = dimensionSpan;

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

        {sectionName !== BREAKDOWNS &&
          infoToolTip(tooltipIcon, isAggregation ? AGGREGATION_INFO : DIMENSION_INFO)}
      </div>
      <EuiSpacer size="s" />
      <div className="dropBox__container">
        {sectionName === GROUPBY && dimensionSpan && !isEmpty(time_field) && (
          <EuiPanel paddingSize="s" className="panelItem_button">
            <EuiText size="s" className="field_text">
              <EuiLink
                role="button"
                tabIndex={0}
                onClick={() => handleServiceEdit(list.length - 1, GROUPBY, true)}
              >
                {`${SPAN}(${time_field[0]?.name}, ${interval} ${unit[0]?.value})`}
              </EuiLink>
            </EuiText>
            {crossIcon(-1, SPAN)}
          </EuiPanel>
        )}
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
                  ? infoToolTip(crossIcon(index, sectionName), AGGREGATION_INFO)
                  : crossIcon(index, sectionName)}
              </EuiPanel>
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
      </div>
      <EuiSpacer size="m" />
    </div>
  );
};
