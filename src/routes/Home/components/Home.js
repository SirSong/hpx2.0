import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../core/fetch';
import { getMoment, precisionFormat } from '../../../core/util'
import { withRouter } from 'react-router'
import auth from '../../../modules/route'

import BaseMsg from './BaseMsg/BaseMsg';
import TodoList from './TodoList/TodoList';
import Notice from './Notice/Notice';
import MyProject from './MyProject/MyProject';

import './Home.css';

const { Content } = Layout;

class Home extends React.Component{
  render(){
    return(
      <div className="home">
        <BaseMsg />
        <TodoList/> 
        <Notice />
        <MyProject
        fetchOMenu={this.props.fetchOMenu}
        />
      </div>
    )
  }
}

export default withRouter(Home)
