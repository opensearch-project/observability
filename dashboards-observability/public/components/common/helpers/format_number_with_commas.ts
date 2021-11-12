/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const COMMA_SEPARATOR_RE = /(\d)(?=(\d{3})+(?!\d))/g;

/**
 * Converts a number to a string and adds commas
 * as thousands separators
 */
export const formatNumWithCommas = (input: number) =>
  String(input).replace(COMMA_SEPARATOR_RE, '$1,');
