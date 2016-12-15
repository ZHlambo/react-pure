import {
  API_AUTH_LOGIN,
  API_AUTH_DYN_CODE
} from '../constants/host'
import request from '../utils/request'

const CLEAR_MSG = 'CLEAR_MSG';
const LOGIN = 'LOGIN';
const GET_DYN_CODE = 'GET_DYN_CODE';
const LOGOUT = 'LOGINOUT';

export const clearMsg = () => ({
  type: CLEAR_MSG
})

export const login = creds => ({
  type: LOGIN,
  payload: {
    promise: request.post(API_AUTH_LOGIN, {
      data: creds
    }).then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    })
  }
})

export const getDynCode = phonenum => ({
  type: GET_DYN_CODE,
  payload: {
    promise: request.post(API_AUTH_DYN_CODE, {
      data: {
        phonenum: phonenum
      }
    })
  }
})

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.removeItem('user');
    dispatch({
      type: LOGOUT,
    })
  }
}

const initialState = {
  user: (() => {
    let user = localStorage.getItem('user');

    if (user) {
      user = JSON.parse(user);
      if (user.expired && new Date(user.expired).getTime() > new Date().getTime()) return user;
    }
    localStorage.removeItem('user');
  })(),
}

export default function authReducer(state = initialState, action) {
  if(action.type && action.type.indexOf("_REJECTED")!=-1){
    let msg = ""
    if (action.payload.errors) {
      if (action.payload.errors instanceof Array) {
        msg = action.payload.errors[0].message
      } else {
        msg = action.payload.errors.message
      }
    } else {
      msg = action.payload.message
    }
    Alert(msg);
  }
  switch (action.type) {
    case CLEAR_MSG:
      return {
        ...state,
        successMsg: '',
        errorMsg: '',
      };
    case `${LOGIN}_PENDING`, `${GET_DYN_CODE}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        redirect: '/',
        successMsg: `登陆成功`,
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        user: null,
        errorMsg: action.message,
      };
    case `${GET_DYN_CODE}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        successMsg: action.payload.message,
      };
    case `${GET_DYN_CODE}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.message,
      };
    case LOGOUT:
      return {
        ...state,
        isFetching: false,
        user: null,
      };
    default:
      return state;
  }
}
