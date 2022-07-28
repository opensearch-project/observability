/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './components/trace_analytics/index.scss';
import './components/notebooks/index.scss'

import { PluginInitializer, PluginInitializerContext } from '../../../src/core/public';
import {
  ObservabilityPlugin
} from './plugin';

export { ObservabilityPlugin as Plugin };

export const plugin = (initializerContext: PluginInitializerContext) => new ObservabilityPlugin(initializerContext);