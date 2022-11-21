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
  DATA_CONFIG_HINTS_INFO,
} from '../../../../../../../../common/constants/explorer';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';
import {
  ConfigListEntry,
  DataConfigPanelFieldProps,
} from '../../../../../../../../common/types/explorer';

const { HeatMap, Line, Scatter } = VIS_CHART_TYPES;
const HIDE_ADD_BUTTON_VIZ_TYPES = [HeatMap, Line, Scatter];

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
    // condition for line and scatter for dimensions section.
    return name === GROUPBY && (list.length >= 1 || !isEmpty(time_field));
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

  const getPanelItem = (
    index: number,
    title: string,
    icon: JSX.Element,
    isTimeStamp: boolean = false
  ) => (
    <>
      <EuiPanel paddingSize="s" className="panelItem_button">
        <EuiText size="s" className="field_text">
          <EuiLink
            role="button"
            tabIndex={0}
            onClick={() =>
              handleServiceEdit(index, isTimeStamp ? GROUPBY : sectionName, isTimeStamp)
            }
          >
            {title}
          </EuiLink>
        </EuiText>
        {icon}
      </EuiPanel>
      {isTimeStamp && isSpanError && (
        <EuiText size="xs" color="danger">
          {REQUIRED_FIELDS}
        </EuiText>
      )}
      <EuiSpacer size="s" />
    </>
  );

  const getAddButton = () => (
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
      {sectionName === GROUPBY &&
        dimensionSpan &&
        !isEmpty(time_field) &&
        getPanelItem(
          !isEmpty(time_field) ? list.length + 1 : list.length,
          `${time_field[0]?.type}`,
          crossIcon(-1, SPAN),
          true
        )}
      {isArray(list) &&
        list.map((obj: ConfigListEntry, index: number) => (
          <Fragment key={index}>
            {getPanelItem(
              index,
              obj[CUSTOM_LABEL] || `${isAggregation ? obj.aggregation : ''} ${obj.label}`,
              isAggregation
                ? infoToolTip(crossIcon(index, sectionName), DATA_CONFIG_HINTS_INFO[AGGREGATIONS])
                : crossIcon(index, sectionName)
            )}
          </Fragment>
        ))}
      {!hideClickToAddButton(sectionName) && getAddButton()}
      <EuiSpacer size="m" />
    </div>
  );
};
