import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'


const initialState = {
  reddits: [],
  searchQuery: '',
  isFetching: false,
  limit: 100
}

const reddit = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.value,
        reddits: []
      }
    case 'FETCHING_REDDITS':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCH_MORE':
      return {
        ...state,
        limit: state.limit + 5
      }
    case 'RECIEVE_REDDITS':
      const newState = [
        ...state.reddits,
        ...action.newReddits
      ]
      return {
        ...state,
        reddits: newState,
        isFetching: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  reddit
})

const configureStore = () => {
  return createStore(
    rootReducer,
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunkMiddleware,
    )
  )
}

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
