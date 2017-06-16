import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Icon, Popconfirm, message, Modal } from 'antd'
import { getMoment, precisionFormat } from '../../../core/util'
import './Component.css';

import moment from 'moment'
import Search from './Search';
const dateFormat = 'YYYY/MM/DD';

class Compo extends React.Component {

  state = { 
    visible: false,
    verifyCode:"",
    accountNo:"",
  }
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      id:null,
      visible : false,
      selectedRowKeys: [],  // Check here to configure the default column
    };
    this.columns = [{
        key: 'tellerNo',
        title: '银行流水号',
        dataIndex: 'tellerNo',
      },{
        key: 'tranDate',
        title: '交易日期',
        dataIndex: 'tranDate',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      },{
        key: 'tranType',
        title: '交易类型',
        dataIndex: 'tranType',
        render: (text, record) => 
          <span>{
            [{"value":"11","name":"普通转账"},{"value":"12","name":"调账"},{"value":"13","name":"普通外部转账"}]
              .filter((v)=> v.value == text).map((v)=>v.name) || ''
          }</span>
      },{
        key: 'tranAmt',
        title: '交易金额',
        dataIndex: 'tranAmt',
        //render: (text) => <span>{precisionFormat(undefined,text)}</span>
        //render: (text) => <span>{moment(text).moneyFormat}</span>
      },{
        key: 'accountNm',
        title: '交易对手',
        dataIndex: 'accountNm',
      },{
        key: 'accBalAmt',
        title: '账户余额',
        dataIndex: 'accBalAmt',
        //render: (text) => <span>{precisionFormat(undefined,text)}</span>
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            {/*<Link to={`${this.getUrlQueryParams()}/detail/${record.id}`}>
              打印电子回单
            </Link>*/}
            {/*<span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>*/}

              
              <div>
                {/*<Button type="primary" onClick={this.showModal}>打印电子回单</Button>*/}
                <Button type="primary" onClick={this.modalshow.bind(this,record.accountNo,record.verifyCode)}>打印电子回单</Button>
              </div>
          </span>
        ),
      }];
  }

  modalshow(accountNo,verifyCode){
        this.setState({
          visible : true,
          verifyCode:verifyCode,
          accountNo:accountNo
        })     
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
        key: 'tranDate',
        value: {
          value: queryParams.tranDate && queryParams.tranDate.value
            ? queryParams.tranDate.value.length > 0
              ? [
                this.getMomentFormat(queryParams.tranDate.value[0]),
                this.getMomentFormat(queryParams.tranDate.value[1]),
              ].filter((v) => !!v)
              : null
            : null,
        }
      },{
        key: 'tranType',
        value: {
          value: queryParams.tranType ? queryParams.tranType.value : null
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
    return '/financialManagement/' + encodeURI(JSON.stringify(v || {}));
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
      {/*<Modal
          title="打印电子回单"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.state.id}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>*/}

        <Modal
            title="打印电子回单"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
            <h4>回单打印信息</h4>
            {/*<p>Some contents...</p>*/}
            <p style={{fontSize:16,color:"#FFA500",marginTop:5}}>附属账户:   {this.state.accountNo}</p>
            <p style={{fontSize:16,color:"#FFA500"}}>打印校验码:  {this.state.verifyCode}</p>
            <br/>
            <a className="btn btn-primary" style={{height:28,background:"#3AA9E9",fontSize:13,border:0}} target="_blank" href="https://enterprise.bank.ecitic.com/corporbank/cb060400_reBill.do">前往打印</a>
      </Modal>
      <div style={{ marginBottom: 16 }}>
        <Search
          {...list.queryParams}
          search={this.search.bind(this)}
          onChange={this.props.updateQueryParams.bind(this)}
          clear={this.props.clearQueryParams}
          loading={listStatus.loading}
        />
        <Link 
          to={`${this.getUrlQueryParams()}/detail`} 
          style={{ marginRight: '16px' }}
        >
        </Link>

      </div>
      <Table
        rowKey="id"
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