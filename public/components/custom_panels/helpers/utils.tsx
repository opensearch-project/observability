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
import PPLService from '../../../services/requests/ppl';

// Name validation
export const isNameValid = (name: string) => {
  return name.length >= 50 || name.length === 0 ? false : true;
};

// Get PPL Query Response
export const getQueryResponse = async (
  pplService: PPLService,
  query: string,
  type: string,
  setVisualizationData: React.Dispatch<React.SetStateAction<any[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>
) => {
  setIsLoading(true);
  await pplService
    .fetch({ query: _.unescape(query), format: 'viz' })
    .then((res) => {
      query;
      setVisualizationData([
        {
          x: res.data[res.metadata.xfield.name],
          y: res.data[res.metadata.yfield.name],
          type: type,
        },
      ]);
    })
    .catch((err) => {
      setIsError(err);
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
