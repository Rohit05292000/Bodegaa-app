import Base_URL from './BaseURL';



export const getCategoriesApi = async () => {
  try {
    const res = await Base_URL.get('category');
    return res.data;
  } catch (error) {
    console.log('Category API Error:', error);
    throw error;
  }
};