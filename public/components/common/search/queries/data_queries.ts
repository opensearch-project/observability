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

export const getDataValueQuery = (index: string, field: string) => {
  const query = {
    index: index,
    'size': 0,
    'query': {
      'bool': {
        'must': [{
          'wildcard': {
            [field]: {
              'value': '*',
              'case_insensitive': 'true'
            }
          }
        }]
      }
    },
    'aggs': {
      'autocomplete': {
        'terms': {
          'field': field,
          'order': {
            '_count': 'desc'
          },
          'size': 10
        }
      }
    }
  }
  return query;
}

export const getDataValueQuery2 = (index: string, field: string) => {
  const query ={
    index: index,
    'size': 0,
    'aggs': {
      'top_tags': {
        'terms': {
          'field': field
        }
      }
    }
  }
  return query;
}