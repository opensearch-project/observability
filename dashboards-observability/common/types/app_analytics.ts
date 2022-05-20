/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OptionType {
  label: string;
}

// export interface ApplicationListType {
//   name: string;
//   id: string;
//   panelId: string;
//   composition: string[];
//   dateCreated: string;
//   dateModified: string;
//   availability: { name: string; color: string; mainVisId: string };
// }

export interface ApplicationType {
  id: string;
  name: string;
  dateCreated: string;
  dateModified: string;
  description: string;
  composition: string[];
  baseQuery: string;
  servicesEntities: string[];
  traceGroups: string[];
  panelId: string;
  availability: { name: string; color: string; mainVisId: string };
}
