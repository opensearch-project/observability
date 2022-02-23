/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './docView.scss';
import React, { useMemo, useState } from 'react';
import { toPairs, uniqueId, has, forEach } from 'lodash';
import { EuiCheckbox, EuiFlexItem, EuiIcon, EuiLink } from '@elastic/eui';
import { IExplorerFields, IField } from '../../../../common/types/explorer';
import { DocFlyout } from './doc_flyout';
import { HttpStart } from '../../../../../../src/core/public';
import { OTEL_TRACE_ID } from '../../../../common/constants/explorer';
import { isValidTraceId } from './trace_block/trace_block';
import { useEffect } from 'react';
import { SurroundingFlyout } from './surrounding_flyout';
import PPLService from '../../../services/requests/ppl';

export interface IDocType {
  [key: string]: string;
}

interface IDocViewRowProps {
  http: HttpStart;
  doc: IDocType;
  selectedCols: Array<IField>;
  timeStampField: string;
  explorerFields: IExplorerFields;
  pplService: PPLService;
  rawQuery: string;
}

export const DocViewRow = (props: IDocViewRowProps) => {
  const { http, doc, selectedCols, timeStampField, explorerFields, pplService, rawQuery } = props;

  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [surroundingEventsOpen, setSurroundingEventsOpen] = useState<boolean>(false);
  const [openTraces, setOpenTraces] = useState<boolean>(false);

  const getTdTmpl = (conf: { clsName: string; content: React.ReactDOM | string }) => {
    const { clsName, content } = conf;
    return (
      <td key={uniqueId('datagrid-cell-')} className={clsName}>
        {typeof content === 'boolean' ? String(content) : content}
      </td>
    );
  };

  const getDlTmpl = (conf: { doc: IDocType }, isFlyout: boolean) => {
    const { doc } = conf;

    return (
      <div className="truncate-by-height">
        <span>
          <dl className="source truncate-by-height">
            {toPairs(doc).map((entry: Array<string>) => {
              const isTraceField = entry[0] === OTEL_TRACE_ID;
              return (
                <span key={uniqueId('grid-desc')}>
                  <dt>{entry[0]}:</dt>
                  <dd>
                    <span>
                      {isTraceField && isValidTraceId(entry[1]) && !isFlyout ? (
                        <EuiLink onClick={tracesFlyout}>{entry[1]}</EuiLink>
                      ) : (
                        entry[1]
                      )}
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

  const tracesFlyout = () => {
    setOpenTraces(true);
    if (!detailsOpen) toggleDetailOpen();
  };

  const getDiscoverSourceLikeDOM = (doc: IDocType, isFlyout: boolean) => {
    return getDlTmpl({ doc }, isFlyout);
  };

  const toggleDetailOpen = () => {
    if (surroundingEventsOpen) {
      setSurroundingEventsOpen(false);
      setDetailsOpen(false);
    } else {
      const newState = !detailsOpen;
      setDetailsOpen(newState);
    }
  };

  const getExpColapTd = () => {
    return (
      <td className="osdDocTableCell__toggleDetails" key={uniqueId('grid-td-')}>
        <button
          className="euiButtonIcon euiButtonIcon--text"
          onClick={() => {
            toggleDetailOpen();
          }}
        >
          {detailsOpen || surroundingEventsOpen ? (
            <EuiIcon type="arrowLeft" />
          ) : (
            <EuiIcon type="arrowRight" />
          )}
        </button>
      </td>
    );
  };

  const getTds = (doc: IDocType, selectedCols: Array<IField>, isFlyout: boolean) => {
    const cols = [];
    const fieldClsName = 'osdDocTableCell__dataField eui-textBreakAll eui-textBreakWord';
    const timestampClsName = 'eui-textNoWrap';
    // No field is selected
    if (!selectedCols || selectedCols.length === 0) {
      if (has(doc, 'timestamp')) {
        cols.push(
          getTdTmpl({
            clsName: timestampClsName,
            content: doc['timestamp'],
          })
        );
      }
      const _sourceLikeDOM = getDiscoverSourceLikeDOM(doc, isFlyout);
      cols.push(
        getTdTmpl({
          clsName: fieldClsName,
          content: _sourceLikeDOM,
        })
      );
    } else {
      // Has at least one field selected
      const filteredDoc = {};
      forEach(selectedCols, (selCol) => {
        if (has(doc, selCol.name)) {
          filteredDoc[selCol.name] = doc[selCol.name];
        }
      });
      forEach(filteredDoc, (val, key) => {
        cols.push(
          getTdTmpl({
            clsName: fieldClsName,
            content: val,
          })
        );
      });
    }

    // Add detail toggling column
    cols.unshift(getExpColapTd());
    return cols;
  };

  const memorizedTds = useMemo(() => {
    return getTds(doc, selectedCols, false);
  }, [doc, selectedCols, detailsOpen, surroundingEventsOpen]);

  let flyout;
  if (detailsOpen) {
    flyout = (
      <DocFlyout
        http={http}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
        doc={doc}
        timeStampField={timeStampField}
        memorizedTds={getTds(doc, selectedCols, true).slice(1)}
        explorerFields={explorerFields}
        openTraces={openTraces}
        setOpenTraces={setOpenTraces}
        setSurroundingEventsOpen={setSurroundingEventsOpen}
      ></DocFlyout>
    );
  }

  if (surroundingEventsOpen) {
    flyout = (
      <SurroundingFlyout
        http={http}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
        doc={doc}
        timeStampField={timeStampField}
        memorizedTds={getTds(doc, selectedCols, true).slice(1)}
        explorerFields={explorerFields}
        openTraces={openTraces}
        setOpenTraces={setOpenTraces}
        setSurroundingEventsOpen={setSurroundingEventsOpen}
        pplService={pplService}
        rawQuery={rawQuery}
        selectedCols={selectedCols}
        getTds={getTds}
      />
    );
  }

  return (
    <>
      <tr
        className={
          detailsOpen || surroundingEventsOpen
            ? 'osdDocTable__row selected-event-row'
            : 'osdDocTable__row'
        }
      >
        {memorizedTds}
      </tr>
      {flyout}
    </>
  );
};
