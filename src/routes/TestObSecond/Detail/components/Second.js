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
            key: 'email',
            title: '邮箱',
            dataIndex: 'email',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, 'email', text),
          },
          {
            key: 'accuracy',
            title: '数字',
            dataIndex: 'accuracy',
            render: (text, record, index) => this.renderColumns('number',this.state.data, index, 'accuracy', text, 2),
          },
          {
            key: 'datePicker',
            title: '日期',
            dataIndex: 'datePicker',
            render: (text, record, index) => this.renderColumns('date',this.state.data, index, 'datePicker', text),
          },
          {
            key: 'selectorcountry',
            title: '国家',
            dataIndex: 'selectorcountry',
            render: (text, record, index) => this.renderColumns(
              'select',
              this.state.data, 
              index,
              'selectorcountry',
              text,
              [{"value":"china","name":"中国"},{"value":"usa","name":"美国"}]
            )
          },
          {
          title: '操作',
          key: 'action',
          render: (text, record, index) => {
            const { editable } = this.state.data[index].email;
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
    this.props.fetchList({'mainid':this.props.params.id});
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
      fetchList({'mainid':this.props.params.id});
    }
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      fetchList({'mainid':this.props.params.id});
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
          obj.mainid = self.props.params.id;
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
      
        email: {
          value: null,
          editable: true,
        },
        accuracy: {
          value: null,
          editable: true,
        },
        datePicker: {
          value: null,
          editable: true,
        },
        selectorcountry: {
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
