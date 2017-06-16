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
          <Col span={8} key={1}>
            <FormItem {...formItemLayout} label={`文本`}>
              {getFieldDecorator('field1')(
                <Input placeholder="xx" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={2}>
            <FormItem {...formItemLayout} label={`日期`}>
              {getFieldDecorator('field2')(
                <DatePicker />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={3}>
            <FormItem {...formItemLayout} label={`日期范围`}>
              {getFieldDecorator('field3')(
                <RangePicker
                  format={dateFormat}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={4}>
            <FormItem {...formItemLayout} label={`下拉列表`}>
              {getFieldDecorator('field4')(
                <Select placeholder="请选择国家" >
                  <Option value="china">中国</Option>
                  <Option value="usa">美国</Option>
                </Select>
              )}
            </FormItem>
          </Col>
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
    return {
      field1: {
        ...props.field1
      },
      field2: {
        ...props.field2,
        value: props.field2 ? getMoment(props.field2.value) : null,
      },
      field3: {
        ...props.field3,
        value: props.field3 && props.field3.value
          ? props.field3.value.length > 0
            ? [
              getMoment(props.field3.value[0]),
              getMoment(props.field3.value[1])
            ].filter((v) => !!v)
            : null
          : null,
      },
      field4: {
        ...props.field4
      }
    };
  },
})(SearchForm);