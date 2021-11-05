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

import { sampleVisualizationSet1 } from '../../common/helpers/events_explorer/sample_savedObjects';

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
      res['data'] = err;
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
      res['data'] = err;
    }
    return res;
  };

  delete = async (request: any, format: string, objectType: string) => {
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
      console.error('Event analytics delete error: ', err);
      res['data'] = err;
    }
    return res;
  };

  createSamples = async (request: any, format: string) => {
    const res = {
      success: false,
      data: {},
    };
    try {
      let savedRes: any[] = [];

      // TODO: add support for samples in event analytics
      if (request.params.sampleRequestor === 'panels') {
        for (var i = 0; i < sampleVisualizationSet1.length; i++) {
          const params = {
            body: {
              savedVisualization: {
                ...sampleVisualizationSet1[i],
              },
            },
          };
          const savedVizRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
          savedRes.push(savedVizRes.objectId);
        }
      }

      res['success'] = true;
      res['data'] = { savedObjectIds: savedRes };
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

  deleteSavedQuery = async (request: any) => {
    return this.delete(request, 'observability.deleteObjectByIdList', 'savedQuery');
  };

  createSampleSavedObjects = async (request: any) => {
    return this.createSamples(request, 'observability.createObject');
  };
}
