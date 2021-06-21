/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
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
