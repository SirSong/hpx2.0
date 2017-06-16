import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Menu, Dropdown, Button, Layout, Icon } from 'antd'

import s from './MyHeader.css'

const { Header } = Layout;

export const MyHeader = (props) => {
  const menuOut = (
    <Menu>
      <Menu.Item>
        <a onClick={props.logOut}>登出</a>
      </Menu.Item>
    </Menu>
  );

  const menuPublic =(
    <Menu>
      <Menu.Item>
        <Link to='/company-information'>企业信息</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/'>个人信息</Link>
      </Menu.Item>
    </Menu>
  );

  return  <Header id="topBar">
            <div className="logo" title="海平线" />
            <Dropdown overlay={menuPublic} placement="bottomRight">
              <Link to='/' style={{position:'absolute',right:100}} className='more'>控制台<Icon type="down" /></Link>
            </Dropdown>
            <Dropdown overlay={menuOut} placement="bottomRight">
              <a className="more">我的<Icon type="down" /></a>
            </Dropdown>
          </Header>
}

export default MyHeader
