/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, isEqual, map } from 'lodash';
import DSLService from '../requests/dsl';

// eslint-disable-next-line import/no-default-export
export default class TimestampUtils {
  constructor(private dslService: DSLService) {}

  isTimeField(type: string) {
    return ['date', 'date_nanos'].some((dateTimeType) => isEqual(type, dateTimeType));
  }

  async getTimestamp(index: string) {
    const indexMappings = await this.getIndexMappings(index);

    if (indexMappings?.[index]?.mappings?.properties) {
      const fieldMappings = indexMappings[index].mappings.properties;
      const timestamps = {
        default_timestamp: '',
        available_timestamps: [] as string[],
      };
      map(fieldMappings, (mapping, field) => {
        if (
          mapping.type &&
          this.isTimeField(mapping.type) &&
          isEmpty(timestamps.default_timestamp)
        ) {
          timestamps.default_timestamp = field;
        } else if (mapping.type && this.isTimeField(mapping.type)) {
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
