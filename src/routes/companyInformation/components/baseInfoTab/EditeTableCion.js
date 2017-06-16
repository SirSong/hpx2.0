import React from 'react'
import { Input,Button , Popconfirm} from 'antd'

class EditeTableCion extends React.Component{
    constructor(props){
        super(props);
    
    }

    render(){
         const  { isEdite,editeDone,edite} = this.props
        return (
          
            <div>
            {
                isEdite ? 
               <span>
                  <Button type='primary' onClick={editeDone} style={{marginRight:20}}>保存</Button>
                  <Popconfirm title="确定还原?" onConfirm={editeDone}>
                    <Button type='primary'>还原</Button>
                  </Popconfirm>
                </span>
                :
                <span>
                  <Button type='primary' onClick={edite}>编辑</Button>
                </span>
            }
            </div>
        ) 
    }
}

export default EditeTableCion