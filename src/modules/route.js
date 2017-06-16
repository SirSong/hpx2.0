
//页面访问权限的管理
//左侧目录的管理
import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../core/fetch';

import { browserHistory } from 'react-router'
import { constants as loginConstants, isLogin } from './login'
// ------------------------------------
// Constants
// ------------------------------------
// export const UPDATE_SELECTED_KEY = 'UPDATE_SELECTED_KEY'
const ACTION_PREFIX = 'mySider::';
export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const constants = {
  FETCH_LIST_NOT,
  FETCH_LIST_REQUEST,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS,
}
// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */


export const fetchMenu =  (projectId) => {
  return async (dispatch, getState) => {
    dispatch({
      type  : FETCH_LIST_REQUEST,
    })
    try{
      // const result = await fetch('/data/menu.json');
      let enterpriseId = getState().login.userInfo.enterpriseId;
      let result = null;
      // let url = projectId ? '/core'+'/core/api/v1/enterprise/'+enterpriseId+'/permissions' : 
      //               '/core'+'/core/api/v1/enterprise/'+enterpriseId+'/project/'+projectId+'/permissions';
      result = await getReq('/core'+'/core/api/v1/enterprise/'+enterpriseId+'/permissions',{})
      console.log(result)
      const res = await result.json();
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          data: res,
        }
      })  
    }catch(e){
      dispatch({
        type    : FETCH_LIST_FAILURE,
        payload : e
      })
    }
  }
}

export const fetchOMenu =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type  : FETCH_LIST_REQUEST,
    })
    try{
      const result = await fetch('/data/menu.json');

      const res = await result.json();
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          data: res,
        }
      })  
    }catch(e){
      dispatch({
        type    : FETCH_LIST_FAILURE,
        payload : e
      })
    }
  }
}

export const fetchDemanderMenu =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    try{
      const result = await fetch('/data/demanderMenu.json')
        .then(response=>response.json()).then(
          result=>result
        )
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          data: result.data,
        }
      })
    }catch(e){
      dispatch({
        type    : FETCH_LIST_FAILURE,
        payload : e
      })
    }
  }
}

export async function auth (store, nextState, replace, callback) {
  let res = await isLogin(store);
  if(res){//用户成功登录
    //判断访问的路由是否在可访问路由权限里,开发模式不做路由权限验证
    if(
      !__DEV__&&
      !store.getState().route.authRoute.find(
        (v,i) => v.route == nextState.location.pathname
      )
    ){
      alert('无权限');
      //获取上一路由
      //没有则跳到defaultRoute
      browserHistory.push(store.getState().route.defaultRoute || '/');
    }else{
      callback();
    }
  }else if(nextState.location.pathname == '/'){//当路由史‘／’显示登录或者显示项目
    callback();
  }else{
    browserHistory.push('/');
  }
}

export async function changeMenu(){
    
}

export async function authIndex (store, nextState, replace, callback) {
  // let res = store.getState().login.signInStatus === 'LOGIN::SIGN_IN_SUCCESS' ? true : false;
  // console.log(store.getState())
  // if(res){//用户成功登录
    replace('/company-information')
  // }
  callback()
}

export const actions = {
  fetchMenu,
  fetchDemanderMenu,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [AUTH]    : (state, action) =>  ({ ...state, ...action.payload}),
  // [UPDATE_SELECTED_KEY]    : (state, action) =>  {
  //   return ({ ...state, selectedKey: action.payload})
  // },
  [FETCH_LIST_NOT] : (state, action) => 
    ({ 
      ...state, 
      menuStatus : { 
        type : FETCH_LIST_NOT,
        loading: true, 
        menu:{
          data: []
        }
      },
    }),
  [FETCH_LIST_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      menuStatus : { 
        type : FETCH_LIST_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_LIST_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      menuStatus : { 
        type : FETCH_LIST_SUCCESS,
        loading: false, 
      },
      menu : { 
        ...state.menu,
        data : action.payload.data,
       }
    }),
  [FETCH_LIST_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      menuStatus : { 
        type : FETCH_LIST_FAILURE,
        loading: false, 
      },
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  authRoute:[//当前用户可以访问的路由
    {route:'/'},
    {route:'/counter'},
    {route:'/table1'},
  ],
  defaultRoute:'/',//用户默认显示路由
  err:'',
  menuStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  menu:{
      data: []
    }
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

