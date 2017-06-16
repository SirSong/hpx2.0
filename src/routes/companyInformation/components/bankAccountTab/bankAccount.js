import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {Table,Card , Form, Input, Button, Icon, Select,DatePicker,message } from 'antd';
import EditeTableCion from './EditeTableCion'
import moment from 'moment'
import './baseInfo.css'
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol : {span:6},
    wrapperCol:{span:18}
}

const requireRule = {rules:[{ required: true, message: '此项必填!' }]}
class BaseInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isEdite: true,
        }
    }
    editeDone = (type) => {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                self.props.onChange(values,type)     
                this.setState({
                    isEdite:false,
                });        
            }
        })
    }

    edite = () => { 
        this.setState({
            isEdite : true
        })
    }
    
    render(){
        const { isEdite } = this.state;
        const { getFieldDecorator } = this.props.form;
        const view = <Form  className='formInline'>
            <Card title='基本信息' 
                extra={ <EditeTableCion 
                        isEdite={this.state.isEdite} 
                        editeDone={()=>this.editeDone(0)}
                        edite={()=>this.edite()} />}>
                <ul>
                    <li>               
                        <FormItem
                            key='name'
                            label= '企业名称'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('name',requireRule)
                        (  <Input disabled={ !isEdite } style={!isEdite ? {borderRight:'none'}:{}} />)
                        }
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='iscode31'
                            label= '是否三证合一'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('iscode31',requireRule)
                        (
                            <Select disabled={!isEdite}>
                                <Option value="0">是</Option>
                                <Option value="1">否</Option>
                            </Select>
                         )
                        }
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='licenceNo'
                            label= '营业执照号'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('licenceNo',requireRule)
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='codeOrg'
                            label= '组织机构代码'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('codeOrg',requireRule)
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='taxNumber'
                            label= '税务登记证'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('taxNumber',requireRule)
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='enterpriseType'
                            label= '企业性质'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('enterpriseType')
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='industry'
                            label= '行业类型'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('industry')
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='area'
                            label= '区域'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('area')
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>               
                </ul>
            </Card>
        </Form>;
        return view
    }
}