/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { observabilityID } from "../../../../../common/constants/shared";

export const convertLegacyNotebooksUrl = (location: Location)=> {
  const pathname = location.pathname.replace('notebooks-dashboards', observabilityID);
  const hash = `#/notebooks${location.hash.replace(/^#/, '')}${
    location.hash.includes('?') ? location.search.replace(/^\?/, '&') : location.search
  }`;
  return pathname + hash;
};
