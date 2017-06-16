import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import moment from 'moment'
import { getMoment } from '../../../core/util'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const dateFormat = 'YYYY/MM/DD';

class SearchForm extends React.Component {

  handleSearch = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      
        values.timeRange = values.timeRange
          ? values.timeRange.length > 0
            ? [
              getMoment(values.timeRange[0], 'YYYY/MM/DD'),
              getMoment(values.timeRange[1], 'YYYY/MM/DD')
            ].filter((v) => !!v)
            : ''
          : '';
      
      self.props.search();
    });
  }

  handleReset = () => {
    this.props.clear();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {[
        <Col span={8} key={'status'}>
          <FormItem {...formItemLayout} label={'状态'}>
            {getFieldDecorator('status')(
              <Select placeholder="请选择" >
                {[{"value":"0","name":"待付款"},{"value":"1","name":"已付款"}].map(
                  (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                )}
              </Select>
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'paymentType'}>
          <FormItem {...formItemLayout} label={'付款类型'}>
            {getFieldDecorator('paymentType')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'orderType'}>
          <FormItem {...formItemLayout} label={'订单类型'}>
            {getFieldDecorator('orderType')(
              <Select placeholder="请选择" >
                {[{"value":"0","name":"订单"},{"value":"1","name":"退款"},{"value":"2","name":"补货"}].map(
                  (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                )}
              </Select>
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'timeRange'}>
          <FormItem {...formItemLayout} label={'时间范围'}>
            {getFieldDecorator('timeRange')(
                <RangePicker
                  format={dateFormat}
                />
            )}
          </FormItem>
        </Col>
      ]}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={this.props.loading}>
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);//调用父组件的更新方法
  },
  mapPropsToFields(props) {
    var arr = [{
        key: 'status',
        value: {
          ...props.status
        }
      },{
        key: 'paymentType',
        value: {
          ...props.paymentType
        }
      },{
        key: 'orderType',
        value: {
          ...props.orderType
        }
      },{
        key: 'timeRange',
        value:  {
          ...props.timeRange,
          value: props.timeRange && props.timeRange.value
          ? props.timeRange.value.length > 0
            ? [
              getMoment(props.timeRange.value[0], dateFormat),
              getMoment(props.timeRange.value[1], dateFormat)
            ].filter((v) => !!v)
            : null
          : null,
        }
      }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
})(SearchForm);