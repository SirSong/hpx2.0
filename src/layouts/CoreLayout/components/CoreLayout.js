import React from 'react'
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

import { constants as loginConstants } from '../../../modules/login'

import MyHeader from '../../../components/MyHeader'
import MySider from '../../../components/MySider'
import Login from '../../../components/Login'

import './CoreLayout.css'
import '../../../styles/core.less'

const { SubMenu } = Menu;
const { Header, Content } = Layout;

class CoreLayout extends React.Component {

  componentWillMount( ){
  }

  render() {
    const { login, menu, children, clearSignInErr, signIn, logOut } = this.props;
    let view = null;
    if( login.signInStatus !== loginConstants.SIGN_IN_SUCCESS ) {
      view = <div className='text-center' style={{paddingTop:32}}>
                <Login 
                  userName={login.userName}
                  password={login.password}
                  signInErr={login.signInErr}
                  clearSignInErr={clearSignInErr}
                  signIn={signIn} />
             </div>;
    }else{
      view = <Layout id="layout">
                <MyHeader logOut={logOut} />
                <Layout style={{ flexDirection: 'row' }}>
                  <MySider menu={menu} fetchMenu={this.props.fetchMenu} isS={5}  />
                  <Layout>
                    <Breadcrumb>
                      {/*<Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    </Breadcrumb>
                    <Content style={{ background: '#eee', padding: 24, margin: 0, minHeight: 280 }}>
                      <QueueAnim
                      type={['right', 'left']}
                        >
                        <div key={children.props.location.pathname}>
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            <div style={{ position: 'relative' }}>
                              {children}
                            </div>
                            </div>
                        </div>
                      </QueueAnim>
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
    }
    return view;
  }
}

CoreLayout.propTypes = {
  children          : PropTypes.element.isRequired,
  login             : PropTypes.object.isRequired,
  menu              : PropTypes.object.isRequired,
  logOut            : PropTypes.func.isRequired,
  signIn            : PropTypes.func.isRequired,
  clearSignInErr    : PropTypes.func.isRequired,
  // fetchList         : PropTypes.func.isRequired,
  // updateSelectedKey : PropTypes.func.isRequired,
}

export default CoreLayout
