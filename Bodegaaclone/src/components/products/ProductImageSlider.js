import React, { useState } from 'react';
import { View, Image, FlatList, StyleSheet, Pressable } from 'react-native';

export default function ProductImageSlider({ images = [] }) {
  const [selected, setSelected] = useState(0);

  const imageList = Array.isArray(images) ? images : [images];

  return (
    <View>
      {/* Main Image */}
      <Image
        source={{ uri: imageList[selected] }}
        style={styles.mainImage}
      />

      {/* Thumbnails */}
      <FlatList
        data={imageList}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => setSelected(index)}>
            <Image source={{ uri: item }} style={styles.thumb} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainImage: {
    height: 250,
    borderRadius: 15,
    margin: 15,
  },
  thumb: {
    height: 60,
    width: 60,
    margin: 5,
    borderRadius: 10,
  },
});