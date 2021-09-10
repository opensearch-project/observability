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

import { schema } from '@osd/config-schema';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
  IScopedClusterClient,
} from '../../../../../src/core/server';
import { CUSTOM_PANELS_API_PREFIX as API_PREFIX } from '../../../common/constants/custom_panels';

export function PanelsRouter(router: IRouter) {
  // NOTE: Currently the API calls are dummy and are not connected to esclient.
  // Fetch all the custom panels available
  router.get(
    {
      path: `${API_PREFIX}/panels`,
      validate: {},
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const panelsList = [
        {
          name: 'Demo Panel 2',
          id: '2FG6FWGY5',
          dateCreated: '2021-07-19T21:01:14.871Z',
          dateModified: '2021-07-19T21:01:14.871Z',
        },
        {
          name: 'Demo Panel 1',
          id: 'AUJFBY234',
          dateCreated: '2021-07-19T21:01:14.871Z',
          dateModified: '2021-07-19T21:01:14.871Z',
        },
        {
          name: 'Demo Panel 3',
          id: 'AUJFBY674',
          dateCreated: '2021-07-19T21:01:14.871Z',
          dateModified: '2021-07-19T21:01:14.871Z',
        },
      ];
      try {
        return response.ok({
          body: {
            panels: panelsList,
          },
        });
      } catch (error) {
        console.log('Issue in fetching panels:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Fetch the required panel by id 
  // returns a panel object
  router.get(
    {
      path: `${API_PREFIX}/panels/{panelId}`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      let panelObject;
      if (request.params.panelId == '2FG6FWGY5') {
        panelObject = {
          panel: {
            name: 'Demo Panel 2',
            dateCreated: '2021-07-19T21:01:14.871Z',
            dateModified: '2021-07-19T21:01:14.871Z',
            visualizations: [
              {
                id: '1',
                title: 'Demo Viz 1',
                x: 0,
                y: 0,
                w: 4,
                h: 2,
                query:
                  'source=opensearch_dashboards_sample_data_flights | fields Carrier,Origin | where Carrier=&#39;OpenSearch-Air&#39; | stats count() by Origin',
                type: 'line',
              },
              {
                id: '2',
                title: 'Demo Viz 2',
                x: 4,
                y: 0,
                w: 4,
                h: 2,
                query:
                  'source=opensearch_dashboards_sample_data_flights | fields Carrier,Origin | where Carrier=&#39;OpenSearch-Air&#39; | stats count() by Origin',
                type: 'bar',
              },
              {
                id: '3',
                title: 'Demo Viz 3',
                x: 8,
                y: 0,
                w: 4,
                h: 2,
                query:
                  'source=opensearch_dashboards_sample_data_flights | fields Carrier,Origin | where Carrier=&#39;OpenSearch-Air&#39; | stats count() by Origin',
                type: 'bar',
              },
              {
                id: '4',
                title: 'Demo Viz 4',
                x: 0,
                y: 2,
                w: 6,
                h: 2,
                query:
                  'source=opensearch_dashboards_sample_data_flights | fields Carrier,Origin | where Carrier=&#39;OpenSearch-Air&#39; | stats count() by Origin',
                type: 'bar',
              },
              {
                id: '5',
                title: 'Demo Viz 5',
                x: 6,
                y: 2,
                w: 6,
                h: 2,
                query:
                  'source=opensearch_dashboards_sample_data_flights | fields Carrier,FlightDelayMin | stats sum(FlightDelayMin) as delays by Carrier',
                type: 'bar',
              },
            ],
            filters: [],
            timeRange: {
              to: 'now',
              from: 'now-1d',
            },
            queryFilter: {
              query: '',
              language: 'ppl',
            },
            refreshConfig: {
              pause: true,
              value: 15,
            },
          },
        };
      }
      if (request.params.panelId == 'AUJFBY234') {
        panelObject = {
          panel: {
            name: 'Demo Panel 1',
            dateCreated: '2021-07-19T21:01:14.871Z',
            dateModified: '2021-07-19T21:01:14.871Z',
            visualizations: [],
            filters: [],
            timeRange: {
              to: 'now',
              from: 'now-1d',
            },
            queryFilter: {
              query: '',
              language: 'ppl',
            },
            refreshConfig: {
              pause: true,
              value: 15,
            },
          },
        };
      }

      if (request.params.panelId == 'AUJFBY674') {
        panelObject = {
          panel: {
            name: 'Demo Panel 3',
            dateCreated: '2021-07-19T21:01:14.871Z',
            dateModified: '2021-07-19T21:01:14.871Z',
            visualizations: [],
            filters: [],
            timeRange: {
              to: 'now',
              from: 'now-1d',
            },
            queryFilter: {
              query: 'where Carrier=&#39;OpenSearch-Air&#39;',
              language: 'ppl',
            },
            refreshConfig: {
              pause: true,
              value: 15,
            },
          },
        };
      }

      try {
        return response.ok({
          body: panelObject,
        });
      } catch (error) {
        console.log('Issue in fetching panel:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // create a new panel
  // returns new Panel Id
  router.post(
    {
      path: `${API_PREFIX}/panels`,
      validate: {
        params: schema.object({
          panelName: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const newPanelId = '';

      try {
        return response.ok({
          body: {
            message: 'Panel Created',
            newPanelId: newPanelId,
          },
        });
      } catch (error) {
        console.log('Issue in creating new panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // rename an existing panel 
  router.patch(
    {
      path: `${API_PREFIX}/panels/rename`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          panelName: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const newPanelId = '';

      try {
        return response.ok({
          body: {
            message: 'Panel Renamed',
          },
        });
      } catch (error) {
        console.log('Issue in renaming panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // clones an existing panel 
  // returns new panel Id
  router.post(
    {
      path: `${API_PREFIX}/panels/clone`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          panelName: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const newPanelId = '';

      try {
        return response.ok({
          body: {
            message: 'Panel Cloned',
            newPanelId: newPanelId,
          },
        });
      } catch (error) {
        console.log('Issue in renaming panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // delete an existing panel 
  router.delete(
    {
      path: `${API_PREFIX}/panels/{panelId}`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const panelId = request.params.panelId;

      try {
        return response.noContent({
          body: {
            message: 'Panel Deleted',
          },
        });
      } catch (error) {
        console.log('Issue in deleting panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // replaces the ppl query filter in panel
  router.patch(
    {
      path: `${API_PREFIX}/panels/query`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          query: schema.string(),
          language: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const panelId = request.params.panelId;

      try {
        return response.ok({
          body: {
            message: 'Panel PPL Filter Changed',
          },
        });
      } catch (error) {
        console.log('Issue in adding query filter', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // replaces the datetime filter in panel
  router.patch(
    {
      path: `${API_PREFIX}/panels/datetime`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          to: schema.string(),
          from: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const panelId = request.params.panelId;

      try {
        return response.ok({
          body: {
            message: 'Panel DateTime Filter Changed',
          },
        });
      } catch (error) {
        console.log('Issue in adding datetime filter', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
