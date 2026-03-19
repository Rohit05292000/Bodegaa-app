import { createSlice } from '@reduxjs/toolkit';

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
  },

  reducers: {
    toggleFavourite: (state, action) => {
      const product = action.payload;

      const exists = state.items.find(
        (item) => item.id === product.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { toggleFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;