import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import {Table,Card , Form, Input, Button, Icon, Select,DatePicker,message } from 'antd';
import EditeTableCion from './EditeTableCion'
import moment from 'moment'
import { checkPhone } from '../../../../core/util.js'
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
class BusinessInfoForm extends React.Component{
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
                console.log(values.inspectionTime)
                values.regDate = values.regDate ? values.regDate.format('YYYY/MM/DD') : null;
                values.inspectionTime = values.inspectionTime ? values.inspectionTime.format('YYYY/MM/DD') : null;
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
            <Card title='工商注册信息' 
                extra={ <EditeTableCion 
                        isEdite={this.state.isEdite} 
                        editeDone={()=>this.editeDone(1)}
                        edite={()=>this.edite()} />}>
                <ul>
                    <li>               
                        <FormItem
                            key='regDate'
                            label= '工商注册时间'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('regDate',requireRule)
                        (  <DatePicker disabled={ !isEdite} />)
                        }
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='regOffice'
                            label= '工商注册机关'
                            {...formItemLayout}
                        >
                        {getFieldDecorator
                        ('regOffice')
                        (<Input disabled={!isEdite} />)
                        }
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='regCurrency'
                            label= '工商注册资金币种'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('regCurrency')
                        (
                            <Select >
                                <Option value='RMB'>RMB</Option>
                            </Select>
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='regCapital'
                            label= '注册资金'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('regCapital')
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='operationTerm'
                            label= '税务登记证'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('operationTerm')
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='inspectionTime'
                            label= '工商年检时间'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('inspectionTime')
                        (<DatePicker disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='taxRegistrationInfo'
                            label= '工商注册信息'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('taxRegistrationInfo')
                        (<Input disabled={ !isEdite } />)}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='normalInspection'
                            label= '是否正常年检'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('normalInspection')
                        (
                            <Select disabled={!isEdite}>
                                <Option value='0'>是</Option>
                                <Option value='1'>否</Option>
                            </Select>
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='contactsEmail'
                            label= '企业邮箱'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('contactsEmail',{
                            rules:[{type: 'email', message: '邮箱格式的错误!'}]
                        })
                        (
                            <Input type='email' disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='scopeOfBussiness'
                            label= '经营范围'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('scopeOfBussiness')
                        (
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='address'
                            label= '注册地址'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('address')
                        (
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                </ul>
            </Card>
        </Form>;
        return view
    }
}

class ContactsForm extends React.Component{
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
    
    checkPhoneConfirm = (phoneKey, rule, value, callback) => {
        const form = this.props.form;
        if (!checkPhone(form.getFieldValue(phoneKey))) {
            callback('手机号格式不正确!');
        } else {
            callback();
        }
    }

    render(){
        const { isEdite } = this.state;
        const { getFieldDecorator } = this.props.form;
        const view = <Form  className='formInline'>
            <Card title='联系方式' 
                extra={ <EditeTableCion 
                        isEdite={this.state.isEdite} 
                        editeDone={()=>this.editeDone(2)}
                        edite={()=>this.edite()} />}>
                <ul>
                    <li>               
                        <FormItem
                            key='contacts'
                            label= '授权人'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('contacts')
                        (  <Input disabled={ !isEdite} />)
                        }
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='contactsPhone'
                            label= '联系电话'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('contactsPhone',
                           { rules:[
                               requireRule.rules[0],
                               {validator: this.checkPhoneConfirm.bind(this,'contactsPhone') }
                               ]
                           }
                        )(
                            <Input disabled={ !isEdite } />
                         )
                        }
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='contactsEmail'
                            label= '授权人邮箱'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('contactsEmail',{
                            rules:[{type: 'email', message: '邮箱格式的错误!'}]
                        })
                        (
                            <Input type='email' disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='city'
                            label= '城市'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('city',requireRule)
                        (
                            /*<Select disabled={!isEdite}>
                                <Option value='0'>上海</Option>
                                <Option value='1'>城市</Option>
                            </Select>*/                    
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='address'
                            label= '详细地址'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('address',requireRule)
                        (
                            <Input  disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='contactsPost'
                            label= '传真'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('contactsPost')
                        (
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='legalPerson'
                            label= '法人代表'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('legalPerson',requireRule)
                        (
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='legalCardNo'
                            label= '法人身份证'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('legalCardNo')
                        (
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                </ul>
            </Card>
        </Form>;
        return view
    }
}

class TaxForm extends React.Component{
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
            <Card title='联系方式' 
                extra={ <EditeTableCion 
                        isEdite={this.state.isEdite} 
                        editeDone={()=>this.editeDone(3)}
                        edite={()=>this.edite()} />}>
                <ul>
                    <li>  
                        <FormItem
                            key='taxType'
                            label= '国税类型'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('taxType',requireRule)
                        (
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                    <li>  
                        <FormItem
                            key='taxNumber'
                            label= '税号'
                            {...formItemLayout}
                        >
                        {getFieldDecorator('taxNumber')
                        (
                            <Input disabled={!isEdite} />
                        )}
                        </FormItem>
                    </li>
                </ul>
            </Card>
        </Form>;
        return view
    }
}

const baseOptions = {
    mapPropsToFields : (props)=>{
        return props
    }
}
const businessOptions = {
    mapPropsToFields : (props)=>{
        let fieldsFormat = props;
        console.log(66666,props)
        fieldsFormat.regDate.value = fieldsFormat.regDate && fieldsFormat.regDate.value ? 
                                moment(fieldsFormat.regDate.value) : null; 
        fieldsFormat.inspectionTime.value = fieldsFormat.inspectionTime && fieldsFormat.inspectionTime.value ? 
                                moment(fieldsFormat.inspectionTime.value) : null; 

        return fieldsFormat
    },
}
const contactsOptions = {
    mapPropsToFields : (props)=>{
        return props
    }
}
const taxOptions = {
    mapPropsToFields : (props)=>{
        return props
    }
}
const WrapBaseInfoForm = Form.create(baseOptions)(BaseInfoForm);
const WrapBusinessInfoForm = Form.create(businessOptions)(BusinessInfoForm);
const WrapContactsInfoForm = Form.create(contactsOptions)(ContactsForm);
const WrapTaxsInfoForm = Form.create(taxOptions)(TaxForm);
class ComInfo  extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
       this.props.fetchComInfo();
    }
    render(){
        return <div>
                    <WrapBaseInfoForm
                    {...this.props.comInfo.baseInfo}
                    onChange={this.props.updateComInfo}
                    />
                    <WrapBusinessInfoForm
                    {...this.props.comInfo.businessInfo}
                    onChange={this.props.updateComInfo}
                    />
                    <WrapContactsInfoForm
                    {...this.props.comInfo.contactsInfo}
                    onChange={this.props.updateComInfo}
                    />
                    <WrapTaxsInfoForm
                    {...this.props.comInfo.taxRegistrationInfo}
                    onChange={this.props.updateComInfo}
                    />
                </div>
    }
}
export default ComInfo