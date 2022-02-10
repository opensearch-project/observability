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
} from "@elastic/eui";
import { EUI_CHARTS_THEME_DARK } from "@elastic/eui/dist/eui_charts_theme";
import { DurationRange } from "@elastic/eui/src/components/date_picker/types";
import { uiSettingsService } from "../../../common/utils";
import PPLService from "public/services/requests/ppl";
import React, { ChangeEvent, useEffect, useState } from "react";
import { isDateValid, convertDateTime, onTimeChange, isPPLFilterValid } from "../custom_panels/helpers/utils";
import { Plt } from "../visualizations/plotly/plot";
import { PPLReferenceFlyout } from "../common/helpers";
import moment from "moment";
import { PPL_DATE_FORMAT, PPL_INDEX_REGEX } from '../../../common/constants/shared';

type LogHistoryProps = {
  pplService: PPLService
};

export const SyntheticHomeTab = (props: LogHistoryProps) => {

  // some string literals for use in PPL

  const allLogsQuery = "search source = uptime-logs | fields startTime, URL, status, response.status, monitorName | sort - startTime | dedup URL | sort monitorName, URL";

  const upLogsQuery = allLogsQuery + " | where status = \"UP\"";

  const downLogsQuery = allLogsQuery + " | where status = \"DOWN\"";

  const pieQuery = "search source = uptime-logs | fields startTime, URL, status, response.status, monitorName | sort - startTime | dedup URL";
  const endPieQuery = " | stats count() by status";

  // State Hooks
  
  const [historyLogs, setHistoryLogs] = useState<Array<Object>>([]);  // stores table results to be shown
  const [historyQuery, setHistoryQuery] = useState(allLogsQuery);  // stores current query used to grab table results
  const [pieChartLogs, setPieChartLogs] = useState<Array<Object>>([]);  // stores pie chart results
  const [filterVal, setFilterVal] = useState('');  // stores extra filter to add onto queries

  const [addVizDisabled, setAddVizDisabled] = useState(false);  // side table states
  const [isHelpFlyoutVisible, setHelpIsFlyoutVisible] = useState(false);

  const [pplFilterValue, setPPLFilterValue] = useState('');  // has current filter typed into bar
  // below states used for date/time picker
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [start, setStart] = useState<ShortDate>('now-4h');
  const [end, setEnd] = useState<ShortDate>('now');
  // stores time value added onto queries
  const [timeVal, setTimeVal] = useState(" | where startTime > \'" + (moment(convertDateTime(start)).add(8, 'hours')).format(PPL_DATE_FORMAT) 
                                        + "\' and startTime < \'" + (moment(convertDateTime(end)).add(8, 'hours')).format(PPL_DATE_FORMAT)  + "\'");

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
    setTimeVal(" | where startTime > \'" + (moment(convertDateTime(start)).add(8, 'hours')).format(PPL_DATE_FORMAT) 
              + "\' and startTime < \'" + (moment(convertDateTime(end)).add(8, 'hours')).format(PPL_DATE_FORMAT)  + "\'");
    pplServiceRequestor(pieQuery + filterVal + timeVal + endPieQuery, "data", setPieChartLogs)
    pplServiceRequestor(historyQuery + filterVal + timeVal, "jsonData", setHistoryLogs)
  };

  // here for when enter key is pressed on ppl bar, to apply changes to query from what is inputted into PPL bar
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (pplFilterValue === '') {
        setFilterVal('')
      } else {
        setFilterVal(" | " + pplFilterValue);
      }
      pplServiceRequestor(pieQuery + filterVal + timeVal + endPieQuery, "data", setPieChartLogs)
      pplServiceRequestor(historyQuery + filterVal + timeVal, "jsonData", setHistoryLogs)
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
    console.log(query)
    await props.pplService
      .fetch({ query: (query), format: 'viz' })
      .then((res) => {
        var tempVal = [];
        for (const field of Object.keys(res[type])) {
          tempVal.push(res[type][field])
        };
        result(tempVal)
        console.log(tempVal)
      })
      .catch((error: Error) => {
        // setIsError(error.stack);
        result([])
        console.error(error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  // columns for the History table
  const columns = [
    {
      field: "monitorName",
      name: "Monitor Name",
      render: (monitor: {} | null | undefined) => (
        <EuiLink href={`#${monitor}`} target="_blank">
          {monitor}
        </EuiLink>
      ),
      mobileOptions: {
        show: false
      },
    },
    {
      field: "status",
      name: "Status",
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
    },
    {
      field: "response.status",
      name: "Status Code",
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
    },
  ];

  // will pull from index logs every 5 seconds to update at that interval
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("timeq: " + start)
      pplServiceRequestor(pieQuery + filterVal + timeVal + endPieQuery, "data", setPieChartLogs)
      pplServiceRequestor(historyQuery + filterVal + timeVal, "jsonData", setHistoryLogs)
    }, 5000);
    return () => clearInterval(interval);
  }, [historyQuery, pieQuery, filterVal, timeVal]);

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
            <EuiFacetButton onClick={() => {pplServiceRequestor(allLogsQuery + filterVal + timeVal, "jsonData", setHistoryLogs)
                                            setHistoryQuery(allLogsQuery + filterVal + timeVal)}}>
              All
            </EuiFacetButton>
            <EuiFacetButton onClick={() => {pplServiceRequestor(upLogsQuery + filterVal + timeVal, "jsonData", setHistoryLogs)
                                            setHistoryQuery(upLogsQuery + filterVal + timeVal)}}>
              Up
            </EuiFacetButton>
            <EuiFacetButton onClick={() => {pplServiceRequestor(downLogsQuery + filterVal + timeVal, "jsonData", setHistoryLogs)
                                            setHistoryQuery(downLogsQuery + filterVal + timeVal)}}>
              Down
            </EuiFacetButton>
          </EuiFacetGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="s" />
      <EuiPageContent>
        <EuiBasicTable
          items={historyLogs}
          columns={columns}
        />
      </EuiPageContent>
      {helpFlyout}
    </>
  );
};