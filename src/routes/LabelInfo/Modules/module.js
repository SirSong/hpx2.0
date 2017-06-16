import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'labelInfoModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'
export const CLEAR_QUERY_PARAMS = ACTION_PREFIX + 'CLEAR_QUERY_PARAMS'

export const CLEAR_ERR = ACTION_PREFIX + 'CLEAR_ERR'

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const SAVE_NOT = ACTION_PREFIX + 'SAVE_NOT'
export const SAVE_REQUEST = ACTION_PREFIX + 'SAVE_REQUEST'
export const SAVE_FAILURE = ACTION_PREFIX + 'SAVE_FAILURE'
export const SAVE_SUCCESS = ACTION_PREFIX + 'SAVE_SUCCESS'

export const DETAIL_NOT = ACTION_PREFIX + 'DETAIL_NOT'
export const DETAIL_REQUEST = ACTION_PREFIX + 'DETAIL_REQUEST'
export const DETAIL_FAILURE = ACTION_PREFIX + 'DETAIL_FAILURE'
export const DETAIL_SUCCESS = ACTION_PREFIX + 'DETAIL_SUCCESS'

export const EDIT_NOT = ACTION_PREFIX + 'EDIT_NOT'
export const EDIT_REQUEST = ACTION_PREFIX + 'EDIT_REQUEST'
export const EDIT_FAILURE = ACTION_PREFIX + 'EDIT_FAILURE'
export const EDIT_SUCCESS = ACTION_PREFIX + 'EDIT_SUCCESS'

export const DELETE_NOT = ACTION_PREFIX + 'DELETE_NOT'
export const DELETE_REQUEST = ACTION_PREFIX + 'DELETE_REQUEST'
export const DELETE_FAILURE = ACTION_PREFIX + 'DELETE_FAILURE'
export const DELETE_SUCCESS = ACTION_PREFIX + 'DELETE_SUCCESS'

export const UPDATE_FIELDS = ACTION_PREFIX + 'UPDATE_FIELDS'//更新表单里的值
export const UPDATE_INPUTS = ACTION_PREFIX + 'UPDATE_INPUTS'
export const SHOW_MODAL = ACTION_PREFIX + 'SHOW_MODAL'
export const HIDDEN_MODAL = ACTION_PREFIX + 'HIDDEN_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

//如果queryParams为假，表示重置查询条件

export const clearQueryParams = () => {
  return {
    type: CLEAR_QUERY_PARAMS,
  }
}

export const clearErr = () => {
  return {
    type    : CLEAR_ERR,
  }
}

export const updateQueryParams = (queryParams) => {
  return {
    type: UPDATE_QUERY_PARAMS,
    payload: {
      queryParams,
    }
  }
}

