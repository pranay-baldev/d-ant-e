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
  const onChange = async (page) => {
    console.log(page);
    setPage(page);
    for (let i = 0; i < 10; i++) {
      searchData[i].chartData = await symbolChartData(searchData[i].symbol);
    }
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
      <Row gutter={68}>
        {/* <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
       <NumberInfo
         subTitle={
           <span>
             <FormattedMessage
               id="dashboardandanalysis.analysis.search-users"
               defaultMessage="search users"
             />
             <Tooltip
               title={
                 <FormattedMessage
                   id="dashboardandanalysis.analysis.introduce"
                   defaultMessage="introduce"
                 />
               }
             >
               <InfoCircleOutlined style={{ marginLeft: 8 }} />
             </Tooltip>
           </span>
         }
         gap={8}
         total={numeral(12321).format('0,0')}
         status="up"
         subTotal={17.1}
       />
       <MiniArea line height={45} data={visitData2} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
       <NumberInfo
         subTitle={
           <span>
             <FormattedMessage
               id="dashboardandanalysis.analysis.per-capita-search"
               defaultMessage="Per Capita Search"
             />
             <Tooltip
               title={
                 <FormattedMessage
                   id="dashboardandanalysis.analysis.introduce"
                   defaultMessage="introduce"
                 />
               }
             >
               <InfoCircleOutlined style={{ marginLeft: 8 }} />
             </Tooltip>
           </span>
         }
         total={2.7}
         status="down"
         subTotal={26.2}
         gap={8}
       />
       <MiniArea line height={45} data={visitData2} />
      </Col> */}
      </Row>
      <Table<any>
        rowKey={(record) => record.index}
        size="middle"
        columns={columns}
        dataSource={searchData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 10,
          showSizeChanger: false,
          current: page,
          onChange: () => onChange(),
        }}
        expandable={{
          expandedRowRender: (record) => (
            <Chart type="svg" data={searchData[record.index].chartData} />
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            ) : (
              <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            ),
        }}
      />
    </Card>
  );
};

export default TopSearch;
