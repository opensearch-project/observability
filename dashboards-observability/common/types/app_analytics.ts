/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OptionType {
  label: string;
}

export interface ApplicationListType {
  name: string;
  id: string;
  panelId: string;
  composition: string[];
  dateCreated: string;
  dateModified: string;
  availability: string;
}

export interface ApplicationType {
  name: string;
  description: string;
  baseQuery: string;
  servicesEntities: string[];
  traceGroups: string[];
  panelId: string;
}
