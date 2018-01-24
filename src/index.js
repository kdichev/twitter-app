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
  selectedSubreddits: [],
  searchQuery: '',
  isFetching: false,
  error: false
}

const reddit = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.value
      }
    case 'FETCHING_REDDITS':
      return {
        ...state,
        isFetching: true
      }
    case 'RECIEVE_REDDITS':
      return {
        ...state,
        reddits: [
          ...state.reddits,
          ...action.newReddits
        ],
        isFetching: false
      }
    case 'ADD_SELECTED_SUBREDDIT':
      return {
        ...state,
        selectedSubreddits: [
          ...state.selectedSubreddits,
          ...action.subreddit
        ]
      }
    case 'ERROR_RECIEVING_REDDITS':
      return {
        ...state,
        error: true
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
