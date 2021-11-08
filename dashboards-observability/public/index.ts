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

import './components/trace_analytics/index.scss';
import './components/notebooks/index.scss'

import { PluginInitializer, PluginInitializerContext } from '../../../src/core/public';
import {
  ObservabilityPlugin
} from './plugin';

export { ObservabilityPlugin as Plugin };

export const plugin = (initializerContext: PluginInitializerContext) => new ObservabilityPlugin(initializerContext);