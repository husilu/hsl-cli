module.exports = {
  presets: [
    [
      "@babel/preset-env"
    ]
  ],
  plugins: [
     // 添加这个
    '@babel/plugin-syntax-dynamic-import'
  ]
}
