/*这个文件里的方法只适用于antd 的Form作用域内
*/
//格式化小数位数

//验证小数位
export function precisionValidator(precisionLen, rule, value, callback ) {
  const form = this.props.form;
  if ( value  ) {
    var tem = new String(value).split('.');
    if( tem[1] && tem[1].length > precisionLen ){
      callback('最多只能有'+precisionLen+'位小数');
    }else {
      callback();
    }
  } else {
    callback();
  }
}