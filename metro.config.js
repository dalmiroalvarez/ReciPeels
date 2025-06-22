const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add alias resolution for @/ to point to the project root
config.resolver.alias = {
  '@': path.resolve(__dirname),
};

module.exports = config; 