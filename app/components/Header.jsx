import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../../utils';
import BackButton from './BackButton';

const Header = ({ title, showBackButton = false }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {showBackButton && <BackButton />}
        <Text style={[styles.headerTitle, { marginLeft: showBackButton ? 0 : SPACING.md }]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Platform.OS === 'android' ? 70 : 60,
    paddingTop: Platform.OS === 'android' ? SPACING.lg : 0,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    flex: 1,
  },
});

export default Header; 