/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import { CoreStart } from '../../../../src/core/public';
import {
  PPL_BASE,
  PPL_SEARCH
} from '../../common/index';

export const handlePplRequest = async (
    http: CoreStart['http'],
    params: { query: string }
  ) => {
    return http
            .post(
              `${PPL_BASE}${PPL_SEARCH}`,
              {
                body: JSON.stringify(params),
              }
            )
            .catch(error => console.log(error));
};
