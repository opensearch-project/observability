/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import Wreck from '@hapi/wreck';
import { optionsType } from "../../../../common/types/notebooks";

export const requestor = async function (
  requestType: string,
  url: string,
  wreckOptions: optionsType
) {
  const promise = Wreck.request(requestType, url, wreckOptions);
  const res = await promise;
  const body = await Wreck.read(res, wreckOptions);
  return body;
};
