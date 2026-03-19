import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const CategoryItem = ({ item, onPress, isSelected }) => {
  return (
    <View style={styles.container}>
      
      {/* 🔹 Ripple ONLY on circle */}
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#ccc', borderless: false, radius: 40 }}
        style={[
          styles.imageWrapper,
          {
            borderColor: isSelected ? '#2e7d32' : '#e0e0e0',
            borderWidth: isSelected ? 2.5 : 1,
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </Pressable>

      {/* 🔹 Text clickable too */}
      <Pressable onPress={onPress}>
        <Text
          style={[
            styles.text,
            {
              color: isSelected ? '#2e7d32' : '#000',
              fontWeight: isSelected ? '600' : '400',
            },
          ]}
        >
          {item.name}
        </Text>
      </Pressable>

    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    width: 85,
  },

  pressed: {
    opacity: 0.6,
  },

  imageWrapper: {
    width: 80,        
    height: 80,
    borderRadius: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },

  text: {
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
  },
});