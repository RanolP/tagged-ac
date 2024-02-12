import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import unocss from '@unocss/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSolidRecommended from 'eslint-plugin-solid/configs/recommended.js';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  { files: ['**/*.{ts,tsx}', 'eslint.config.js', 'lint-staged.config.mjs'] },
  {
    ignores: ['.vinxi', 'dist', '.wrangler'],
  },
  { languageOptions: { parser: typescriptEslintParser } },
  eslintPluginSolidRecommended,
  {
    plugins: { unocss },
    rules: {
      'unocss/order': 'error',
      'unocss/order-attributify': 'error',
    },
  },
  eslintPluginPrettierRecommended,
  {
    plugins: { 'simple-import-sort': eslintPluginSimpleImportSort },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
    },
  },
];
