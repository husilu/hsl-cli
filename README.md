# hsl-cli
用webpack搭建的vue单页面应用
https://juejin.im/post/5cc55c336fb9a032086dd701 参考的这篇文章 感谢作者

## 参考vue-cli生成的项目，帮我们配置好了哪些功能？

1. ES6代码转换成ES5代码
2. scss/sass/less/stylus转css
3. .vue文件转换成js文件
4. 使用 jpg、png，font等资源文件
5. 自动添加css各浏览器产商的前缀
6. 代码热更新
7. 资源预加载
8. 资源预加载
9. 定义环境变量
10. 区分开发环境打包跟生产环境打包


## 搭建基本环境
1. 安装webpack
```
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

2. npm init 创建package.json
3. 修改package.json的内容
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js --open",
    "build": "webpack --config ./build/webpack.prod.js"
  },
```

4. 创建一个build文件夹
## 开始配置功能
1. 配置ES6/7/8转ES5代码
```
npm install babel-loader @babel/core @babel/preset-env

```
修改webpck.config.js
```
 添加一个loader
module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }]
  }
```
在根目录添加一个babel.config.js 文件
```
module.exports = {
  presets: [
    "@babel/preset-env"
  ]
}

```

2. ES6/7/8 api 转es5
babel-loader只是将es6、7、8的语法转为es5，对新的api不会转换。
可以使用babel-polyfill
```
npm install @babel/polyfill
```

修改webpack.config.js文件，在 entry 中添加 @babel-polyfill

```
entry: {
    main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')] // __dirname表示当前文件所在的目录
  },
```
3.scss转css

```
npm install sass-loader dart-sass css-loader style-loader -D
```
webpack.config.js

```
module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('dart-sass')
          }
        }
      ]
    }]
  }
```
4. postcss实现自动添加css3前缀
```
npm install postcss-loader autoprefixer -D
```
webpack.config.js

```
{
          loader: 'postcss-loader'
        }
```
创建一个postcss.config.js在项目根目录：
```
module.exports = {
  plugins: {
    autoprefixer: {}
  }
}
```
5. 使用html-webpack-html来创建html页面
```
npm install html-webpack-plugin -D
```
创建一个public文件夹，添加一个index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
修改webpack.config.js内容
加上plugins
```
plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
```
6. 配置devServer 热更新功能
```
npm install webpack-dev-server -D
```
修改webpack.config.js
引入

```
const webpack = require('webpack');
```
通过配置 devServer 和 HotModuleReplacementPlugin 插件来实现热更新
```
plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new webpack.NamedModulesPlugin(), 
    new webpack.HotModuleReplacementPlugin() // 这两插件是webpack自带的 引入webpack就可以使用了
  ],
  devServer: {
    hot: true,
    port: 3000,
    contentBase: './dist'
  }
```
7. 配置webpack 打包 图片 媒体 字体等文件
配置webpack.config.js
```
// build/webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  // 省略其它配置 ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    // ...
  ]
}

```
8. 让webpack识别.vue文件
```
npm install vue-loader vue-template-compiler cache-loader thread-loader -D
npm install vue -S
```
修改wepack.config.js
```
// build/webpack.config.js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  // 指定打包模式
  mode: 'development',
  entry: {
    // ...
  },
  output: {
    // ...
  },
  devServer: {
    // ...
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
      // ...
    ]
  },
  plugins: [
    // ...
    new VueLoaderPlugin()
  ]
}

```

9. 定义环境变量
```
plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        VUE_APP_BASE_URL: JSON.stringify('http://localhost:3000')
      }
    }),
]

```
10.dev和pro的区别
```
npm i @intervolga/optimize-cssnano-plugin mini-css-extract-plugin clean-webpack-plugin webpack-merge copy-webpack-plugin -D
```


dev：


```
// 不需要压缩代码
// 需要热更新
// css不需要提取到css文件
// sourceMap

const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
    ]
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})
```


pro：


```
// 压缩代码
// 不需要热更新
// 提取css，压缩css文件
// sourcemap
// 构建前清除上一次构建的内容

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
/*   clean-webpack-plugin 3.0 以上的版本需要使用对象结构  */
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist')
      }
    ]),
    new CleanWebpackPlugin()
  ]
})


```


