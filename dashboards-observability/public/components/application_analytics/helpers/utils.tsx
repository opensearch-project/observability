/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import { EuiDescriptionList, EuiSelectOption, EuiSpacer, EuiText } from '@elastic/eui';
import { ApplicationListType, ApplicationType } from 'common/types/app_analytics';
import { FilterType } from 'public/components/trace_analytics/components/common/filters/filters';
import React, { Dispatch, ReactChild } from 'react';
import { batch } from 'react-redux';
import PPLService from 'public/services/requests/ppl';
import { preprocessQuery } from '../../../../common/utils/query_utils';
import { SPAN_REGEX } from '../../../../common/constants/shared';
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
  pplService: PPLService,
  applicationId: string,
  setApplication: (application: ApplicationType) => void,
  setFilters: (filters: FilterType[]) => void,
  setVisWithAvailability: (visList: EuiSelectOption[]) => void,
  setToasts: (title: string, color?: string, text?: ReactChild) => void
) => {
  return http
    .get(`${APP_ANALYTICS_API_PREFIX}/${applicationId}`)
    .then(async (res) => {
      res.application.availabilityVisId = (
        await calculateAvailability(
          http,
          pplService,
          res.application,
          res.application.availabilityVisId,
          setVisWithAvailability
        )
      ).mainVisId;
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

export const calculateAvailability = async (
  http: HttpSetup,
  pplService: PPLService,
  application: ApplicationType | ApplicationListType,
  availabilityVisId: string,
  setVisWithAvailability: (visList: EuiSelectOption[]) => void
): Promise<{ name: string; color: string; mainVisId: string }> => {
  let availability = { name: '', color: '', mainVisId: '' };
  const panelId = application.panelId;
  if (!panelId) return availability;
  // Fetches saved visualizations associated to application's panel
  const savedVisualizationsIds = (await fetchPanelsVizIdList(http, panelId)).reverse();
  if (!savedVisualizationsIds) return availability;
  const visWithAvailability = [];
  let availabilityFound = false;
  for (let i = 0; i < savedVisualizationsIds.length; i++) {
    let hasAvailability = false;
    const visualizationId = savedVisualizationsIds[i];
    // Fetches data for visualization
    const visData = await fetchVisualizationById(http, visualizationId, (value: string) =>
      console.error(value)
    );
    // If there are thresholds, we get the current value
    if (visData.user_configs.dataConfig?.hasOwnProperty('thresholds')) {
      const thresholds = visData.user_configs.dataConfig.thresholds.reverse();
      let currValue = Number.MIN_VALUE;
      const finalQuery = preprocessQuery({
        rawQuery: visData.query,
        startTime: visData.selected_date_range.start,
        endTime: visData.selected_date_range.end,
        timeField: visData.timeField,
        isLiveQuery: false,
      });
      await pplService
        .fetch({
          query: finalQuery,
          format: 'viz',
        })
        .then((res) => {
          const stat = res.metadata.fields.filter(
            (field: { name: string; type: string }) => !field.name.match(SPAN_REGEX)
          )[0].name;
          const value = res.data[stat];
          currValue = value[value.length - 1];
        })
        .catch((err) => {
          console.error(err);
        });
      // We check each threshold if it has expression which means it is an availability level
      for (let j = 0; j < thresholds.length; j++) {
        const threshold = thresholds[j];
        if (threshold.hasOwnProperty('expression')) {
          hasAvailability = true;
          // If there is an availiabilityVisId selected we only want to compute availability based on that
          if (availabilityVisId ? availabilityVisId === visualizationId : true) {
            if (!availabilityFound && threshold.expression) {
              const expression = threshold.expression;
              switch (expression) {
                case '≥':
                  if (currValue >= parseFloat(threshold.value)) {
                    availability = {
                      name: threshold.name,
                      color: threshold.color,
                      mainVisId: visualizationId,
                    };
                    availabilityFound = true;
                  }
                  break;
                case '≤':
                  if (currValue <= parseFloat(threshold.value)) {
                    availability = {
                      name: threshold.name,
                      color: threshold.color,
                      mainVisId: visualizationId,
                    };
                    availabilityFound = true;
                  }
                  break;
                case '>':
                  if (currValue > parseFloat(threshold.value)) {
                    availability = {
                      name: threshold.name,
                      color: threshold.color,
                      mainVisId: visualizationId,
                    };
                    availabilityFound = true;
                  }
                  break;
                case '<':
                  if (currValue < parseFloat(threshold.value)) {
                    availability = {
                      name: threshold.name,
                      color: threshold.color,
                      mainVisId: visualizationId,
                    };
                    availabilityFound = true;
                  }
                  break;
                case '=':
                  if (currValue === parseFloat(threshold.value)) {
                    availability = {
                      name: threshold.name,
                      color: threshold.color,
                      mainVisId: visualizationId,
                    };
                    availabilityFound = true;
                  }
                  break;
                case '≠':
                  if (currValue !== parseFloat(threshold.value)) {
                    availability = {
                      name: threshold.name,
                      color: threshold.color,
                      mainVisId: visualizationId,
                    };
                    availabilityFound = true;
                  }
                  break;
              }
            }
          }
        }
      }
    }
    // For every saved visualization with availability levels we push it to visWithAvailability
    if (hasAvailability) {
      // This is used to populate the options in configuration
      visWithAvailability.push({ value: visualizationId, text: visData.name });
    }
  }
  setVisWithAvailability(visWithAvailability);
  return availability;
};
