import Base_URL from './BaseURL';




export const addToCartApi = async (productId, quantity) => {
  try {
    const res = await Base_URL.post('cart', {
      productId,
      quantity,
    });
    return res.data;
  } catch (error) {
    console.log('Cart API Error:', error);
    throw error;
  }
};