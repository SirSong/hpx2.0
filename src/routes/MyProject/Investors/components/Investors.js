import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'

import './Investors.css'

import { 
  Row, 
  Col, 
  Button, 
  message, 
  Modal, 
  Table,
  Popconfirm
} from 'antd';

class Investors extends React.Component {
  constructor(props) {
    super(props);
    this.columnsWarning = [{
        key: 'name',
        title: '合同名称',
        dataIndex: 'name',
      },{
        key: 'number',
        title: '合同编号',
        dataIndex: 'number',
      },{
        key: 'money',
        title: '库存总金额',
        dataIndex: 'money',
      },{
        key: 'currentValue',
        title: '当前货值',
        dataIndex: 'currentValue',
      },{
        key: 'chg',
        title: '涨跌幅',
        dataIndex: 'chg',
      }];
    this.columnsPay = [{
        key: 'orderNo',
        title: '订单编号',
        dataIndex: 'orderNo',
      },{
        key: 'invoiceNo',
        title: '发货单号',
        dataIndex: 'invoiceNo',
      },{
        key: 'contractNo',
        title: '合同编号',
        dataIndex: 'contractNo',
      },{
        key: 'payment',
        title: '付款方',
        dataIndex: 'payment',
      },{
        key: 'receive',
        title: '收款方',
        dataIndex: 'receive',
      },{
        key: 'totalPay',
        title: '付款总额',
        dataIndex: 'totalPay',
      },{
        key: 'amount',
        title: '已付金额',
        dataIndex: 'amount',
      },{
        key: 'unamount',
        title: '未付金额',
        dataIndex: 'unamount',
      },{
        key: 'amountType',
        title: '款项类型',
        dataIndex: 'amountType',
      }];
    this.columnsReceive = [{
        key: 'orderNo',
        title: '订单编号',
        dataIndex: 'orderNo',
      },{
        key: 'invoiceNo',
        title: '发货单号',
        dataIndex: 'invoiceNo',
      },{
        key: 'contractNo',
        title: '合同编号',
        dataIndex: 'contractNo',
      },{
        key: 'payment',
        title: '付款方',
        dataIndex: 'payment',
      },{
        key: 'receive',
        title: '收款方',
        dataIndex: 'receive',
      },{
        key: 'totalPay',
        title: '付款总额',
        dataIndex: 'totalPay',
      },{
        key: 'amount',
        title: '已付金额',
        dataIndex: 'amount',
      },{
        key: 'unamount',
        title: '未付金额',
        dataIndex: 'unamount',
      },{
        key: 'amountType',
        title: '款项类型',
        dataIndex: 'amountType',
      }];
  }
  componentDidMount(){
    console.log("qingqiushuju")
    this.props.fetchList();
    console.log("qingqiushuju")
    //调用module方法加载数据
  }
  componentWillReceiveProps(nextProps){
   
  }
  render() {
  const { list, fetchList } = this.props;
  /*const listWarning = {
    'rows':[
      {
        'id':1,
        'name':'role',
        'number':2,
        'money':22,
        'currentValue':222,
        'chg':0.2,
      },
      {
        'id':2,
        'name':'',
        'number':'',
        'money':'',
        'currentValue':'',
        'chg':'',
      },
    ]
  };
  const listPay = {
    'rows':[
      {
        'id':1,
        'orderNo':'0001',
        'invoiceNo':'0001',
        'contractNo':'0101',
        'payment':'Kery',
        'receive':'Jeny',
        'totalPay':10000,
        'amount': 100,
        'unamount':1000,
        'amountType':'货款',
      },
      {
        'id':2,
        'orderNo':'',
        'invoiceNo':'',
        'contractNo':'',
        'payment':'',
        'receive':'',
        'totalPay':'',
        'amount': '',
        'unamount':'',
        'amountType':'',
      },
    ]
  };*/
   let view = <div>
      <p style={{'fontSize':'20px','fontWeight':'700','marginBottom':'15px'}}>风控预警</p>
      <Table
        rowKey="id"
        columns={this.columnsWarning}
        dataSource={list.rows.listWarning}
        pagination={false}
        className='warningTable'
      />

      <p style={{'fontSize':'20px','fontWeight':'700','marginBottom':'15px'}}>待付款列表</p>
      <Table
        rowKey="id"
        columns={this.columnsPay}
        dataSource={list.rows.listPay}
        pagination={false}
        className='warningTable'
      />
      
      <p style={{'fontSize':'20px','fontWeight':'700','marginBottom':'15px'}}>待收款列表</p>
      <Table
        rowKey="id"
        columns={this.columnsReceive}
        dataSource={list.rows.listPay}
        pagination={false}
        className='warningTable'
      />
    </div>;
    return view;
  }
}

export default withRouter(Investors)
