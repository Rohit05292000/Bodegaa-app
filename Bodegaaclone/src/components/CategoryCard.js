import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function CategoryCard({ title, image }) {
  return (
    <View style={styles.card}>
      
      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      {/* Image */}
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Button */}
      <Pressable style={styles.button}>
        <Text style={styles.btnText}>Shop Now →</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 12,
    marginRight: 15,
    elevation: 3,
  },

  title: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
  },

  image: {
    height: 90,
    width: '100%',
  },

  button: {
    marginTop: 10,
    backgroundColor: '#0B8F3E',
    paddingVertical: 8,
    borderRadius: 10,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
});