import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'
import Graphic from '../Graphic/Graphic'

import './Component.css'

import { 
  Row, 
  Col, 
  Button, 
  message, 
  Modal, 
  Table,
  Popconfirm
} from 'antd';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      list:{}
    }
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
  }
  componentWillMount(){
    this.props.fetchList();
    //调用module方法加载数据
    // this.props.fetchDemanderMenu();
  }

  componentWillReceiveProps(nextProps){
   
  }
  render() {
  const { list, fetchList } = this.props;

   let view = <div style={{position:'relative'}}>
     <div className="graphic">
        <Graphic />
        <Link to="/" className="payOrder">
          <Button type="primary">我要下单</Button>
        </Link>
     </div>
      <p style={{'fontSize':'20px','fontWeight':'700','marginBottom':'15px'}}>待付款列表</p>
      <Table
        rowKey="id"
        columns={this.columnsPay}
        dataSource={list.rows}
        pagination={false}
        className='warningTable'
      />
    </div>;
    return view;
  }
}

export default withRouter(Comp)
