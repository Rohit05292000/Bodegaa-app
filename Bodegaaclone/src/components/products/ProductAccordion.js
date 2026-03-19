import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ProductAccordion({ title, content }) {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.box}>
      <Pressable onPress={() => setOpen(!open)}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>

      {open && <Text>{content}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: { fontWeight: 'bold' },
});