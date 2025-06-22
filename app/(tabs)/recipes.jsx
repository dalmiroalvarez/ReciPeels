import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RecetasScreen() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState('');
  const { userName } = useLocalSearchParams();
  const router = useRouter();

  const addFood = () => {
    if (newFood.trim().length < 2) {
      Alert.alert('Error', 'Please enter a valid food item (minimum 2 characters)');
      return;
    }

    if (foods.some(food => food.toLowerCase() === newFood.trim().toLowerCase())) {
      Alert.alert('Error', 'This food item has already been added');
      return;
    }

    setFoods([...foods, newFood.trim()]);
    setNewFood('');
  };

  const removeFood = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (foods.length < 3) {
      Alert.alert('Error', `You need to add at least 3 food items. You have ${foods.length} of 3.`);
      return;
    }
    
    // Here you can navigate to the next screen or show recipes
    Alert.alert(
      'Perfect! 🎉', 
      `Hello ${userName}, with these ${foods.length} ingredients we can create amazing recipes:\n\n${foods.join(', ')}`,
      [
        { text: 'Continue', onPress: () => console.log('Continue to recipes') }
      ]
    );
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header with color accent */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>
                Hello, {userName}
              </Text>
              <View style={styles.headerAccent} />
            </View>
            <Text style={styles.headerSubtitle}>
              Tell us what ingredients you have available
            </Text>
          </View>

          {/* Food counter with enhanced colors */}
          <View style={styles.counterCard}>
            <View style={styles.counterRow}>
              <Text style={styles.counterLabel}>
                Added Ingredients
              </Text>
              <View style={[
                styles.counterBadge,
                foods.length >= 3 ? styles.counterBadgeSuccess : styles.counterBadgeWarning
              ]}>
                <Text style={[
                  styles.counterText,
                  foods.length >= 3 ? styles.counterTextSuccess : styles.counterTextWarning
                ]}>
                  {foods.length}/3
                </Text>
              </View>
            </View>
            {foods.length < 3 && (
              <Text style={styles.counterHint}>
                You need to add at least 3 ingredients to continue
              </Text>
            )}
          </View>

          {/* Food list */}
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

          {/* Input to add food with enhanced styling */}
          <View style={styles.inputCard}>
            <View style={styles.inputCardHeader}>
              <Text style={styles.inputCardTitle}>
                Add Ingredient
              </Text>
              <View style={styles.inputCardAccent} />
            </View>
            
            <View style={styles.inputRow}>
              <TextInput
                style={styles.foodInput}
                placeholder="e.g., tomato, chicken, rice..."
                placeholderTextColor="#9CA3AF"
                value={newFood}
                onChangeText={setNewFood}
                autoCapitalize="words"
                autoCorrect={false}
                onSubmitEditing={addFood}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={[
                  styles.addButton,
                  newFood.trim().length >= 2 ? styles.addButtonActive : styles.addButtonDisabled
                ]}
                onPress={addFood}
                disabled={newFood.trim().length < 2}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputHint}>
              Press Enter or the + button to add the ingredient
            </Text>
          </View>

          {/* Continue button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              foods.length >= 3 ? styles.continueButtonActive : styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={foods.length < 3}
          >
            <Text style={styles.continueButtonText}>
              {foods.length >= 3 ? 'Find Recipes!' : `Add ${3 - foods.length} more ingredient${3 - foods.length !== 1 ? 's' : ''}`}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  headerAccent: {
    width: 32,
    height: 2,
    backgroundColor: '#FEF3C7',
    borderRadius: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  counterCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterLabel: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 16,
  },
  counterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  counterBadgeSuccess: {
    backgroundColor: '#D1FAE5',
  },
  counterBadgeWarning: {
    backgroundColor: '#FEF3C7',
  },
  counterText: {
    fontWeight: '600',
  },
  counterTextSuccess: {
    color: '#065F46',
  },
  counterTextWarning: {
    color: '#92400E',
  },
  counterHint: {
    color: '#F59E0B',
    fontSize: 14,
    marginTop: 8,
  },
  foodsSection: {
    marginBottom: 24,
  },
  foodsSectionTitle: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 12,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  foodItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  foodNumber: {
    width: 28,
    height: 28,
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  foodNumberText: {
    color: '#92400E',
    fontWeight: '600',
    fontSize: 12,
  },
  foodText: {
    color: '#374151',
    fontWeight: '400',
    fontSize: 16,
    flex: 1,
  },
  removeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  inputCardHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  inputCardTitle: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 6,
  },
  inputCardAccent: {
    width: 20,
    height: 2,
    backgroundColor: '#A7F3D0',
    borderRadius: 1,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  foodInput: {
    flex: 1,
    height: 52,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
    marginRight: 12,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFB74D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonActive: {
    backgroundColor: '#FFB74D',
  },
  addButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  inputHint: {
    color: '#6B7280',
    fontSize: 14,
  },
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
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