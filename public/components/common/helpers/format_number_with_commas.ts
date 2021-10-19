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

const COMMA_SEPARATOR_RE = /(\d)(?=(\d{3})+(?!\d))/g;

/**
 * Converts a number to a string and adds commas
 * as thousands separators
 */
export const formatNumWithCommas = (input: number) =>
  String(input).replace(COMMA_SEPARATOR_RE, '$1,');
