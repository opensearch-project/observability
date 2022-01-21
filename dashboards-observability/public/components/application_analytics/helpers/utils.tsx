/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Name validation 0>Name<=50
export const isNameValid = (name: string) => {
  return name.length >= 50 || name.length === 0 ? false : true;
};
