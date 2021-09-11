# Dev Environment

## ESLint

### Install

```bash
yarn add eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort eslint-plugin-unused-imports @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### .eslintrc.js

```javascript
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    emcaFeatures: { jsx: true },
    ecmaVersion: 6,
  },
  settings: { react: { version: "detect" } },
  plugins: [
    "eslint-plugin-react",
    "@typescript-eslint",
    "react-hooks",
    "prettier",
    "unused-imports",
    "simple-import-sort",
  ],
  rules: {
    // Explicit module boundary
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // React
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    // Prettier
    "prettier/prettier": "error",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-var": "off",
    // Unused imports
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    // Sort imports
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
```

### package.json

```json
{
  "scripts": {
    "lint": "eslint 'src/**/*.{ts,tsx}'",
    "lint:fix": "eslint 'src/**/*.{ts,tsx}' --fix"
  }
}
```

## Prettier

### Install

```bash
yarn add prettier
```

### .prettierrc

```json
{
  "parser": "typescript",
  "printWidth": 80,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

### package.json

```json
{
  "scripts": {
    "prettier": "prettier 'src/**/*.{ts,tsx}'",
    "prettier:fix": "prettier --write 'src/**/*.{ts,tsx}'"
  }
}
```

## react-app-rewired with import resolutions

### Install

```bash
yarn add react-app-rewired tsconfig-paths-webpack-plugin
```

### .config-overrides.js

```javascript
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = function override(config, env) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "tsconfig.paths.json",
        }),
      ],
    },
  };
};
```

### package.json

```json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject",
  }
}
```

### .tsconfig.paths.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@src": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```
