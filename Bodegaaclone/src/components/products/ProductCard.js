import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../redux/slices/favouriteSlice';
import { addToCartAsync } from '../redux/slices/cartSlice';



export default function ProductCard({ item, onPress }) {



  const dispatch = useDispatch();

const favourites = useSelector(
  (state) => state.favourites?.items || []
);

const isFavorite = favourites.some(
  (fav) => fav.id === item.id
);

  return (
    
       <Pressable
      style={styles.card}
      onPress={() => onPress(item)}
    >
      

      {/* ❤️ Wishlist */}
   <Pressable
  style={styles.heart}
  onPress={(e) => {
    e.stopPropagation();
    dispatch(toggleFavourite(item));
  }}
>
  <Icon
    name={isFavorite ? 'heart' : 'heart-outline'}
    size={20}
    color={isFavorite ? 'red' : '#555'}
  />
</Pressable>

      {/* Image */}
      <Image
  source={{
    uri: Array.isArray(item?.image)
      ? item.image[0]
      : item?.image || 'https://via.placeholder.com/150'
  }}
  style={styles.image}
  resizeMode="contain"
/>

      {/* 📦 Name */}
      <Text style={styles.name} numberOfLines={2}>
        {item?.name}
      </Text>

      {/* 💰 Price Row */}
      <View style={styles.row}>
        {item?.oldPrice ? (
          <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
        ) : null}

        <Text style={styles.price}> ₹{item?.price}</Text>

        {item?.weight && (
          <Text style={styles.weight}> | {item.weight}</Text>
        )}
      </View>

      {/* 📊 Stock */}
      <Text style={styles.stock}>In stock</Text>

      {/* 🛒 Add to Cart */}
    <Pressable
     android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
  style={styles.button}
  onPress={(e) => {
    e.stopPropagation();

    dispatch(
      addToCartAsync({
        productId: item._id,   
        quantity: 1,
        itemData: {
          id: item._id,       
          name: item.name,
          price: item.discountPrice || item.price,
          oldPrice: item.price,
          image: item.image[0],
          weight: item.weight,
        },
      })
    );
  }}
>
  <Text style={styles.btnText}>Add to Cart</Text>
</Pressable>

    </Pressable>
    
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
     maxWidth: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    margin: 8,
    elevation: 3,
  },

  heart: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },

  image: {
    height: 110, // 🔥 increased size
    width: '100%',
    marginBottom: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 12,
  },

  price: {
    color: '#0B8F3E',
    fontWeight: '700',
    fontSize: 14,
  },

  weight: {
    fontSize: 12,
    color: '#555',
  },

  stock: {
    color: 'green',
    fontSize: 12,
    marginTop: 3,
  },

  button: {
    marginTop: 10,
    backgroundColor: '#0B8F3E',
    paddingVertical: 10,
    borderRadius: 25, 
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});