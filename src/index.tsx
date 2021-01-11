import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ReactQueryConfig, ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import App from './App'
import reducers from './reducer'

const store = createStore(reducers)

const queryConfig: ReactQueryConfig = {
  shared: {
    suspense: true,
  },
  queries: {
    retry: 0,
    useErrorBoundary: true,
  },
}

ReactDOM.render(
  <Provider store={store}>
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </ReactQueryConfigProvider>
  </Provider>,
  document.getElementById('root')
)
