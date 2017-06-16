import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'
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
  Modal,
  Popconfirm,
  Table 
} from 'antd';

import { 
  TextEditableCell, 
  DateEditableCell, 
  SelectEditableCell, 
  NumberEditableCell
} from '../../../../components/EditableCell';

class Second extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.list.rows
    }
    this.columns = [
          {
            key: 'description',
            title: '品名',
            dataIndex: 'description',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, 'description', text),
          },
          {
            key: 'model',
            title: '型号',
            dataIndex: 'model',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, 'model', text),
          },
          {
            key: 'specification',
            title: '规格',
            dataIndex: 'specification',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, 'specification', text),
          },
          {
            key: 'unit',
            title: '单位',
            dataIndex: 'unit',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, 'unit', text),
          },
          {
            key: 'univalence',
            title: '单价',
            dataIndex: 'univalence',
            render: (text, record, index) => this.renderColumns('number',this.state.data, index, 'univalence', text, 2),
          },
          {
            key: 'amount',
            title: '数量',
            dataIndex: 'amount',
            render: (text, record, index) => this.renderColumns('number',this.state.data, index, 'amount', text, 2),
          },
          {
            key: 'total',
            title: '总价',
            dataIndex: 'total',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, 'total', text),
          },
          {
            key: 'receivedAmount',
            title: '实收数量',
            dataIndex: 'receivedAmount',
            render: (text, record, index) => this.renderColumns('number',this.state.data, index, 'receivedAmount', text, 2),
          },
          {
            key: 'differenceAmount',
            title: '差异数量',
            dataIndex: 'differenceAmount',
            render: (text, record, index) => this.renderColumns('number',this.state.data, index, 'differenceAmount', text, 2),
          },
          {
            key: 'differenceMoney',
            title: '差异金额',
            dataIndex: 'differenceMoney',
            render: (text, record, index) => this.renderColumns('number',this.state.data, index, 'differenceMoney', text, 2),
          },
          {
            key: 'differenceType',
            title: '差异类型',
            dataIndex: 'differenceType',
            render: (text, record, index) => this.renderColumns(
              'select',
              this.state.data, 
              index,
              'differenceType',
              text,
              [{"value":"正常","name":"0"},{"value":"少发","name":"1"},{"value":"多发","name":"2"}]
            )
          },
          {
            key: 'differenceStatus',
            title: '差异状态',
            dataIndex: 'differenceStatus',
            render: (text, record, index) => this.renderColumns(
              'select',
              this.state.data, 
              index,
              'differenceStatus',
              text,
              [{"value":"未处理","name":"0"},{"value":"已处理","name":"1"}]
            )
          },
          {
            key: 'remark',
            title: '备注',
            dataIndex: 'remark',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, 'remark', text),
          },
          {
          title: '操作',
          key: 'action',
          render: (text, record, index) => {
            const { editable } = this.state.data[index].description;
            return <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => this.editDone(index, 'save')}>保存</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定取消?" onConfirm={() => this.editDone(index, 'cancel')}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                  :
                  <span>
                    <a onClick={() => this.edit(index)}>编辑</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
                      <a href="#">删除</a>
                    </Popconfirm>
                  </span>
              }
            </div>
          },
        }];
  }
  componentWillMount(){
    this.props.fetchList({'tContractId':this.props.params.id});
  }
  componentWillReceiveProps(nextProps){
    const { deleteStatus, listStatus, saveStatus, fetchList, list, err } = nextProps;
    if (
      this.props.listStatus.type != listStatus.type
      && listStatus.type.match('SUCCESS')
    ) {
      this.setState({
        data: list.rows
      })
    }
    if (
      this.props.saveStatus.type != saveStatus.type
      && saveStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      fetchList({'tContractId':this.props.params.id});
    }
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      fetchList({'tContractId':this.props.params.id});
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }
  renderColumns(type, data, index, key, text, selectDataOrPrecision) {
    const editable = data[index][key].editable || false;
    const status = data[index][key].status || '';
    if (typeof editable === 'undefined') {
      return text;
    }
    if( type == 'text' ){
      return (<TextEditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />);
    }else if( type == 'number' ){
      return (<NumberEditableCell
        editable={editable}
        value={text}
        precisionLen={selectDataOrPrecision}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />);
    }else if( type == 'date' ){
      return (<DateEditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />);
    }else if( type == 'select' ){
      return (<SelectEditableCell
        editable={editable}
        value={text}
        data={selectDataOrPrecision}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />);
    }
    return null;
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    if(!data[index].id && type == 'cancel') {//新增的时候取消，则删除新增的数据
      data.pop();
      this.setState({
        data: data
      })
      return;
    }
    if( type == 'save' ){
      //判断此次操作是保存(修改，新增)，设置计时器，等待列表数据都更新好了向服务器提交
      const self = this;
      setTimeout(
        () => {
          const item = self.state.data[index];
          const obj = {};
          Object.keys(item).forEach((key) => {
            obj[key] = key === 'id' ? item[key] : item[key].value;
          });
          obj.tContractId = self.props.params.id;
          self.props.save(obj,obj.id)
        },200
      )
    }
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  add(){
    var obj = {
      id: '',
      
        description: {
          value: null,
          editable: true,
        },
        model: {
          value: null,
          editable: true,
        },
        specification: {
          value: null,
          editable: true,
        },
        unit: {
          value: null,
          editable: true,
        },
        univalence: {
          value: null,
          editable: true,
        },
        amount: {
          value: null,
          editable: true,
        },
        total: {
          value: null,
          editable: true,
        },
        receivedAmount: {
          value: null,
          editable: true,
        },
        differenceAmount: {
          value: null,
          editable: true,
        },
        differenceMoney: {
          value: null,
          editable: true,
        },
        differenceType: {
          value: null,
          editable: true,
        },
        differenceStatus: {
          value: null,
          editable: true,
        },
        remark: {
          value: null,
          editable: true,
        },
    };
    let data = this.state.data;
    if(data.length&&!data[data.length-1].id) return;
    data.push(obj);
    this.setState({
      data: data
    })
  }
  render() {
    const { list, fetchList, listStatus } = this.props;
    const { data } = this.state;
    const columns = this.columns;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'id' ? item[key] : item[key].value;
      });
      return obj;
    });
    return <div>
              <div style={{ marginBottom: 16}}>
                <Button type="primary" onClick={this.add.bind(this)}>新增</Button>
                <Button type="primary"  style={{ float: "right"}} onClick={this.props.finish}>完成</Button>
                <Button type="primary"  style={{ float: "right", marginRight: "16px"}} onClick={this.props.prev}>上一步</Button>
              </div>
              <Table 
                rowKey="id"
                bordered 
                dataSource={dataSource} 
                columns={columns} 
                loading={listStatus.loading}
                pagination={false}
              />
          </div>;
  }
}
export default withRouter(Second)
