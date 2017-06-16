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
        
        values.datePicker = values.datePicker ? values.datePicker.format('YYYY/MM/DD') : '';
      
        values.uploadimg = JSON.stringify(values.uploadimg);
      
        values.uploadview = JSON.stringify(values.uploadview);
      
        values.agreement = [{"key":"0","value":false},{"key":"1","value":true}].filter(
          v => v.value == values.agreement
        )
        values.agreement = values.agreement.length ? values.agreement[0].key : '';
      
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
          key="email"
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '请输入邮箱格式的数据!',
            }, {
              required: true, message: '请输入你的邮箱!',
            }],
          })(
            <Input autoComplete="off"/>
          )}
        </FormItem>
      
        <FormItem
          key="accuracy"
          {...formItemLayout}
          label="数字"
          hasFeedback
        >
          {getFieldDecorator('accuracy',{
            rules: [
              { type: 'number',required: true, message: '请输入数字!'},
              { validator: precisionValidator.bind( this, 2 ) }
            ],
          })(
            <InputNumber />
          )}
        </FormItem>
      
        <FormItem
          key="phone"
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入你的手机号!' },
              { validator: this.checkPhoneConfirm.bind(this,'phone') }
            ],
          })(
            <Input addonBefore={prefixSelector} />
          )}
        </FormItem>
      
        <FormItem
          key="password"
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            },{
              min: 6, max: 16, message: '密码长度需在6-16位!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" autoComplete="off"/>
          )}
        </FormItem>
      
        <FormItem
          key="company"
          {...formItemLayout}
          label="公司"
          hasFeedback
        >
          {getFieldDecorator('company',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在6-16位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      
        <FormItem
          key="nickname"
          {...formItemLayout}
          label="昵称"
          hasFeedback
        >
          {getFieldDecorator('nickname',{
            rules: [
              { required: true, message: '请输入数据!', whitespace: true },
              {
                min: 1, max:  50, message: '长度需在1-50位!',
              },
            ],
          })(
            <Input 
              type="textarea"
              rows={4}
            />
          )}
        </FormItem>
      
        <FormItem
          key="datePicker"
          {...formItemLayout}
          label="日期"
          hasFeedback
        >
          {getFieldDecorator('datePicker',{
            rules: [
              { type:'object', required: true, message: '请选择日期!'},
            ],
          })(
            <DatePicker /> 
          )}
        </FormItem>
      
        <FormItem
          key="selectorcountry"
          {...formItemLayout}
          label="国家"
          hasFeedback
        >
          {getFieldDecorator('selectorcountry',{
            rules: [
              { required: undefined, message: '请选择!'},
            ],
          })(
            <Select placeholder="请选择" >
              {[{"value":"china","name":"中国"},{"value":"usa","name":"美国"}].map(
                (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
              )}
            </Select>
          )}
        </FormItem>
      
        <FormItem
          key="uploadimg"
          {...formItemLayout}
          label="图片"
          extra=""
        >
          {getFieldDecorator('uploadimg', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload 
              name="uploadimg" 
              action={__PROXY__+"/trade/file/upload"} 
              listType="picture-card" 
              beforeUpload={this.beforeUpload}
              onPreview={this.handlePreview}
            >
              {this.props.uploadimg && this.props.uploadimg.value && this.props.uploadimg.value.length >= 3 ? null : 
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              }
            </Upload>
            
          )}
        </FormItem>
      
         <FormItem
          key="uploadview"
          {...formItemLayout}
          label="文件"
          extra=""
        >
          {getFieldDecorator('uploadview', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload 
              name="uploadview" 
              action={__PROXY__+"/trade/file/upload"} 
              listType="text" 
            >
              {this.props.uploadview && this.props.uploadview.value && this.props.uploadview.value.length >= 3 ? null : 
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              }
            </Upload>
          )}
        </FormItem>
      
        <FormItem
          key="agreement"
          {...tailFormItemLayout} 
          style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            rules: [{ required: true, message: '请先同意协议!' }],
            valuePropName: 'checked',
          })(
            <Checkbox>我已经同意</Checkbox>
          )}
        </FormItem>
      
        <FormItem
          key="captcha"
          {...formItemLayout}
          label="验证码"
          extra="我们需要确保你是人类."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [
                  { required: true, message: '请输入你收到的验证码!' },
                ],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large" 
                onClick={this.fetchCaptcha.bind(this,'captcha','phone')} 
                disabled={this.state.smsButtonDisabled}>{this.state.smsButtonMsg}
              </Button>
            </Col>
          </Row>
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
          key: 'email',
          value: {
            ...props.email
          }
        },{
          key: 'accuracy',
          value: {
            ...props.accuracy
          }
        },{
          key: 'phone',
          value: {
            ...props.phone
          }
        },{
          key: 'password',
          value: {
            ...props.password
          }
        },{
          key: 'company',
          value: {
            ...props.company
          }
        },{
          key: 'nickname',
          value: {
            ...props.nickname
          }
        },{
          key: 'datePicker',
          value: {
            ...props.datePicker,
            value: props.datePicker && props.datePicker.value ? moment(props.datePicker.value) : null,
          }
        },{
          key: 'selectorcountry',
          value: {
            ...props.selectorcountry
          }
        },{
          key: 'uploadimg',
          value: {
            ...props.uploadimg,
            value: props.uploadimg 
                && props.uploadimg.value
                && props.uploadimg.value.map(
                  (v,i) => {
                    return v.response && v.response.success ? {
                        id: v.response.data.id,
                        uid:  v.response.data.id,
                        name: v.response.data.name,
                        url: v.response.data.url,
                        status: 'done',
                      }
                      : {
                        id: v.id,
                        uid: v.uid || v.id,
                        name: v.name,
                        url: v.url,
                        status: v.status,
                      }
                  }
                )
          }
        },{
          key: 'uploadview',
          value: {
            ...props.uploadview,
            value: props.uploadview 
                && props.uploadview.value
                && props.uploadview.value.map(
                  (v,i) => {
                    return v.response && v.response.success ? {
                        id: v.response.data.id,
                        uid:  v.response.data.id,
                        name: v.response.data.name,
                        url: v.response.data.url,
                        status: 'done',
                      }
                      : {
                        id: v.id,
                        uid: v.uid || v.id,
                        name: v.name,
                        url: v.url,
                        status: v.status,
                      }
                  }
                )
          }
        },{
          key: 'agreement',
          value: {
            ...props.agreement
          }
        },{
          key: 'captcha',
          value: {
            ...props.captcha
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
