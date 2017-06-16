import { InputNumber } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 数字格式化组件的封装:
// 把数字格式化成千位符的格式, 并保留两位小数点, 如：100,000.00

class NumFormat extends Component {
  constructor(props) {
    super(props);
    this.handleNum = this.handleNum.bind(this);
  }

// 对数字进行处理, s 是需要格式化的数字, n 是需要保留的小数点位数
  handleNum(s, n) {
    n = n > 0 && n <= 20 ? n : 2;  
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    let l = s.split(".")[0].split("").reverse(),  
    r = s.split(".")[1];  
    let t = "";  
    for(let i = 0; i < l.length; i ++ ) {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
    }  
   return t.split("").reverse().join("") + "." + r;
  }

  render() {
    return(
      <div>
        <span>{this.handleNum(this.props.text,2)}</span>
      </div>
      )
  }
}

// 调用的时候, 给组件添加一个名为 text 的属性, 值为: 需要格式化的数字
export default NumFormat