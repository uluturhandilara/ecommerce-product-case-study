import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice.js'
import commentsReducer from './slices/commentsSlice.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
})
