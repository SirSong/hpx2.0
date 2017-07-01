import React from 'react'
import { Link, withRouter } from 'react-router'
import moment from 'moment'

import { postReq ,getReq } from '../../../../core/fetch'

import './Detail.css'

import { 
  Form, 
  Input, 
  Tooltip, 
  Icon, 
  Cascader, 
  Select, 
  Row, 
  Col, 
  Checkbox, 
  Button, 
  InputNumber, 
  DatePicker, 
  Upload, 
  message,  
} from 'antd';


class Detail extends React.Component {
  constructor(props){
    super(props);
    this.listId = this.props.params.id  // 列表的id  id属性 命名由 index的path：detail(/:id)的id决定 
  }

  componentWillMount(){

  }

  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps){

  }
  render() {
    return  <div>
              detail
            </div>
  }
}

Detail.propTypes = {


}

export default withRouter(Detail)
