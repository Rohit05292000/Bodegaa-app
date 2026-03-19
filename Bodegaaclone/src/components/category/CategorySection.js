import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CategoryCard from './CategoryCard';

const CategorySection = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CategoryCard item={item} />}
      />
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 10,
  },
});