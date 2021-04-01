import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React, { useState } from 'react';
import numeral from 'numeral';
import type { SearchDataType, VisitDataType } from '../data.d';
import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import Chart from '../components/Charts/CustomCandleStick/Chart';
import { symbolChartData } from '../../analysis/service';
const columns = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
    render: (text: React.ReactNode) => <span>{text}</span>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text: React.ReactNode) => <span>{text}</span>,
  },
  {
    title: 'Symbols',
    dataIndex: 'symbol',
    key: 'symbol',
    // sorter: (
    //   a: {
    //     symbol: string;
    //   },
    //   b: {
    //     symbol: string;
    //   },
    // ) => a.symbol.localeCompare(b.symbol),
    // className: styles.alignRight,
  }, // {
  //   title: (
  //     <FormattedMessage
  //       id="dashboardandanalysis.table.weekly-range"
  //       defaultMessage="Weekly Range"
  //     />
  //   ),
  //   dataIndex: 'range',
  //   key: 'range',
  //   sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
  //   render: (text: React.ReactNode, record: { status: number }) => (
  //     <Trend flag={record.status === 1 ? 'down' : 'up'}>
  //       <span style={{ marginRight: 4 }}>{text}%</span>
  //     </Trend>
  //   ),
  // },
];

const TopSearch = ({
  loading,
  visitData2,
  searchData,
  dropdownGroup,
}: {
  loading: boolean;
  visitData2: VisitDataType[];
  dropdownGroup: React.ReactNode;
  searchData: SearchDataType[];
}) => {
  const [page, setPage] = useState(1);
  const [loadingComp, setLoadingComp] = useState(false);
  const onChange = async (page: React.SetStateAction<number>, pageSize: any) => {
    setPage(page);
    setLoadingComp(true);
    for (let i = 0; i < 5; i++) {
      // searchData[i + 5 * (page - 1)].chartData = await symbolChartData(
      //   searchData[i + 5 * (page - 1)].symbol,
      // );
      if (searchData.length - 1 >= i + 5 * (page - 1)) {
        symbolChartData(searchData[i + 5 * (page - 1)].symbol).then((data) => {
          searchData[i + 5 * (page - 1)].chartData = data;
        });
      }

      // setTimeout(() => {
      // let tempChartState = [...isChartVisible];
      // tempChartState[i] = !!(
      //   searchData[i + 5 * (page - 1)].chartData && searchData[i + 5 * (page - 1)].chartData.close
      // );
      // setIsChartVisible(tempChartState);
      // console.log(tempChartState[searchData[i + 5 * (page - 1)].chartData?.close]);
      // }, 0);
    }
    setLoadingComp(false);
  };
  return (
    <Card
      loading={loading}
      bordered={false}
      title="Symbols" // extra={dropdownGroup}
      style={{
        height: '100%',
      }}
    >
      <Row gutter={68}></Row>
      <Table<any>
        rowKey={(record) => record.index}
        loading={loadingComp}
        size="middle"
        columns={columns}
        dataSource={searchData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 5,
          showSizeChanger: false,
          current: page,
          onChange: (page: any, pageSize: any) => onChange(page, pageSize),
        }}
        expandable={{
          expandedRowRender: (record: { index: React.ReactText }) =>
            searchData[record.index - 1].chartData &&
            searchData[record.index - 1].chartData[0].close ? (
              <Chart type="svg" data={searchData[record.index - 1].chartData} />
            ) : (
              <span>No Data</span>
            ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              // &&
              // searchData[record.index].chartData &&
              // searchData[record.index].chartData.close !== undefined
              <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            ) : (
              // searchData[record.index].chartData &&
              // searchData[record.index].chartData.close !== undefined &&
              <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            ),
        }}
      />
    </Card>
  );
};

export default TopSearch;
