import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'

import './TodoList.css'

const { Content } = Layout;

class TodoList extends React.Component{
  constructor(){
    super();
    this.state={
        todoNum: '10'
    }
  }
  
  render(){
    return(
      <div className="todoList">
        <div className="title">
          <span>待办事项(<strong style={{fontSize: '20px'}}> {this.state.todoNum} </strong>)</span>
          <Link to="">查看更多</Link>
        </div>
         <div className="container">
            <ul>
                <li>1.企业A,保理,入池申请,100万 &nbsp; <Link>查看</Link></li>
                <li>2.云联项目,企业A,保理,100万 &nbsp; <Link>查看</Link></li>
                <li>3.企业A,保理,入池申请,100万 &nbsp; <Link>查看</Link></li>
                <li>4.云联项目,企业A,保理,100万 &nbsp; <Link>查看</Link></li>
                <li>5.企业A,保理,入池申请,100万 &nbsp; <Link>查看</Link></li>
            </ul>
        </div>
      </div>
    )
  }
}

export default TodoList