export const fetchList =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_LIST_REQUEST,
    })
    let list = getState().labelInfoModule.list;
    let queryParams = Object.assign({},list.queryParams);
    
    let field1 = queryParams.field1 ? queryParams.field1.value : null;
    if(field1) queryParams.field1 = queryParams.field1.value;
    else delete queryParams.field1;
      
    let field2 = queryParams.field2 ? queryParams.field2.value : null;
    if(field2) queryParams.field2 = queryParams.field2.value;
    else delete queryParams.field2;
      
    let field3 = queryParams.field3 ? queryParams.field3.value : null;
    delete queryParams.field3;
    if(field3){
      if( field3[0] ) queryParams.startKeyName = field3[0];
      if( field3[1] ) queryParams.endKeyName = field3[1];
    }
      
    let field4 = queryParams.field4 ? queryParams.field4.value : null;
    if(field4) queryParams.field4 = queryParams.field4.value;
    else delete queryParams.field4;
      
    let pagination = queryParams.pagination;
    queryParams.page = pagination.current;
    queryParams.size = pagination.pageSize;
    delete queryParams.pagination;
    try{
      // const resp = await getReq(
      //   '/proxyWarn'+'/huaqian/api/v1/xLabelInfo/search',
      //   queryParams
      // )
      // const total = resp.headers.get('x-total-count');
      // const result = await resp.json();
      // let current = 
      //   pagination.pageSize * (pagination.current-1) >= total
      //   ? pagination.current -1 
      //   : pagination.current;
      // current = current <= 0 ? 0 : current;
      const result = await getReq( '/data/label.json' )
        .then(response=>response.json()).then(
          json=>json
        )
        console.log(6,result)
      dispatch({
        type    : FETCH_LIST_SUCCESS,
        payload : {
          rows: result.rows,
          detail: result.detail,
          edit: result.edit,
          inputs: result.inputs,
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

export  const fetchDetail =  (id) => {
  return async (dispatch, getState) => {
    if(!id){//没有id，就是新增
      dispatch({
        type: UPDATE_FIELDS,
        payload: {
          ...initialState.fields
        }
      })
      return;
    }
    dispatch({
      type    : DETAIL_REQUEST,
    })
    try{
      const resp = await getReq(
        '/proxyWarn'+'/huaqian/api/v1/xLabelInfo/get/'+id,
        {
        }
      )
      const result = await resp.json();
      let data = result;
      dispatch({
        type    : DETAIL_SUCCESS,
      })
      dispatch({
        type: UPDATE_FIELDS,
        payload: {
          id: id,//id,添加的时候为空，修改的时候有值
          
          email: {
            value: data.email || null
          },
          accuracy: {
            value: data.accuracy || null
          },
          phone: {
            value: data.phone || null
          },
          password: {
            value: data.password || null
          },
          company: {
            value: data.company || null
          },
          nickname: {
            value: data.nickname || null
          },
          datePicker: {
            value: data.datePicker || null
          },
          selectorcountry: {
            value: data.selectorcountry || null
          },
          uploadimg: {
            value: data.uploadimg || null
          },
          uploadview: {
            value: data.uploadview || null
          },
          agreement: {
            value: data.agreement || null
          },
          captcha: {
            value: data.captcha || null
          },
        }
      })
    }catch(e) {
      dispatch({
        type    : DETAIL_FAILURE,
        payload : e
      })
    }
  }
}

export  const del =  (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : DELETE_REQUEST,
    })
    try{
      const resp = await deleteReq(
        '/proxyWarn'+'/huaqian/api/v1/xLabelInfo/delete/'+id,
        {
        }
      )
      dispatch({
        type: DELETE_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : DELETE_FAILURE,
        payload : e
      })
    }
  }
}

export  const save =  (values, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : SAVE_REQUEST,
    })
    try{
      const resp = 
        id 
        ? await patchReq(
            '/proxyWarn'+'/huaqian/api/v1/xLabelInfo/update/'+id,
            {
                ...values,
            }
          )
        : await putReq(
            '/proxyWarn'+'/huaqian/api/v1/xLabelInfo/add',
            {
                ...values,
                id: id || '',
            }
          )
      // const result = await resp.json();
      dispatch({
        type    : SAVE_SUCCESS,
      })
    }catch(e){
      dispatch({
        type    : SAVE_FAILURE,
        payload : e
      })
    }
  }
}

export const updateFields = (fields,type) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FIELDS,
      payload: {
        ...getState().labelInfoModule.fields,
        ...fields
      }
    })
  }
}

export const updateInputs = (inputs,type) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_INPUTS,
      payload: {
        ...getState().labelInfoModule.inputs,
        ...inputs
      }
    })
  }
}

export const showModal = () => {
  return{
    type: SHOW_MODAL
  }
}

export const handleCancel = () => {
  return{
    type: HIDDEN_MODAL
  }
}


