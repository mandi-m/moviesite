import { combineReducers } from 'redux'

// const rootReducer = combineReducers({
//   auth: require('./auth').default,
// })

const rootReducer = combineReducers({
  movies: require('./movies').default
})


export default rootReducer
