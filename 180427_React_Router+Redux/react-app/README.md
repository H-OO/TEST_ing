# React

简介：将Redux与Router进行结合使用

## Before USE

安装依赖 `npm install`

开发环境下修改 `/node_modules/react-scripts/config/webpack.config.dev.js`  
生产环境下修改 `/node_modules/react-scripts/config/webpack.config.prod.js`

```js
// 让loader对sass文件进行打包处理
{
  test: /\.scss$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    require.resolve('sass-loader'),
  ],
},
// 
{
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/], // 【 添加/\.scss$/ 】
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
},
```
