import React from 'react'
import { Form, Input, Button,message,Timeline,Modal} from 'antd';

import './identification.css'

class Identification extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            visible : true
        }
    }

    render(){
        const { visible } = this.state;
        const view = <div>

            <div style={{width:400,margin:'0 auto'}}>
                <Timeline>
                    <Timeline.Item>
                        <span className='process-time'>2015-15-16-12-5656</span>
                        <span className='process-connent'>当前节点</span>
                        <div style={{height:20}}></div>
                    </Timeline.Item>
                     <Timeline.Item>
                        <span className='process-time'>2015-15-16-12-5656</span>
                        <span className='process-connent'>当前节点</span>
                        <div style={{height:20}}></div>
                    </Timeline.Item>
                     <Timeline.Item>
                        <span className='process-time'>2015-15-16-12-5656</span>
                        <span className='process-connent'>当前节点</span>
                        <div style={{height:20}}></div>
                    </Timeline.Item>
                </Timeline>
                
            </div>
            <div style={{textAlign:'center'}}>
                <Button type='primary' onClick={()=>this.certainMoey()}>企业认证</Button>
            </div>
            
            <div>
                <h4>请在是放松放松放松放松放松放松</h4>
                <ol>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li><li>开征学科1</li>
                    <li>开征学科1</li>
                    <li>开征学科1</li>
                </ol>
                <div>
                    <h5>邮寄地址</h5>
                    <span>邮寄地址</span>
                </div>
            </div>
            <Modal
            visible={visible}
            title='企业认证'
            footer={null}
            >
            
            </Modal>
        </div>;
        return view
    }
}

export default Identification