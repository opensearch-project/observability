/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { has, isEmpty, isArray } from 'lodash';
import { IField } from 'common/types/explorer';
import {
  OBSERVABILITY_BASE,
  EVENT_ANALYTICS,
  SAVED_OBJECTS,
  SAVED_QUERY,
  SAVED_VISUALIZATION,
} from '../../../../common/constants/shared';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';

const CONCAT_FIELDS = ['objectIdList', 'objectType'];

interface ISavedObjectRequestParams {
  objectId?: string;
  objectIdList?: string[] | string;
  objectType?: string[] | string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  fromIndex?: number;
  maxItems?: number;
  name?: string;
  lastUpdatedTimeMs?: string;
  createdTimeMs?: string;
}

interface ISelectedPanelsParams {
  selectedCustomPanels: any[];
  savedVisualizationId: string;
}

interface IBulkUpdateSavedVisualizationRquest {
  query: string;
  fields: IField[];
  dateRange: string[];
  type: string;
  name: string;
  savedObjectList: any[];
}

// eslint-disable-next-line import/no-default-export
export default class SavedObjects {
  constructor(private readonly http: any) {}

  buildRequestBody({
    query,
    fields,
    dateRange,
    timestamp,
    name = '',
    chartType = '',
    description = '',
    applicationId = '',
    userConfigs = '',
    subType = '',
    unitsOfMeasure = '',
    selectedLabels,
  }: any) {
    const objRequest: any = {
      object: {
        query,
        selected_date_range: {
          start: dateRange[0] || 'now/15m',
          end: dateRange[1] || 'now',
          text: '',
        },
        selected_timestamp: {
          name: timestamp || '',
          type: 'timestamp',
        },
        selected_fields: {
          tokens: fields,
          text: '',
        },
        name: name || '',
        description: description || '',
      },
    };

    if (!isEmpty(chartType)) {
      objRequest.object.type = chartType;
    }

    if (!isEmpty(applicationId)) {
      objRequest.object.application_id = applicationId;
    }

    if (!isEmpty(userConfigs)) {
      objRequest.object.user_configs = userConfigs;
    }

    if (!isEmpty(subType)) {
      objRequest.object.sub_type = subType;
    }

    if (!isEmpty(unitsOfMeasure)) {
      objRequest.object.units_of_measure = unitsOfMeasure;
    }

    if (!isEmpty(selectedLabels)) {
      objRequest.object.selected_labels = selectedLabels;
    }

    return objRequest;
  }

  private stringifyList(targetObj: any, key: string, joinBy: string) {
    if (has(targetObj, key) && isArray(targetObj[key])) {
      targetObj[key] = targetObj[key].join(joinBy);
    }
    return targetObj;
  }

  async fetchSavedObjects(params: ISavedObjectRequestParams) {
    // turn array into string. exmaple objectType ['savedQuery', 'savedVisualization'] =>
    // 'savedQuery,savedVisualization'
    CONCAT_FIELDS.map((arrayField) => {
      this.stringifyList(params, arrayField, ',');
    });

    return await this.http.get(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}`, {
      query: {
        ...params,
      },
    });
  }

  async fetchCustomPanels() {
    return await this.http.get(`${CUSTOM_PANELS_API_PREFIX}/panels`);
  }

  async bulkUpdateCustomPanel(params: ISelectedPanelsParams) {
    const finalParams = {
      panelId: '',
      savedVisualizationId: params.savedVisualizationId,
    };

    return await Promise.all(
      params.selectedCustomPanels.map((panel) => {
        finalParams.panelId = panel.panel.id;
        return this.http.post(`${CUSTOM_PANELS_API_PREFIX}/visualizations`, {
          body: JSON.stringify(finalParams),
        });
      })
    );
  }

  async bulkUpdateSavedVisualization(params: IBulkUpdateSavedVisualizationRquest) {
    const finalParams = this.buildRequestBody({
      query: params.query,
      fields: params.fields,
      dateRange: params.dateRange,
      chartType: params.type,
      name: params.name,
    });

    return await Promise.all(
      params.savedObjectList.map((objectToUpdate) => {
        finalParams.object_id = objectToUpdate.saved_object.objectId;
        return this.http.put(
          `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_VISUALIZATION}`,
          {
            body: JSON.stringify(finalParams),
          }
        );
      })
    );
  }

  async updateSavedVisualizationById(params: any) {
    const finalParams = this.buildRequestBody({
      query: params.query,
      fields: params.fields,
      dateRange: params.dateRange,
      chartType: params.type,
      name: params.name,
      timestamp: params.timestamp,
      userConfigs: params.userConfigs,
      description: params.description,
      subType: params.subType,
      unitsOfMeasure: params.unitsOfMeasure,
      selectedLabels: params.selectedLabels
    });

    finalParams.object_id = params.objectId;

    return await this.http.put(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_VISUALIZATION}`,
      {
        body: JSON.stringify(finalParams),
      }
    );
  }

  async updateSavedQueryById(params: any) {
    const finalParams = this.buildRequestBody({
      query: params.query,
      fields: params.fields,
      dateRange: params.dateRange,
      chartType: params.type,
      name: params.name,
      timestamp: params.timestamp,
    });

    finalParams.object_id = params.objectId;

    return await this.http.put(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_QUERY}`,
      {
        body: JSON.stringify(finalParams),
      }
    );
  }

  async createSavedQuery(params: any) {
    const finalParams = this.buildRequestBody({
      query: params.query,
      fields: params.fields,
      dateRange: params.dateRange,
      name: params.name,
      timestamp: params.timestamp,
    });

    return await this.http.post(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_QUERY}`,
      {
        body: JSON.stringify(finalParams),
      }
    );
  }

  async createSavedVisualization(params: any) {
    const finalParams = this.buildRequestBody({
      query: params.query,
      fields: params.fields,
      dateRange: params.dateRange,
      chartType: params.type,
      name: params.name,
      timestamp: params.timestamp,
      applicationId: params.applicationId,
      userConfigs: params.userConfigs,
      description: params.description,
      subType: params.subType,
      unitsOfMeasure: params.unitsOfMeasure,
      selectedLabels: params.selectedLabels
    });

    return await this.http.post(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_VISUALIZATION}`,
      {
        body: JSON.stringify(finalParams),
      }
    );
  }

  async createSavedTimestamp(params: any) {
    const finalParams = {
      index: params.index,
      name: params.name,
      type: params.type,
      dsl_type: params.dsl_type,
    };

    return await this.http.post(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/timestamp`,
      {
        body: JSON.stringify(finalParams),
      }
    );
  }

  async updateTimestamp(params: any) {
    const finalParams = {
      objectId: params.index,
      timestamp: {
        name: params.name,
        index: params.index,
        type: params.type,
        dsl_type: params.dsl_type,
      },
    };
    return await this.http.put(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/timestamp`,
      {
        body: JSON.stringify(finalParams),
      }
    );
  }

  async deleteSavedObjectsList(deleteObjectRequest: any) {
    return await this.http.delete(
      `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/${deleteObjectRequest.objectIdList.join(
        ','
      )}`
    );
  }

  deleteSavedObjectsByIdList(deleteObjectRequesList: any) {}
}
