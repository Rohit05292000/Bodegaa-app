import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import favouriteReducer from './slices/favouriteSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favourites: favouriteReducer, 
    cart: cartReducer,
  },
});

