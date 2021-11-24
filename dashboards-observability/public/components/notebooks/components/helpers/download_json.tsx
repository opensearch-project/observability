/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Helper function to create download object
export function onDownload(content: any, fileName: string) {
  let dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content));
  let downloadElement = document.createElement('a');
  downloadElement.setAttribute('href', dataUri);
  downloadElement.setAttribute('download', fileName);
  downloadElement.click();
}