export const actions = {
  clearQueryParams,
  clearErr,
  updateQueryParams,
  fetchList,
  fetchDetail,
  handleCancel,
  del,
  save,
  updateFields,
  showModal,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CLEAR_ERR] : (state, action) => 
    ({ 
      ...state, 
      err: '',
    }),
  [UPDATE_QUERY_PARAMS] : (state, action) => 
    ({ 
      ...state, 
      list:{
        ...state.list,
        queryParams: {
          ...state.list.queryParams,
          ...action.payload.queryParams,
          pagination: {
            ...state.list.queryParams.pagination,
            ...action.payload.queryParams.pagination,
          }
        },
      }
    }),
  [CLEAR_QUERY_PARAMS] : (state, action) => 
    ({ 
      ...state, 
      list:{
        ...state.list,
        queryParams: initialState.list.queryParams,
      }
    }),
  [FETCH_LIST_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      listStatus : { 
        type : FETCH_LIST_REQUEST,
        loading: true, 
      },
    }),
  [FETCH_LIST_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      listStatus : { 
        type : FETCH_LIST_SUCCESS,
        loading: false, 
      },
      inputs: action.payload.inputs,
      list : { 
        ...state.list,
        rows : action.payload.rows,
        detail : action.payload.detail,
        edit : action.payload.edit,
        queryParams:{
          ...state.list.queryParams,
          pagination: {
            current : action.payload.current,
            pageSize: action.payload.pageSize
          },
        }
      }
    }),
  [FETCH_LIST_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      listStatus : { 
        type : FETCH_LIST_FAILURE,
        loading: false, 
      },
    }),
  
  [DETAIL_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      fetchDetailStatus:{
        type: DETAIL_REQUEST,
        loading: true,
      }
    }),
  [DETAIL_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      fetchDetailStatus:{
        type: DETAIL_SUCCESS,
        loading: false,
      }
    }),
  [DETAIL_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      fetchDetailStatus:{
        type: DETAIL_FAILURE,
        loading: false,
      }
    }),
  [SAVE_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      saveStatus:{
        type: SAVE_REQUEST,
        loading: true,
      }
    }),
  [SAVE_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      saveStatus:{
        type: SAVE_SUCCESS,
        loading: false,
      }
    }),
  [SAVE_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      saveStatus:{
        type: SAVE_FAILURE,
        loading: false,
      }
    }),
  [DELETE_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      deleteStatus:{
        type: DELETE_REQUEST,
        loading: true,
      }
    }),
  [DELETE_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      deleteStatus:{
        type: DELETE_SUCCESS,
        loading: false,
      }
    }),
  [DELETE_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      deleteStatus:{
        type: DELETE_FAILURE,
        loading: false,
      }
    }),
  [UPDATE_FIELDS] : (state, action) => 
    ({ 
      ...state, 
      fields: action.payload
    }),
  [UPDATE_INPUTS] : (state, action) => 
    ({ 
      ...state, 
      inputs: action.payload
    }),
  [SHOW_MODAL] : (state,action) =>
    ({
      ...state,
      visible: true,
    }),
  [HIDDEN_MODAL] : (state, action) => 
    ({
      ...state,
      visible: false
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  err:'',
  visible:'false',
  deleteStatus:{
    type:DELETE_NOT,
    loading: false,
  },
  saveStatus:{
    type:SAVE_NOT,
    loading: false,
  },
  fetchDetailStatus:{
    type:DETAIL_NOT,
    loading: false,
  },
  listStatus:{
    type:FETCH_LIST_NOT,
    loading: false,
  },
  inputs:{},
  fields:{
    id: null,//id,添加的时候为空，修改的时候有值
    
    email: {
      value: null
    },
    accuracy: {
      value: null
    },
    phone: {
      value: null
    },
    password: {
      value: null
    },
    company: {
      value: null
    },
    nickname: {
      value: null
    },
    datePicker: {
      value: null
    },
    selectorcountry: {
      value: null
    },
    uploadimg: {
      value: null
    },
    uploadview: {
      value: null
    },
    agreement: {
      value: null
    },
    captcha: {
      value: null
    },
  },//表单数据
  list:{
    rows:[],
    detail:[],
    edit:[],
    queryParams:{
      pagination:{
        current:1,
        total:0,
        pageSize:10,
      },
      
      field1: {
        value: null
      },
      field2: {
        value: null
      },
      field3: {
        value: null
      },
      field4: {
        value: null
      },
    },
  }
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
