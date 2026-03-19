import Base_URL from './BaseURL';

export const addToFavouriteApi = async (productId) => {
  try {
    const res = await Base_URL.post('favourite/addtofavourite', {
      productId,
    });
    return res.data;
  } catch (error) {
    console.log('Add Favourite Error:', error);
    throw error;
  }
};

export const removeFromFavouriteApi = async (productId) => {
  try {
    const res = await Base_URL.delete(`favourite/remove/${productId}`);
    return res.data;
  } catch (error) {
    console.log('Remove Favourite Error:', error);
    throw error;
  }
};