/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Returns true if the given array contains at least 1 object
 */
export function arrayContainsObjects(value: unknown[]): boolean {
  return Array.isArray(value) && value.some((v) => typeof v === 'object' && v !== null);
}

/**
 * Removes markup added by kibana fields html formatter
 */
export function trimAngularSpan(text: string): string {
  return text.replace(/^<span ng-non-bindable>/, '').replace(/<\/span>$/, '');
}
