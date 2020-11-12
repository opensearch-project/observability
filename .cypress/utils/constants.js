/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

export const delay = 1500;
export const TRACE_ID = '9a2d91f9557028fc70bce0f3297ecfae';
export const SPAN_ID = 'dc7f49faa6b065c1';
export const NON_ERROR_CODE = '0';
export const SERVICE_NAME = 'frontend-client';

export const setTimeFilter = (
  startTime = 'Nov 10, 2020 @ 09:00:00.000',
  endTime = 'Nov 10, 2020 @ 10:00:00.000',
  refresh = true
) => {
  cy.get('button.euiButtonEmpty[aria-label="Date quick select"]').click();
  cy.get('.euiQuickSelect__applyButton').click();
  cy.get('.euiSuperDatePicker__prettyFormatLink').click();
  cy.get(
    'button.euiDatePopoverButton--start[data-test-subj="superDatePickerstartDatePopoverButton"]'
  ).click();
  cy.get('.euiTab__content').contains('Absolute').click();
  cy.get('input[data-test-subj="superDatePickerAbsoluteDateInput"]')
    .focus()
    .type('{selectall}' + startTime);
  if (refresh) cy.get('.euiButton__text').contains('Refresh').click();
  cy.wait(delay);
};
