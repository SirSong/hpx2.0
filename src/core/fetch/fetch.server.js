/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Promise from 'bluebird';
import fetch, { Request, Headers, Response } from 'node-fetch';
import { host } from '../../config';

fetch.Promise = Promise;
Response.Promise = Promise;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${host}${url}`;
}

function localFetch(url, options) {
  return fetch(localUrl(url), options);
}

let serialize = (ob) => {
    let output = '';
    for(var k in ob){
        output += encodeURIComponent(k)+'='+encodeURIComponent(ob[k])+'&'
    }
    return output.replace(/&$/,'');
}

let formPostReq = (url, body = {}, options = {}, headOptions = {}) => {
   return localFetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
          ...headOptions,token:localStorage.token
        },
        body: serialize(body),
        ...options,
        credentials: options.credentials || 'same-origin'
      }
    );
} 


let postReq = (url, body = {}, options = {}, headOptions = {}) => {
   return localFetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headOptions,token:localStorage.token
        },
        body: JSON.stringify(body),
        ...options,
        credentials: options.credentials || 'same-origin'
      }
    );
} 

let putReq = (url, body = {}, options = {}, headOptions = {}) => {
   return localFetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headOptions,token:localStorage.token
        },
        body: JSON.stringify(body),
        ...options,
        credentials: options.credentials || 'same-origin'
      }
    );
} 

let patchReq = (url, body = {}, options = {}, headOptions = {}) => {
   return localFetch(
      url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...headOptions,token:localStorage.token
        },
        body: JSON.stringify(body),
        ...options,
        credentials: options.credentials || 'same-origin'
      }
    );
} 

let deleteReq = (url, body = {}, options = {}, headOptions = {}) => {
   return localFetch(
      url,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headOptions,token:localStorage.token
        },
        body: JSON.stringify(body),
        ...options,
        credentials: options.credentials || 'same-origin'
      }
    );
} 

let getReq = (url, body = {}, options = {}, headOptions = {}) => {
   return localFetch(
      url + '?' + serialize(body),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headOptions,token:localStorage.token
        },
        body: null,
        ...options,
        credentials: options.credentials || 'same-origin'
      }
    );
} 

export { localFetch as default, Request, Headers, Response, formPostReq, jsonReq, deleteReq, patchReq, putReq, getReq };
