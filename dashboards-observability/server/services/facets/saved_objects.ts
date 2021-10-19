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

export default class SavedObjectFacet {
  constructor(private client: any) {
    this.client = client;
  }

  fetch = async (
    request: any,
    format: string
  ) => {
    const res = {
      success: false,
      data: {}
    };
    try {
      const params = {
        ...request.url.query
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

  create = async (
    request: any,
    format: string,
    objectType: string
  ) => {
    const res = {
      success: false,
      data: {}
    };
    try {
      const params = {
        body: {
          [objectType]: {
            ...request.body.object
          }
        }
      };    
      const savedQueryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);      
      res['success'] = true;
      res['data'] = savedQueryRes;
    } catch (err: any) {
      console.error('Event analytics create error: ', err);
      res['data'] = err;
    }
    return res;
  };

  update = async (
    request: any,
    format: string,
    objectType: string
  ) => {
    const res = {
      success: false,
      data: {}
    };
    try {
      const params = {
        objectId: request.body.object_id,
        body: {              
          [objectType]: {
            ...request.body.object
          }
        }
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

  delete = async (
    request: any,
    format: string,
    objectType: string
  ) => {
    const res = {
      success: false,
      data: {}
    };
    try {
      const params = {
        objectId: request.body.object_id,
        body: {              
          [objectType]: {
            ...request.body.object
          }
        }
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

  updateSavedQuery = (request: any) => {
    return this.update(request, 'observability.updateObjectById', 'savedQuery');
  };
  
  updateSavedVisualization = (request: any) => {
    return this.update(request, 'observability.updateObjectById', 'savedVisualization');
  };

  deleteSavedQuery = async (request: any) => {
    return this.delete(request, 'observability.deleteObjectByIdList', 'savedQuery');
  };
}