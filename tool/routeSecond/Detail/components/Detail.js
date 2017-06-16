import React from 'react'
import PropTypes from 'prop-types';
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import './Detail.css'
import First from './First';
import Second from './Second'

import { Steps, Button, message } from 'antd';
const Step = Steps.Step;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  componentWillMount(){
    this.setState({
      current: this.props.params.current == 1 ? 1 : 0
    })
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  submitNext(){
    browserHistory.push(
      this.getUrlQueryParams() + 
      '/detail/1/'+(this.props.params.id || this.props.firstProps.fields.id)
    );
  }
  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/routeNameHook/' + encodeURI(JSON.stringify(v || {}));
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  finish(){
    browserHistory.push(
      this.getUrlQueryParams()
    );
  }
  render(){
    const { current } = this.state;
    const steps = [{
      title: '主数据',
      content: <First 
                clearErr={this.props.firstClearErr}
                updateFields={this.props.firstUpdateFields}
                save={this.props.firstSave}
                fetchDetail={this.props.firstFetchDetail}
                {...this.props.firstProps} 
                next={this.next.bind(this)} 
                submitNext={this.submitNext.bind(this)}
              />,
    }, {
      title: '明细',
      content: <Second 
                clearErr={this.props.secondClearErr}
                save={this.props.secondSave}
                fetchList={this.props.secondFetchList}
                del={this.props.secondDel}
                {...this.props.secondProps} 
                prev={this.prev.bind(this)}
                finish={this.finish.bind(this)} 
              />,
    }];
    return <div>
      <Steps current={current}>
        {steps.map(item => <Step key={item.title} title={item.title} />)}
      </Steps>
      <div className="steps-content">{steps[this.state.current].content}</div>
    </div>
  }
}

export default withRouter(Detail)
