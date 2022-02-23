/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import { EuiDescriptionList, EuiSpacer, EuiText } from '@elastic/eui';
import { ApplicationType } from 'common/types/app_analytics';
import { FilterType } from 'public/components/trace_analytics/components/common/filters/filters';
import React, { Dispatch, ReactChild } from 'react';
import { batch } from 'react-redux';
import { NEW_SELECTED_QUERY_TAB, TAB_CREATED_TYPE } from '../../../../common/constants/explorer';
import { APP_ANALYTICS_API_PREFIX } from '../../../../common/constants/application_analytics';
import { HttpSetup } from '../../../../../../src/core/public';
import { init as initFields, remove as removefields } from '../../explorer/slices/field_slice';
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
