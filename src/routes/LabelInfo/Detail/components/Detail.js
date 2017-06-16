import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Form, Input, Icon, Select, Popconfirm, message, Tooltip, Row, Col } from 'antd'
import { getMoment, precisionFormat } from '../../../../core/util'
import './Detail.css';

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const Option = Select.Option;

class DetailForm extends React.Component {
  state = {
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
    const { inputs } = this.props;
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
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          key="inputs"
          {...formItemLayout}
          label=""
          hasFeedback
        >
            <Input defaultValue='财务状况'
            />
        </FormItem>
      </Form>
    );
  }
}

const WrapForm = Form.create()(DetailForm);

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
    };
    this.columns = [{
        key: 'first',
        title: '一级',
        dataIndex: 'first',
      },{
        key: 'second',
        title: '二级',
        dataIndex: 'second',
      },{
        key: 'selectPro',
        title: '选择项目',
        dataIndex: 'selectPro',
      },{
        key: 'score',
        title: '分值',
        dataIndex: 'score',
      },{
        key: 'scoreHeight',
        title: '评分权重(%)',
        dataIndex: 'scoreHeight',
      },{
        key: 'priceHeight',
        title: '定价权重(%)',
        dataIndex: 'priceHeight',
      },{
        key: 'float',
        title: '浮动',
        dataIndex: 'float',
      }];
  }

  componentWillMount() {
    try {
      if (this.props.params.queryParams) {
        let queryParams = 
          JSON.parse(decodeURI(this.props.params.queryParams));
        this.props.updateQueryParams(queryParams);
      }
    } catch (e) {
      console.log(e);
    }
    this.props.fetchList();
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    const { deleteStatus, listStatus, fetchList, list, err } = nextProps;
    if (
      this.props.listStatus.type != listStatus.type
      && listStatus.type.match('SUCCESS')
      && list.rows.length == 0 && list.queryParams.pagination.total > 0
    ) {//删除成功重新拉取列表数据
      fetchList();
    }
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      fetchList();
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  //分页、排序、筛选变化时触发
  handleTableChange(pagination, filters, sorter) {
    browserHistory.push(`${this.getUrlQueryParams(
      {
        ...this.props.list.queryParams,
        pagination,
      }
    )}`);
  }
  getMomentFormat(v) {
    if (!v) return null;
    return moment(v).format('YYYY-MM-DD');
  }
  search() {
    let queryParams = this.props.list.queryParams;
    let arr = [{
        key: 'field1',
        value: {
          value: queryParams.field1 ? queryParams.field1.value : null
        }
      },{
        key: 'field2',
        value: {
          value: queryParams.field2
            ? this.getMomentFormat(queryParams.field2.value) 
            : null
        }
      },{
        key: 'field3',
        value: {
          value: queryParams.field3 && queryParams.field3.value
            ? queryParams.field3.value.length > 0
              ? [
                this.getMomentFormat(queryParams.field3.value[0]),
                this.getMomentFormat(queryParams.field3.value[1]),
              ].filter((v) => !!v)
              : null
            : null,
        }
      },{
        key: 'field4',
        value: {
          value: queryParams.field4 ? queryParams.field4.value : null
        }
      }];
    let obj = {};
    arr.forEach((v)=> {obj[v.key] = v.value});
    obj.pagination = this.props.list.queryParams.pagination,
    browserHistory.push(
      this.getUrlQueryParams(obj)
    );
  }

  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/label-info/' + encodeURI(JSON.stringify(v || {}));
  }
  render() {
    const { selectedRowKeys } = this.state;
    const { inputs, list, fetchList, listStatus, updateInputs } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      selections: [
        selectedRowKeys.length == 1
          ? {
            key: 'operate1',
            text: '操作1',
            onSelect: () => {
              message.info('操作1')
            },
          } : null
      ].filter((v) => v || false),
    };
    const hasSelected = selectedRowKeys.length > 0;

    let view = <div>
      <div style={{height: 40}}>
        <h3 style={{ float:'left'}}>{inputs}</h3>
        <Button 
            onClick={()=>{window.history.back()}}
            style={{ marginRight:'16px', float:'right', fontSize: '20px', fontWeight: '700'}}
          >
            <Icon type="close" />
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={this.columns}
        dataSource={list.detail}
        bordered={true}
        pagination={list.queryParams.pagination}
        loading={listStatus.loading}
        onChange={this.handleTableChange.bind(this)}
      />
    </div>;
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

export default withRouter(Detail)
