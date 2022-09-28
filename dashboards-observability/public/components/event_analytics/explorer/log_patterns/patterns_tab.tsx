/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiHorizontalRule,
  EuiButton,
  EuiFlexItem,
  EuiFlexGroup,
} from '@elastic/eui';
import React, { useState } from 'react';
import { PatternDetailFlyout } from './pattern_detail_flyout';
import { DocFlyout } from '../events_views/doc_flyout';
import { HttpSetup } from '../../../../../../../src/core/public';
import { PatternsTable } from './patterns_table';
import { EditPatternFlyout } from './edit_pattern_flyout';

interface PatternsTabProps {
  http: HttpSetup;
}

export interface PatternType {
  firstTimestamp: number;
  lastTimestamp: number;
  puncSignature: string;
  patternName: string;
  ratio: string;
  count: string;
}

export function PatternsTab(props: PatternsTabProps) {
  const { http } = props;

  // Uncomment below to enable EuiComboBox
  // const [selectedOptions, setSelected] = useState<OptionType[]>([]);
  // const [options, setOptions] = useState<OptionType[]>(
  //   dummyTableData.map((td) => {
  //     return {
  //       label: td.puncSignature,
  //     };
  //   })
  // );
  // const onChange = (selected: any) => {
  //   setSelected(selected);
  // };

  // const onCreateOption = (
  //   searchValue: string,
  //   flattenedOptions: Array<EuiComboBoxOptionOption<unknown>> = []
  // ) => {
  //   const normalizedSearchValue = searchValue.trim().toLowerCase();

  //   if (!normalizedSearchValue) {
  //     return;
  //   }

  //   const newOption = {
  //     label: searchValue,
  //   };

  //   // Create the option if it doesn't exist.
  //   if (
  //     flattenedOptions.findIndex(
  //       (option: OptionType) => option.label.trim().toLowerCase() === normalizedSearchValue
  //     ) === -1
  //   ) {
  //     setOptions([...options, newOption]);
  //   }

  //   // Select the option.
  //   setSelected([...selectedOptions, newOption]);
  // };

  // Uncomment to enable Filters
  // const [filters, setFilters] = useState<FilterType[]>([]);

  const emptyData = [] as PatternType[];
  const fullData = [
    {
      firstTimestamp: Date.now(),
      lastTimestamp: Date.now(),
      puncSignature:
        '///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=///*-=',
      patternName: 'generated-signature-0001',
      ratio: '45%',
      count: '461',
    },
    {
      firstTimestamp: Date.now(),
      lastTimestamp: Date.now(),
      puncSignature: '^/!//&^*-^=',
      patternName: 'generated-signature-0002',
      ratio: '25%',
      count: '561',
    },
    {
      firstTimestamp: Date.now(),
      lastTimestamp: Date.now(),
      puncSignature: '^/""/&^*-^=',
      patternName: 'generated-signature-0003',
      ratio: '10%',
      count: '661',
    },
    {
      firstTimestamp: Date.now(),
      lastTimestamp: Date.now(),
      puncSignature: '^#@//-()^=',
      patternName: 'generated-signature-0004',
      ratio: '20%',
      count: '761',
    },
  ];
  const [dummyTableData, setDummyTableData] = useState(fullData);

  const dummyDoc = {
    agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1',
    bytes: '4531',
    clientip: '218.148.135.12',
    event: '{"dataset":"sample_web_logs"}',
    extension: 'gz',
    geo:
      '{"srcdest":"BR:ES","src":"BR","coordinates":{"lat":32.73355611,"lon":-117.1896567},"dest":"ES"}',
    host: 'artifacts.opensearch.org',
    index: 'opensearch_dashboards_sample_data_logs',
    ip: '218.148.135.12',
    machine: '{"os":"win 8","ram":11811160064}',
    memory: 'null',
    message:
      '218.148.135.12 - - [2018-07-22T04:18:12.345Z] "GET /beats/filebeat/filebeat-6.3.2-linux-x86_64.tar.gz_1 HTTP/1.1" 200 4531 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1"',
    phpmemory: 'null',
    referer: 'http://www.opensearch-opensearch-opensearch.com/success/gemini-6a',
    request: '/beats/filebeat/filebeat-6.3.2-linux-x86_64.tar.gz',
    response: '200',
    tags: 'warning',
    timestamp: '2022-06-26 04:18:12.345',
    url:
      'https://artifacts.opensearch.org/downloads/beats/filebeat/filebeat-6.3.2-linux-x86_64.tar.gz_1',
    utc_time: '2022-06-26 04:18:12.345',
  };

  const dummyTimeStampField = 'timestamp';

  const dummyExplorerFields = {
    availableFields: [
      { name: 'agent', type: 'string' },
      { name: 'bytes', type: 'long' },
      { name: 'clientip', type: 'ip' },
      { name: 'event', type: 'struct' },
      { name: 'extension', type: 'string' },
      { name: 'geo', type: 'struct' },
      { name: 'host', type: 'string' },
      { name: 'index', type: 'string' },
      { name: 'ip', type: 'ip' },
      { name: 'machine', type: 'struct' },
      { name: 'memory', type: 'double' },
      { name: 'phpmemory', type: 'long' },
      { name: 'referer', type: 'string' },
      { name: 'request', type: 'string' },
      { name: 'response', type: 'string' },
      { name: 'tags', type: 'string' },
      { name: 'timestamp', type: 'timestamp' },
      { name: 'url', type: 'string' },
      { name: 'utc_time', type: 'timestamp' },
    ],
    queriedFields: [],
    selectedFields: [{ name: 'message', type: 'string' }],
    unselectedFields: [
      { name: 'agent', type: 'string' },
      { name: 'bytes', type: 'long' },
      { name: 'clientip', type: 'ip' },
      { name: 'event', type: 'struct' },
      { name: 'extension', type: 'string' },
      { name: 'geo', type: 'struct' },
      { name: 'host', type: 'string' },
      { name: 'index', type: 'string' },
      { name: 'ip', type: 'ip' },
      { name: 'machine', type: 'struct' },
      { name: 'memory', type: 'double' },
      { name: 'message', type: 'string' },
      { name: 'phpmemory', type: 'long' },
      { name: 'referer', type: 'string' },
      { name: 'request', type: 'string' },
      { name: 'response', type: 'string' },
      { name: 'tags', type: 'string' },
      { name: 'timestamp', type: 'timestamp' },
      { name: 'url', type: 'string' },
      { name: 'utc_time', type: 'timestamp' },
    ],
  };

  const dummyRawQuery =
    "source = opensearch_dashboards_sample_data_logs | where match(request,'filebeat')";

  const emptyPattern = {
    firstTimestamp: 0,
    lastTimestamp: 0,
    puncSignature: '',
    patternName: '',
    ratio: '',
    count: '',
  };

  const [patternFlyoutOpen, setPatternFlyoutOpen] = useState<PatternType>(emptyPattern);
  const [eventFlyoutOpen, setEventFlyoutOpen] = useState<PatternType>(emptyPattern);
  const [editFlyoutOpen, setEditFlyoutOpen] = useState('');
  const [surroundingEventsOpen, setSurroundingEventsOpen] = useState<boolean>(false);
  const [openTraces, setOpenTraces] = useState<boolean>(false);
  const [flyoutToggleSize, setFlyoutToggleSize] = useState(false);

  const openPatternFlyout = (pattern: PatternType) => {
    setPatternFlyoutOpen(pattern);
  };

  const closePatternFlyout = () => {
    setPatternFlyoutOpen(emptyPattern);
  };

  const openEventFlyout = () => {
    const patternSave = patternFlyoutOpen;
    closePatternFlyout();
    setEventFlyoutOpen(patternSave);
  };

  const closeEventFlyout = () => {
    const patternSave = eventFlyoutOpen;
    setEventFlyoutOpen(emptyPattern);
    openPatternFlyout(patternSave);
  };

  const openEditFlyout = (existingName: string) => {
    setEditFlyoutOpen(existingName);
  };

  const closeEditFlyout = () => {
    setEditFlyoutOpen('');
  };

  const onRename = (newName: string) => {
    closeEditFlyout();
  };

  const renamePattern = (existingName: string) => {
    openEditFlyout(existingName);
  };

  return (
    <>
      <EuiPanel>
        <EuiFlexGroup direction="row">
          <EuiFlexItem>
            <EuiTitle size="s">
              <h3>
                Punctuation Signatures
                <span className="panel-header-count"> ({dummyTableData.length})</span>
              </h3>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              onClick={() => {
                if (dummyTableData.length) {
                  setDummyTableData(emptyData);
                } else {
                  setDummyTableData(fullData);
                }
              }}
            >
              Change table data
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xs" />
        {/* <Filters page="patterns" filters={filters} setFilters={setFilters} appConfigs={[]} /> */}
        {/* <EuiComboBox
        fullWidth={true}
        onChange={onChange}
        onCreateOption={onCreateOption}
        options={options}
        selectedOptions={selectedOptions}
      /> */}
        <EuiSpacer size="m" />
        <PatternsTable
          tableData={dummyTableData}
          renamePattern={renamePattern}
          openPatternFlyout={openPatternFlyout}
        />
        {patternFlyoutOpen.puncSignature !== '' && (
          <PatternDetailFlyout
            pattern={patternFlyoutOpen}
            closeFlyout={closePatternFlyout}
            renamePattern={renamePattern}
            openEventFlyout={openEventFlyout}
          />
        )}
        {eventFlyoutOpen.puncSignature !== '' && (
          <DocFlyout
            http={http}
            detailsOpen={eventFlyoutOpen !== emptyPattern}
            setDetailsOpen={() => setEventFlyoutOpen(emptyPattern)}
            doc={dummyDoc}
            timeStampField={dummyTimeStampField}
            memorizedTds={[
              <td className="osdDocTableCell__dataField eui-textBreakAll eui-textBreakWord">
                {`218.148.135.12 - - [2018-07-22T04:18:12.345Z] "GET /beats/filebeat/filebeat-6.3.2-linux-x86_64.tar.gz_1 HTTP/1.1" 200 4531 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1"`}
              </td>,
            ]}
            explorerFields={dummyExplorerFields}
            openTraces={openTraces}
            rawQuery={dummyRawQuery}
            toggleSize={flyoutToggleSize}
            backButtonExists={true}
            onBackButtonClick={() => closeEventFlyout()}
            setToggleSize={setFlyoutToggleSize}
            setOpenTraces={setOpenTraces}
            setSurroundingEventsOpen={setSurroundingEventsOpen}
          />
        )}
        {editFlyoutOpen && (
          <EditPatternFlyout
            closeFlyout={closeEditFlyout}
            patternName={editFlyoutOpen}
            onRename={onRename}
          />
        )}
      </EuiPanel>
    </>
  );
}
