import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import fetch from '../../../../core/fetch'
import './BaseMsg.css'

// const { Content } = Layout;
class BaseMsg extends React.Component{
  constructor(props){
    super(props);
    this.state={
      baseMsg:{}    
    }
  }

  componentDidMount(){
    this.loadData();
  }

  loadData=()=>{
    const self = this;
    fetch('/data/baseMsg.json')
      .then(response=>response.json()).then(
        (json)=>{
        self.setState({baseMsg: json});
      } 
      ).catch((e)=>{
        console.log('parsing failed', e)
      })
  }
  
  render(){
    return(
      <div className="baseMsg">
        <div className="title">
          <span>基本信息</span>
          <Link to="/userManager">变更</Link>
        </div>
        <div className="container">
          <div className="companyName">
            <span>公司名:</span>
            <span>{this.state.baseMsg.companyName}</span>
            <span>已认证</span>
          </div>
          <div className="objectNum">
            <span>参与项目:</span>
            <span>{this.state.baseMsg.objectNum}</span>
          </div>
          <div className="balance">
            <span>账户余额:</span>
            <span>{this.state.baseMsg.balance}元</span>
            <Link to="">明细</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BaseMsg

