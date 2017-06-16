import React from 'react'
import { IndexLink, Link, withRouter } from 'react-router'
import { Menu, Dropdown, Button, Layout, Icon } from 'antd'
import s from './MySider.css'
const { Header, Sider } = Layout;
const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

class MySider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openKey:[]
    };
    this.isS = this.props.isS
  }

  linkTo(item){
    //更新侧边栏选中项
    // this.props.updateSelectedKey(item.key);
    //切换路由
    this.props.router.push(item.key);
    if(item.key == '/'){
      location.reload()
    }
  } 

  
  handleClick(){
    location.reload()
  }
  
  componentDidMount(){
    this.props.fetchMenu();
  }

  render() {
    //最多支持三层目录
   const props = this.props;
   const selectedKey = this.props.router.location.pathname;

    const listView =  this.props.menu.data.map(
      ( v, i ) => {
        if( v.vRolePermissionCustom && v.vRolePermissionCustom.length ){
          return <SubMenu key={v.permissionsId} title={<span><Icon type={v.icon} />{v.name}</span>}>
                    {
                      v.vRolePermissionCustom.map(
                        ( sub, i) => {
                          if( sub.vRolePermissionCustom && sub.vRolePermissionCustom.length ){
                            return <MenuItemGroup key={sub.name} title={sub.name}>
                                    {
                                      sub.vRolePermissionCustom.map(
                                        ( subSub, i) => {
                                          if(subSub.link == selectedKey){
                                           this.state.openKey[0]=v.permissionsId;
                                          }
                                          return (
                                            <Menu.Item key={subSub.link}>{subSub.name}</Menu.Item>
                                          )
                                        }
                                      )
                                    }
                                  </MenuItemGroup>
                          }else if( sub.link ){
                            if(sub.link == selectedKey){
                              this.state.openKey[0]=v.permissionsId;
                            }
                            return <Menu.Item key={sub.link}>{sub.name}</Menu.Item>;
                          }
                          
                        }
                      )
                    }
                  </SubMenu>
          }
        })
    let widthS = 200;
    // if(this.isS){
    //   widthS = 0
    // };

    return   <Sider width={widthS} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[selectedKey]}
                defaultOpenKeys={this.state.openKey}
                onClick={this.linkTo.bind(this)}
                style={{ height: '100%' }}
              >
                {listView}
              </Menu>
            </Sider>
  }
}

export default withRouter(MySider)
