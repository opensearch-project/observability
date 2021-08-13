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

export const getDataValueQuery = () => {
  const query = {
    'query': {
      'bool': {
        'must': [{
          'wildcard': {
            'Origin': {
              'value': '*',
              'case_sensitive': 'false'
            }
          }
        }]
      }
    }
    // 'aggs': {
    //   'autocomplete': {
    //     'terms': {
    //       'field': 'Origin',
    //       'order': {
    //         '_count': 'desc'
    //       },
    //       'size': 10
    //     }
    //   }
    // }
  }
  return query;
}