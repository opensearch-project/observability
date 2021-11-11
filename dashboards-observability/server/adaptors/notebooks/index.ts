/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZeppelinBackend } from './zeppelin_backend';
import { DefaultBackend } from './default_backend';
import { NOTEBOOKS_SELECTED_BACKEND } from '../../../common/constants/notebooks';

// Selects backend based on config
let BACKEND = new DefaultBackend();

if (NOTEBOOKS_SELECTED_BACKEND == 'ZEPPELIN') {
  BACKEND = new ZeppelinBackend();
}

export default BACKEND;
