/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const queryChange = (state = {}, action) => {
  return { 
    ...action.payload
  };
};