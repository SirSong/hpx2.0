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
          key: 'name',
          title: '合同名称',
          dataIndex: 'name',
        },{
          key: 'code',
          title: '合同编号',
          dataIndex: 'code',
        },
        // {
        //   key: 'firstParty',
        //   title: '甲方',
        //   dataIndex: 'firstParty',
        // },
        {
          key: 'secondParty',
          title: '采购方',
          dataIndex: 'secondParty',
        },{
          key: 'money',
          title: '合同金额',
          dataIndex: 'money',
          render: (text) => <span>{precisionFormat(2,text)}</span>
        },
        /*{
          key: 'contractDate',
          title: '签订日期',
          dataIndex: 'contractDate',
          render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },{
          key: 'deliveryDate',
          title: '送货日期',
          dataIndex: 'deliveryDate',
          render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },{
          key: 'deliveryAddress',
          title: '送货地址',
          dataIndex: 'deliveryAddress',
        },{
          key: 'acceptanceLevel',
          title: '验收标准',
          dataIndex: 'acceptanceLevel',
        },
        {
          key: 'fUser',
          title: '甲方联系人',
          dataIndex: 'fUser',
        },{
          key: 'fPhone',
          title: '甲方联系电话',
          dataIndex: 'fPhone',
        },{
          key: 'sUser',
          title: '乙方联系人',
          dataIndex: 'sUser',
        },{
          key: 'sPhone',
          title: '乙方联系电话',
          dataIndex: 'sPhone',
        },{
          key: 'fSignature',
          title: '甲方签章人',
          dataIndex: 'fSignature',
        },{
          key: 'sSignature',
          title: '乙方签章人',
          dataIndex: 'sSignature',
        },{
          key: 'fLocation',
          title: '甲方签章位置',
          dataIndex: 'fLocation',
        },{
          key: 'sLocation',
          title: '乙方签章位置',
          dataIndex: 'sLocation',
        },
        {
          key: 'fDate',
          title: '甲方签章时间',
          dataIndex: 'fDate',
        },{
          key: 'sDate',
          title: '乙方签章时间',
          dataIndex: 'sDate',
        },{
          key: 'contractType',
          title: '合同类型',
          dataIndex: 'contractType',
          render: (text, record) => 
            <span>{
              [{"value":"采购","name":"C"},{"value":"销售","name":"S"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },{
          key: 'receivingDate',
          title: '收货日期',
          dataIndex: 'receivingDate',
          render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },*/
        
        /*{
          key: 'deliveryDeadline',
          title: '提货期限',
          dataIndex: 'deliveryDeadline',
        },{
          key: 'orderCode',
          title: '订单编号',
          dataIndex: 'orderCode',
        },{
          key: 'fSignatureStatus',
          title: '甲方签章状态',
          dataIndex: 'fSignatureStatus',
        },{
          key: 'sSignatureStatus',
          title: '乙方签章状态',
          dataIndex: 'sSignatureStatus',
        },{
          key: 'financingStatus',
          title: '融资状态',
          dataIndex: 'financingStatus',
          render: (text, record) => 
            <span>{
              [{"value":"正常","name":"0"},{"value":"逾期","name":"1"},{"value":"待处置","name":"2"},{"value":"已处置","name":"3"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },
        */{
          key: 'receivingStatus',
          title: '收货状态',
          dataIndex: 'receivingStatus',
          render: (text, record) => 
            <span>{
              [{"value":"0","name":"待收货"},{"value":"1","name":"已收货"}]
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },{
          key: 'createTime',
          title: '创建时间',
          dataIndex: 'createTime',
          render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },{
          key: 'fileId',
          title: '文件',
          dataIndex: 'fileId',
          render: (text, record) => (
              <span>
               {text == 0 ? null : <a target="_blank" href="">查看文件</ a> }
              </span>
              ),
        },
        /*{
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
      }*/
      ];
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
    return '/SupplierContract/' + encodeURI(JSON.stringify(v || {}));
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
        {/*<Search
          {...list.queryParams}
          search={this.search.bind(this)}
          onChange={this.props.updateQueryParams.bind(this)}
          clear={this.props.clearQueryParams}
          loading={listStatus.loading}
        />*/}
        {/*<Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">新增</Button>
        </Link>*/}
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">签章</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">预览</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">上传合同</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/receiving/`+this.state.selectedRowKeys[0]} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary" disabled={this.state.selectedRowKeys.length !== 1}>查看收货清单</Button>
        </Link>
      </div>
      <Table 
        rowKey="id"
        rowSelection={rowSelection}
        columns={this.columns}
        dataSource={list.rows}
        pagination={list.queryParams.pagination}
        pagination={false}
        loading={listStatus.loading}
        onChange={this.handleTableChange.bind(this)}
        className="contractTable"
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
