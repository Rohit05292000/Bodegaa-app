import Base_URL from './BaseURL';

export const getBestSellersApi = async () => {
  try {
    const res = await Base_URL.get('products/bestsellers');
    return res.data;
  } catch (error) {
    console.log('Best Sellers API Error:', error);
    throw error;
  }
};