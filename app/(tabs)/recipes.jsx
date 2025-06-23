import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { fetchRecipesByIngredients } from '../../api/TheMealDB';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING } from '../../utils';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { userName, ingredients } = params;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      if (ingredients) {
        try {
          setLoading(true);
          const ingredientsArray = ingredients.split(',');
          setUserIngredients(ingredientsArray);
          const fetchedRecipes = await fetchRecipesByIngredients(ingredientsArray);
          setRecipes(fetchedRecipes);
        } catch (error) {
          setRecipes([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [ingredients]);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/profile');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Finding the best recipes for you...</Text>
        </View>
      );
    }

    if (recipes.length > 0) {
      return recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      ));
    }

    return (
      <View style={styles.noRecipesCard}>
        <Text style={styles.noRecipesIcon}>🍳</Text>
        <Text style={styles.noRecipesTitle}>
          No Recipes Found
        </Text>
        <Text style={styles.noRecipesText}>
          We couldn't find any recipes with your ingredients. Try adding more or different ones!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLORS.background} 
        translucent={true}
      />
      <SafeAreaView style={styles.safeArea}>
        <Header showBackButton />

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.greetingTitle}>
                Hello, {userName}!
              </Text>
              <View style={styles.headerAccent} />
            </View>
            <Text style={styles.headerSubtitle}>
              Here are the recipes you can make with your ingredients
            </Text>
          </View>

          {userIngredients.length > 0 && !loading && (
            <View style={styles.ingredientsCard}>
              <Text style={styles.ingredientsTitle}>
                Your ingredients:
              </Text>
              <View style={styles.ingredientsList}>
                {userIngredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientTag}>
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.recipesSection}>
            {!loading && (
              <Text style={styles.sectionTitle}>
                {recipes.length > 0 
                  ? `Found ${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} for you`
                  : 'No recipes found with these ingredients'
                }
              </Text>
            )}
            
            {renderContent()}
          </View>

          <View style={styles.spacer} />
        </ScrollView>
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
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  ingredientsCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  ingredientTag: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  ingredientText: {
    fontSize: 14,
    color: COLORS.status.warning.text,
    fontWeight: '500',
  },
  recipesSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  noRecipesCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noRecipesIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  noRecipesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  noRecipesText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  spacer: {
    height: 100,
  },
});

export default Recipes; 