## webpack@4.5.0

update_180502

目的：构建多页应用

**文件介绍**

|- webpack.env.js // 获取当前运行环境  
|- webpack.moduleConfig.js // 模块注册  
|- webpack.venderLocal.js // 非 npm 安装的第三方包路径  
|- webpack.config.js // 配置文件，根据 webpack.moduleConfig.js 和 webpack.venderLocal.js 进行动态配置

|- src
    |- common // 共用的js文件，例如http或rem  
    |- lib_ES5 // ES5编写的第三方包  
    |- lib_ES6 // ES6编写的第三方包  
    |- (Home|News) // 项目模块名称，添加新模块可将其作为规范

**USE**

安装 `npm install`

启动 `npm run start`

**切换生产环境**

前往`webpack.env.js`，设置运行环境

PS: 该版本未使用 merge 插件，需要手动修改环境配置文件 webpack.env.js，再运行命令

**第三方包使用规则（重要）**

非 npm 安装的第三方包需要进行以下处理：

前往 webpack.venderLocal.js 文件配置资源路径（配置格式参考该文件的例子）

再前往 webpack.moduleConfig.js 进行模块依赖第三方包注入（将抽离出来的该第三方包引入body标签底部）

PS: 配置完毕后，使用包的方法与 使用 npm 安装的第三方包方法一致 `import x from 'x'`
