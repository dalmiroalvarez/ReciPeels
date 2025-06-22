import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../utils/constants';

export default function ContinueButton({ 
  onPress, 
  disabled, 
  text, 
  style 
}) {
  return (
    <TouchableOpacity
      style={[
        styles.continueButton,
        disabled ? styles.continueButtonDisabled : styles.continueButtonActive,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.continueButtonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.lg,
  },
  continueButtonActive: {
    backgroundColor: COLORS.primary,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.input.background,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
}); 