/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject } from 'react';
import { DashboardStart } from "../../../../src/plugins/dashboard/public";
import { NavigationPublicPluginStart } from "../../../../src/plugins/navigation/public";

export interface NotebooksPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NotebooksPluginStart {}

export interface optionsType {
  baseUrl: string;
  payload?: any;
  headers?: any;
  redirects?: number;
  beforeRedirect?: any;
  redirected?: any;
  timeout?: number; // default: unlimited
  maxBytes?: number; // default: unlimited
  rejectUnauthorized?: boolean;
  secureProtocol?: string; // The SSL method to use
  ciphers?: string; // The TLS ciphers to support
}

export type ParaType = {
  uniqueId: string;
  isRunning: boolean;
  inQueue: boolean;
  isSelected: boolean;
  isInputHidden: boolean;
  isOutputHidden: boolean;
  showAddPara: boolean;
  isVizualisation: boolean;
  vizObjectInput: string;
  id: number;
  inp: string;
  lang: string;
  editorLanguage: string;
  typeOut: Array<string>;
  out: any[];
  isInputExpanded: boolean;
  isOutputStale: boolean;
  paraRef: RefObject<React.ReactElement>;
  paraDivRef: RefObject<HTMLDivElement>;
  visStartTime?: string;
  visEndTime?: string;
  visSavedObjId?: string;
};
