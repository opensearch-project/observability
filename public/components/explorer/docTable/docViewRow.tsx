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

import React, { useMemo, useState } from 'react';
import { 
  toPairs,
  uniqueId,
  has,
  forEach
} from 'lodash';
import { EuiIcon } from '@elastic/eui';
import { DocViewer } from './docViewer';
import { DocDetailTitle } from './detailTable/docDetailTitle';
import { IField } from '../../../../common/types/explorer';

export interface IDocType { 
  [key: string] : string; 
}

interface IDocViewRowProps {
  doc: IDocType;
  selectedCols: Array<IField>;
}

export const DocViewRow = (props: IDocViewRowProps) => {

  const {
    doc,
    selectedCols
  } = props;

  console.log('doc view row doc: ', doc);
  console.log('doc view selectedCols: ', selectedCols);

  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const getTdTmpl = (conf: { clsName: string, content: React.ReactDOM | string }) => {
    const {
      clsName,
      content
    } = conf;
    return (
      <td
        key={ uniqueId('datagrid-cell-') }
        className={ clsName }
      >
        { content }
      </td>);
  };

  const getDlTmpl = (conf: { doc: IDocType }) => {
    const {
      doc
    } = conf;

    return (
      <div className="truncate-by-height">
        <span>
          <dl className="source truncate-by-height">
            { toPairs(doc).map((entry: Array<string>) => {
              return (
                <span
                  key={ uniqueId('grid-desc') }
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

  const getDiscoverSourceLikeDOM = (doc: IDocType) => {
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
        key={ uniqueId('grid-td-') }
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
  
  const getTds = (
    doc: IDocType, 
    selectedCols: Array<IField>
  ) => {
    const cols = [];
    const fieldClsName = 'osdDocTableCell__dataField eui-textBreakAll eui-textBreakWord';
    const timestampClsName = 'eui-textNoWrap';
    // No field is selected
    if (!selectedCols || selectedCols.length === 0) {
      if (has(doc, 'timestamp')) {
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
      forEach(selectedCols, selCol => {
        if (has(doc, selCol.name)) {
          filteredDoc[selCol.name] = doc[selCol.name];
        }
      })
      console.log('filteredDoc: ', filteredDoc);
      forEach(filteredDoc, (val, key) => {
        cols.push(
          getTdTmpl({ 
            clsName: fieldClsName,
            content: val
          })
        );
      });

      // if (has(doc, 'timestamp')) {
      //   cols.unshift(
      //     getTdTmpl({ 
      //       clsName: timestampClsName,
      //       content: doc['timestamp']
      //     })
      //   );
      // }
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
          key={ uniqueId('grid-td-detail-') }
          colSpan={ selectedCols.length ?  selectedCols.length + 2 : 3 }
        >
          {/* <DocDetailTitle /> */}
          <DocViewer
            hit={ doc }
          />
        </td>
      </tr> : null }
    </>
  );
};