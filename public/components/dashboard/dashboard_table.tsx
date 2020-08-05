import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiI18nNumber,
  EuiIcon,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
  EuiToolTip,
  EuiTableComputedColumnType,
} from '@elastic/eui';
import React, { useState } from 'react';
import { dashboardTableData } from '../../data/dashboard_data';
import { PanelTitle, renderBenchmark, truncateText } from '../common/helper_functions';
import { BoxPlt } from './box_plt';
import { LinePlt } from './line_plt';

const renderTitleBar = () => {
  return (
    <EuiFlexGroup alignItems="center" gutterSize="s">
      <EuiFlexItem grow={10}>
        <PanelTitle title="Latency by trace group" totalItems={70} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiLink>
          {/* <EuiText size='xs'><EuiIcon type="stop" style={{color :'#957ac9' }} /> &lt; 95 percentile</EuiText> */}
          <EuiText size="xs">
            <span style={{ color: '#957ac9' }}>&#x25a1;</span> &lt; 95 percentile
          </EuiText>
        </EuiLink>
      </EuiFlexItem>
      <EuiFlexItem grow={1} />
      <EuiFlexItem grow={false}>
        <EuiLink>
          <EuiText size="xs">
            <span style={{ color: '#957ac9' }}>&#x25a0;</span> &gt;= 95 percentile
          </EuiText>
        </EuiLink>
      </EuiFlexItem>
      <EuiFlexItem grow={1} />
      <EuiFlexItem grow={false}>
        <EuiText size="xs">Benchmark</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={4}>
        <EuiSuperSelect
          options={[
            {
              value: 'option_one',
              inputDisplay: 'This time last week',
            },
            {
              value: 'option_2',
              inputDisplay: 'This time yesterday',
            },
            {
              value: 'option_3',
              inputDisplay: 'This time last month',
            },
          ]}
          valueOfSelected={'option_one'}
          onChange={() => {}}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

// can't use hooks in nested functions, need something else
const renderLinePlt = (item) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <EuiFlexGroup gutterSize="s">
      <EuiFlexItem />
      <EuiFlexItem>
        <LinePlt data={item} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiPopover
          ownFocus
          button={
            <EuiButtonIcon
              // onClick={() => setIsPopoverOpen(true)}
              iconType="magnifyWithPlus"
              size="s"
            />
          }
          isOpen={false}
          // closePopover={() => { setIsPopoverOpen(false) }}
          closePopover={() => {}}
        >
          hello
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

const columns = [
  {
    field: 'trace_group_name',
    name: (
      <EuiToolTip content="test tooltip">
        <span>
          Trace group name{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    align: 'left',
    sortable: true,
    truncateText: true,
    render: (item) => (
      <EuiLink href="#" target="_blank">
        {truncateText(item)}
      </EuiLink>
    ),
  },
  {
    field: 'latency_variance',
    name: (
      <EuiToolTip content="test tooltip">
        <span>
          Latency variance{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    align: 'center',
    sortable: true,
    truncateText: true,
    // width: '20%',
    render: (item) => {
      return <BoxPlt props={{ min: 0, max: 80, left: item[0], mid: item[1], right: item[2] }} />;
    },
  },
  {
    field: 'average_latency',
    name: (
      <EuiToolTip content="test tooltip">
        <span>
          Average latency (ms){' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    align: 'right',
    sortable: true,
    truncateText: true,
    dataType: 'number',
    // render: item => (
    //   <EuiLink href="#" target="_blank">
    //     {item}
    //   </EuiLink>
    // ),
  },
  {
    field: 'average_latency_vs_benchmark',
    name: (
      <EuiToolTip
        content={
          <EuiText size="xs">
            How much more (in red) or less (in green) the average latency during the selected time
            window compared against the selected benchmark.
          </EuiText>
        }
      >
        <span>
          Average latency vs benchmark{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => renderBenchmark(item),
  },
  {
    field: '24_hour_latency_trend',
    name: (
      <EuiToolTip content="test tooltip">
        <span>
          24-hour latency trend{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    align: 'center',
    sortable: true,
    truncateText: true,
    render: (item) => {
      // const [isPopoverOpen, setisPopoverOpen] = useState(false);
      return (
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem />
          <EuiFlexItem>
            <LinePlt data={item} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPopover
              ownFocus
              button={
                <EuiButtonIcon
                  // onClick={() => setisPopoverOpen(true)}
                  iconType="magnifyWithPlus"
                  size="s"
                />
              }
              isOpen={false}
              // closePopover={() => { setisPopoverOpen(false) }}
              closePopover={() => {}}
            >
              hello
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    },
  },
  {
    field: 'error_rate',
    name: (
      <EuiToolTip content="test tooltip">
        <span>
          Error rate{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => <EuiText size="s">{`${item}%`}</EuiText>,
  },
  {
    field: 'traces',
    name: (
      <EuiToolTip content="test tooltip">
        <span>
          Traces{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => (
      <EuiLink href="#traces">
        <EuiI18nNumber value={item} />
      </EuiLink>
    ),
  },
];

const items = dashboardTableData;

export function DashboardTable() {
  const TABLE_ID = 'latency-table-id';
  const [sortedColumn, setSortedColumn] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  return (
    <>
      <EuiPanel>
        {renderTitleBar()}
        <EuiSpacer size="m" />
        <EuiHorizontalRule margin="none" />
        <EuiInMemoryTable
          items={items}
          columns={columns}
          pagination={{
            initialPageSize: 10,
            pageSizeOptions: [8, 10, 13],
          }}
          tableLayout="auto"
        />
      </EuiPanel>
    </>
  );
}
