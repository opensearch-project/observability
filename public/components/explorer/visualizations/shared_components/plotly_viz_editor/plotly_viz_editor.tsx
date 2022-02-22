/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import './plotly_vis.scss';
import './plotly_editor.scss';

import React, { useCallback } from 'react';
import { EuiCodeEditor } from '@elastic/eui';
import compactStringify from 'json-stringify-pretty-compact';
import hjson from 'hjson';
import 'brace/mode/hjson';
import { PlotlyEditorActionsMenu } from './plotly_actions';

const aceOptions = {
  maxLines: Infinity,
  highlightActiveLine: false,
  showPrintMargin: false,
  tabSize: 2,
  useSoftTabs: true,
  wrap: true,
};

const hjsonStringifyOptions = {
  bracesSameLine: true,
  keepWsc: true,
};

function PlotlyVizEditor({ spec, onVizConfigChange, setToast }: any) {
  const formatHJson = useCallback(
    () => onVizConfigChange(format(spec, hjson.stringify, hjsonStringifyOptions)),
    [onVizConfigChange, spec]
  );

  const format = (
    value: string,
    stringify: typeof hjson.stringify | typeof compactStringify,
    options?: any
  ) => {
    try {
      const formattedSpec = hjson.parse(value, { legacyRoot: false, keepWsc: true });
      return stringify(formattedSpec, options);
    } catch (err) {
      // This is a common case - user tries to format an invalid HJSON text
      setToast(`Error formatting spec: '${err.message}`, 'danger');

      return value;
    }
  };

  return (
    <div className="vgaEditor">
      <EuiCodeEditor
        data-test-subj="vega-editor"
        mode="hjson"
        theme="textmate"
        width="100%"
        height="auto"
        onChange={(config) => {
          onVizConfigChange(config);
        }}
        value={spec}
        setOptions={aceOptions}
        isReadOnly={false}
      />
      <div className="vgaEditor__aceEditorActions">
        <PlotlyEditorActionsMenu formatHJson={formatHJson} />
      </div>
    </div>
  );
}

export { PlotlyVizEditor };
