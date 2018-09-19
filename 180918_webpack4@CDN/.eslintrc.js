module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  rules: {
    'indent': ['error', 2], // 强制一致的缩进
    'quotes': ['error', 'single'], // 强制单引号
    'semi': ['error', 'always'], // 强制语句末尾使用分号
    'no-mixed-spaces-and-tabs': 'error', // 禁止tab和空格混合缩进
    // 'no-console': 'error', // 禁止console
  }
};