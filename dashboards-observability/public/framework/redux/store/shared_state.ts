/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { uniqueId } from 'lodash';
import { 
  TAB_ID_TXT_PFX
} from '../../../../common/constants/explorer'

export const initialTabId: string = uniqueId(TAB_ID_TXT_PFX);