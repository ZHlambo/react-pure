import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import makeRoutes from './config/routes'
import configureStore from './config/configureStore'

import { Provider } from 'react-redux'
import { Router } from 'react-router'

const browserHistory = useRouterHistory(createBrowserHistory)({
  // basename: false//修改：此处为__BASENAME__
})

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

const routes = makeRoutes(store)

ReactDOM.render(
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router history={history}>
        {routes}
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)
