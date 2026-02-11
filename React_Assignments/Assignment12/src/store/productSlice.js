
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { items: [] },
  reducers: {
    updateProduct: (state, action) => {
      const i = state.items.findIndex(
        (p) => p.id === action.payload.id
      );
      if (i !== -1) state.items[i] = action.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
