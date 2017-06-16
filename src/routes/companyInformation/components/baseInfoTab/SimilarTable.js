import React from 'react'

export default class Vtable extends React.Component{
    constructor(porps){
        super(props)
    };

    render(){

        const { data } = this.porps;
        return (
            <ul>
            {
                data.map((v,i)=>{
                
                })
            }
            </ul>
        )

    }
}