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

import DSLService  from "../requests/dsl";
import { 
  isEmpty,
  isEqual,
  map
} from 'lodash';

export default class TimestampUtils {
  constructor(private dslService: DSLService) {}

  async getTimestamp(index: string) {

    const indexMappings = await this.getIndexMappings(index);

    if (indexMappings?.[index]?.mappings?.properties) {
      const fieldMappings = indexMappings[index].mappings.properties;
      const timestamps = {
        default_timestamp: '',
        available_timestamps: []
      };
      map(fieldMappings, (mapping, field) => {
        if (
          mapping.type &&
          isEqual(mapping.type, 'date') &&
          isEmpty(timestamps.default_timestamp)
        ) {
          timestamps.default_timestamp = field;
        } else if (
          mapping.type &&
          isEqual(mapping.type, 'date')
        ) {
          timestamps.available_timestamps.push(field);
        }
      })
      
      return timestamps;
    }
  }

  async getIndexMappings(index: string) {
    return await this.dslService.fetchFields(index);
  }

  async savedTimestamp(index: string) {}
}