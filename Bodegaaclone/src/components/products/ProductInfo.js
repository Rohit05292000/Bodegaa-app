import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductInfo({ product }) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.stock}>In stock</Text>

      <Text style={styles.delivery}>Estimated Delivery: 10 mins</Text>

      <Text>Net Qty: {product?.weight}</Text>

      <View style={styles.row}>
        <Text style={styles.old}>₹{product?.mrp}</Text>
        <Text style={styles.price}> ₹{product?.price}</Text>
      </View>

      <Text style={styles.descTitle}>Description:</Text>
      <Text>{product?.name}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  stock: { color: 'green' },
  delivery: {
    backgroundColor: '#e8f5e9',
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  row: { flexDirection: 'row' },
  old: { textDecorationLine: 'line-through' },
  price: { color: 'green', fontWeight: 'bold' },
  descTitle: { marginTop: 10, fontWeight: 'bold' },
});