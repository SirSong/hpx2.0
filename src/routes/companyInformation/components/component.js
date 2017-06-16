import React from 'react'

import { Modal,Tabs } from 'antd'

import BaseInfo from './baseInfoTab/baseInfo'
import UploadTable from './uploadFilesTab/uploadFiles'
import Identification from './identification/identification'
import AuthStep from './steps'
const TabPane = Tabs.TabPane;
class ComInfo extends  React.Component{
    constructor(props){
        super(props);
    }
    
    authPrompt(){
        const tip = Modal.info({
            title:'提示',
            content:'请先完成企业认证!',
        });
        setTimeout(()=>tip.destroy(),5000)
    }

    componentWillMount(){
        this.authPrompt()
    }
    render(){
        const { comInfo,fetchComInfo,updateComInfo } = this.props;
        console.log(this.props)
        return <div>
                    <div style={{width:'50%',margin:'0 auto'}}> 
                        <AuthStep />
                    </div>
                    <Tabs>
                        <TabPane tab="基本信息" key="1">
                            <BaseInfo   
                            comInfo={comInfo}
                            fetchComInfo={fetchComInfo}
                            updateComInfo={updateComInfo}
                            />
                        </TabPane>
                        <TabPane tab="银行账户"  key="2">
                            
                        </TabPane>
                        <TabPane tab="文档上传"  key="3">
                            <UploadTable />
                        </TabPane>
                        <TabPane tab="企业认证"  key="4">
                            <Identification />
                        </TabPane>
                    </Tabs>
                </div>
    }
}

export default ComInfo