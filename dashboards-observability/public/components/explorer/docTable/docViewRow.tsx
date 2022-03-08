/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './docView.scss';
import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { toPairs, uniqueId, has, forEach } from 'lodash';
import { EuiIcon, EuiLink } from '@elastic/eui';
import { useEffect } from 'react';
import { IExplorerFields, IField } from '../../../../common/types/explorer';
import { DocFlyout } from './doc_flyout';
import { HttpStart } from '../../../../../../src/core/public';
import { OTEL_TRACE_ID } from '../../../../common/constants/explorer';
import { SurroundingFlyout } from './surrounding_flyout';
import PPLService from '../../../services/requests/ppl';
import { isValidTraceId } from '../utils';

export interface IDocType {
  [key: string]: string;
}

interface IDocViewRowProps {
  http: HttpStart;
  doc: IDocType;
  docId: string;
  selectedCols: IField[];
  timeStampField: string;
  explorerFields: IExplorerFields;
  pplService: PPLService;
  rawQuery: string;
  onFlyoutOpen: (docId: string) => void;
}

export const DocViewRow = forwardRef((props: IDocViewRowProps, ref) => {
  const {
    http,
    doc,
    docId,
    selectedCols,
    timeStampField,
    explorerFields,
    pplService,
    rawQuery,
    onFlyoutOpen,
  } = props;

  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [surroundingEventsOpen, setSurroundingEventsOpen] = useState<boolean>(false);
  const [openTraces, setOpenTraces] = useState<boolean>(false);
  const [flyoutToggleSize, setFlyoutToggleSize] = useState(true);

  useImperativeHandle(ref, () => ({
    closeAllFlyouts(openDocId: string) {
      if (openDocId !== docId && (detailsOpen || surroundingEventsOpen)) {
        setSurroundingEventsOpen(false);
        setDetailsOpen(false);
      }
    },
  }));

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
            {toPairs(doc).map((entry: string[]) => {
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

  const getTds = (doc: IDocType, selectedCols: IField[], isFlyout: boolean) => {
    const cols = [];
    const fieldClsName = 'osdDocTableCell__dataField eui-textBreakAll eui-textBreakWord';
    const timestampClsName = 'eui-textNoWrap';
    // No field is selected
    if (!selectedCols || selectedCols.length === 0) {
      if (has(doc, timeStampField)) {
        cols.push(
          getTdTmpl({
            clsName: timestampClsName,
            content: doc[timeStampField],
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

  const memorizedDocFlyout = useMemo(() => {
    return (
      <DocFlyout
        http={http}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
        doc={doc}
        timeStampField={timeStampField}
        memorizedTds={getTds(doc, selectedCols, true).slice(1)}
        explorerFields={explorerFields}
        openTraces={openTraces}
        rawQuery={rawQuery}
        toggleSize={flyoutToggleSize}
        setToggleSize={setFlyoutToggleSize}
        setOpenTraces={setOpenTraces}
        setSurroundingEventsOpen={setSurroundingEventsOpen}
      />
    );
  }, [
    http,
    detailsOpen,
    doc,
    timeStampField,
    selectedCols,
    explorerFields,
    openTraces,
    rawQuery,
    flyoutToggleSize,
  ]);

  const memorizedSurroundingFlyout = useMemo(() => {
    return (
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
        toggleSize={flyoutToggleSize}
        setToggleSize={setFlyoutToggleSize}
      />
    );
  }, [
    http,
    detailsOpen,
    doc,
    timeStampField,
    selectedCols,
    explorerFields,
    openTraces,
    pplService,
    rawQuery,
    selectedCols,
    flyoutToggleSize,
  ]);

  let flyout;
  if (detailsOpen) {
    flyout = memorizedDocFlyout;
  }

  if (surroundingEventsOpen) {
    flyout = memorizedSurroundingFlyout;
  }

  useEffect(() => {
    if (detailsOpen) {
      onFlyoutOpen(docId);
    }
  }, [detailsOpen]);

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
});
