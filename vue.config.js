module.exports = {
  // 是否開啟 ESlint 檢測
  lintOnSave: true,
  devServer: {
    host: 'localhost',
    port: 8080
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/f2e-tourism/'
    : '/'
}
