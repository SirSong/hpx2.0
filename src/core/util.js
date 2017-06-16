import moment from 'moment'
var toString = (v) => v+'';
export function mul(a, b) {
  let c = 0;
  const d = toString(a).toString();
  const e = toString(b).toString();
  try {
    c += d.split('.')[1].length;
  } catch (f) { }
  try {
    c += e.split('.')[1].length;
  } catch (f) { }

  let tem = Number(d.replace('.', '')) * Number(e.replace('.', ''));
  tem /= (10 ** c);
  return tem;
}
export function add(a, b) {
  let c;
  let d;
  let e;
  try {
    c = toString(a).toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = toString(b).toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  e = 10 ** ((Math.max(c, d)), (mul(a, e) + mul(b, e)) / e);
  return e;
}

export function sub(a, b) {
  let c;
  let d;
  let e;
  try {
    c = toString(a).toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = toString(b).toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  e = 10 ** Math.max(c, d);
  return (mul(a, e) - mul(b, e)) / e;

}


export function div(a, b) {
  let c;
  let d;
  let e = 0;
  let f = 0;
  try {
    e = toString(a).toString().split('.')[1].length;
  } catch (g) {}
  try {
    f = toString(b).toString().split('.')[1].length;
  } catch (g) {}
  c = Number(toString(a).toString().replace('.', ''));
  d = Number(toString(b).toString().replace('.', ''));
  return mul(c / d, (10 ** (f - e)));
}

export function urlParse() {
  const url = window.location.search;
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);

  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

export function judgeNumber(str) { // 判断整数
  if (!str) return true;
  const r = /^\d+$/;
  return r.test(str);
}

export function judgeFloat(str) { // 判断浮点数
  if (!str) return true;
  const r = /^\d+(\.\d+)?$/;
  return r.test(str);
}

export function juegeIE9() {
  if (navigator.appName === 'Microsoft Internet Explorer' && navigator.appVersion.match(/9./i) == '9.') return true;
  return false;
}

export function checkEmail(input){
    let filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(input)) {
        return true;
    }else{
        return false;
    }
}

export function checkPassword(strPassword) {//6到16位，需包含数字，字母，符号中两种
    strPassword = strPassword || '';
    var num = 0;
    if (strPassword.search(/[A-Z]/) != -1) {
        num += 1;
    }
    if (strPassword.search(/[0-9]/) != -1) {
        num += 1;
    }
    if (strPassword.search(/[a-z]/) != -1) {
        num += 1;
    }
    if (strPassword.search(/[^A-Za-z0-9]/) != -1) {
        num += 1;
    }
    if (num >= 2 && (strPassword.length >= 6 && strPassword.length <= 16 )) {
        return true;
    }
    else {
        return false;
    }
}

//检测手机号是否合法
export function checkPhone(value) {
    var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}

//控制数字精度
//precisionLen:精度位数
export function precisionFormat(precisionLen, src) {
  src = src || 0;
  src = parseFloat(src);
  if (src>=0){
    var dist = parseInt((src * Math.pow(10,precisionLen)+0.5))/Math.pow(10,precisionLen);
    return dist;
  } else{
    src=-src;
    var dist = parseInt((src * Math.pow(10,precisionLen)+0.5))/Math.pow(10,precisionLen);
    return -dist;
  }
}

export function getMoment(v,format){
  if(!v) return null;
  return moment(v,format);//需要format，否则会有警告
}