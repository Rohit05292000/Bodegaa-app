import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RatingSection({ rating = 0 }) {
  return (
    <View style={styles.container}>
      <Text style={styles.rating}>{rating}</Text>
      <Text>⭐⭐⭐☆☆</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  rating: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});