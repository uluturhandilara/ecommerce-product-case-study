import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { getProducts, getProductById } from "../../shared/api/products.js";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (err) {
      return rejectWithValue(err.message ?? "Ürünler yüklenemedi");
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (err) {
      return rejectWithValue(err.message ?? "Ürün detayı yüklenemedi");
    }
  },
);

const initialState = {
  items: [],
  byId: {},
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload;
        state.error = null;
        payload.forEach((p) => {
          state.byId[p.id] = p;
        });
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Bilinmeyen hata";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.byId[payload.id] = payload;
        const inList = state.items.some((p) => p.id === payload.id);
        if (!inList) state.items.push(payload);
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Bilinmeyen hata";
      });
  },
});

export const selectProductsState = (state) => state.products;
export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const selectProductById = createSelector(
  [(state, id) => state.products.byId[id]],
  (product) => product ?? null
);

export default productsSlice.reducer;
