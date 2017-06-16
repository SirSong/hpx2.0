import React from 'react'
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
const Option = Select.Option;

class SelectEditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    data: this.props.data
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(value) {
    this.setState({ value });
  }
  render() {
    const { value, editable, data } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Select placeholder="请选择" value={value} onChange={this.handleChange.bind(this)}>
                {this.state.data.map(
                  (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                )}
              </Select>
            </div>
            :
            <div className="editable-row-text">
              {data.filter((v)=> v.value == value).map((v)=>v.name) || ''}
            </div>
        }
      </div>
    );
  }
}

export default SelectEditableCell