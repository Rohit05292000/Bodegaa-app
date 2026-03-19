import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Icon name="person-circle-outline" size={40} color="#000" />
        <Text style={styles.text}>Hi, Guest</Text>
      </View>

      <View style={styles.right}>
        <Icon name="search-outline" size={24} style={styles.icon} />
        <Icon name="notifications-outline" size={24} />
      </View>

      {/* Banner / Slider */}
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://via.placeholder.com/400x120' }} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#e8f5e9',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
  right: {
    flexDirection: 'row',
    position: 'absolute',
    right: 15,
    top: 15,
  },
  icon: {
    marginRight: 15,
  },
  banner: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
});