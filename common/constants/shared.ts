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

// Client route
export const PPL_BASE = '/api/ppl';
export const PPL_SEARCH = '/search';

// Server route
export const PPL_ENDPOINT = '/_plugins/_ppl';

export const observabilityID = 'observability';
export const observabilityTitle = 'Observability';
export const observabilityPluginOrder = 500;

// Shared Constants 
export const UI_DATE_FORMAT = 'MM/DD/YYYY hh:mm A';
export const PPL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const PPL_INDEX_REGEX = /(search source|source|index)\s*=\s*([^|\s]+)/i;
