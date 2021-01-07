import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ReactQueryConfig, ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Provider } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './RootReducer'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['commonSearch'],
}

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
})

const persistor = persistStore(store)

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
    <PersistGate loading={null} persistor={persistor}>
      <ReactQueryConfigProvider config={queryConfig}>
        <App />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ReactQueryConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
