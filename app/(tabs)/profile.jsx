import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ContinueButton from '../components/ContinueButton';
import Header from '../components/Header';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, VALIDATION } from '../utils/constants';
import { getCounterStatus, validateIngredient, validateIngredientCount } from '../utils/validation';

export default function PerfilScreen() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState('');
  const { userName } = useLocalSearchParams();
  const router = useRouter();

  const addFood = () => {
    const validation = validateIngredient(newFood, foods);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }

    const countValidation = validateIngredientCount(foods.length + 1);
    if (!countValidation.isValid) {
      Alert.alert('Maximum Ingredients Reached', countValidation.message);
      return;
    }

    setFoods([...foods, newFood.trim()]);
    setNewFood('');
  };

  const removeFood = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    const validation = validateIngredientCount(foods.length);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message);
      return;
    }
    
    Alert.alert(
      'Perfect! 🎉', 
      `Hello ${userName}, with these ${foods.length} ingredients we can create amazing recipes:\n\n${foods.join(', ')}`,
      [
        { text: 'Continue', onPress: () => console.log('Continue to recipes') }
      ]
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderFoodItem = ({ item, index }) => (
    <View style={styles.foodItem}>
      <View style={styles.foodItemContent}>
        <View style={styles.foodNumber}>
          <Text style={styles.foodNumberText}>{index + 1}</Text>
        </View>
        <Text style={styles.foodText}>{item}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFood(index)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const counterStatus = getCounterStatus(foods.length);
  const isContinueDisabled = foods.length < VALIDATION.MIN_INGREDIENTS;
  const isMaxIngredients = foods.length >= VALIDATION.MAX_INGREDIENTS;
  const canAddMore = newFood.trim().length >= VALIDATION.MIN_INGREDIENT_LENGTH && !isMaxIngredients;

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLORS.background} 
        translucent={true}
      />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          <Header onBackPress={handleGoBack} />

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.greetingTitle}>
                  Hello, {userName}
                </Text>
                <View style={styles.headerAccent} />
              </View>
              <Text style={styles.headerSubtitle}>
                Tell us what ingredients you have available
              </Text>
            </View>

            <View style={styles.counterCard}>
              <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>
                  Added Ingredients
                </Text>
                <View style={[
                  styles.counterBadge,
                  styles[`counterBadge${counterStatus.type.charAt(0).toUpperCase() + counterStatus.type.slice(1)}`]
                ]}>
                  <Text style={[
                    styles.counterText,
                    styles[`counterText${counterStatus.type.charAt(0).toUpperCase() + counterStatus.type.slice(1)}`]
                  ]}>
                    {counterStatus.text}
                  </Text>
                </View>
              </View>
              <Text style={[
                styles.counterHint,
                styles[`counterHint${counterStatus.type.charAt(0).toUpperCase() + counterStatus.type.slice(1)}`]
              ]}>
                {counterStatus.hint}
              </Text>
            </View>

            {foods.length > 0 && (
              <View style={styles.foodsSection}>
                <Text style={styles.foodsSectionTitle}>
                  Your ingredients:
                </Text>
                <FlatList
                  data={foods}
                  renderItem={renderFoodItem}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={false}
                />
              </View>
            )}

            <View style={styles.inputCard}>
              <View style={styles.inputCardHeader}>
                <Text style={styles.inputCardTitle}>
                  Add Ingredient
                </Text>
                <View style={styles.inputCardAccent} />
              </View>
              
              <View style={styles.inputRow}>
                <TextInput
                  style={[
                    styles.foodInput,
                    isMaxIngredients && styles.foodInputDisabled
                  ]}
                  placeholder={isMaxIngredients ? "Maximum ingredients reached" : "e.g., tomato, chicken, rice..."}
                  placeholderTextColor={COLORS.text.placeholder}
                  value={newFood}
                  onChangeText={setNewFood}
                  autoCapitalize="words"
                  autoCorrect={false}
                  onSubmitEditing={addFood}
                  returnKeyType="done"
                  editable={!isMaxIngredients}
                />
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    canAddMore ? styles.addButtonActive : styles.addButtonDisabled
                  ]}
                  onPress={addFood}
                  disabled={!canAddMore}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputHint}>
                {isMaxIngredients 
                  ? "Maximum ingredients reached" 
                  : "Press Enter or the + button to add the ingredient"
                }
              </Text>
            </View>

            <View style={styles.spacer} />
          </ScrollView>

          <View style={styles.bottomContainer}>
            <ContinueButton
              onPress={handleContinue}
              disabled={isContinueDisabled}
              text={isContinueDisabled 
                ? `Add ${VALIDATION.MIN_INGREDIENTS - foods.length} more ingredient${VALIDATION.MIN_INGREDIENTS - foods.length !== 1 ? 's' : ''}`
                : 'Find Recipes!'
              }
            />
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  headerAccent: {
    width: 32,
    height: 2,
    backgroundColor: COLORS.accent,
    borderRadius: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  counterCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterLabel: {
    color: COLORS.text.primary,
    fontWeight: '500',
    fontSize: 16,
  },
  counterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  counterBadgeSuccess: {
    backgroundColor: COLORS.status.success.background,
  },
  counterBadgeWarning: {
    backgroundColor: COLORS.status.warning.background,
  },
  counterBadgeMax: {
    backgroundColor: COLORS.status.max.background,
  },
  counterText: {
    fontWeight: '600',
  },
  counterTextSuccess: {
    color: COLORS.status.success.text,
  },
  counterTextWarning: {
    color: COLORS.status.warning.text,
  },
  counterTextMax: {
    color: COLORS.status.max.text,
  },
  counterHint: {
    fontSize: 14,
    marginTop: SPACING.sm,
  },
  counterHintSuccess: {
    color: COLORS.status.success.hint,
  },
  counterHintWarning: {
    color: COLORS.status.warning.hint,
  },
  counterHintMax: {
    color: COLORS.status.max.hint,
  },
  foodsSection: {
    marginBottom: SPACING.lg,
  },
  foodsSectionTitle: {
    color: COLORS.text.primary,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 12,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  foodItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  foodNumber: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  foodNumberText: {
    color: COLORS.status.warning.text,
    fontWeight: '600',
    fontSize: 12,
  },
  foodText: {
    color: COLORS.text.primary,
    fontWeight: '400',
    fontSize: 16,
    flex: 1,
  },
  removeButton: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.status.error.background,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: COLORS.status.error.text,
    fontWeight: '600',
  },
  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputCardHeader: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  inputCardTitle: {
    color: COLORS.text.primary,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 6,
  },
  inputCardAccent: {
    width: 20,
    height: 2,
    backgroundColor: COLORS.secondary,
    borderRadius: 1,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  foodInput: {
    flex: 1,
    height: 52,
    backgroundColor: COLORS.input.background,
    borderWidth: 1,
    borderColor: COLORS.input.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '400',
    marginRight: 12,
  },
  foodInputDisabled: {
    backgroundColor: COLORS.input.background,
    color: COLORS.text.placeholder,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.lg,
  },
  addButtonActive: {
    backgroundColor: COLORS.primary,
  },
  addButtonDisabled: {
    backgroundColor: COLORS.input.background,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
  },
  inputHint: {
    color: COLORS.text.secondary,
    fontSize: 14,
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