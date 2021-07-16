import { configureStore } from '@reduxjs/toolkit'
import daysReducers from './slices/city'

export const store = configureStore({
  reducer: daysReducers,
})
