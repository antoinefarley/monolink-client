module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    // 'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: 'tsconfig.json',
    sourceType: 'module',
    emcaFeatures: { jsx: true },
    ecmaVersion: 6,
  },
  settings: { react: { version: 'detect' } },
  plugins: [
    'eslint-plugin-react',
    '@typescript-eslint',
    'react-hooks',
    // 'prettier',
    'unused-imports',
    'simple-import-sort',
  ],
  rules: {
    // Explicit module boundary
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // React
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    // Prettier
    // "prettier/prettier": "error",
    // '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-unused-var': 'off',
    // Unused imports
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // Sort imports
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
};
