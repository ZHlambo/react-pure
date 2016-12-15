import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'

import actionReducer from 'redux/modules/action'

export default combineReducers({
  router,
  actionReducer,
})
