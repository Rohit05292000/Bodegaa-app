import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ placeholder }) => {
  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={20} color="#888" />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#888"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    marginVertical: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});