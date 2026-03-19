import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCartApi } from '../../api/cartApi';

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ productId, quantity, itemData }, { rejectWithValue }) => {
    try {
      await addToCartApi(productId, quantity);

      return { productId, quantity, itemData };
    } catch (error) {
      console.log("API FAILED ", error);

      // STILL return data so UI updates
      return { productId, quantity, itemData };
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (i) => i.id === item.id
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i.id !== action.payload
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
 extraReducers: (builder) => {
  builder
    .addCase(addToCartAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      state.loading = false;
    console.log("FULFILLED", action.payload);

      const { productId, quantity, itemData } = action.payload;
      

      const existing = state.items.find(
        (i) => i.id === productId
      );

      if (existing) {
        existing.qty += quantity;
      } else {
        state.items.push({
          ...itemData,
          qty: quantity,
        });
      }
    })
    .addCase(addToCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;