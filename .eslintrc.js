module.exports = {
  root: true,
  extends: ["eslint:recommended", "@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
  overrides: [
    {
      files: ["**/*.tsx", "**/*.jsx"],
      extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
      plugins: ["react", "react-hooks"],
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
      },
    },
  ],
};
