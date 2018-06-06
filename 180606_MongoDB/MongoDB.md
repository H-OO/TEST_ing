# MongoDB（window）

## 下载
---
download: `https://www.mongodb.com/download-center?jmp=nav#community`

## 安装
---
无需依赖，可自定义安装路径  
Choose Setup Type => Custom

## 配置
---
* 创建数据目录 c:/data/db
* 创建日志目录 c:/data/log
* 添加配置文件 c:/MongoDB/Server/3.4/mongo.cfg
mongo.cfg 配置内容
```
dbpath=c:\data\db #数据库路径  
logpath=c:\data\log\mongo.log #日志输出文件路径  
logappend=true #错误日志采用追加模式  
journal=true #启用日志文件，默认启用  
quiet=true #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false  
port=27017 #端口号 默认为27017 
```

## 启动MongoDB
---
```
【以管理员身份】打开终端，cd到MongoDB目录
(执行命令↓)
mongod --config c:\MongoDB\Server\3.6\mongo.cfg
(打开浏览器↓)
http://127.0.0.1:27017
(回显↓)
It looks like you are trying to access MongoDB over HTTP on the native driver port.
(表示启动成功)
```

## 创建MongoDB服务
---
```
【以管理员身份】打开终端，cd到MongoDB目录
(创建服务命令↓)
mongod --config c:\MongoDB\Server\3.6\mongo.cfg --install --serviceName MongoDB
(启动服务命令↓)
net start MongoDB
(终端打印↓)
MongoDB 服务正在启动..
MongoDB 服务已经启动成功。
(表示服务创建成功)
```
卸载服务 `mongod --remove --serviceName MongoDB`

## Robo 3T
---
可视化工具  
https://robomongo.org/download

## 操作语法
---
* insert 增
* find 查

* tableName 表名称
* key 键
* value 值
```
/***************_增_***************/
db.tableName.insert({
  key: value
})
```