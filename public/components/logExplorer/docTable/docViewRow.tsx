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

import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { EuiIcon } from '@elastic/eui';
import { DocViewer } from './docViewer';
import { DocDetailTitle } from './detailTable/docDetailTitle';

export const DocViewRow = (props: any) => {

  const {
    doc,
    selectedCols
  } = props;

  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const getTdTmpl = (conf: { clsName: string, content: React.ReactDOM | string }) => {
    const {
      clsName,
      content
    } = conf;
    return (
      <td
        key={_.uniqueId('grid-td-')}
        className={ clsName }
      >
        { content }
      </td>);
  };

  const getDlTmpl = (conf) => {
    const {
      doc
    } = conf;

    return (
      <div className="truncate-by-height">
        <span>
          <dl className="source truncate-by-height">
            { _.toPairs(doc).map((entry) => {
              return (
                <span
                  key={ _.uniqueId('grid-desc') }
                >
                  <dt>{ entry[0] }:</dt>
                  <dd>
                    <span>
                      { entry[1] }
                    </span>
                  </dd>
                </span>
              );
            })}
          </dl>
        </span>
      </div>
    );
  };

  const getDiscoverSourceLikeDOM = (doc) => {
    return getDlTmpl({ doc, });
  };

  const toggleDetailOpen = () => {
    const newState = !detailsOpen;
    setDetailsOpen(newState);
  };

  const getExpColapTd = () => {
    return (
      <td
        className="osdDocTableCell__toggleDetails"
        key={_.uniqueId('grid-td-')}
      >
        <button
          className="euiButtonIcon euiButtonIcon--text"
          onClick={ () => { toggleDetailOpen() } }
        >
          { detailsOpen ?  <EuiIcon type="arrowDown" /> : <EuiIcon type="arrowRight" /> }
        </button>
      </td>
    );
  };
  
  const getTds = (doc, selectedCols) => {
    const cols = [];
    const fieldClsName = 'osdDocTableCell__dataField eui-textBreakAll eui-textBreakWord';
    const timestampClsName = 'eui-textNoWrap';
    // No field is selected
    if (!selectedCols || selectedCols.length === 0) {
      if (_.has(doc, 'timestamp')) {
        cols.push(
          getTdTmpl({ 
            clsName: timestampClsName,
            content: doc['timestamp']
          })
        );
      }
      const _sourceLikeDOM = getDiscoverSourceLikeDOM(doc);
      cols.push(
        getTdTmpl({
          clsName: fieldClsName,
          content: _sourceLikeDOM
        })
      );
    } else {
      
      // Has at least one field selected
      const filteredDoc = {};
      _.forEach(selectedCols, selCol => {
        if (_.has(doc, selCol.name)) {
          filteredDoc[selCol.name] = doc[selCol.name];
        }
      })
      _.forEach(filteredDoc, (val, key) => {
        cols.push(
          getTdTmpl({ 
            clsName: fieldClsName,
            content: val
          })
        );
      });

      if (_.has(doc, 'timestamp')) {
        cols.unshift(
              getTdTmpl({ 
                clsName: timestampClsName,
                content: doc['timestamp']
              })
            );
      }
    }

    // Add detail toggling column
    cols.unshift(
      getExpColapTd()
    );
    return cols;
  };

  const memorizedTds = useMemo(() => {
    return getTds(doc, selectedCols)
  }, 
    [ 
      doc,
      selectedCols,
      detailsOpen
    ]
  );

  return (
    <>
      <tr
        className="osdDocTable__row"
      >
        { memorizedTds }
      </tr>
      { detailsOpen ? <tr className="osdDocTableDetails__row">
        <td 
          key={_.uniqueId('grid-td-detail-')}
          colSpan={3}
        >
          <DocDetailTitle />
          <DocViewer
            hit={ doc }
          />
        </td>
      </tr> : null }
    </>
  );
};