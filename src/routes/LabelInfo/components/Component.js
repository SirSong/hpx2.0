import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Popconfirm, message, Modal } from 'antd'
import { getMoment, precisionFormat } from '../../../core/util'
import './Component.css';

import moment from 'moment'
import Search from './Search';
import AddLabel from './AddLabel';
const dateFormat = 'YYYY/MM/DD';


class Compo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
    };
    this.columns = [{
        key: 'scoreCardName',
        title: '名称',
        dataIndex: 'scoreCardName',
      },{
        key: 'opneWeight',
        title: '是否权重',
        dataIndex: 'opneWeight',
      },{
        key: 'addUserId',
        title: '创建人',
        dataIndex: 'addUserId',
      },{
        key: 'addTime',
        title: '添加时间',
        dataIndex: 'addTime',
      },{
        key: 'labelState',
        title: '状态',
        dataIndex: 'labelState',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              查看
            </Link>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/edit/${record.id}`}>
              编辑
            </Link>
            <span className="ant-divider" />
            <Link to={`${this.getUrlQueryParams()}/disabled/${record.id}`}>
              禁用
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
    );
  }
  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/label-info/' + encodeURI(JSON.stringify(v || {}));
  }
  handleOk = () => {
    const form = this.refs.addForm
    form.validateFields((err, values) => {
        if(err) {
          return
        }
        form.resetFields()
        console.log(11,values);

        let data = {};
        data.labelName = values['labelName']
        data.quanzhong = values['quanzhong']

        console.log(12,data);
        // this.props.fetchAdd(data)
      })
  }
  render() {
    const { selectedRowKeys } = this.state;
    const { list, fetchList, listStatus, showModal, handleCancel, visible } = this.props;
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

        <Button type="primary" onClick={showModal}>导入标签</Button>
        <Modal title="新增标签"
          visible={visible}
          onOk={this.handleOk}
          onCancel={handleCancel}
        >
          <AddLabel 
            ref='addForm'/>
        </Modal>

        <Button type="primary">下载标签模板</Button>
      </div>
      <Table
        rowKey="id"
        columns={this.columns}
        dataSource={list.rows}
        bordered={true}
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
