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
  baseQuery: string;
  servicesEntities: Array<string>;
  traceGroups: Array<string>;
  panelId: string;
}
