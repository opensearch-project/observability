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
import { FlyoutContainers } from '../../helpers/flyout_containers';
import { displayVisualization, getQueryResponse, isDateValid } from '../../helpers/utils';
import { convertDateTime } from '../../helpers/utils';
import PPLService from '../../../../services/requests/ppl';
import { CoreStart } from '../../../../../../../src/core/public';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../../common/constants/custom_panels';
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
 * panelId: panel Id of current operational panel
 * closeFlyout: function to close the flyout
 * start: start time in date filter
 * end: end time in date filter
 * setToast: function to set toast in the panel
 * http: http core service
 * pplService: ppl requestor service
 * setPanelVisualizations: function set the visualization list in panel
 * isFlyoutReplacement: boolean to see if the flyout is trigger for add or replace visualization
 * replaceVisualizationId: string id of the visualization to be replaced
 */

type Props = {
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
};

export const VisaulizationFlyout = ({
  panelId,
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
}: Props) => {
  const [newVisualizationTitle, setNewVisualizationTitle] = useState('');
  const [newVisualizationType, setNewVisualizationType] = useState('');
  const [newVisualizationTimeField, setNewVisualizationTimeField] = useState('');
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
            panelId: panelId,
            savedVisualizationId: selectValue,
            oldVisualizationId: replaceVisualizationId,
          }),
        })
        .then(async (res) => {
          setPanelVisualizations(res.visualizations);
          setToast(`Visualization ${newVisualizationTitle} successfully added!`, 'success');
        })
        .catch((err) => {
          setToast(`Error in adding ${newVisualizationTitle} visualization to the panel`, 'danger');
          console.error(err);
        });
    } else {
      http
        .post(`${CUSTOM_PANELS_API_PREFIX}/visualizations`, {
          body: JSON.stringify({
            panelId: panelId,
            savedVisualizationId: selectValue,
          }),
        })
        .then(async (res) => {
          setPanelVisualizations(res.visualizations);
          setToast(`Visualization ${newVisualizationTitle} successfully added!`, 'success');
        })
        .catch((err) => {
          setToast(`Error in adding ${newVisualizationTitle} visualization to the panel`, 'danger');
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
    <EuiFormRow label="Panel Time Range" fullWidth>
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
          {isFlyoutReplacement ? 'Replace Visualization' : 'Select Existing Visualization'}
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
          <div>
            You don't have any saved visualizations. Please use the "create new visualization"
            option in add visualization menu.
          </div>
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
          setVisualizationOptions(
            res.visualizations.map((visualization: SavedVisualizationType) => {
              return { value: visualization.id, text: visualization.name };
            })
          );
        }
      })
      .catch((err) => {
        console.error('Issue in fetching the operational panels', err);
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
            ) : isPreviewError != '' ? (
              <div className="visualization-error-div-preview">
                <EuiSpacer size="l" />
                <EuiIcon type="alert" color="danger" size="l" />
                <EuiSpacer size="l" />
                <EuiText>
                  <h2>Error in rendering the visualizaiton</h2>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiText>
                  <p>{isPreviewError}</p>
                </EuiText>
              </div>
            ) : (
              <div className="visualization-div-preview">
                {displayVisualization(previewData, newVisualizationType)}
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
    for (var i = 0; i < savedVisualizations.length; i++) {
      const visualization = savedVisualizations[i];
      if (visualization.id === selectValue) {
        setPPLQuery(visualization.query);
        setNewVisualizationTitle(visualization.name);
        setNewVisualizationType(visualization.type);
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
