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

import {
  DSL_ENDPOINT
} from '../../common/constants/shared';

export const DSLPlugin = function(Client, config, components) {
  const ca = components.clientAction.factory;
  Client.prototype.dsl = components.clientAction.namespaceFactory();
  const dsl = Client.prototype.dsl.prototype;

  dsl.dslQuery = ca({
    url: {
      fmt: `${DSL_ENDPOINT}`
    },
    needBody: true,
    method: 'POST'
  });
}