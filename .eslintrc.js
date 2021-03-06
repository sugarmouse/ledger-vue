module.exports = {
  root: true,
  env: {
    node: true
  },
  'globals': {
    'RecordItem': true,
    'Tag': true,
    'GroupedRecordItem': true,
    'GroupedList': true,
    'ExtendType': true,
    'TagGroupRecordList': true,
    'TagGroupedRecordItem ': true,
    'Type': true

  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-indent': ['error', 2, {'baseIndent': 1}]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
}
