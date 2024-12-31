import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './services/authSlice'


const combineReducer = combineReducers({
    auth: authSlice,
})

const store = configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store