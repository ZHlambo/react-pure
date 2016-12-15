import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'

import authReducer from './modules/auth'

export default combineReducers({
  router,
})
