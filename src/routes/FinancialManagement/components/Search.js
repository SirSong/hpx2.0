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
      
        values.tranDate = values.tranDate
          ? values.tranDate.length > 0
            ? [
              getMoment(values.tranDate[0], 'YYYY/MM/DD'),
              getMoment(values.tranDate[1], 'YYYY/MM/DD')
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
        <Col span={8} key={'tranDate'}>
          <FormItem {...formItemLayout} label={'交易时间'}>
            {getFieldDecorator('tranDate')(
                <RangePicker
                  format={dateFormat}
                />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'tranType'}>
          <FormItem {...formItemLayout} label={'交易类型'}>
            {getFieldDecorator('tranType')(
              <Select placeholder="请选择" style={{ width: 120 }}>
                {[{"value":"0","name":"不限"},{"value":"11","name":"普通转账"},{"value":"12","name":"调账"},{"value":"13","name":"普通外部转账"}].map(
                  (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                )}
              </Select>
            )}
          </FormItem>
        </Col>
        ,
        <Col span={8} style={{ textAlign: 'right',paddingRight: 200}}>
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
      ]}
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
        key: 'tranDate',
        value:  {
          ...props.tranDate,
          value: props.tranDate && props.tranDate.value
          ? props.tranDate.value.length > 0
            ? [
              getMoment(props.tranDate.value[0], dateFormat),
              getMoment(props.tranDate.value[1], dateFormat)
            ].filter((v) => !!v)
            : null
          : null,
        }
      },{
        key: 'tranType',
        value: {
          ...props.tranType
        }
      }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
})(SearchForm);