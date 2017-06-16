import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'

import './SideMenu.css'

const { Content } = Layout;

class SideMenu extends React.Component{
  constructor(){
    super();
    this.state={
    }
  }
  
  render(){
    return(
      <div className="sideMenu">
        用户管理
      </div>
    )
  }
}

export default SideMenu
