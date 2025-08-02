import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index'
export const store = configureStore({
  reducer: {
    auth:authReducer
  },
})

export default store