import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING } from '../../utils';
import ContinueButton from '../components/ContinueButton';
import Header from '../components/Header';

const MIN_INGREDIENTS = 3;
const MAX_INGREDIENTS = 10;
const MIN_LENGTH = 3;

const Profile = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { userName } = params;

  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const getCounterColor = () => {
    if (ingredients.length < MIN_INGREDIENTS) return COLORS.status.error.text;
    if (ingredients.length >= MIN_INGREDIENTS && ingredients.length <= MAX_INGREDIENTS) return COLORS.status.success.text;
    return COLORS.status.error.text;
  };

  const handleAddIngredient = () => {
    const trimmedIngredient = ingredient.trim().toLowerCase();
    if (trimmedIngredient.length < MIN_LENGTH) {
      Alert.alert('Too short!', `Ingredients must be at least ${MIN_LENGTH} characters long.`);
      return;
    }
    if (ingredients.includes(trimmedIngredient)) {
      Alert.alert('Already added!', 'You have already added this ingredient.');
      return;
    }
    if (ingredients.length >= MAX_INGREDIENTS) {
      Alert.alert('Limit reached!', `You can only add up to ${MAX_INGREDIENTS} ingredients.`);
      return;
    }
    setIngredients([...ingredients, trimmedIngredient]);
    setIngredient('');
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleContinue = () => {
    if (ingredients.length < MIN_INGREDIENTS) {
      Alert.alert('Add more!', `Please add at least ${MIN_INGREDIENTS} ingredients to find recipes.`);
      return;
    }
    router.push({
      pathname: '/(tabs)/recipes',
      params: { ingredients: ingredients.join(','), userName },
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderIngredientItem = ({ item, index }) => (
    <View style={styles.ingredientItem}>
      <View style={styles.ingredientItemContent}>
        <View style={styles.ingredientNumber}>
          <Text style={styles.ingredientNumberText}>{index + 1}</Text>
        </View>
        <Text style={styles.ingredientText}>{item}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveIngredient(index)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const isContinueDisabled = ingredients.length < MIN_INGREDIENTS;
  const isMaxIngredients = ingredients.length >= MAX_INGREDIENTS;
  const canAddMore = ingredient.trim().length >= MIN_LENGTH && !isMaxIngredients;

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
          <Header showBackButton />

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
                <View style={styles.counterBadge}>
                  <Text style={[styles.counterText, { color: getCounterColor() }]}>
                    {ingredients.length} / {MAX_INGREDIENTS}
                  </Text>
                </View>
              </View>
              <Text style={styles.counterHint}>
                {ingredients.length < MIN_INGREDIENTS 
                  ? `You need to add at least ${MIN_INGREDIENTS} ingredients to continue`
                  : ingredients.length >= MAX_INGREDIENTS
                  ? 'Maximum ingredients reached'
                  : 'You can add more ingredients or continue'
                }
              </Text>
            </View>

            {ingredients.length > 0 && (
              <View style={styles.ingredientsSection}>
                <Text style={styles.ingredientsSectionTitle}>
                  Your ingredients:
                </Text>
                <FlatList
                  data={ingredients}
                  renderItem={renderIngredientItem}
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
                    styles.ingredientInput,
                    isMaxIngredients && styles.ingredientInputDisabled
                  ]}
                  placeholder={isMaxIngredients ? "Maximum ingredients reached" : "e.g., tomato, chicken, rice..."}
                  placeholderTextColor={COLORS.text.placeholder}
                  value={ingredient}
                  onChangeText={setIngredient}
                  autoCapitalize="words"
                  autoCorrect={false}
                  onSubmitEditing={handleAddIngredient}
                  returnKeyType="done"
                  editable={!isMaxIngredients}
                />
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    canAddMore ? styles.addButtonActive : styles.addButtonDisabled
                  ]}
                  onPress={handleAddIngredient}
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
                ? `Add ${MIN_INGREDIENTS - ingredients.length} more ingredient${MIN_INGREDIENTS - ingredients.length !== 1 ? 's' : ''}`
                : 'Find Recipes'
              }
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

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
    backgroundColor: COLORS.background,
  },
  counterText: {
    fontWeight: '600',
  },
  counterHint: {
    fontSize: 14,
    marginTop: SPACING.sm,
    color: COLORS.text.secondary,
  },
  ingredientsSection: {
    marginBottom: SPACING.lg,
  },
  ingredientsSectionTitle: {
    color: COLORS.text.primary,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 12,
  },
  ingredientItem: {
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
  ingredientItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ingredientNumber: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ingredientNumberText: {
    color: COLORS.status.warning.text,
    fontWeight: '600',
    fontSize: 12,
  },
  ingredientText: {
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
  ingredientInput: {
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
  ingredientInputDisabled: {
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

export default Profile; 