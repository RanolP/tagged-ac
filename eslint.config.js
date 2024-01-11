import typescriptEslintParser from '@typescript-eslint/parser';
import unocss from '@unocss/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  {
    files: ['**/*.{ts,tsx}'],
  },
  {
    languageOptions: {
      parser: typescriptEslintParser,
    },
  },
  {
    plugins: {
      unocss,
    },
    rules: {
      'unocss/order': 'error',
      'unocss/order-attributify': 'error',
    },
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
  },
];