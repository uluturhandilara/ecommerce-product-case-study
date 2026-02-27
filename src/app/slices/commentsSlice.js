import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { getCommentsByPostId } from '../../shared/api/products.js'

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId, { rejectWithValue }) => {
    try {
      return await getCommentsByPostId(postId)
    } catch (err) {
      return rejectWithValue(err.message ?? 'Yorumlar yüklenemedi')
    }
  }
)

const initialState = {
  byPostId: {},
  status: {},
  error: {},
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state, { meta }) => {
        const id = meta.arg
        state.status[id] = 'loading'
        state.error[id] = null
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, { meta, payload }) => {
        const id = meta.arg
        state.byPostId[id] = payload
        state.status[id] = 'succeeded'
        state.error[id] = null
      })
      .addCase(fetchCommentsByPostId.rejected, (state, { meta, payload }) => {
        const id = meta.arg
        state.status[id] = 'failed'
        state.error[id] = payload ?? 'Bilinmeyen hata'
      })
  },
})

export const selectCommentsByPostId = createSelector(
  [(state, postId) => state.comments.byPostId[postId], (_, postId) => postId],
  (comments) => comments ?? []
)

export const selectCommentsStatus = (state, postId) =>
  state.comments.status[postId] ?? 'idle'

export const selectCommentsError = (state, postId) =>
  state.comments.error[postId] ?? null

export default commentsSlice.reducer
