const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpilation
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // File extensions to resolve
    fallback: {
        "crypto": require.resolve("crypto-browserify"),
      },
  },
};