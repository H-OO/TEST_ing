# webpack+typescript

**安装**
---
`npm i -D webpack webpack-cli typescript ts-loader`

**起步**
---
目录
```
|- build
    |- webpack.config.js
|- src
    |- test.ts
|- tsconfig.json
```

```json
// tsconfig.js
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

```js
// webpack.config.js
const path = require('path');
const config = {
  mode: 'production',
  entry: {
    test: path.resolve(__dirname, '../src/test.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  }
};
module.exports = config;
```