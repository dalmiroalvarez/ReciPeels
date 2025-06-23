import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING } from '../../utils';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.title}</Text>
          <MaterialIcons name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#333" />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>Servings: {recipe.servings}</Text>
          <Text style={styles.detailText}>Prep: {recipe.prepTime}</Text>
          <Text style={styles.detailText}>Cook: {recipe.cookTime}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientText}>• {ingredient}</Text>
          ))}

          <Text style={styles.contentTitle}>Instructions:</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} style={styles.instructionText}>{index + 1}. {instruction}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  content: {
    marginTop: SPACING.md,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  ingredientText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
}); 