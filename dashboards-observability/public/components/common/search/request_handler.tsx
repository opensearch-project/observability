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

import _ from 'lodash';
import { CoreStart } from '../../../../../../src/core/public';

const DSL_ROUTE = '/api/dsl/search';

export function handleDslRequest(http: CoreStart['http'], query) {
  return http
    .post(DSL_ROUTE, {
      body: JSON.stringify(query),
    })
    .catch((error) => console.error(error));
}
