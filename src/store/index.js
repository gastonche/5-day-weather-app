import { configureStore } from '@reduxjs/toolkit'
import reducer from './slices/city'

export const store = configureStore({
  reducer,
})
