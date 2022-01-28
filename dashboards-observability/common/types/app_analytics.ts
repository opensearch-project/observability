/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface optionType {
  label: string;
}

export type ApplicationListType = {
  name: string;
  id: string;
  dateCreated: string;
  dateModified: string;
};

export type ApplicationType = {
  name: string;
  description: string;
  query: string;
  selectedServices: Array<string>;
  selectedTraces: Array<string>;
  panelId: string;
}
