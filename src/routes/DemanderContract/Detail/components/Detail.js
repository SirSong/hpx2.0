import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'

import { postReq } from '../../../../core/fetch'

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
  Modal 
} from 'antd';

import { precisionValidator } from '../../../../core/antdFormUtil.js'

import { checkPhone } from '../../../../core/util.js'

const FormItem = Form.Item;
const Option = Select.Option;

class DetailForm extends React.Component {
  state = {
    smsButtonDisabled: false,//发送验证码按钮是否可编辑
    smsButtonMsg: '获取验证码',
    previewVisible: false,//图片预览是否可见
    previewImage: '',//预览图片地址
    intervalId: null,
  };
  componentWillUnmount(){
    clearInterval(this.state.intervalId)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //在提交前格式化部分数据
        
        values.contractDate = values.contractDate ? values.contractDate.format('YYYY/MM/DD') : '';
      
        values.deliveryDate = values.deliveryDate ? values.deliveryDate.format('YYYY/MM/DD') : '';
      
        values.fDate = values.fDate ? values.fDate.format('YYYY/MM/DD') : '';
      
        values.sDate = values.sDate ? values.sDate.format('YYYY/MM/DD') : '';
      
        values.receivingDate = values.receivingDate ? values.receivingDate.format('YYYY/MM/DD') : '';
      
        self.props.saveSubmit(values,self.props.id);
      }
    });
  }
  checkPhoneConfirm = (phoneKey, rule, value, callback) => {
    const form = this.props.form;
    if (!checkPhone(form.getFieldValue(phoneKey))) {
      callback('手机号格式不正确!');
    } else {
      callback();
    }
  }
  //发送验证码
  fetchCaptcha = async (smsCodeKey,phoneKey) => {
    const form = this.props.form;
    form.setFields({
        [smsCodeKey]:{
          value: this.props[smsCodeKey].value,
          errors:null,
        }
      })
    if(!form.getFieldValue(phoneKey)||!checkPhone(form.getFieldValue(phoneKey))){
      form.setFields({
        captcha:{
          errors:[new Error('请输入正确格式的手机号!')],
        }
      })
    } else {
      const resp = await postReq(__PROXY__ + '/trade/testOb/smsCode',{[phoneKey]:form.getFieldValue(phoneKey)});
      const result = await resp.json();
      if( result.success ){
        message.success('成功发送验证码');
        let self = this;
        let number = 59;
        let intervalId = setInterval(
          () => {
            self.setState({
              smsButtonDisabled: true,
              smsButtonMsg:'重新获取验证码('+number+')'
            });
            number--;
            if(number == 0) {
              self.setState({
                smsButtonDisabled: false,
                smsButtonMsg:'获取验证码'
              });
              clearInterval(intervalId);
            }
          },1000
        );
        self.setState({intervalId: intervalId})
      }
    }
  }
  beforeUpload(file) {//文件上传前的回调
    const isJPG = file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('你只能上传JPG 或PNG 图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于 2MB!');
    }
    return isJPG && isLt2M;
  }
  normFile = (info) => {
    //如果希望组件能提供查看功能，则需要设置url字段的值
    return info.fileList;
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  render() {
    const { previewVisible, previewImage } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector mobileBefore">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          key="code"
          {...formItemLayout}
          label="合同编号"
          hasFeedback
        >
          {getFieldDecorator('code',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="name"
          {...formItemLayout}
          label="合同名称"
          hasFeedback
        >
          {getFieldDecorator('name',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="firstParty"
          {...formItemLayout}
          label="供应商"
          hasFeedback
        >
          {getFieldDecorator('firstParty',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="secondParty"
          {...formItemLayout}
          label="需方"
          hasFeedback
        >
          {getFieldDecorator('secondParty',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="contractDate"
          {...formItemLayout}
          label="签订日期"
          hasFeedback
        >
          {getFieldDecorator('contractDate',{
            rules: [
              { type:'object', required: true, message: '请选择日期!'},
            ],
          })(
            <DatePicker /> 
          )}
        </FormItem>
      
        <FormItem
          key="deliveryDate"
          {...formItemLayout}
          label="送货日期"
          hasFeedback
        >
          {getFieldDecorator('deliveryDate',{
            rules: [
              { type:'object', required: true, message: '请选择日期!'},
            ],
          })(
            <DatePicker /> 
          )}
        </FormItem>
      
        <FormItem
          key="deliveryAddress"
          {...formItemLayout}
          label="送货地址"
          hasFeedback
        >
          {getFieldDecorator('deliveryAddress',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="acceptanceLevel"
          {...formItemLayout}
          label="验收标准"
          hasFeedback
        >
          {getFieldDecorator('acceptanceLevel',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="fUser"
          {...formItemLayout}
          label="甲方联系人"
          hasFeedback
        >
          {getFieldDecorator('fUser',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="fPhone"
          {...formItemLayout}
          label="甲方联系电话"
          hasFeedback
        >
          {getFieldDecorator('fPhone',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="sUser"
          {...formItemLayout}
          label="乙方联系人"
          hasFeedback
        >
          {getFieldDecorator('sUser',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="sPhone"
          {...formItemLayout}
          label="乙方联系电话"
          hasFeedback
        >
          {getFieldDecorator('sPhone',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="fSignature"
          {...formItemLayout}
          label="甲方签章人"
          hasFeedback
        >
          {getFieldDecorator('fSignature',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="sSignature"
          {...formItemLayout}
          label="乙方签章人"
          hasFeedback
        >
          {getFieldDecorator('sSignature',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="fLocation"
          {...formItemLayout}
          label="甲方签章位置"
          hasFeedback
        >
          {getFieldDecorator('fLocation',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="sLocation"
          {...formItemLayout}
          label="乙方签章位置"
          hasFeedback
        >
          {getFieldDecorator('sLocation',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="fDate"
          {...formItemLayout}
          label="甲方签章时间"
          hasFeedback
        >
          {getFieldDecorator('fDate',{
            rules: [
              { type:'object', required: true, message: '请选择日期!'},
            ],
          })(
            <DatePicker /> 
          )}
        </FormItem>
      
        <FormItem
          key="sDate"
          {...formItemLayout}
          label="乙方签章时间"
          hasFeedback
        >
          {getFieldDecorator('sDate',{
            rules: [
              { type:'object', required: true, message: '请选择日期!'},
            ],
          })(
            <DatePicker /> 
          )}
        </FormItem>
      
        <FormItem
          key="contractType"
          {...formItemLayout}
          label="合同类型"
          hasFeedback
        >
          {getFieldDecorator('contractType',{
            rules: [
              { required: true, message: '请选择!'},
            ],
          })(
            <Select placeholder="请选择" >
              {[{"value":"C","name":"采购"},{"value":"S","name":"销售"}].map(
                (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
              )}
            </Select>
          )}
        </FormItem>
      
        <FormItem
          key="receivingDate"
          {...formItemLayout}
          label="收货日期"
          hasFeedback
        >
          {getFieldDecorator('receivingDate',{
            rules: [
              { type:'object', required: true, message: '请选择日期!'},
            ],
          })(
            <DatePicker /> 
          )}
        </FormItem>
      
        <FormItem
          key="fileId"
          {...formItemLayout}
          label="文件ID"
          hasFeedback
        >
          {getFieldDecorator('fileId',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="money"
          {...formItemLayout}
          label="金额"
          hasFeedback
        >
          {getFieldDecorator('money',{
            rules: [
              { type: 'number',required: true, message: '请输入数字!'},
              { validator: precisionValidator.bind( this, 2 ) }
            ],
          })(
            <InputNumber />
          )}
        </FormItem>
      
        <FormItem
          key="deliveryDeadline"
          {...formItemLayout}
          label="提货期限"
          hasFeedback
        >
          {getFieldDecorator('deliveryDeadline',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="orderCode"
          {...formItemLayout}
          label="订单编号"
          hasFeedback
        >
          {getFieldDecorator('orderCode',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="fSignatureStatus"
          {...formItemLayout}
          label="甲方签章状态"
          hasFeedback
        >
          {getFieldDecorator('fSignatureStatus',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="sSignatureStatus"
          {...formItemLayout}
          label="乙方签章状态"
          hasFeedback
        >
          {getFieldDecorator('sSignatureStatus',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在0-65536位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="financingStatus"
          {...formItemLayout}
          label="融资状态"
          hasFeedback
        >
          {getFieldDecorator('financingStatus',{
            rules: [
              { required: true, message: '请选择!'},
            ],
          })(
            <Select placeholder="请选择" >
              {[{"value":"0","name":"正常"},{"value":"1","name":"逾期"},{"value":"2","name":"待处置"},{"value":"3","name":"已处置"}].map(
                (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
              )}
            </Select>
          )}
        </FormItem>
      
        <FormItem
          key="receivingStatus"
          {...formItemLayout}
          label="收货状态"
          hasFeedback
        >
          {getFieldDecorator('receivingStatus',{
            rules: [
              { required: true, message: '请选择!'},
            ],
          })(
            <Select placeholder="请选择" >
              {[{"value":"0","name":"待收货"},{"value":"1","name":"已收货"}].map(
                (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
              )}
            </Select>
          )}
        </FormItem>
      
        <FormItem {...tailFormItemLayout}>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            loading={this.props.saveStatus.loading}>
            提交
          </Button>
        </FormItem>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Form>
    );
  }
}

const WrappedDetailForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);//调用父组件的更新方法
  },
  mapPropsToFields(props) {
    var arr = [{
          key: 'code',
          value: {
            ...props.code
          }
        },{
          key: 'name',
          value: {
            ...props.name
          }
        },{
          key: 'firstParty',
          value: {
            ...props.firstParty
          }
        },{
          key: 'secondParty',
          value: {
            ...props.secondParty
          }
        },{
          key: 'contractDate',
          value: {
            ...props.contractDate,
            value: props.contractDate && props.contractDate.value ? moment(props.contractDate.value) : null,
          }
        },{
          key: 'deliveryDate',
          value: {
            ...props.deliveryDate,
            value: props.deliveryDate && props.deliveryDate.value ? moment(props.deliveryDate.value) : null,
          }
        },{
          key: 'deliveryAddress',
          value: {
            ...props.deliveryAddress
          }
        },{
          key: 'acceptanceLevel',
          value: {
            ...props.acceptanceLevel
          }
        },{
          key: 'fUser',
          value: {
            ...props.fUser
          }
        },{
          key: 'fPhone',
          value: {
            ...props.fPhone
          }
        },{
          key: 'sUser',
          value: {
            ...props.sUser
          }
        },{
          key: 'sPhone',
          value: {
            ...props.sPhone
          }
        },{
          key: 'fSignature',
          value: {
            ...props.fSignature
          }
        },{
          key: 'sSignature',
          value: {
            ...props.sSignature
          }
        },{
          key: 'fLocation',
          value: {
            ...props.fLocation
          }
        },{
          key: 'sLocation',
          value: {
            ...props.sLocation
          }
        },{
          key: 'fDate',
          value: {
            ...props.fDate,
            value: props.fDate && props.fDate.value ? moment(props.fDate.value) : null,
          }
        },{
          key: 'sDate',
          value: {
            ...props.sDate,
            value: props.sDate && props.sDate.value ? moment(props.sDate.value) : null,
          }
        },{
          key: 'contractType',
          value: {
            ...props.contractType
          }
        },{
          key: 'receivingDate',
          value: {
            ...props.receivingDate,
            value: props.receivingDate && props.receivingDate.value ? moment(props.receivingDate.value) : null,
          }
        },{
          key: 'fileId',
          value: {
            ...props.fileId
          }
        },{
          key: 'money',
          value: {
            ...props.money
          }
        },{
          key: 'deliveryDeadline',
          value: {
            ...props.deliveryDeadline
          }
        },{
          key: 'orderCode',
          value: {
            ...props.orderCode
          }
        },{
          key: 'fSignatureStatus',
          value: {
            ...props.fSignatureStatus
          }
        },{
          key: 'sSignatureStatus',
          value: {
            ...props.sSignatureStatus
          }
        },{
          key: 'financingStatus',
          value: {
            ...props.financingStatus
          }
        },{
          key: 'receivingStatus',
          value: {
            ...props.receivingStatus
          }
        }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(DetailForm);

class Detail extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.fetchDetail(this.props.params.id);
    //调用module方法加载数据
  }
  componentDidMount(){
    
  }
  componentWillReceiveProps(nextProps){
    const { saveStatus, fetchDetailStatus, err } = nextProps;
    if(
      this.props.saveStatus.type != saveStatus.type 
      && saveStatus.type.match('SUCCESS')
    ){//保存成功，返回上一页，这里没对上一页为空的情况做处理
      message.success('保存成功');
      browserHistory.go(-1);
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }
  render() {
    return  <div><WrappedDetailForm 
                  {...this.props.fields}  
                  saveStatus={this.props.saveStatus}
                  fetchDetailStatus={this.props.fetchDetailStatus}
                  onChange={this.props.updateFields}
                  saveSubmit={this.props.save}/>
            </div>
  }
}

Detail.propTypes = {
  // increment   : React.PropTypes.func.isRequired
}

export default withRouter(Detail)
