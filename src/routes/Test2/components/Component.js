import React from 'react'
import { Link, withRouter } from 'react-router'
import { Row, Col, Button, Table, Icon, Popconfirm, message } from 'antd'

import SearchForm from '../../../components/SearchForm/SearchForm'

import { getReq , deleteReq , patchReq } from '../../../core/fetch'

const dateFormat = 'YYYY/MM/DD';

class Compo extends React.Component {
  constructor(props) {
    super(props);

    this.testOpt = [
      {
        key : 'field1',
        type : 'text',
        label : 'test1' ,
        isRequire : true,
      },
      {
        key : 'field2',
        type : 'date',
        label : 'test2' ,
        // isRequire : true,
      },
      // {
      //   key : 'field3',
      //   type : 'date',
      //   label : 'test3' ,
      // }
    ];
    
    this.columns = [{
        key: 'email',
        title: '邮箱',
        dataIndex: 'email',
      },{
        key: 'accuracy',
        title: '数字',
        dataIndex: 'accuracy',
      },{
        key: 'datePicker',
        title: '日期',
        dataIndex: 'datePicker',
      },{
        key: 'selectorcountry',
        title: '国家',
        dataIndex: 'selectorcountry',
        render: (text, record) => 
          <span>{
            [{"value":"china","name":"中国"},{"value":"usa","name":"美国"}]
              .filter((v)=> v.value == text).map((v)=>v.name) || ''
          }</span>
      },{
        key: 'uploadimg',
        title: '图片',
        dataIndex: 'uploadimg',
        render: (text, record) => 
          <span>
            {text ? text.map(
              (v, i) => (
                <a key={i} target="_blank" href={v.url}>
                  <img src={v.url} style={{ width: '32px', height: '32px' }} />
                </a>
              )
            ) : null}
          </span>
      },{
        key: 'uploadview',
        title: '文件',
        dataIndex: 'uploadview',
        render: (text, record) => 
          <span>
            {text ? text.map(
              (v, i) => (
                <a key={i} target="_blank" href={v.url}>{v.name}</a>
              )
            ) : null}
          </span>
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`test2/detail/${record.id}`}>
              修改
            </Link>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.delete(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
            <span className="ant-divider" />
            {
              !this.state.status ?
              <span>
                <Popconfirm title="确定通过?" onConfirm={() => this.props.del(record.id,'F')}>
                  <a href="#">通过</a>
                </Popconfirm>
                <span className="ant-divider" />
                <Popconfirm title="确定拒绝?" onConfirm={() => this.props.del(record.id,'T')}>
                  <a href="#">拒绝</a>
                </Popconfirm>
              </span>
              :
              <span>{this.state.status}</span>
            }
          </span>
        ),
      }
    ];

    this.rowSelection = {
      type : 'checkbox',
    };

    this.state = {
      list : {
        listState : false,
        rows : [],
      },
      pagination : {
        current : 1,
        pageSize : 10,
      },
      queryParams : {},
      status : null
    };

  }

  fetchList = (pagination = this.state.pagination , queryParams = this.state.queryParams)=>{
    (async ()=>{
      const postPagination = {
        page : pagination.current,
        size : pagination.pageSize,
      }
      const params = Object.assign(postPagination,queryParams);
      this.state.list.listState =true;
      try{
        const resp = await getReq(
              '/proxy'+'/trade/testOb/list',
              // `/core/core/api/v1/enterprise/10002/projects/detail`,
              params
              );
        const total = parseInt(resp.headers.get('x-total-count'));
        console.log(total)
        const res = await resp.json();
        console.log(res)
        this.setState({
          ...this.state,
          list : {
            listState : false,
            rows : res,
          },
          pagination : {
            total,
          }
        })
      }catch(e){
        message.error(e);
        this.state.list.listState = false
      }
    })()
  }

  search = (queryParams)=>{
    this.setState({
      queryParams 
    })
    this.fetchList(this.state.pagination,queryParams);
  }

  /* 分页(排序、筛选)变化时触发
  ** @params antd onChange
  */
  handleTableChange(pagination, filters, sorter) {
    this.setState({
        pagination
      }
    );
    this.fetchList(pagination,this.state.queryParams)
  }

  delete= (id)=>{
    (async ()=>{
      try{
        const resp = await deleteReq(`url${id}`);
        if(resp.ok){
          const msg = resp.headers.get('....')
          message(msg);
          // 删除成功 重新拉取列表
          this.fetchList();
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  del = (id,type)=>{   
    (async ()=>{
      try{
        const resp = await patchReq(`url/${id}/${type}`);
        if(resp.ok){
          const msg = resp.headers.get('....')
          message(msg);
          if(type === 'F'){
            this.setState({
              status : '已通过'
            })
          }else if(type === 'T'){
            this.setState({
              status : '未通过'
            })
          }
        }
      }catch(e){
        message.error(e);
      }
    })()
  }

  componentWillMount() {
    this.fetchList()
  }

  componentDidMount() {
    
  }

  render() {
    const { list , pagination } = this.state
    let view = (
      <div style={{padding:'0 20px'}}>

        <div style={{ marginBottom: 30}}>
          <SearchForm
            options={this.testOpt}
            submit={this.search}
            loading={list.listState}
          />
          <Link to='test2/detail' style={{marginTop:30}}>
          <Button type='primary'>新增</Button>
          </Link>
        </div>

        <Table
          rowKey="id"
          rowSelection={this.rowSelection}
          columns={this.columns}
          dataSource={list.rows}
          pagination={pagination}
          loading={list.listState}
          onChange={this.handleTableChange.bind(this)}
        />

      </div>
    );
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    const viewShow = this.props.children ? this.props.children : view;

    return viewShow;

  }
}

Compo.propTypes = {}

export default withRouter(Compo)
