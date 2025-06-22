import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (userName.trim().length < 2) {
      Alert.alert('Error', 'Please enter your name (minimum 2 characters)');
      return;
    }
    
    // Navigate to the food screen with the user's name
    router.push({
      pathname: '/(tabs)/recipes',
      params: { userName: userName.trim() }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Clean header with subtle color accents */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>ReciPeels</Text>
                <View style={styles.logoAccent} />
              </View>
              <Text style={styles.tagline}>
                Discover amazing recipes with ingredients you have
              </Text>
            </View>

            {/* Minimal card design with color accents */}
            <View style={styles.cardContainer}>
              <View style={styles.mainCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.welcomeTitle}>
                    Welcome
                  </Text>
                  <View style={styles.titleAccent} />
                </View>
                <Text style={styles.welcomeSubtitle}>
                  Let's personalize your cooking experience
                </Text>
                
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Your Name</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Sarah, John, Emma..."
                    placeholderTextColor="#9CA3AF"
                    value={userName}
                    onChangeText={setUserName}
                    autoFocus={true}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>
            </View>

            {/* Spacer for bottom button */}
            <View style={styles.spacer} />
          </View>
        </ScrollView>

        {/* Bottom button container */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              userName.trim().length >= 2 ? styles.continueButtonActive : styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={userName.trim().length < 2}
          >
            <Text style={styles.continueButtonText}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '300',
    color: '#374151',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  logoAccent: {
    width: 40,
    height: 3,
    backgroundColor: '#FFB74D',
    borderRadius: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleAccent: {
    width: 24,
    height: 2,
    backgroundColor: '#A7F3D0',
    borderRadius: 1,
  },
  welcomeSubtitle: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 14,
  },
  textInput: {
    width: '100%',
    height: 52,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
  },
  spacer: {
    height: 100,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 24,
    paddingBottom: 34,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFB74D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonActive: {
    backgroundColor: '#FFB74D',
  },
  continueButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
}); 