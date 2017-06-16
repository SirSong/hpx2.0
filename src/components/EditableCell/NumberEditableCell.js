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
import { getMoment, precisionFormat } from '../../core/util'

class NumberEditableCell extends React.Component {
  state = {
    value: this.props.value,
    precision: this.props.precision || 2,
    editable: this.props.editable || false,
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
    value = precisionFormat(this.state.precision, value)
    this.setState({ value });
  }
  render() {
    const { value, editable, precision } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <InputNumber
                value={value}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            :
            <div className="editable-row-text">
              {precisionFormat(precision, value || 0)}
            </div>
        }
      </div>
    );
  }
}

export default NumberEditableCell