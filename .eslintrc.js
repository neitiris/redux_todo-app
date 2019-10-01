module.exports = {
  extends: '@mate-academy/eslint-config-react',
  plugins: ['jest'],
  env: {
    "jest/globals": true
  },
  rules: {
    "jsx-a11y/label-has-associated-control": ['error', {
      assert: 'either',
    }],
  }
};
