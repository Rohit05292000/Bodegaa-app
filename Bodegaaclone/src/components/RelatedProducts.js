import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductCard from '../components/products/ProductCard';
import { useNavigation } from '@react-navigation/native';

export default function RelatedProducts({ products = [] }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 16 }}>
        Related Products
      </Text>

      <FlatList
        data={products}
        horizontal 
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item?.id?.toString() || index.toString()
        }
        renderItem={({ item }) => {
          const formattedItem = {
            id: item?.id || item?._id,
            name: item?.name,
            price: item?.price,
            oldPrice: item?.mrp || item?.oldPrice,
            image: Array.isArray(item?.image)
              ? item.image[0]
              : item?.image,
            weight: item?.weight,
          };

          return (
            <View style={{ width: 220 }}>
              <ProductCard
                item={formattedItem}
                onPress={() =>
                  navigation.push('ProductDetails', {
                    product: formattedItem,
                  })
                }
              />
            </View>
          );
        }}
      />
    </View>
  );
}