import React from 'react'

import { Steps } from 'antd'

const Step = Steps.Step;

class AuthStep extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return <Steps current={2}>
                <Step title="完善信息" >。。。。</Step>
                <Step title="企业认证" ></Step>
                <Step title="完成" ></Step>
        </Steps>
    }
}
export default AuthStep
