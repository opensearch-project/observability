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

export const PLUGIN_ID = 'notebooks-dashboards';
export const PLUGIN_NAME = 'Notebooks';
export const API_PREFIX = '/api/notebooks';
export const SELECTED_BACKEND = 'DEFAULT'; // ZEPPELIN || DEFAULT
export const DATE_FORMAT = 'MM/DD/YYYY hh:mm A';
export const FETCH_SIZE = 1000;
export const CREATE_NOTE_MESSAGE = 'Enter a name to describe the purpose of this notebook.';
export const DOCUMENTATION_URL = 'https://opensearch.org/docs/dashboards/notebooks/';

export const zeppelinURL = 'http://localhost:8080';

export const wreckOptions = {
  baseUrl: zeppelinURL,
  headers: { 'Content-Type': 'application/json' },
};

const BASE_NOTEBOOKS_URI = '/_plugins/_notebooks';
export const OPENSEARCH_NOTEBOOKS_API = {
  GET_NOTEBOOKS: `${BASE_NOTEBOOKS_URI}/notebooks`,
  NOTEBOOK: `${BASE_NOTEBOOKS_URI}/notebook`,
};
