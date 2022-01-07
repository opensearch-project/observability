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
import { i18n } from '@osd/i18n';
import { VegaActionsMenu } from './plotly_actions';

// import { VisOptionsProps } from 'src/plugins/vis_default_editor/public';
// import { getNotifications } from '../services';
// import { VisParams } from '../vega_fn';
// import { VegaHelpMenu } from './vega_help_menu';
// import { VegaActionsMenu } from './vega_actions_menu';

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

function format(
  value: string,
  stringify: typeof hjson.stringify | typeof compactStringify,
  options?: any
) {
  try {
    const spec = hjson.parse(value, { legacyRoot: false, keepWsc: true });
    return stringify(spec, options);
  } catch (err) {
    // This is a common case - user tries to format an invalid HJSON text
    getNotifications().toasts.addError(err, {
      title: i18n.translate('visTypeVega.editor.formatError', {
        defaultMessage: 'Error formatting spec',
      }),
    });

    return value;
  }
}

function PlotlyVizEditor({ spec, setVizConfig, setToast }: any) {
  // const onChange = useCallback(
  //   (value: string) => {
  //     setValue('spec', value);
  //   },
  //   [setValue]
  // );

  // const formatJson = useCallback(
  //   () => setValue('spec', format(spec, compactStringify)),
  //   [setValue, stateParams.spec]
  // );

  const formatHJson = useCallback(
    () => setVizConfig(format(spec, hjson.stringify, hjsonStringifyOptions)),
    [setVizConfig, spec]
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
          console.log('parsed viz config: ', config);
          setVizConfig(config);
        }}
        value={spec}
        setOptions={aceOptions}
        isReadOnly={false}
      />
      <div className="vgaEditor__aceEditorActions">
        <VegaActionsMenu formatHJson={formatHJson} />
      </div>
    </div>
  );
}

export { PlotlyVizEditor };
