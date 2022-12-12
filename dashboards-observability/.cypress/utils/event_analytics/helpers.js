/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMMAND_TIMEOUT_LONG } from '../constants';

export const clearQuerySearchBoxText = (testSubjectName) => {
  cy.get(`[data-test-subj="${testSubjectName}"]`, {
    timeout: COMMAND_TIMEOUT_LONG,
  }).clear({ force: true });
};
