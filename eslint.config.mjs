import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import loveConfig from 'eslint-config-love';
import eslintPrettier from 'eslint-config-prettier';

export default [
  loveConfig,
  eslintPrettier,
  {
    ignores: ['eslint.config.mjs', 'jest.config.cjs', 'dist', 'coverage', 'node_modules', '.angular', '**/*.spec.ts', '**/*.test.ts'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
    rules: {
      'no-console': 'off',
      'linebreak-style': 'off',
      'no-plusplus': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
];
