module.exports = {
  extends: ['airbnb-typescript', 'airbnb-typescript-prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // 0: false, 1: warning, 2: error
    'global-require': 0,
    'for-direction': 2, // for 루프가 무한대로 실행되는 것을 방지
    'no-unused-vars': 2,
    'no-undef': 2,
    'no-console': 2,
    'no-empty': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-unreachable': 2,
    'react/jsx-key': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-vars': 2,
    'react/no-children-prop': 2,
    'react/no-deprecated': 2, // react version 감지하여 deprecated 된 함수 경고
    'react/no-direct-mutation-state': 2, // state 를 직접 바꾸지 않게하기 위한 옵션
    'react/no-is-mounted': 2,
    'react/no-render-return-value': 2,
    'react/no-unknown-property': 2,
    'react/require-render-return': 2, // render method 를 작성할때 return 이 없으면 경고
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'react/object-curly-newline': 0,
    'react/destructuring-assignment': 1,
    'object-curly-newline': 0,
    'arrow-body-style': 1,
    'react/jsx-props-no-spreading': 1,
    'operator-linebreak': 0,
    'no-unused-expressions': 1,
    radix: 0,
    'no-underscore-dangle': 0,
    'array-callback-return': 1,
    'import/no-cycle': 1,
    'no-param-reassign': 1,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ],
  },
  globals: {
    test: true,
    expect: true,
    describe: true,
    it: true,
    native: true,
    webkit: true,
    jest: true,
  },
};
