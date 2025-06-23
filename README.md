# ReciPeels 🍳

A React Native mobile application that helps users discover recipes based on the ingredients they have available in their kitchen. Built with Expo Router and integrated with TheMealDB API.

## 📱 Features

### Core Functionality
- **Personalized Experience**: Users enter their name for a personalized cooking journey
- **Ingredient Management**: Add 3-10 ingredients with real-time validation
- **Recipe Discovery**: Find recipes that use all your specified ingredients
- **Recipe Details**: View complete recipe information including ingredients, instructions, prep time, cook time, and servings
- **Interactive UI**: Expandable recipe cards with smooth animations

### User Interface
- **Modern Design**: Clean, intuitive interface with consistent styling
- **Responsive Layout**: Optimized for both iOS and Android
- **Navigation**: Smooth transitions between screens with back button support
- **Loading States**: Proper loading indicators and error handling
- **Social Media Integration**: Placeholder for future social login features

## 🛠️ Technical Features

### Validation System
- **Name Validation**: Minimum 3 characters required
- **Ingredient Validation**: 
  - Minimum 3 characters per ingredient
  - No duplicate ingredients allowed
  - Maximum 10 ingredients limit
  - Real-time validation feedback
- **Counter System**: Dynamic color-coded ingredient counter (red for insufficient, green for optimal, red for maximum)

### Constants & Configuration
- **Color System**: Comprehensive color palette with primary, secondary, accent, and status colors
- **Spacing System**: Consistent spacing values (xs, sm, md, lg, xl, xxl)
- **Border Radius**: Standardized border radius values
- **Shadows**: Platform-specific shadow configurations
- **Status Colors**: Success, warning, error, and max states for UI feedback

### API Integration
- **TheMealDB API**: Free recipe database integration
- **Smart Search**: Finds recipes containing ALL specified ingredients
- **Data Enhancement**: Generates realistic prep time, cook time, servings, and difficulty levels
- **Error Handling**: Graceful fallbacks for API failures

## 📁 Project Structure

```
ReciPeels/
├── app/
│   ├── (tabs)/
│   │   ├── home.jsx          # Welcome screen with name input
│   │   ├── profile.jsx       # Ingredient management screen
│   │   └── recipes.jsx       # Recipe discovery screen
│   ├── components/
│   │   ├── BackButton.jsx    # Navigation back button
│   │   ├── ContinueButton.jsx # Reusable action button
│   │   ├── Header.jsx        # Screen header component
│   │   └── RecipeCard.jsx    # Expandable recipe display
│   └── _layout.jsx           # App layout configuration
├── api/
│   └── TheMealDB.js          # API integration and data processing
├── utils/
│   ├── constants.js          # Design system constants
│   └── index.js              # Utility exports
└── assets/
    └── images/               # App icons and social media logos
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ReciPeels
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

### Alternative: Using Expo Go
1. Install Expo Go app on your mobile device
2. Run `npm start` in the project directory
3. Scan the QR code with Expo Go

## 🔧 Development

### Key Technologies
- **React Native**: Cross-platform mobile development
- **Expo Router**: File-based routing system
- **Expo Vector Icons**: Icon library
- **TheMealDB API**: Recipe data source

### State Management
- Local state with React hooks (useState, useEffect)
- URL parameters for data passing between screens
- Async/await for API calls

### Styling
- StyleSheet for component styling
- Design system with consistent constants
- Platform-specific adjustments for iOS/Android

## 🎯 Potential Improvements

### Features
- **User Authentication**: Social login integration (Google, Facebook, etc.)
- **Recipe Favorites**: Save and organize favorite recipes
- **Shopping Lists**: Generate shopping lists for missing ingredients
- **Recipe Categories**: Filter by cuisine type, difficulty, or dietary restrictions
- **Offline Support**: Cache recipes for offline viewing
- **Recipe Sharing**: Share recipes via social media or messaging
- **Nutritional Information**: Display calories, macros, and nutritional data
- **Cooking Timer**: Built-in timer for recipe steps
- **Voice Commands**: Voice-controlled ingredient addition

### Technical Enhancements
- **State Management**: Implement Redux or Zustand for complex state
- **Database**: Local SQLite database for offline storage
- **Push Notifications**: Recipe reminders and cooking tips
- **Image Optimization**: Lazy loading and caching for recipe images
- **Performance**: Implement React.memo and useMemo for optimization
- **Testing**: Unit tests with Jest and component tests with React Native Testing Library
- **CI/CD**: Automated testing and deployment pipeline
- **Analytics**: User behavior tracking and app performance monitoring

### UI/UX Improvements
- **Dark Mode**: Theme switching capability
- **Accessibility**: Screen reader support and accessibility features
- **Animations**: Enhanced micro-interactions and transitions
- **Customization**: User preferences for UI themes and layouts
- **Tutorial**: Onboarding flow for new users
- **Search**: Advanced search with filters and suggestions

### API Enhancements
- **Multiple APIs**: Integrate additional recipe APIs for more variety
- **Image Recognition**: Camera-based ingredient detection
- **Recipe Recommendations**: AI-powered recipe suggestions
- **User Reviews**: Community ratings and reviews for recipes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the recipe API
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for cross-platform mobile development

---

**ReciPeels** - Making cooking easier, one ingredient at a time! 🍽️
