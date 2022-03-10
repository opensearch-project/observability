/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chart, Partition, PartitionLayout, Settings } from "@elastic/charts";
import {
  EuiFacetButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiFacetGroup,
  EuiSpacer,
  EuiPageContent,
  EuiBasicTable,
  EuiLink,
  EuiTitle,
  EuiFieldText,
  EuiSuperDatePicker,
  ShortDate,
  OnTimeChangeProps,
  EuiInMemoryTable,
  Direction,
} from "@elastic/eui";
import dateMath from '@elastic/datemath';
import { EUI_CHARTS_THEME_DARK } from "@elastic/eui/dist/eui_charts_theme";
import { DurationRange } from "@elastic/eui/src/components/date_picker/types";
import { uiSettingsService } from "../../../common/utils";
import PPLService from "public/services/requests/ppl";
import React, { ChangeEvent, useEffect, useState } from "react";
import { isDateValid, onTimeChange, isPPLFilterValid } from "../custom_panels/helpers/utils";
import { Plt } from "../visualizations/plotly/plot";
import { PPLReferenceFlyout } from "../common/helpers";
import moment from "moment";
import { PPL_DATE_FORMAT, PPL_INDEX_REGEX } from '../../../common/constants/shared';
import { Moment } from "moment-timezone";
import { FILTER_DOWN, FILTER_UP, SOURCE_SYNTHETICS_LOGS, START_TIME_FIELD, STATUS_CODE_FIELD, STATUS_FIELD, TEST_SUITE_NAME_FIELD, URL_FIELD } from "../../../common/constants/synthetics";

type LogHistoryProps = {
  pplService: PPLService
};

