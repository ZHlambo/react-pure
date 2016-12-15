import { API_GET_CATS } from '../constants/host'
import request from '../utils/request'

const GET_CATS = 'GET_CATS_MALL'

export const getCats = () => (dispatch,getState)=>{
  dispatch({
    type:GET_CATS,
    payload:{
      promise:request.get(API_GET_CATS,{
        headers: {'Authorization':getState().authReducer},
        query:{sort:{sortorder:1}}
      })
    }
  })
}
const initialState = {
  cats: [],
}
export default function mallReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_CATS}_PENDING`:
      state.fetchingCats = true
      return {
        ...state,
      }
    case `${GET_CATS}_FULFILLED`:
      state.fetchingCats = false
      return { ...state, cats:action.payload }
    default:
      return state;
  }
}
