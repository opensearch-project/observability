/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EuiButton,
  EuiButtonIcon,
  EuiCallOut,
  EuiDatePicker,
  EuiDatePickerRange,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiFormRow,
  EuiIcon,
  EuiLoadingChart,
  EuiSelect,
  EuiSelectOption,
  EuiSpacer,
  EuiText,
  EuiTitle,
  ShortDate,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FlyoutContainers } from '../../../common/flyout_containers';
import { displayVisualization, getQueryResponse, isDateValid } from '../../helpers/utils';
import { convertDateTime } from '../../helpers/utils';
import PPLService from '../../../../services/requests/ppl';
import { CoreStart } from '../../../../../../../src/core/public';
import {
  CUSTOM_PANELS_API_PREFIX,
  DASHBOARD_TITLE,
} from '../../../../../common/constants/dashboards';
import {
  pplResponse,
  SavedVisualizationType,
  VisualizationType,
} from '../../../../../common/types/custom_panels';
import './visualization_flyout.scss';
import { uiSettingsService } from '../../../../../common/utils';

/*
 * VisaulizationFlyout - This module create a flyout to add visualization
 *
 * Props taken in as params are:
 * panelId: dashboards Id of current Dashboards
 * closeFlyout: function to close the flyout
 * start: start time in date filter
 * end: end time in date filter
 * setToast: function to set toast in the dashboards
 * http: http core service
 * pplService: ppl requestor service
 * setPanelVisualizations: function set the visualization list in dashboards
 * isFlyoutReplacement: boolean to see if the flyout is trigger for add or replace visualization
 * replaceVisualizationId: string id of the visualization to be replaced
 */

interface VisualizationFlyoutProps {
  panelId: string;
  pplFilterValue: string;
  closeFlyout: () => void;
  start: ShortDate;
  end: ShortDate;
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void;
  http: CoreStart['http'];
  pplService: PPLService;
  setPanelVisualizations: React.Dispatch<React.SetStateAction<VisualizationType[]>>;
  isFlyoutReplacement?: boolean | undefined;
  replaceVisualizationId?: string | undefined;
  appId?: string;
}

