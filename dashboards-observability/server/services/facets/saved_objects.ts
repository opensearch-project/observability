/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  sampleQueries,
  sampleVisualizations,
} from '../../common/helpers/events_explorer/sample_savedObjects';

export default class SavedObjectFacet {
  constructor(private client: any) {
    this.client = client;
  }

  fetch = async (request: any, format: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      const params = {
        ...request.url.query,
      };
      const savedQueryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      res['success'] = true;
      res['data'] = savedQueryRes;
    } catch (err: any) {
      console.error('Event analytics fetch error: ', err);
      res['data'] = err;
    }
    return res;
  };

  create = async (request: any, format: string, objectType: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      const params = {
        body: {
          [objectType]: {
            ...request.body.object,
          },
        },
      };
      const savedRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      res['success'] = true;
      res['data'] = savedRes;
    } catch (err: any) {
      console.error('Event analytics create error: ', err);
      res['data'] = err;
    }
    return res;
  };

  createTimestamp = async (request: any, format: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      const params = {
        body: {
          objectId: request.body.index,
          timestamp: {
            ...request.body,
          },
        },
      };
      const savedRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      res['success'] = true;
      res['data'] = savedRes;
    } catch (err: any) {
      console.error('Event analytics create timestamp error: ', err);
      res['data'] = err;
    }
    return res;
  };

  updateTimestamp = async (request: any, format: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      const params = {
        objectId: request.body.objectId,
        body: {
          ...request.body,
        },
      };
      const savedQueryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      res['success'] = true;
      res['data'] = savedQueryRes;
    } catch (err: any) {
      console.error('Event analytics update error: ', err);
      res['data'] = err.message;
    }
    return res;
  };

  update = async (request: any, format: string, objectType: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      const params = {
        objectId: request.body.object_id,
        body: {
          [objectType]: {
            ...request.body.object,
          },
        },
      };
      const savedQueryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      res['success'] = true;
      res['data'] = savedQueryRes;
    } catch (err: any) {
      console.error('Event analytics update error: ', err);
      res['data'] = err.message;
    }
    return res;
  };

  delete = async (request: any, format: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      const params = {
        objectIdList: request.params.objectIdList,
      };
      const savedQueryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      res['success'] = true;
      res['data'] = savedQueryRes;
    } catch (err: any) {
      console.error('Event analytics delete error: ', err);
      res['data'] = err.message;
    }
    return res;
  };

  createSamples = async (request: any, format: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      let savedVizIds: any[] = [];
      let savedQueryIds: any[] = [];

      if (['panels', 'event_analytics'].includes(request.params.sampleRequestor)) {
        for (var i = 0; i < sampleVisualizations.length; i++) {
          const params = {
            body: {
              savedVisualization: {
                ...sampleVisualizations[i],
              },
            },
          };
          const savedVizRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
          savedVizIds.push(savedVizRes.objectId);
        }

        for (var i = 0; i < sampleQueries.length; i++) {
          const params = {
            body: {
              savedQuery: {
                ...sampleQueries[i],
              },
            },
          };
          const savedQueryRes = await this.client
            .asScoped(request)
            .callAsCurrentUser(format, params);
          savedQueryIds.push(savedQueryRes.objectId);
        }
      }

      res['success'] = true;
      res['data'] = { savedVizIds: savedVizIds, savedQueryIds: savedQueryIds };
    } catch (err: any) {
      console.error('Event analytics create error: ', err);
      res['data'] = err;
    }
    return res;
  };

  getSavedQuery = async (request: any) => {
    return this.fetch(request, 'observability.getObject');
  };

  getSavedVisualization = async (request: any) => {
    return this.fetch(request, 'observability.getObject');
  };

  createSavedQuery = async (request: any) => {
    return this.create(request, 'observability.createObject', 'savedQuery');
  };

  createSavedVisualization = (request: any) => {
    return this.create(request, 'observability.createObject', 'savedVisualization');
  };

  createSavedTimestamp = (request: any) => {
    return this.createTimestamp(request, 'observability.createObject');
  };

  updateSavedTimestamp = (request: any) => {
    return this.updateTimestamp(request, 'observability.updateObjectById');
  };

  updateSavedQuery = (request: any) => {
    return this.update(request, 'observability.updateObjectById', 'savedQuery');
  };

  updateSavedVisualization = (request: any) => {
    return this.update(request, 'observability.updateObjectById', 'savedVisualization');
  };

  deleteSavedObject = async (request: any) => {
    return this.delete(request, 'observability.deleteObjectByIdList');
  };

  createSampleSavedObjects = async (request: any) => {
    return this.createSamples(request, 'observability.createObject');
  };
}