export const SyntheticHomeTab = (props: LogHistoryProps) => {

  function tableRefreshIntervalTime() { return 5000; }

  // strings for use in PPL

  function grabRecentQuery() { return "search source = " + SOURCE_SYNTHETICS_LOGS  // grab from index
                                      + ' | fields ' // specifying all the fields needed
                                      + START_TIME_FIELD + ', ' 
                                      + URL_FIELD +  ', ' 
                                      + STATUS_FIELD + ', '
                                      + STATUS_CODE_FIELD + ', '
                                      + TEST_SUITE_NAME_FIELD
                                      + '| sort - ' + START_TIME_FIELD + ' | dedup ' + URL_FIELD + ', ' + TEST_SUITE_NAME_FIELD;}  // sorting to grab the most recent logs

  function allLogsQuery() { return grabRecentQuery()  } 

  function upLogsQuery() { return (allLogsQuery() + ' | where ' + STATUS_FIELD + ' = ' + FILTER_UP); }  // add a filter to only grab the 'UP' logs

  function downLogsQuery() { return (allLogsQuery() + ' | where ' + STATUS_FIELD + ' = ' + FILTER_DOWN); }  // add a filter to only grab the 'DOWN' logs

  function pieQuery() { return grabRecentQuery() }  // sorting to grab the most recent logs

  function endPieQuery() { return ' | stats count() by ' + STATUS_FIELD; }  // get the counts of 'UP' or 'DOWN'

  /*
   * State Hooks 
   */
  
  const [historyLogs, setHistoryLogs] = useState<Array<Object>>([]);  // stores table results to be shown
  const [historyQuery, setHistoryQuery] = useState(allLogsQuery);  // stores current query used to grab table results
  const [pieChartLogs, setPieChartLogs] = useState<Array<Object>>([]);  // stores pie chart results
  const [filterVal, setFilterVal] = useState('');  // stores extra filter to add onto queries

  const [addVizDisabled, setAddVizDisabled] = useState(false);  // side table states
  const [isHelpFlyoutVisible, setHelpIsFlyoutVisible] = useState(false);

  const [pplFilterValue, setPPLFilterValue] = useState('');  // has current filter typed into bar
  // below states used for date/time picker
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [start, setStart] = useState<ShortDate>('now-6d');
  const [end, setEnd] = useState<ShortDate>('now');
  // stores time value added onto queries

  /*
   * Settings for the up-time table of all test suites
   */
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  // columns for the History table
  const columns = [
    {
      field: "testSuiteName",
      name: "Test Suite",
      render: (test_suite: {} | null | undefined) => (
        <EuiLink href={`#${test_suite}`} target="_blank">
          {test_suite}
        </EuiLink>
      ),
      mobileOptions: {
        show: false
      },
      sortable: true
    },
    {
      field: "status",
      name: "Status",
      sortable: true
    },
    {
      field: "URL",
      name: "URL",
      render: (url: {} | null | undefined) => (
        <EuiLink href={`${url}`} target="_blank">
          {url}
        </EuiLink>
      ),
      mobileOptions: {
        show: false
      },
      sortable: true
    },
    {
      field: "response.status",
      name: "Status Code",
      sortable: true
    },
    {
      field: "startTime",
      name: "Latest Time Polled",
      type: "date",
      render: (date: Date) => {
        var datet: Date = new Date(date)
        // needed to convert date into local time, as the index stores times in UTC and this page
        // incorrectly reads it as local time (while being UTC) so the time will be off by the timezoneoffset
        var utcdate: Date = new Date(datet.getTime() - (datet.getTimezoneOffset() * 60 * 1000))
        return utcdate.toString()
      },
      sortable: true
    },
  ];
  
  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: historyLogs.length,
    pageSizeOptions: [5, 10, 20, 50],
  };

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
    <>
      <strong>
        {pageSize * pageIndex + 1}-{pageSize * pageIndex + pageSize}
      </strong>{' '}
      of {historyLogs.length}
    </>
    );

  /*
   *  Non-table methods
   */
  
  // onchange has to be here to allow for changes to PPL bar (might be used later on for autocomplete?)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPPLFilterValue(e.target.value);
  };

  // used for date/time picker
  const onDatePickerChange = (props: OnTimeChangeProps) => {
    onTimeChange(
      props.start,
      props.end,
      recentlyUsedRanges,
      setRecentlyUsedRanges,
      setStart,
      setEnd
    );
    setStart(props.start);
    setEnd(props.end);
    updateQueryComponents();
  };

  // here for when enter key is pressed on ppl bar, to apply changes to query from what is inputted into PPL bar
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (pplFilterValue === '') {
        setFilterVal('')
      } else {
        setFilterVal(pplFilterValue);
      }
      updateQueryComponents();
    }
  };

  const showHelpFlyout = () => {
    setAddVizDisabled(true);
    setHelpIsFlyoutVisible(true);
  };

  const closeHelpFlyout = () => {
    setAddVizDisabled(false);
    setHelpIsFlyoutVisible(false);
  };

  let helpFlyout;
  if (isHelpFlyoutVisible) {
    helpFlyout = <PPLReferenceFlyout module="panels" closeFlyout={closeHelpFlyout} />;
  }


  const updateQueryComponents = async () => {
    let finalPieQuery = queryAccumulator(pieQuery() + endPieQuery(), START_TIME_FIELD, start, end, filterVal); 
    await pplServiceRequestor(finalPieQuery, "data", setPieChartLogs)
    let finalHistoryQuery = queryAccumulator(historyQuery, START_TIME_FIELD, start, end, filterVal);
    await pplServiceRequestor(finalHistoryQuery, "jsonData", setHistoryLogs)
  }

  const convertDateTimeGMT = (datetime: string, isStart = true, formatted = true) => {
    let returnTime: undefined | Moment;
    if (isStart) {
      returnTime = dateMath.parse(datetime);
    } else {
      returnTime = dateMath.parse(datetime, { roundUp: true });
    }

    if (returnTime === undefined) {
      return returnTime;
    }
  
    if (formatted) return returnTime.utc().format(PPL_DATE_FORMAT);
    return returnTime;
  };


  // TODO: figure out if we need to use startTime or endTime with most things

  // Example Query:
  //    originalQuery: search source = observability-synthetics-logs
  //    timestampField: startTime
  //    startTime: now-6d
  //    endTime: now
  //    panelFilterQuery: where URL = 'amazon.com'
  const queryAccumulator = (
    originalQuery: string,
    timestampField: string,
    startTime: string,
    endTime: string,
    panelFilterQuery: string
  ) => {
    const indexMatchArray = originalQuery.match(PPL_INDEX_REGEX);
    if (indexMatchArray == null) {
      throw Error('index not found in Query');
    }
    const indexPartOfQuery = indexMatchArray[0];
    const filterPartOfQuery = originalQuery.replace(PPL_INDEX_REGEX, '');
    const timeQueryFilter = ` | where ${timestampField} >= '${convertDateTimeGMT(
      startTime
    )}' and ${timestampField} <= '${convertDateTimeGMT(endTime, false)}'`;
    const pplFilterQuery = panelFilterQuery === '' ? '' : ` | ${panelFilterQuery}`;
    return indexPartOfQuery + timeQueryFilter + pplFilterQuery + filterPartOfQuery;
  };

  // input:
  //    query: any valid query
  //    type: what part of the response to parse (e.g. 'data' or 'jsonData')
  //    result: a function to call with results (e.g. setHistoryLogs)
  // pplServiceRequestor will essentially take a ppl query and then use the function specified in
  // {result} to put the result into related components
  const pplServiceRequestor = async (
    query: string,
    type: string,
    result: React.Dispatch<React.SetStateAction<Object[]>>
  ) => {
    await props.pplService
      .fetch({ query: (query), format: 'viz' })
      .then((res) => {
        var tempVal = [];
        for (const field of Object.keys(res[type])) {
          tempVal.push(res[type][field])
        };
        result(tempVal)
      })
      .catch((error: Error) => {
        result([])
        console.error(error);
      })
  };

  // will pull from index logs every 5 seconds to update at that interval
  useEffect(() => {
    updateQueryComponents();
    const interval = setInterval(() => {
      updateQueryComponents();
    }, tableRefreshIntervalTime());
    return () => clearInterval(interval);
  }, [historyQuery]);

  return (
    <>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFieldText
            placeholder="Use PPL 'where' clauses to add filters on all visualizations [where URL = 'https://www.opensearch.org/']"
            value={pplFilterValue}
            fullWidth={true}
            onChange={onChange}
            onKeyPress={onKeyPress}
            // disabled={inputDisabled}
            append={
              <EuiLink
                aria-label="ppl-info"
                onClick={showHelpFlyout}
                style={{ padding: '10px' }}
              >
                PPL
              </EuiLink>
            }
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSuperDatePicker
            dateFormat={uiSettingsService.get('dateFormat')}
            start={start}
            end={end}
            onTimeChange={onDatePickerChange}
            recentlyUsedRanges={recentlyUsedRanges}
            // isDisabled={dateDisabled}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiPageContent>
        <EuiFlexGroup>
          <EuiFlexItem>
            <Plt
              data={[{
                values: pieChartLogs[0],
                labels: pieChartLogs[1],
                type: 'pie'
              }]}
              layout={{
                height: 250,
                width: 250
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContent>
      <EuiSpacer size="xl" />
      <EuiFlexGroup>
        <EuiFlexItem grow={false} align-items="center">
          <EuiText>
            Synthetics History
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFacetGroup layout="horizontal" gutterSize="none">
            <EuiFacetButton onClick={() => {setHistoryQuery(allLogsQuery() + filterVal)}}>
              All
            </EuiFacetButton>
            <EuiFacetButton onClick={() => {setHistoryQuery(upLogsQuery() + filterVal)}}>
              Up
            </EuiFacetButton>
            <EuiFacetButton onClick={() => {setHistoryQuery(downLogsQuery() + filterVal)}}>
              Down
            </EuiFacetButton>
          </EuiFacetGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiText size="xs">
        Showing {resultsCount} <strong>Test Suites</strong>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiPageContent>
        <EuiInMemoryTable
          items={historyLogs}
          columns={columns}
          pagination={pagination}
          onChange={onTableChange}
          sorting={{
            sort: {
              field: 'testSuiteName',
              direction: 'asc'
            },
          }}
          allowNeutralSort={false}
        />
      </EuiPageContent>
      {helpFlyout}
    </>
  );
};