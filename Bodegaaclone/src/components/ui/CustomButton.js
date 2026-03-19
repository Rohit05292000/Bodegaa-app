import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      android_ripple={{ color: '#d1f2e0' }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});