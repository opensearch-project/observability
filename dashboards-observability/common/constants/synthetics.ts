/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const SOURCE_SYNTHETICS_LOGS = 'observability-synthetics-logs';
export const START_TIME_FIELD = 'startTime';
export const URL_FIELD = 'url';
export const STATUS_FIELD = 'status';
export const STATUS_CODE_FIELD = 'response.status';
export const TEST_SUITE_NAME_FIELD = 'testSuiteName';
export const DOWNLOAD_TIME_FIELD = 'downloadTimeMs';
export const FILTER_UP = "'UP'";
export const FILTER_DOWN = "'DOWN'";

export const TABLE_REFRESH_INTERVAL_TIME = 50000; // 50 seconds

export const TIMING_FIELDS = [
  'starttransferTimeMs',
  'pretransferTimeMs',
  'sslTimeMs',
  'redirectTimeMs',
  'connectionTimeMs',
  'dnsTimeMs',
];
export const REDIRECT_TIMING_FIELD = 'redirectTimeMs';
export const STARTTRANSFER_TIMING_FIELD = 'starttransferTimeMs';
export const CONTENT_SIZE_FIELD = 'contentSizeKB';
export const DOWNLOAD_SPEED_FIELD = 'speedDownloadBytesPerSec';
export const PRIMARY_IP_FIELD = 'primaryIP';