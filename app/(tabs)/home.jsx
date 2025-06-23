import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING } from '../../utils';
import ContinueButton from '../components/ContinueButton';

const MIN_NAME_LENGTH = 3;

const Home = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (userName.trim().length < MIN_NAME_LENGTH) {
      Alert.alert('Invalid Name', `Please enter a name with at least ${MIN_NAME_LENGTH} characters.`);
      return;
    }
    router.push({
      pathname: '/(tabs)/profile',
      params: { userName: userName.trim() },
    });
  };

  const isContinueDisabled = userName.trim().length < MIN_NAME_LENGTH;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>ReciPeels</Text>
                <View style={styles.logoAccent} />
              </View>
              <Text style={styles.tagline}>
                Discover amazing recipes with ingredients you have
              </Text>
            </View>

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
                    placeholderTextColor={COLORS.text.placeholder}
                    value={userName}
                    onChangeText={setUserName}
                    autoFocus={true}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.socialLoginContainer}>
                <Text style={styles.socialLoginText}>Or sign up with</Text>
                <View style={styles.socialIconsContainer}>
                  <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image source={require('../../assets/images/google-logo.png')} style={styles.socialIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image source={require('../../assets/images/instagram-logo.png')} style={styles.socialIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image source={require('../../assets/images/facebook-logo.png')} style={styles.socialIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image source={require('../../assets/images/x-logo.png')} style={styles.socialIcon} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.spacer} />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <ContinueButton
            onPress={handleContinue}
            disabled={isContinueDisabled}
            text="Get Started"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '300',
    color: COLORS.text.primary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  logoAccent: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.text.secondary,
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
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  titleAccent: {
    width: 24,
    height: 2,
    backgroundColor: COLORS.secondary,
    borderRadius: 1,
  },
  welcomeSubtitle: {
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
  inputSection: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    color: COLORS.text.primary,
    fontWeight: '500',
    marginBottom: SPACING.sm,
    fontSize: 14,
  },
  textInput: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.input.background,
    borderWidth: 1,
    borderColor: COLORS.input.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '400',
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  socialLoginText: {
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
    fontSize: 14,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  spacer: {
    height: 100,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingBottom: 34,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default Home; 