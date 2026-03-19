import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountryCodePicker = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.flag}>🇮🇳</Text>
      <Text style={styles.code}>+91</Text>
    </View>
  );
};

export default CountryCodePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    marginRight: 10,
  },
  flag: {
    fontSize: 18,
    marginRight: 5,
  },
  code: {
    fontSize: 14,
  },
});