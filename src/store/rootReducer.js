import { combineReducers } from 'redux'
import { btFormReducer } from './BTForm/slice'

export const rootReducer = combineReducers({
    
    btForm: btFormReducer,
    
})