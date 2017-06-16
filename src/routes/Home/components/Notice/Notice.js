import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'

import './Notice.css'

const { Content } = Layout;

class Notice extends React.Component{
  constructor(){
    super();
    this.state={
    }
  }
  
  render(){
    return(
      <div className="notice">
        <div className="title">
          <span>公告</span>
          <Link to="">查看更多</Link>
        </div>
         <div className="container">
            <ul>
                <li>1.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
                <li>2.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
                <li>3.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
                <li>4.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
                <li>5.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
            </ul>
        </div>
      </div>
    )
  }
}

export default Notice
