/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React from 'react';
import { Outputs } from '@nteract/presentational-components';
import { Media } from '@nteract/outputs';
import { EuiText } from '@elastic/eui';
import { ParaType } from '../helpers/para_parsers';

/*
 * "ParaOutput" component is used by nbcell to populate paragraph outputs for an open notebook.
 *
 * Props taken in as params are:
 * para - parsed paragraph from nbcell
 *
 * Outputs component of nteract used as a container for notebook UI.
 * https://components.nteract.io/#outputs
 */
export const ParaOutput = (props: { para: ParaType }) => {
  const outputBody = (tIdx: number, typeOut: string, val: string) => {
    /* Returns a component to render paragraph outputs using the para.typeOut property
     * Currently supports HTML, TABLE, IMG
     * TODO: add table rendering
     */

    if (typeOut !== undefined) {
      switch (typeOut) {
        case 'HTML':
          return (
            <EuiText key={tIdx + '_paraoutput'}>
              <Media.HTML data={val} />
            </EuiText>
          );
        case 'TABLE':
          return <pre key={tIdx + '_paraoutput'}>{val}</pre>;
        case 'IMG':
          return <img alt="" src={'data:image/gif;base64,' + val} key={tIdx + '_paraoutput'} />;
        default:
          return <pre key={tIdx + '_paraoutput'}>{val}</pre>;
      }
    } else {
      console.log('output not supported', typeOut);
      return <pre />;
    }
  };

  const { para } = props;

  return (
    <Outputs hidden={para.isOutputHidden}>
      {para.typeOut.map((typeOut: string, tIdx: number) =>
        outputBody(tIdx, typeOut, para.out[tIdx])
      )}
    </Outputs>
  );
};
