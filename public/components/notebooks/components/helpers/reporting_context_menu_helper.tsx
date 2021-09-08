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

import { parse } from "url";

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

const getReportSourceURL = (baseURI: string) => {
  return baseURI.substr(baseURI.lastIndexOf('/') + 1, baseURI.length);
}

export const readDataReportToFile = async (
  stream: string,
  fileFormat: string,
  fileName: string
) => {
  const blob = new Blob([stream]);
  const url = URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getFileFormatPrefix = (fileFormat: string) => {
  var fileFormatPrefix = 'data:' + fileFormat + ';base64,';
  return fileFormatPrefix;
};

const readStreamToFile = async (
  stream: string,
  fileFormat: string,
  fileName: string
) => {
  let link = document.createElement('a');
  if (fileName.includes('csv')) {
    readDataReportToFile(stream, fileFormat, fileName);
    return;
  }
  let fileFormatPrefix = getFileFormatPrefix(fileFormat);
  let url = fileFormatPrefix + stream;
  if (typeof link.download !== 'string') {
    window.open(url, '_blank');
    return;
  }
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

async function getTenantInfoIfExists() {
  const res = await fetch(`../api/v1/multitenancy/tenant`, {
    headers: {
      'Content-Type': 'application/json',
      'osd-xsrf': 'true',
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
      pragma: 'no-cache',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
    },
    method: 'GET',
    referrerPolicy: 'strict-origin-when-cross-origin',
    mode: 'cors',
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 404) {
        // endpoint doesn't exist, security plugin is not enabled.
        return undefined;
      } else {
        return response.text();
      }
    })
    .then((tenant) => {
      if (tenant === '') {
        tenant = 'global';
      } else if (tenant === '__user__') {
        tenant = 'private';
      }
      return tenant;
    });

  return res;
}

function addTenantToURL(url, userRequestedTenant) {
  // build fake url from relative url
  const fakeUrl = `http://opensearch.com${url}`;
  const tenantKey = 'security_tenant';
  const tenantKeyAndValue =
    tenantKey + '=' + encodeURIComponent(userRequestedTenant);

  const { pathname, search } = parse(fakeUrl);
  const queryDelimiter = !search ? '?' : '&';
  // The url parser returns null if the search is empty. Change that to an empty
  // string so that we can use it to build the values later
  if (search && search.toLowerCase().indexOf(tenantKey) > -1) {
    // If we for some reason already have a tenant in the URL we skip any updates
    return url;
  }

  // A helper for finding the part in the string that we want to extend/replace
  const valueToReplace = pathname + (search || '');
  const replaceWith = valueToReplace + queryDelimiter + tenantKeyAndValue;

  return url.replace(valueToReplace, replaceWith);
}

export const generateInContextReport = async (
  fileFormat: string,
  props: any,
  toggleReportingLoadingModal: any,
  rest = {}
) => {
  toggleReportingLoadingModal(true);
  let baseUrl = location.pathname + '?view=output_only' + location.hash;  
  // Add selected tenant info to url
  try {
    const tenant = await getTenantInfoIfExists();
    if (tenant) {
      baseUrl = addTenantToURL(baseUrl, tenant) 
    }
  } catch (error) {
    props.setToast(
      'Tenant error',
      'danger',
      'Failed to get user tenant.'
    );
    console.log(`failed to get user tenant: ${error}`);
  }

  const reportSource = 'Notebook';
  const contextMenuOnDemandReport = {
    query_url: baseUrl,
    time_from: 0, // no time range for notebook reports
    time_to: 0,
    report_definition: {
      report_params: {
        report_name: 'In-context ' + document.getElementById('notebookTitle')?.innerText,
        report_source: reportSource,
        description: 'In-context report download',
        core_params: {
          base_url: baseUrl,
          report_format: fileFormat,
          time_duration: 'PT30M', // time duration can be hard-coded 
          ...rest,
        },
      },
      delivery: {
        configIds: [],
        title: '',
        textDescription: '',
        htmlDescription: '',
      },
      trigger: {
        trigger_type: 'On demand',
      },
    },
  };
  fetch(
    '../api/reporting/generateReport',
    {
      headers: {
        'Content-Type': 'application/json',
        'osd-xsrf': 'true',
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      method: 'POST',
      body: JSON.stringify(contextMenuOnDemandReport),
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
      credentials: 'include',
    }
  )
  .then((response) => {
    toggleReportingLoadingModal(false);
    if (response.status === 200) {
      // success toast
      props.setToast('Successfully generated report.', 'success');
    } else {
      if (response.status === 403) {
        // permissions failure toast
        props.setToast(
          'Error generating report,',
          'danger',
          'Insufficient permissions. Reach out to your OpenSearch Dashboards administrator.'
        );
      } else if (response.status === 503) {
        // timeout failure
        props.setToast(
          'Error generating report.',
          'danger',
          'Timed out generating on-demand report from notebook. Try again later.'
        );
      } else {
        // generic failure
        props.setToast(
          'Download error',
          'danger',
          'There was an error generating this report.'
        );
      }
    }
    return response.json();
  })
  .then(async (data) => {
    await readStreamToFile(data.data, fileFormat, data.filename);
  })
}

export const contextMenuCreateReportDefinition = (baseURI: string) => {
  const reportSourceId = getReportSourceURL(baseURI);
  let reportSource = 'notebook:';

  reportSource += reportSourceId.toString();
  window.location.assign(
    `reports-dashboards#/create?previous=${reportSource}?timeFrom=0?timeTo=0`
  );
};

export const contextMenuViewReports = () =>
  window.location.assign('reports-dashboards#/');
