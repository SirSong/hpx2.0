import React from 'react'
import {Link,withRouter} from 'react-router'
// import GetProject from './GetProject'

import './MyProject.css'
 
class MyProject extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            project : []
        }
    }

    render(){
        return (
           <div className='types-project'>
                <h4>
                    <span>我的项目</span>
                </h4>
                <ul>
                    {
                        this.state.project.map((data,index)=>{
                            return (
                                
                                <li key={data.id} onClick={this.props.fetchOMenu}>
                                    <Link to={{pathname : data.route}}>{data.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
           </div> 
        )
    }

    componentDidMount(){
        fetch('/data/project.json')
        // fetch('/core/core/api/v1/projects')
            .then((resp)=>{
                if(resp.ok){
                    resp.json()
                    .then((res)=>{
                        this.setState({
                            project : res
                        })
                    })
                }
            })
    }
}

export default MyProject  
