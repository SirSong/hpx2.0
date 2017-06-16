import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import './Detail.css'
import Main from './First';

import { Steps, Button, message } from 'antd';
const Step = Steps.Step;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render(){
    const { current } = this.state;
    const steps = [{
      title: '主数据',
      content: <Main {...this.props} next={this.next.bind(this)} />,
    }, {
      title: '明细',
      content: 'Second-content',
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
