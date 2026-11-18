// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    formatters: true,
  },
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'bun.lock',
      '**/*.md',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'unused-imports/no-unused-vars': 'warn',
    },
  },
)
