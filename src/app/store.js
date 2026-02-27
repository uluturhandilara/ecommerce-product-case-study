import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice.js'
import commentsReducer from './slices/commentsSlice.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
})

export function createTestStore() {
  return configureStore({
    reducer: {
      products: productsReducer,
      comments: commentsReducer,
    },
  })
}
