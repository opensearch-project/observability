/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, isEqual, map } from 'lodash';
import DSLService from '../requests/dsl';

export default class TimestampUtils {
  constructor(private dslService: DSLService) {}

  async getTimestamp(index: string) {
    const indexMappings = await this.getIndexMappings(index);

    console.log('indexMappings: ', indexMappings);

    if (indexMappings?.[index]?.mappings?.properties) {
      const fieldMappings = indexMappings[index].mappings.properties;
      const timestamps = {
        default_timestamp: '',
        available_timestamps: [],
      };
      map(fieldMappings, (mapping, field) => {
        if (
          mapping.type &&
          isEqual(mapping.type, 'date') &&
          isEmpty(timestamps.default_timestamp)
        ) {
          timestamps.default_timestamp = field;
        } else if (mapping.type && isEqual(mapping.type, 'date')) {
          timestamps.available_timestamps.push(field);
        }
      });

      return timestamps;
    }
  }

  async getIndexMappings(index: string) {
    return await this.dslService.fetchFields(index);
  }
}
