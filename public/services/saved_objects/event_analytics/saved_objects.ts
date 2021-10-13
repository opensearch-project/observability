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
  has,
  isEmpty,
  isArray
} from 'lodash';
import { htmlIdGenerator } from '@elastic/eui';
import { 
  OBSERVABILITY_BASE,
  EVENT_ANALYTICS,
  SAVED_OBJECTS,
  SAVED_QUERY,
  SAVED_VISUALIZATION
} from '../../../../common/constants/shared';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';
import { IField } from 'common/types/explorer';

const CONCAT_FIELDS = ['objectIdList', 'objectType'];

interface ISavedObjectRequestParams {
  objectId?: string;
  objectIdList?: Array<string> | string;
  objectType?: Array<string> | string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  fromIndex?: number;
  maxItems?: number;
  name?: string;
  lastUpdatedTimeMs?: string;
  createdTimeMs?: string;
}

interface ISelectedPanelsParams {
  selectedCustomPanels: Array<any>
  name: string;
  query: string;
  type: string;
  timeField: string;
}

interface IBulkUpdateSavedVisualizationRquest {
  query: string;
  fields: Array<IField>;
  dateRange: Array<string>;
  type: string;
  name: string;
  savedObjectList: Array<any>;
}

export default class SavedObjects {
  
  constructor(private readonly http: any) {}

  buildRequestBody ({
    query,
    fields,
    dateRange,
    name = '',
    chartType = '',
    description = ''
  }: any) {

    const objRequest = {
      object: {
        query,
        selected_date_range: {
          start: dateRange[0] || 'now/15m',
          end: dateRange[1] || 'now',
          text: ''
        },
        selected_fields: {
          tokens: fields,
          text: ''
        },
        name: name || '',
        description: description || ''
      }
    };

    if (!isEmpty(chartType)) {
      objRequest['object']['type'] = chartType;
    }

    return objRequest;
  }

  private stringifyList(
    targetObj: any,
    key: string,
    joinBy: string
  ) {
    if (has(targetObj, key) && isArray(targetObj[key])) {
      targetObj[key] = targetObj[key].join(joinBy);
    }
    return targetObj;
  }
  
  async fetchSavedObjects(savedObjectRequestParams: ISavedObjectRequestParams) {

    // turn array into string. exmaple objectType ['savedQuery', 'savedVisualization'] =>
    // 'savedQuery,savedVisualization'
    CONCAT_FIELDS.map((arrayField) => {
      this.stringifyList(
        savedObjectRequestParams,
        arrayField,
        ','
      );
    });

    const res = await this.http.get(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}`, 
      {
        query: {
          ...savedObjectRequestParams
        },
      }
    ).catch((error: any) => console.log(error));

    return res;
  }

  async fetchCustomPanels() {
    return await this.http.get(`${CUSTOM_PANELS_API_PREFIX}/panels`).catch((error: any) => console.log(error));
  }

  async bulkUpdateCustomPanel (selectedPanelsParams: ISelectedPanelsParams) {
    const finalParams = {
      panelId: '',
      newVisualization: {
        id: `panelViz_'${htmlIdGenerator()()}`,
        title: selectedPanelsParams['name'],
        query: selectedPanelsParams['query'],
        type: selectedPanelsParams['type'],
        timeField: selectedPanelsParams['timeField']
      }
    };

    const responses = await Promise.all(
      selectedPanelsParams['selectedCustomPanels'].map((panel) => {
        finalParams['panelId'] = panel['panel']['id'];
        return this.http.post(`${CUSTOM_PANELS_API_PREFIX}/visualizations/event_explorer`, {
          body: JSON.stringify(finalParams)
        });
      })
    ).catch((error) => {});

  };

  async bulkUpdateSavedVisualization(bulkUpdateSavedVisualizationRquest: IBulkUpdateSavedVisualizationRquest) {

    const finalParams = this.buildRequestBody({
      query: bulkUpdateSavedVisualizationRquest['query'],
      fields: bulkUpdateSavedVisualizationRquest['fields'],
      dateRange: bulkUpdateSavedVisualizationRquest['dateRange'],
      chartType: bulkUpdateSavedVisualizationRquest['type'],
      name: bulkUpdateSavedVisualizationRquest['name']
    });

    const responses = await Promise.all(
      bulkUpdateSavedVisualizationRquest.savedObjectList.map((objectToUpdate) => {
        finalParams['object_id'] = objectToUpdate['saved_object']['objectId'];
        return this.http.put(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_VISUALIZATION}`, {
          body: JSON.stringify(finalParams)
        });
      })
    ).catch((error) => {});
  }

  async updateSavedVisualizationById(updateVisualizationRequest: any) {
    const finalParams = this.buildRequestBody({
      query: updateVisualizationRequest['query'],
      fields: updateVisualizationRequest['fields'],
      dateRange: updateVisualizationRequest['dateRange'],
    });

    finalParams['object_id'] = updateVisualizationRequest['objectId'];

    return await this.http.post(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_QUERY}`, {
      body: JSON.stringify(finalParams)
    }).catch((error: any) => console.log(error));

  }

  async updateSavedQueryById(updateQueryRequest: any) {
    const finalParams = this.buildRequestBody({
      query: updateQueryRequest['query'],
      fields: updateQueryRequest['fields'],
      dateRange: updateQueryRequest['dateRange'],
      name: "get all"
    });

    finalParams['object_id'] = updateQueryRequest['objectId'];

    return await this.http.put(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_QUERY}`, {
      body: JSON.stringify(finalParams)
    }).catch((error: any) => console.log(error));
  }

  async createSavedQuery(createQueryRequest: any) {

    console.log('createQueryRequest from create query: ', createQueryRequest);
    
    const finalParams = this.buildRequestBody({
      query: createQueryRequest['query'],
      fields: createQueryRequest['fields'],
      dateRange: createQueryRequest['dateRange'],
      name: createQueryRequest['name']
    });

    return await this.http.post(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_QUERY}`, {
      body: JSON.stringify(finalParams)
    }).catch((error: any) => console.log(error));
  }

  async createSavedVisualization(createVisualizationRequest: any) {

    console.log('createVisualizationRequest: ', createVisualizationRequest);

    const finalParams = this.buildRequestBody({
      query: createVisualizationRequest['query'],
      fields: createVisualizationRequest['fields'],
      dateRange: createVisualizationRequest['dateRange'],
      chartType: createVisualizationRequest['type'],
      name: createVisualizationRequest['name']
    });

    return await this.http.post(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_VISUALIZATION}`, {
      body: JSON.stringify(finalParams)
    }).catch((error: any) => console.log(error));
  }

  deleteSavedObjectsById(deleteObjectRequest: any) {}

  deleteSavedObjectsByIdList(deleteObjectRequesList: any) {}

}