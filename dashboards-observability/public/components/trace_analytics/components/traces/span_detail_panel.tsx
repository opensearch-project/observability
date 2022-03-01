/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EuiBadge,
  EuiButtonGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { HttpSetup } from '../../../../../../../src/core/public';
import { Plt } from '../../../visualizations/plotly/plot';
import { handleSpansGanttRequest } from '../../requests/traces_request_handler';
import { PanelTitle } from '../common/helper_functions';
import { SpanDetailFlyout } from './span_detail_flyout';
import { SpanDetailTable } from './span_detail_table';

export function SpanDetailPanel(props: {
  http: HttpSetup;
  traceId: string;
  colorMap: any;
  page?: string;
  openSpanFlyout?: any;
  data: { gantt: any[], table: any[], ganttMaxX: number };
  setData: (data: { gantt: any[], table: any[], ganttMaxX: number }) => void;
}) {
  const storedFilters = sessionStorage.getItem('TraceAnalyticsSpanFilters');
  const fromApp = props.page === 'app';
  const [spanFilters, setSpanFilters] = useState<Array<{ field: string; value: any }>>(
    storedFilters ? JSON.parse(storedFilters) : []
  );
  const [DSL, setDSL] = useState<any>({});

  const setSpanFiltersWithStorage = (newFilters: Array<{ field: string; value: any }>) => {
    setSpanFilters(newFilters);
    sessionStorage.setItem('TraceAnalyticsSpanFilters', JSON.stringify(newFilters));
  };

  const addSpanFilter = (field: string, value: any) => {
    const newFilters = [...spanFilters];
    const index = newFilters.findIndex(({ field: filterField }) => field === filterField);
    if (index === -1) {
      newFilters.push({ field, value });
    } else {
      newFilters.splice(index, 1, { field, value });
    }
    setSpanFiltersWithStorage(newFilters);
  };

  const removeSpanFilter = (field: string) => {
    const newFilters = [...spanFilters];
    const index = newFilters.findIndex(({ field: filterField }) => field === filterField);
    if (index !== -1) {
      newFilters.splice(index, 1);
      setSpanFiltersWithStorage(newFilters);
    }
  };

  const refresh = _.debounce(() => {
    if (_.isEmpty(props.colorMap)) return;
    const refreshDSL = spanFiltersToDSL();
    setDSL(refreshDSL);
    handleSpansGanttRequest(props.traceId, props.http, props.setData, props.colorMap, refreshDSL);
  }, 150);

  const spanFiltersToDSL = () => {
    const spanDSL: any = {
      query: {
        bool: {
          must: [
            {
              term: {
                traceId: props.traceId,
              },
            },
          ],
          filter: [],
          should: [],
          must_not: [],
        },
      },
    };
    spanFilters.map(({ field, value }) => {
      if (value != null) {
        spanDSL.query.bool.must.push({
          term: {
            [field]: value,
          },
        });
      }
    });
    return spanDSL;
  };

  useEffect(() => {
    refresh();
  }, [props.colorMap, spanFilters]);

  const getSpanDetailLayout = (plotTraces: Plotly.Data[], maxX: number): Partial<Plotly.Layout> => {
    // get unique labels from traces
    const yLabels = plotTraces
      .map((d) => d.y[0])
      .filter((label, i, self) => self.indexOf(label) === i);
    // remove uuid when displaying y-ticks
    const yTexts = yLabels.map((label) => label.substring(0, label.length - 36));

    return {
      height: 25 * plotTraces.length + 60,
      width: 800,
      margin: {
        l: 260,
        r: 5,
        b: 30,
        t: 30,
      },
      xaxis: {
        ticksuffix: ' ms',
        side: 'top',
        color: '#91989c',
        showline: true,
        range: [0, maxX * 1.2],
      },
      yaxis: {
        showgrid: false,
        tickvals: yLabels,
        ticktext: yTexts,
      },
    };
  };

  const layout = useMemo(() => getSpanDetailLayout(props.data.gantt, props.data.ganttMaxX), [
    props.data.gantt,
    props.data.ganttMaxX,
  ]);

  const [currentSpan, setCurrentSpan] = useState('');

  const onClick = (event: any) => {
    if (!event?.points) return;
    const point = event.points[0];
    if (fromApp) {
      props.openSpanFlyout(point.data.spanId);
    } else {
      setCurrentSpan(point.data.spanId);
    }
  };

  const renderFilters = useMemo(() => {
    return spanFilters.map(({ field, value }) => (
      <EuiFlexItem grow={false} key={`span-filter-badge-${field}`}>
        <EuiBadge
          iconType="cross"
          iconSide="right"
          iconOnClick={() => removeSpanFilter(field)}
          iconOnClickAriaLabel="remove current filter"
        >
          {`${field}: ${value}`}
        </EuiBadge>
      </EuiFlexItem>
    ));
  }, [spanFilters]);

  const onHover = () => {
    const dragLayer = document.getElementsByClassName('nsewdrag')?.[0];
    dragLayer.style.cursor = 'pointer';
  };

  const onUnhover = () => {
    const dragLayer = document.getElementsByClassName('nsewdrag')?.[0];
    dragLayer.style.cursor = '';
  };

  const toggleOptions = [
    {
      id: 'timeline',
      label: 'Timeline',
    },
    {
      id: 'span_list',
      label: 'Span list',
    },
  ];
  const [toggleIdSelected, setToggleIdSelected] = useState(toggleOptions[0].id);

  const spanDetailTable = useMemo(
    () => (
      <SpanDetailTable
        http={props.http}
        hiddenColumns={['traceId', 'traceGroup']}
        DSL={DSL}
        openFlyout={(spanId: string) => {
          if (fromApp) {
            props.openSpanFlyout(spanId);
          } else {
            setCurrentSpan(spanId);
          }
        }}
      />
    ),
    [DSL, setCurrentSpan]
  );

  return (
    <>
      <EuiPanel>
        <EuiFlexGroup>
          <EuiFlexItem>
            <PanelTitle title="Spans" totalItems={props.data.gantt.length / 2} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonGroup
              legend="Select view of spans"
              options={toggleOptions}
              idSelected={toggleIdSelected}
              onChange={(id) => setToggleIdSelected(id)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        {spanFilters.length > 0 && (
          <>
            <EuiSpacer size="s" />
            <EuiFlexGroup gutterSize="s" wrap>
              {renderFilters}
            </EuiFlexGroup>
          </>
        )}
        <EuiHorizontalRule margin="m" />
        <div style={{ overflowY: 'auto', maxHeight: 500 }}>
          {toggleIdSelected === 'timeline' ? (
            <Plt
              data={props.data.gantt}
              layout={layout}
              onClickHandler={onClick}
              onHoverHandler={onHover}
              onUnhoverHandler={onUnhover}
            />
          ) : (
            spanDetailTable
          )}
        </div>
      </EuiPanel>
      {!!currentSpan && (
        <SpanDetailFlyout
          http={props.http}
          spanId={currentSpan}
          isFlyoutVisible={!!currentSpan}
          closeFlyout={() => setCurrentSpan('')}
          addSpanFilter={addSpanFilter}
        />
      )}
    </>
  );
}
