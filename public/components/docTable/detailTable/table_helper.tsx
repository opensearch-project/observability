/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
