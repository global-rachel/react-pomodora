import { combineReducers } from 'redux'
import clockReducer from './clock'
import todoReducer from './todo'
import focusTodoReducer from './focusTodo'

export default combineReducers({
    focusTodo: focusTodoReducer,
    clock: clockReducer,
    todo: todoReducer
})