/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
