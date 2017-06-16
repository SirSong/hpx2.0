import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Popconfirm, message } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Receiving.css';

import moment from 'moment';
// import Search from './Search';
const dateFormat = 'YYYY/MM/DD';

class Receiving extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
    };
    this.columns = [{
          key: 'description',
          title: '品名',
          dataIndex: 'description',
        },{
          key: 'specification',
          title: '规格',
          dataIndex: 'specification',
        },
        {
          key: 'model',
          title: '型号',
          dataIndex: 'model',
        },{
          key: 'unit',
          title: '计量单位',
          dataIndex: 'unit',
        },{
          key: 'amount',
          title: '数量',
          dataIndex: 'amount',
        },
        {
          key: 'univalence',
          title: '单价',
          dataIndex: 'univalence',
        },{
          key: 'total',
          title: '总价',
          dataIndex: 'total',
        },{
          key: 'receivedAmount',
          title: '实收数量',
          dataIndex: 'receivedAmount',
        },
        {
          key: 'differenceAmount',
          title: '差异数量',
          dataIndex: 'differenceAmount',
        },{
          key: 'differenceMoney',
          title: '差异金额',
          dataIndex: 'differenceMoney',
        }
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
      if (this.props.params.id) {
        let queryParams = 
          JSON.parse(decodeURI(this.props.params.queryParams));
        this.props.updateQueryParams(id);
      }
    } catch (e) {
      console.log(e);
    }
    this.props.fetchReceiving(this.props.params.id);
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
    return '/PurchaseContract/' + encodeURI(JSON.stringify(v || {}));
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
          <Button type="primary">补发申请</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">退款申请</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">补购申请</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">暂不处理</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">新增收货</Button>
        </Link>
        <Link 
          to={`${this.getUrlQueryParams()}/detail/0`} 
          style={{ marginRight: '16px' }}
        >
          <Button type="primary">编辑实收数量</Button>
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
      <div className="total">
        <span className="amount">实收共计:200件</span>
        <br></br>
        <span className="money">￥ 100,000,000.00</span>
        <br></br>
        <Button type="primary">确认收货</Button>
      </div>
    </div>;
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

Receiving.propTypes = {
}

export default withRouter(Receiving)
