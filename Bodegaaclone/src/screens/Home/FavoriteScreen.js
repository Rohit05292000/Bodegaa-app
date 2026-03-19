import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard';

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favorites = useSelector(
  (state) => state.favourites.items
);

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No favorite products yet ❤️
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  product: item,
                })
              }
            />
          )}

          columnWrapperStyle={styles.row}
          contentContainerStyle={{
            paddingBottom: 20,
            paddingTop: 10,
          }}
        />
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', 
  },

  header: {
    padding: 15,
    backgroundColor: '#A5D6A7', // light green like image
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
  },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});