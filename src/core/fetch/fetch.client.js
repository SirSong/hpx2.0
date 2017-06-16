/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'whatwg-fetch';

export default self.fetch.bind(self);
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;

let serialize = (ob) => {
  let output = '';
  for (var k in ob) {
    output += encodeURIComponent(k) + '=' + encodeURIComponent(ob[k]) + '&'
  }
  return output.replace(/&$/, '');
}

const interceptor = (resp) => {
  //通用拦截处理
  // console.log(resp.status)
  // console.log(resp.headers.get('content-type'))
  const status = resp.status;
  let err = resp.headers.get('err') || '';
  err = decodeURI(err);
  if(status >= 200 && status < 300){
    return resp;
  }else{
    if(status == 400){//bad request
      throw err;
    }else if(status == 401){//未认证
      throw err;
    }else if(status == 403){//没有权限
      throw err;
    }else if(status >= 500){
      throw err;
    }
  }
}

let _formPostReq = async (url, body = {}, options = {}, headOptions = {}) => {
  let resp = await self.fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ...headOptions,token:localStorage.token
      },
      body: serialize(body),
      ...options,
      credentials: options.credentials || 'same-origin'
    }
  );
  return interceptor(resp);
}

let _postReq = async (url, body = {}, options = {}, headOptions = {}) => {
  let resp = await self.fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...headOptions,token:localStorage.token
      },
      body: JSON.stringify(body),
      ...options,
      credentials: options.credentials || 'same-origin'
    }
  );
  return interceptor(resp);
}

let _getReq = async (url, body = {}, options = {}, headOptions = {}) => {
  let resp = await self.fetch(
    url+'?'+serialize(body),
    {
      method: 'GET',
      headers: {
        ...headOptions,token:localStorage.token
      },
      body: null,
      ...options,
      credentials: options.credentials || 'same-origin'
    }
  );
  return interceptor(resp);
}
let _deleteReq = async (url, body = {}, options = {}, headOptions = {}) => {
  let resp = await self.fetch(
    url,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...headOptions,token:localStorage.token
      },
      body: JSON.stringify(body),
      ...options,
      credentials: options.credentials || 'same-origin'
    }
  );
  return interceptor(resp);
}
let _patchReq = async (url, body = {}, options = {}, headOptions = {}) => {
  let resp = await self.fetch(
    url,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...headOptions,token:localStorage.token
      },
      body: JSON.stringify(body),
      ...options,
      credentials: options.credentials || 'same-origin'
    }
  );
  return interceptor(resp);
}
let _putReq = async (url, body = {}, options = {}, headOptions = {}) => {
  let resp = await self.fetch(
    url,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...headOptions,token:localStorage.token
      },
      body: JSON.stringify(body),
      ...options,
      credentials: options.credentials || 'same-origin'
    }
  );
  return interceptor(resp);
}
export const formPostReq = _formPostReq;
export const postReq = _postReq;
export const getReq = _getReq;
export const putReq = _putReq;
export const patchReq = _patchReq;
export const deleteReq = _deleteReq;



