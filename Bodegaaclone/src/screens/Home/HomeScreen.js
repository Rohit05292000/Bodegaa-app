import React , {useState, useEffect, useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import {getBestSellersApi} from '../../api/productApi';
import { getCategoriesApi } from '../../api/categoryApi';






export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(false);
 const categoryListRef = useRef(null);
const currentIndex = useRef(0);
const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  if (!categories.length) return;

  const interval = setInterval(() => {
    if (!categoryListRef.current) return;

    currentIndex.current =
      (currentIndex.current + 1) % categories.length;

    categoryListRef.current.scrollToIndex({
      index: currentIndex.current,
      animated: true,
    });
  }, 1500);

  return () => clearInterval(interval);
}, [categories]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productRes, categoryRes] = await Promise.all([
  getBestSellersApi(),
  getCategoriesApi(),
]);

// PRODUCTS 
const productData =
  productRes?.products ||
  productRes?.data?.products ||
  productRes?.data ||
  (Array.isArray(productRes) ? productRes : []);

  console.log('PRODUCT RES RAW:', JSON.stringify(productRes, null, 2));

// CATEGORIES 
const categoryData =
  categoryRes?.categories ||
  categoryRes?.data?.categories ||
  categoryRes || [];

setProducts(productData);
setCategories(categoryData);

    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View>
      <Header />
<FlatList
  ref={categoryListRef}
  data={categories}
  horizontal
  keyExtractor={(item, index) =>
    item?._id?.toString() || index.toString()
  }
  renderItem={({ item }) => (
    <CategoryCard
      title={item?.name}
      image={
        Array.isArray(item?.image)
          ? item.image[0]
          : item?.image
      }
    />
  )}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingLeft: 15, marginTop: 10 }}
  getItemLayout={(data, index) => ({
    length: 200,
    offset: 200 * index,
    index,
  })}
  initialScrollIndex={0}
/>
      <Text style={styles.heading}>Products for you</Text>
    </View>
  );

  if (loading) return <Loader />;

  return (
    <FlatList
      data={products}
      numColumns={2}
      nestedScrollEnabled={true}
     keyExtractor={(item, index) =>
  item?.id?.toString() || index.toString()
}
   renderItem={({ item }) => {
  if (!item) return null;

  // ✅ Create ONE consistent object
  const formattedItem = {
    id: item?._id,
    name: item?.name,
    price: item?.price,
    oldPrice: item?.mrp,
    image: Array.isArray(item?.image)
      ? item.image[0]
      : item?.image,
    weight: item?.weight,
  };

  return (
    <ProductCard
      item={formattedItem}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          product: formattedItem, 
        })
      }
    />
  );
}}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{
        paddingBottom: 20,
        backgroundColor: '#e8f5e9',
      }}
      showsVerticalScrollIndicator={false}
      
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    margin: 15,
  },
});