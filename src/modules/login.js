
import fetch, { formPostReq, postReq, getReq } from '../core/fetch';


// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'LOGIN::';

//登录状态
export const SIGN_IN_NOT = ACTION_PREFIX + 'SIGN_IN_NOT'
export const SIGN_IN_REQUEST = ACTION_PREFIX + 'SIGN_IN_REQUEST'
export const SIGN_IN_FAILURE = ACTION_PREFIX + 'SIGN_IN_FAILURE'
export const SIGN_IN_SUCCESS = ACTION_PREFIX + 'SIGN_IN_SUCCESS'
export const CLEAR_SIGN_IN_ERR = ACTION_PREFIX + 'CLEAR_SIGN_IN_ERR'

//登出状态
export const LOG_OUT_NOT = ACTION_PREFIX + 'LOG_OUT_NOT'
export const LOG_OUT_REQUEST = ACTION_PREFIX + 'LOG_OUT_REQUEST'
export const LOG_OUT_FAILURE = ACTION_PREFIX + 'LOG_OUT_FAILURE'
export const LOG_OUT_SUCCESS = ACTION_PREFIX + 'LOG_OUT_SUCCESS'

export const constants = {
  SIGN_IN_NOT,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  LOG_OUT_NOT,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
}

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export  const signIn =  (formData) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SIGN_IN_REQUEST,
      payload : {...formData}
    })
    const resp = await formPostReq(
      __PROXY__+'/trade/user/login', 
      {
          username: formData.userName,
          password: formData.password,
      }
    )
    const result = await resp.json();
    console.log(1,result)
    if(result.success){
      localStorage['token'] = result.data.token;
      dispatch({
        type    : SIGN_IN_SUCCESS,
        payload : ''
      })
    }else {
      dispatch({
        type    : SIGN_IN_FAILURE,
        payload : {
          ...formData,
          signInErr : '用户名或密码错误'
        }
      })
    }
  }
}

// export  const signIn =  (formData) => {
//   return async (dispatch, getState) => {
//     dispatch({
//       type: SIGN_IN_REQUEST,
//       payload: { ...formData }
//     })
//     try{
//       const resp = await formPostReq(
//         '/core'+'/api/v1/login', 
//         {
//             username: formData.userName,
//             password: formData.password,
//         }
//       )
//       const result = await resp.json();
//       console.log(result)
//       dispatch({
//         type    : SIGN_IN_SUCCESS,
//         payload : result
//       })
//     }catch(e){
//       dispatch({
//         type: SIGN_IN_FAILURE,
//         payload: {
//           ...formData,
//           signInErr: '用户名或密码错误'
//         }
//       })
//     }
//   }
// }


export const logOut = () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : LOG_OUT_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core' + '/api/v1/logout',
        {}
      );
      if(resp.status === 200){
        dispatch({
          type    : LOG_OUT_SUCCESS,
          payload : '',
        })
      }else{
        console.log('dcsb')
        dispatch({
          type    : LOG_OUT_FAILURE,
          payload : '登出失败'
        })
      }
    }catch(e){
      dispatch({
        type    : LOG_OUT_FAILURE,
        payload : '登出失败'
      })
    }
  }
}

export const clearSignInErr = () => ({
  type: CLEAR_SIGN_IN_ERR
})


//判断用户是否登陆

export async function isLogin (store){
  // const resp = await formPostReq(
  //   __PROXY__+'/trade/user/isLogin',
  //   {},
  // )
  // const result = await resp.json();
  // console.log(result)
  // if(result.success){
  //   if(result.data.isLogin == 'YES'){//用户登录成功
  //     store.dispatch({
  //       type:SIGN_IN_SUCCESS,
  //     })
  //     return true;
  //   }
  // }else{//用户未验证，返回登陆页面
  //   store.dispatch({
  //     type:SIGN_IN_NOT,
  //   })
  //   return false;
  // }
  store.dispatch({
    type:SIGN_IN_SUCCESS,
  })
  return true
}


// export async function isLogin (store){
//   try{
//     const resp = await getReq(
//       '/core'+'/api/v1/login',
//       {},
//     )
//     const result = await resp.json();
//     if(resp.ok){
//       store.dispatch({
//         type:SIGN_IN_SUCCESS,
//         payload:result
//       })
//     }
//     return true
//   }catch(e){
//     store.dispatch({
//       type:SIGN_IN_NOT,
//     })
//     return false;
//   }
// }

export const actions = {
  signIn,
  logOut,
  clearSignInErr,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGN_IN_REQUEST] : (state, action) => 
    ({ ...state, signInStatus: SIGN_IN_REQUEST, signInErr: '' , ...action.payload }),
  [SIGN_IN_SUCCESS] : (state, action) => 
    ({ ...state, signInStatus: SIGN_IN_SUCCESS, logOutStatus: LOG_OUT_NOT ,userInfo:action.payload}),
  [SIGN_IN_FAILURE] : (state, action) => 
    ({ ...state, signInStatus: SIGN_IN_FAILURE, ...action.payload }),

  [CLEAR_SIGN_IN_ERR] : (state, action) => 
    ({ ...state, signInStatus: SIGN_IN_NOT, signInErr: '' }),

  [LOG_OUT_REQUEST] : (state, action) => 
    ({ ...state, logOutStatus: LOG_OUT_REQUEST, logOutErr: '' }),
  [LOG_OUT_SUCCESS] : (state, action) => 
    ({ ...state, signInStatus: SIGN_IN_NOT, logOutStatus: LOG_OUT_SUCCESS }),
  [LOG_OUT_FAILURE] : (state, action) => 
    ({ ...state, logOutStatus: LOG_OUT_FAILURE, logOutErr: action.payload }),

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userName :'radrupt',
  password :'111111',
  signInErr : '',//登录错误信息
  signInStatus : SIGN_IN_NOT,//登录状态
  logOutErr : '',//登出错误信息
  logOutStatus : LOG_OUT_NOT,//登出状态
  userInfo:null
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
