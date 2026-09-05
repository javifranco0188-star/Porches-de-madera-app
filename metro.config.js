const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Supabase 2.45 ships browser/React Native entry points. Expo SDK 54 enables
// package exports by default, which can make Metro select the Node.js path of
// @supabase/realtime-js (and therefore ws -> stream/zlib). Disable package
// exports so Metro respects the package browser/React Native mappings.
config.resolver.unstable_enablePackageExports = false;

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  stream: require.resolve('stream-browserify'),
};

module.exports = config;
