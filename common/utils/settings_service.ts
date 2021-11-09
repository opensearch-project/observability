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

import { IUiSettingsClient, NotificationsStart, ToastInput } from '../../../../src/core/public';

let uiSettings: IUiSettingsClient;
let notifications: NotificationsStart;

export const uiSettingsService = {
  init: (client: IUiSettingsClient, notificationsStart: NotificationsStart) => {
    uiSettings = client;
    notifications = notificationsStart;
  },
  get: (key: string, defaultOverride?: any) => {
    return uiSettings?.get(key, defaultOverride) || '';
  },
  set: (key: string, value: any) => {
    return uiSettings?.set(key, value) || Promise.reject("uiSettings client not initialized.");
  },
  addToast: (toast: ToastInput) => {
    return notifications.toasts.add(toast);
  }
};