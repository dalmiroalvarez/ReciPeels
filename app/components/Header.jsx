import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import BackButton from './BackButton';

export default function Header({ onBackPress }) {
  return (
    <View style={styles.headerContainer}>
      <BackButton onPress={onBackPress} />
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 44 : 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  headerSpacer: {
    width: 32,
  },
}); 