import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import type { SearchDataType, VisitDataType } from '../data.d';

import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: <FormattedMessage id="dashboardandanalysis.table.index" defaultMessage="Index" />,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: (
      <FormattedMessage
        id="dashboardandanalysis.table.currency"
        defaultMessage="Currency"
      />
    ),
    dataIndex: 'currency',
    key: 'currency',
    render: (text: React.ReactNode) => <span>{text}</span>,
  },
   {
    title: (
      <FormattedMessage
        id="dashboardandanalysis.table.currency"
        defaultMessage="Description"
      />
    ),
    dataIndex: 'description',
    key: 'description',
    render: (text: React.ReactNode) => <span>{text}</span>,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.symbol" defaultMessage="Symbols" />,
    dataIndex: 'symbol',
    key: 'symbol',
    sorter: (a: { symbol: string }, b: { symbol: string }) => a.symbol < b.symbol,
    className: styles.alignRight,
  },
  // {
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
}) => (
  <Card
    loading={loading}
    bordered={false}
    title={
      <FormattedMessage
        id="Symbols"
        defaultMessage="Symbols"
      />
    }
    extra={dropdownGroup}
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
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
