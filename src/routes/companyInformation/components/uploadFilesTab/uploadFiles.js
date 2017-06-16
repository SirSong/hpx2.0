import React from 'react'
import { Upload, message, Button, Icon,Table } from 'antd'

class UploadTable extends React.Component{
    constructor(props){
        super(props);
        this.filesType = ['开户许可证','营业执照证','企业机构代码正本','国税或地税登记证',
        '法人身份证(正反面)','组织机构代码正本','经办人身份证(正反面)','授权书','授权人身份证(正反面)']
        this.data = [
            {
                id:1
            },
            {
                id:2
            },
            {
                id:3
            },
            {
                id:4
            },
            {
                id:5
            },
            {
                id:6
            },
            {
                id:7
            },
            {
                id:8
            },
            {
                id:9
            }
        ];
        this.data.map((v,i)=>{
            v.filesName = this.filesType[i]
        })
        console.log(this.data)
        this.filesProps = {
            action :　'/core/core/api/v1/attachfiles',
            listType:"picture",
            className: 'upload-list-inline',
            onSuccess : (data,responese)=>{
                message.success('上传成功!')
            },
            onError : (res)=>{
                message.error('未上传成功!')
            }
        }
        this.columns = [
            {
                title : '文档名称',
                key : 'filesName',
                dataIndex : 'filesName',
            },
            {
                title : '文件大小',
                key : 'filesSize',
                dataIndex : 'filesSize',
            },
            {
                title : '上传人',
                key : 'modifiedBy',
                dataIndex : 'modifiedBy',
            },
            {
                title : '上传时间',
                key : 'uploadTime',
                dataIndex : 'uploadTime',
            },
            {
                title : '查看',
                key : 'check',
                dataIndex : 'check',
                render : (text,record)=>{
                     
                }
            },
            {
                title :'操作',
                key:'action',
                width:200,
                render : (text,record)=> 
                    <Upload {...this.filesProps} name='files' id='files'>
                        <Button type='primary' >上传文件</Button>
                    </Upload>                 
            }
        ]
    }
    
    render(){
        return (
        <Table
        rowKey='id'
        columns={this.columns}
        dataSource={this.data}
        />
        )
    }
}

export default UploadTable
