import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Popconfirm, message } from 'antd'
import { getMoment, precisionFormat } from '../../../core/util'
import './Component.css';

import moment from 'moment'
import Search from './Search';
const dateFormat = 'YYYY/MM/DD';

class Compo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
    };
    this.columns = [{
          key: 'code',
          title: '编号',
          dataIndex: 'code',
        },{
          key: 'money',
          title: '金额',
          dataIndex: 'money',
          render: (text) => <span>{precisionFormat(2,text)}</span>
        },{
          key: 'receiptsType',
          title: '单据类型',
          dataIndex: 'receiptsType',
          render: (text, record) => 
            <span>{
              [{"value":"退款单","name":"T"},{"value":"补发单","name":"F"},{"value":"补购单","name":"G"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },{
          key: 'approvalStatus',
          title: '审批状态',
          dataIndex: 'approvalStatus',
          render: (text, record) => 
            <span>{
              [{"value":"待审批","name":"0"},{"value":"已通过","name":"1"},{"value":"已拒绝","name":"2"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },{
          key: 'contractCode',
          title: '合同编号',
          dataIndex: 'contractCode',
        },{
          key: 'orderCode',
          title: '订单编号',
          dataIndex: 'orderCode',
        },{
          key: 'purchaser',
          title: '采购方',
          dataIndex: 'purchaser',
        },{
          key: 'applicationDate',
          title: '申请日期',
          dataIndex: 'applicationDate',
          render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },{
          key: 'paymentStatus',
          title: '付款状态',
          dataIndex: 'paymentStatus',
          render: (text, record) => 
            <span>{
              [{"value":"待支付","name":"0"},{"value":"已支付","name":"1"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },{
          key: 'shipmentsStatus',
          title: '收货状态',
          dataIndex: 'shipmentsStatus',
          render: (text, record) => 
            <span>{
              [{"value":"待收货","name":"0"},{"value":"已收货","name":"1"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/detail/0/${record.id}`}>
              修改
            </Link>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }];
  }
  componentWillMount() {
    try {
      if (this.props.params.queryParams) {
        let queryParams = 
          JSON.parse(decodeURI(this.props.params.queryParams));
        this.props.updateQueryParams(queryParams);
      }
    } catch (e) {
      console.log(e);
    }
    this.props.fetchList();
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    const { deleteStatus, listStatus, fetchList, list, err } = nextProps;
    if (
      this.props.listStatus.type != listStatus.type
      && listStatus.type.match('SUCCESS')
      && list.rows.length == 0 && list.queryParams.pagination.total > 0
    ) {//删除成功重新拉取列表数据
      fetchList();
    }
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      fetchList();
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  //分页、排序、筛选变化时触发
  handleTableChange(pagination, filters, sorter) {
    browserHistory.push(`${this.getUrlQueryParams(
      {
        ...this.props.list.queryParams,
        pagination,
      }
    )}`);
  }
  getMomentFormat(v) {
    if (!v) return null;
    return moment(v).format('YYYY-MM-DD');
  }
  search() {
    let queryParams = this.props.list.queryParams;
    let arr = [];
    let obj = {};
    arr.forEach((v)=> {obj[v.key] = v.value});
    obj.pagination = this.props.list.queryParams.pagination,
    browserHistory.push(
      this.getUrlQueryParams(obj)
    );
  }
  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/afterSale/' + encodeURI(JSON.stringify(v || {}));
  }
  render() {
    const { selectedRowKeys } = this.state;
    const { list, fetchList, listStatus } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      selections: [
        selectedRowKeys.length == 1
          ? {
            key: 'operate1',
            text: '操作1',
            onSelect: () => {
              message.info('操作1')
            },
          } : null
      ].filter((v) => v || false),
    };
    const hasSelected = selectedRowKeys.length > 0;

    let view = <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          {...list.queryParams}
          search={this.search.bind(this)}
          onChange={this.props.updateQueryParams.bind(this)}
          clear={this.props.clearQueryParams}
          loading={listStatus.loading}
        />
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">新增</Button>
        </Link>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `选择了 ${selectedRowKeys.length} 项` : ''}
        </span>
      </div>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={this.columns}
        dataSource={list.rows}
        pagination={list.queryParams.pagination}
        loading={listStatus.loading}
        onChange={this.handleTableChange.bind(this)}
      />
    </div>;
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

Compo.propTypes = {
}

export default withRouter(Compo)
