import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { reactRefresh } from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
    },
  },
  reactRefresh.configs.vite(),
  {
    files: ['**/*.tsx'],
    ...jsxA11y.flatConfigs.recommended,
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // 入力欄に打つしかないアプリなので、開いたら入力欄にいるのは意図どおり。
      // 部品（Input / TaskInput）に渡すところは見ず、DOM に付ける Input.tsx だけで断る
      'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
      // list-style: none の ul は Safari の VoiceOver がリストと読まないので role を明示する
      'jsx-a11y/no-redundant-roles': ['error', { ul: ['list'] }],
    },
  },
)
