module.exports ={
  configureWebpack: {
    resolve: {
      alias: {
        //'@': 'src' 脚手架内部已经配置过src了 ； 这个vue.config文件会自动和cli3里的vue.config合并
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
