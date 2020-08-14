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

// Container for all post requests to server routers
export const postRequest = async (url: string, bodyObject: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'kbn-xsrf': 'notebooks' },
    body: JSON.stringify(bodyObject),
  };
  const response = await fetch(url, requestOptions);
  const body = response.json();
  return body;
};

// Container for all post requests to server routers
export const putRequest = async (url: string, bodyObject: any) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'kbn-xsrf': 'notebooks' },
    body: JSON.stringify(bodyObject),
  };
  const response = await fetch(url, requestOptions);
  const body = response.json();
  return body;
};

// Container for all get requests to server routers
export const getRequest = async (url: string) => {
  const response = await fetch(url);
  const body = response.json();
  return body;
};

// Container for all get requests to server routers
export const deleteRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'kbn-xsrf': 'notebooks' },
  });
  const body = response.json();
  return body;
};