export const VisaulizationFlyout = ({
  panelId,
  appId = '',
  pplFilterValue,
  closeFlyout,
  start,
  end,
  setToast,
  http,
  pplService,
  setPanelVisualizations,
  isFlyoutReplacement,
  replaceVisualizationId,
}: VisualizationFlyoutProps) => {
  const [newVisualizationTitle, setNewVisualizationTitle] = useState('');
  const [newVisualizationType, setNewVisualizationType] = useState('');
  const [newVisualizationTimeField, setNewVisualizationTimeField] = useState('');
  const [previewMetaData, setPreviewMetaData] = useState<SavedVisualizationType>();
  const [pplQuery, setPPLQuery] = useState('');
  const [previewData, setPreviewData] = useState<pplResponse>({} as pplResponse);
  const [previewArea, setPreviewArea] = useState(<></>);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPreviewError, setIsPreviewError] = useState('');
  const [savedVisualizations, setSavedVisualizations] = useState<SavedVisualizationType[]>([]);
  const [visualizationOptions, setVisualizationOptions] = useState<EuiSelectOption[]>([]);
  const [selectValue, setSelectValue] = useState('');

  // DateTimePicker States
  const startDate = convertDateTime(start, true, false);
  const endDate = convertDateTime(end, false, false);

  const isInputValid = () => {
    if (!isDateValid(convertDateTime(start), convertDateTime(end, false), setToast, 'left')) {
      return false;
    }

    if (selectValue === '') {
      setToast('Please make a valid selection', 'danger', undefined, 'left');
      return false;
    }

    return true;
  };

  const addVisualization = () => {
    if (!isInputValid()) return;

    if (isFlyoutReplacement) {
      http
        .post(`${CUSTOM_PANELS_API_PREFIX}/visualizations/replace`, {
          body: JSON.stringify({
            panelId,
            savedVisualizationId: selectValue,
            oldVisualizationId: replaceVisualizationId,
          }),
        })
        .then(async (res) => {
          setPanelVisualizations(res.visualizations);
          setToast(`Visualization ${newVisualizationTitle} successfully added!`, 'success');
        })
        .catch((err) => {
          setToast(
            `Error in adding ${newVisualizationTitle} visualization to the ${DASHBOARD_TITLE}`,
            'danger'
          );
          console.error(err);
        });
    } else {
      http
        .post(`${CUSTOM_PANELS_API_PREFIX}/visualizations`, {
          body: JSON.stringify({
            panelId,
            savedVisualizationId: selectValue,
          }),
        })
        .then(async (res) => {
          setPanelVisualizations(res.visualizations);
          setToast(`Visualization ${newVisualizationTitle} successfully added!`, 'success');
        })
        .catch((err) => {
          setToast(
            `Error in adding ${newVisualizationTitle} visualization to the ${DASHBOARD_TITLE}`,
            'danger'
          );
          console.error(err);
        });
    }
    closeFlyout();
  };

  const onRefreshPreview = () => {
    if (!isInputValid()) return;

    getQueryResponse(
      pplService,
      pplQuery,
      newVisualizationType,
      start,
      end,
      setPreviewData,
      setPreviewLoading,
      setIsPreviewError,
      pplFilterValue,
      newVisualizationTimeField
    );
  };

  const timeRange = (
    <EuiFormRow label={`${DASHBOARD_TITLE} Time Range`} fullWidth>
      <EuiDatePickerRange
        className="date-picker-preview"
        fullWidth
        readOnly
        startDateControl={
          <EuiDatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            isInvalid={startDate > endDate}
            aria-label="Start date"
            dateFormat={uiSettingsService.get('dateFormat')}
          />
        }
        endDateControl={
          <EuiDatePicker
            selected={endDate}
            startDate={startDate}
            endDate={endDate}
            isInvalid={startDate > endDate}
            aria-label="End date"
            dateFormat={uiSettingsService.get('dateFormat')}
          />
        }
      />
    </EuiFormRow>
  );

  const flyoutHeader = (
    <EuiFlyoutHeader hasBorder>
      <EuiTitle size="m">
        <h2 id="addVisualizationFlyout">
          {isFlyoutReplacement ? 'Replace visualization' : 'Select existing visualization'}
        </h2>
      </EuiTitle>
    </EuiFlyoutHeader>
  );

  const onChangeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const emptySavedVisualizations = (
    <EuiCallOut iconType="help">
      <p>No saved visualizations found!</p>
    </EuiCallOut>
  );

  const flyoutBody =
    savedVisualizations.length > 0 ? (
      <EuiFlyoutBody>
        <>
          <EuiSpacer size="s" />
          <EuiFormRow label="Visualization name">
            <EuiSelect
              hasNoInitialSelection
              onChange={(e) => onChangeSelection(e)}
              options={visualizationOptions}
              value={selectValue}
            />
          </EuiFormRow>
          <EuiSpacer size="l" />
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText grow={false}>
                <h4>Preview</h4>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                aria-label="refreshPreview"
                iconType="refresh"
                onClick={onRefreshPreview}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="s" />
          {previewArea}
        </>
      </EuiFlyoutBody>
    ) : (
      <EuiFlyoutBody banner={emptySavedVisualizations}>
        <>
          <div>{'Please use the "create new visualization" option in add visualization menu.'}</div>
        </>
      </EuiFlyoutBody>
    );

  const flyoutFooter = (
    <EuiFlyoutFooter>
      <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={closeFlyout}>Cancel</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={addVisualization} fill>
            Add
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlyoutFooter>
  );

  // Fetch all saved visualizations
  const fetchSavedVisualizations = async () => {
    return http
      .get(`${CUSTOM_PANELS_API_PREFIX}/visualizations`)
      .then((res) => {
        if (res.visualizations.length > 0) {
          setSavedVisualizations(res.visualizations);
          const filterAppVis = res.visualizations.filter((vis: SavedVisualizationType) => {
            return appId
              ? vis.hasOwnProperty('application_id')
                ? vis.application_id === appId
                : false
              : !vis.hasOwnProperty('application_id');
          });
          setVisualizationOptions(
            filterAppVis.map((visualization: SavedVisualizationType) => {
              return { value: visualization.id, text: visualization.name };
            })
          );
        }
      })
      .catch((err) => {
        console.error(`Issue in fetching the ${DASHBOARD_TITLE}`, err);
      });
  };

  useEffect(() => {
    const previewTemplate = (
      <>
        {timeRange}
        <EuiFlexGroup>
          <EuiFlexItem>
            {previewLoading ? (
              <EuiLoadingChart size="xl" mono className="visualization-loading-chart-preview" />
            ) : isPreviewError !== '' ? (
              <div className="visualization-error-div-preview">
                <EuiIcon type="alert" color="danger" size="s" />
                <EuiSpacer size="s" />
                <EuiText size="s">
                  <p>{isPreviewError}</p>
                </EuiText>
              </div>
            ) : (
              <div className="visualization-div-preview">
                {displayVisualization(previewMetaData, previewData, newVisualizationType)}
              </div>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    );
    setPreviewArea(previewTemplate);
  }, [previewLoading]);

  // On change of selected visualization change options
  useEffect(() => {
    for (let i = 0; i < savedVisualizations.length; i++) {
      const visualization = savedVisualizations[i];
      if (visualization.id === selectValue) {
        setPPLQuery(visualization.query);
        setNewVisualizationTitle(visualization.name);
        setNewVisualizationType(visualization.type);
        setPreviewMetaData(visualization);
        setNewVisualizationTimeField(visualization.timeField);
        break;
      }
    }
  }, [selectValue]);

  // load saved visualizations
  useEffect(() => {
    fetchSavedVisualizations();
  }, []);

  return (
    <FlyoutContainers
      closeFlyout={closeFlyout}
      flyoutHeader={flyoutHeader}
      flyoutBody={flyoutBody}
      flyoutFooter={flyoutFooter}
      ariaLabel="addVisualizationFlyout"
    />
  );
};
