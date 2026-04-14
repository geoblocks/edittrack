import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  ...tseslint.configs['flat/recommended'],
  {
    rules: {
      'no-console': 0,
      'comma-dangle': 0,
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
      }],
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
];
