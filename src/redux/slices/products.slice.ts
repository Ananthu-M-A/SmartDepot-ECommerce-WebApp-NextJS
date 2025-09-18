import IProduct from '@/interfaces/product.interface';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const fetchProducts = createAsyncThunk<IProduct[]>('products/fetchProducts',
  async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data;
  });

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    byId: {} as Record<string, IProduct>,
    allIds: [] as string[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach((product) => {
          state.byId[product._id] = product;
          if (!state.allIds.includes(product._id)) {
            state.allIds.push(product._id);
          }
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as unknown as null;
      });
  },
});

export const selectAllProducts = createSelector(
  [(state: RootState) => state.products.byId, (state: RootState) => state.products.allIds],
  (byId, allIds) => allIds.map(id => byId[id])
);
export const selectProductById = (state: RootState, productId: string) => state.products.byId[productId];
export const selectProductsStatus = (state: RootState) => state.products.status;

export default productsSlice.reducer;