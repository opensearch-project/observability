/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import { EuiDescriptionList, EuiSpacer, EuiText } from '@elastic/eui';
import { ApplicationListType, ApplicationType } from 'common/types/app_analytics';
import { FilterType } from 'public/components/trace_analytics/components/common/filters/filters';
import React, { Dispatch, ReactChild } from 'react';
import { batch } from 'react-redux';
import { fetchVisualizationById } from '../../../components/custom_panels/helpers/utils';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';
import { VisualizationType } from '../../../../common/types/custom_panels';
import { NEW_SELECTED_QUERY_TAB, TAB_CREATED_TYPE } from '../../../../common/constants/explorer';
import { APP_ANALYTICS_API_PREFIX } from '../../../../common/constants/application_analytics';
import { HttpSetup } from '../../../../../../src/core/public';
import { init as initFields, remove as removefields } from '../../explorer/slices/field_slice';
import {
  init as initVisualizationConfig,
  reset as resetVisualizationConfig,
} from '../../explorer/slices/viualization_config_slice';
import {
  init as initQuery,
  remove as removeQuery,
  changeQuery,
} from '../../explorer/slices/query_slice';
import {
  init as initQueryResult,
  remove as removeQueryResult,
} from '../../explorer/slices/query_result_slice';
import { addTab, removeTab } from '../../explorer/slices/query_tab_slice';

// Name validation
export const isNameValid = (name: string, existingNames: string[]) => {
  const toast: string[] = [];
  if (name.length >= 50) {
    toast.push('Name must be less than 50 characters.');
  }
  if (name.trim().length === 0) {
    toast.push('Name must not be empty.');
  }
  if (existingNames.includes(name)) {
    toast.push('Name must be unique.');
  }
  return toast;
};

export const getListItem = (title: string, description: string | React.ReactElement) => {
  const titleComponent = (
    <EuiText size="s" color="subdued" style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
      {title}
    </EuiText>
  );

  const descriptionComponent = (
    <EuiText
      size="s"
      style={{ wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-line' }}
    >
      <b>{description}</b>
    </EuiText>
  );

  return (
    <div key={`list-item-${title}`}>
      <EuiDescriptionList
        listItems={[
          {
            title: titleComponent,
            description: descriptionComponent || '-',
          },
        ]}
        type="column"
        align="center"
        compressed
      />
      <EuiSpacer size="s" />
    </div>
  );
};

// Fetch application by id
export const fetchAppById = async (
  http: HttpSetup,
  applicationId: string,
  setApplication: (application: ApplicationType) => void,
  setFilters: (filters: FilterType[]) => void,
  setToasts: (title: string, color?: string, text?: ReactChild) => void
) => {
  return http
    .get(`${APP_ANALYTICS_API_PREFIX}/${applicationId}`)
    .then((res) => {
      setApplication(res.application);
      const serviceFilters = res.application.servicesEntities.map((ser: string) => {
        return {
          field: 'serviceName',
          operator: 'is',
          value: ser,
          inverted: false,
          disabled: false,
        };
      });
      const traceFilters = res.application.traceGroups.map((tra: string) => {
        return {
          field: 'traceGroup',
          operator: 'is',
          value: tra,
          inverted: false,
          disabled: false,
        };
      });
      setFilters([...serviceFilters, ...traceFilters]);
    })
    .catch((err) => {
      setToasts('Error occurred while fetching application', 'danger');
      console.error(err);
    });
};

// Remove tab data when closed
export const removeTabData = (
  dispatch: Dispatch<any>,
  TabIdToBeClosed: string,
  newIdToFocus: string
) => {
  batch(() => {
    dispatch(removeQuery({ tabId: TabIdToBeClosed }));
    dispatch(removefields({ tabId: TabIdToBeClosed }));
    dispatch(removeQueryResult({ tabId: TabIdToBeClosed }));
    dispatch(resetVisualizationConfig({ tabId: TabIdToBeClosed }));
    dispatch(
      removeTab({
        tabId: TabIdToBeClosed,
        [NEW_SELECTED_QUERY_TAB]: newIdToFocus,
      })
    );
  });
};

// Create a new tab and initialize its data
export const initializeTabData = async (dispatch: Dispatch<any>, tabId: string, where: string) => {
  await batch(() => {
    dispatch(initQuery({ tabId }));
    dispatch(initQueryResult({ tabId }));
    dispatch(initFields({ tabId }));
    dispatch(addTab({ tabId }));
    dispatch(initVisualizationConfig({ tabId }));
    dispatch(
      changeQuery({
        tabId,
        query: {
          [TAB_CREATED_TYPE]: where,
        },
      })
    );
  });
};

export const fetchPanelsVizIdList = async (http: HttpSetup, appPanelId: string) => {
  return await http
    .get(`${CUSTOM_PANELS_API_PREFIX}/panels/${appPanelId}`)
    .then((res) => {
      const visIds = res.operationalPanel.visualizations.map(
        (viz: VisualizationType) => viz.savedVisualizationId
      );
      return visIds;
    })
    .catch((err) => {
      console.error('Error occurred while fetching visualizations for panel', err);
      return [];
    });
};

export const calculateAvailability = async (http: HttpSetup, application: ApplicationListType) => {
  const panelId = application.panelId;
  if (!panelId) return '';
  // Get all visualizations for this panel
  const savedVisualizationsIds = await fetchPanelsVizIdList(http, panelId);
  if (!savedVisualizationsIds) return '';
  for (let i = 0; i < savedVisualizationsIds.length; i++) {
    const visualizationId = savedVisualizationsIds[i];
    const visData = await fetchVisualizationById(http, visualizationId, (value: string) =>
      console.error(value)
    );
    if (visData.user_configs.dataConfig?.hasOwnProperty('thresholds')) {
      const thresholds = visData.user_configs.dataConfig.thresholds;
      for (let j = 0; j < thresholds.length; j++) {
        const threshold = thresholds[j];
        // Check each visualizations for if the availability level is set
        if (threshold.hasOwnProperty('expression')) {
          // If the availability level is set then get the current value of the visualization
          return threshold.expression;
        }
      }
    }
  }

  // Use the expression (<, >, =) to evaluate the label
  // Return label if condition is met
  // If not continue to the next availability level
  return panelId;
};
