/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, isEqual, values, keys } from 'lodash';
import DSLService from '../requests/dsl';
import { IDefaultTimestampState } from '../../../common/types/explorer';

// eslint-disable-next-line import/no-default-export
export default class TimestampUtils {
  constructor(private dslService: DSLService) {}

  isTimeField(type: string) {
    return ['date', 'date_nanos'].some((dateTimeType) => isEqual(type, dateTimeType));
  }

  async getTimestamp(index: string): Promise<IDefaultTimestampState> {
    const indexMappings = await this.getIndexMappings(index);
    const timestamp: IDefaultTimestampState = {
      hasSchemaConflict: false,
      default_timestamp: '',
      message: 'Index does not contain a valid time field.',
    };

    // expect indexes to have the same schema, then go over the mapping to find timestamp
    const mappingValues = values(indexMappings);

    // check if all indexes have the same schema
    if (
      mappingValues.length > 1 &&
      mappingValues.some(
        (mapping) => !isEqual(mappingValues[0]?.mappings?.properties, mapping.mappings?.properties)
      )
    ) {
      timestamp.message = 'Indexes have different schemas, and may lead to unexpected behaviors';
      timestamp.hasSchemaConflict = true;
    }

    for (let i = 0; i < keys(indexMappings).length; i++) {
      const fieldMapping = mappingValues[i]?.mappings?.properties || {};
      if (!isEmpty(fieldMapping)) {
        const mfields = keys(fieldMapping);
        const mvalues = values(fieldMapping);
        for (let j = 0; j < mfields.length; j++) {
          if (
            mvalues[j].type &&
            this.isTimeField(mvalues[j].type) &&
            isEmpty(timestamp.default_timestamp)
          ) {
            timestamp.default_timestamp = mfields[j];
            timestamp.message = timestamp.hasSchemaConflict ? timestamp.message : '';
            break;
          }
        }
      }
      if (timestamp.default_timestamp) break;
    }
    return timestamp;
  }

  async getIndexMappings(index: string) {
    return await this.dslService.fetchFields(index);
  }
}
