import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Popconfirm, message } from 'antd'
import { getMoment, precisionFormat } from '../../../core/util'
import './Component.css';
import { fetchMenu } from '../../../modules/route'

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
        key: 'product',
        title: '产品',
        dataIndex: 'product',
        width: 160,
        className: 'column-product',
        render: text => <span className="ball">保</span>,
        // render: text => <span className="ball">{text}</span>,
      },{
        key: 'rose',
        title: '参与角色',
        dataIndex: 'rose',
      },{
        key: 'datePicker',
        title: '项目起始日',
        dataIndex: 'datePicker',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        key: 'money',
        title: '金额',
        dataIndex: 'money',
      },{
        key: 'proNum',
        title: '业务笔数',
        dataIndex: 'proNum',
      },{
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link 
              to={`${this.getUrlQueryParams()}/supplier/${record.id}`} 
              style={{ marginRight: '16px' }}
            >
              <Button type="primary">进入项目</Button>
            </Link>
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              <Icon type="setting" />
            </Link>
          </span>
        ),
      }];
  }
  componentWillMount() {
    this.props.fetchList();
    const { fetchMenu } = this.props;
    fetchMenu(); 
  }
  
  componentWillReceiveProps(nextProps) {
   
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

  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/myProject/' + encodeURI(JSON.stringify(v || {}));
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
      <div className="title">
        <span>我的项目</span>
        <Link 
          to={`${this.getUrlQueryParams()}/addCard`} 
          style={{ marginRight: '16px' }}
        >
          新增项目+
        </Link>
      </div>
      <Table
        rowKey="id"
        columns={this.columns}
        dataSource={list.rows}
        pagination={false}
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
