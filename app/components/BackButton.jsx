import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BackButton({ onPress, style }) {
  return (
    <TouchableOpacity style={[styles.backButton, style]} onPress={onPress}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '400',
  },
}); 