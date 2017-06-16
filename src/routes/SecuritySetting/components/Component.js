import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Progress, Popconfirm, message } from 'antd'
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
        key: 'email',
        title: '',
        dataIndex: 'email',
      },{
        key: 'accuracy',
        title: '',
        dataIndex: 'accuracy',
        render: (text) => <span>{precisionFormat(2,text)}</span>
      },{
        key: 'datePicker',
        title: '',
        dataIndex: 'datePicker',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <span style={{color:"green"}}><Icon type="check-circle-o" /> &nbsp;&nbsp;已设置</span>
            <span className="ant-divider" />
            <Link  style={{color:"green"}} to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              修改
            </Link>
          </span>
        ),
      }];
      this.columnsUn = [{
        key: 'email',
        title: '',
        dataIndex: 'email',
      },{
        key: 'accuracy',
        title: '',
        dataIndex: 'accuracy',
        render: (text) => <span>{precisionFormat(2,text)}</span>
      },{
        key: 'datePicker',
        title: '',
        dataIndex: 'datePicker',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <span><Icon type="check-circle-o" />已设置</span>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              修改
            </Link>
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
    let arr = [{
        key: 'field1',
        value: {
          value: queryParams.field1 ? queryParams.field1.value : null
        }
      },{
        key: 'field2',
        value: {
          value: queryParams.field2
            ? this.getMomentFormat(queryParams.field2.value) 
            : null
        }
      },{
        key: 'field3',
        value: {
          value: queryParams.field3 && queryParams.field3.value
            ? queryParams.field3.value.length > 0
              ? [
                this.getMomentFormat(queryParams.field3.value[0]),
                this.getMomentFormat(queryParams.field3.value[1]),
              ].filter((v) => !!v)
              : null
            : null,
        }
      },{
        key: 'field4',
        value: {
          value: queryParams.field4 ? queryParams.field4.value : null
        }
      }];
    let obj = {};
    arr.forEach((v)=> {obj[v.key] = v.value});
    obj.pagination = this.props.list.queryParams.pagination,
    browserHistory.push(
      this.getUrlQueryParams(obj)
      // 'textOb'
    );
  }
  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/testOb/' + encodeURI(JSON.stringify(v || {}));
  }

  // handleClick() {

  // }

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
      <div className='progress'>
        <span>您当前的账号安全程度</span>
        <Progress style={{color:"orange"}} percent={50} showInfo={false} />
        <span>安全级别</span>
        <i></i>
        <span>继续努力</span>
      </div>
      <Table
        rowKey="id"
        columns={this.columns}
        dataSource={list.rows}
        loading={listStatus.loading}
        onChange={this.handleTableChange.bind(this)}
      />
    </div>;
    /*let view = 

    <div>
      


    </div>*/
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
