/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const fetchSuccess = (state, { payload }) => {
  state[payload.tabId] = {
    ...state[payload.tabId],
    ...payload.data,
  };
};
