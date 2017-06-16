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
import { getMoment } from '../../core/util'
const dateFormat = 'YYYY/MM/DD';

class DateEditableCell extends React.Component {
  state = {
    value: this.props.value ? moment(this.props.value,dateFormat) : null,
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
        this.props.onChange(this.state.value ? this.state.value.format(dateFormat) : null);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue ? this.cacheValue.format(dateFormat) : null);
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
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <DatePicker
                value={value}
                format={dateFormat}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value ? moment(value,dateFormat).format(dateFormat) : null}
            </div>
        }
      </div>
    );
  }
}

export default DateEditableCell