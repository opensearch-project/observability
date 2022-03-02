/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { forEach, isEmpty, isEqual, map, values, keys } from 'lodash';
import DSLService from '../requests/dsl';

// eslint-disable-next-line import/no-default-export
export default class TimestampUtils {
  constructor(private dslService: DSLService) {}

  isTimeField(type: string) {
    return ['date', 'date_nanos'].some((dateTimeType) => isEqual(type, dateTimeType));
  }

  async getTimestamp(index: string) {
    const indexMappings = await this.getIndexMappings(index);
    const timestamps = {
      default_timestamp: '',
    };

    // expect indexes to have the same schema, then go over the mapping to find timestamp
    const mappingValues = values(indexMappings);
    for (let i = 0; i < keys(indexMappings).length; i++) {
      const fieldMapping = mappingValues[i]?.mappings?.properties || {};
      if (!isEmpty(fieldMapping)) {
        const mfields = keys(fieldMapping);
        const mvalues = values(fieldMapping);
        for (let j = 0; j < mfields.length; j++) {
          if (
            mvalues[j].type &&
            this.isTimeField(mvalues[j].type) &&
            isEmpty(timestamps.default_timestamp)
          ) {
            timestamps.default_timestamp = mfields[j];
            break;
          }
        }
      }
      if (timestamps.default_timestamp) break;
    }

    return timestamps;
  }

  async getIndexMappings(index: string) {
    return await this.dslService.fetchFields(index);
  }
}
