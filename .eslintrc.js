module.exports = {
  plugins: ["react", "prettier"],
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  rules: {
    "react/display-name": "off",
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
