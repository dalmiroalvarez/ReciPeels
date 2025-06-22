import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { COLORS, SPACING } from '../utils/constants';

export default function RecipesScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLORS.background} 
        translucent={true}
      />
      <SafeAreaView style={styles.safeArea}>
        <Header onBackPress={handleGoBack} />

        <View style={styles.content}>
          <Text style={styles.title}>
            Coming Soon!
          </Text>
          <Text style={styles.subtitle}>
            The recipes page is under construction.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
}); 