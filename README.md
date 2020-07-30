# 虎牙小程序2020

虎牙小程序比赛文档与源代码：弹幕情绪分析与可视化

## 云服务器配置

[实例 - 云服务器 - 控制台](https://console.cloud.tencent.com/cvm/instance/detail?searchParams=rid%3D1&rid=1&id=ins-97s4k0jy)

云服务器SSH链接：[云服务器 使用 SSH 登录 Linux 实例 - 操作指南 - 文档中心 - 腾讯云](https://cloud.tencent.com/document/product/213/35700)

conda 安装：[conda的安装与使用（2020-07-08更新） - 简书](https://www.jianshu.com/p/edaa744ea47d)

conda create --name env python==3.7

jupyter notebook 安装：sudo apt install python3-pip; pip3 install --upgrade pip ;pip3 install jupyter

[远程访问服务器Jupyter Notebook的两种方法 - 简书](https://www.jianshu.com/p/8fc3cd032d3c)

## github使用

[远程仓库 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600/896954117292416)

[基于python的git管理 - Google 搜索](https://www.google.com.hk/search?q=%E5%9F%BA%E4%BA%8Epython%E7%9A%84git%E7%AE%A1%E7%90%86)

[使用 Python 操作 Git 版本库 - GitPython - baiyangcao - 博客园](https://www.cnblogs.com/baiyangcao/p/gitpython.html)

## 后端

cd ~/miniconda3/bin/;. ./activate;conda activate env;cd ;jupyter notebook

[Home Page - Select or create a notebook](http://106.52.117.231:8890/tree?)

cd ~/miniconda3/bin/;. ./activate;conda activate env;cd ~/huya-ext-2020/server-python;python main.py

### 环境搭建

- [小游戏开发指南 - 虎牙小程序开发文档](https://dev.huya.com/docs/#/game/index)
- [简介 - 虎牙小程序开发文档](https://dev.huya.com/docs/#/./getting-started)
- [林绍钦颜值直播_林绍钦视频直播 - 虎牙直播](https://www.huya.com/22751564)
- [虎牙小程序开发者中心](https://ext.huya.com/#/ext/rce7wayl)
- [虎牙小程序应用商店](https://appstore.huya.com/#/i)
- [SDK文档 - 虎牙小程序开发文档](https://dev.huya.com/docs#/sdk/SDK%E6%96%87%E6%A1%A3)

```bash
pip install tencentcloud-sdk-python
pip install pandas
sudo pip3 install sanic
sudo pip3 install PyJWT
```

```js
  "extId": "vd6316rc"
```

```py
# src根目录下面创建：local.py local.py可以不提交到代码仓库，避免泄密
class HyextConfig(object):
    HUYA_APPID = 'xxxx'
    HUYA_JWT_SECRET_KEY = 'xxxx'
```

<!-- 编辑 `main.py`, 把远程调试代码取消注释：
`sudo pip3 install websocket-client`

```py
# import ptvsd
# ptvsd.enable_attach(address = ('localhost', 5678))
# ptvsd.wait_for_attach()
``` -->

### 生成测试用的jwt的方法

进入 src 目录，执行：
`python3 test/jwt_test.py`

会输出两个jwt字符串，一个主播端，一个观众端

小游戏获得用户鉴权信息

- jwt：
  - 头部header
  - 载荷payload
  - 签名signature，包括roomid userid

websocket hyExt.WebSocket ws:// /?jwt=xxx (自动追加，在和虎牙对接后不需要手动添加)

### websocket调试

- [Chrome websocket调试插件](https://www.ijidi.cn/crx-download/pfdhoblngboilpfeibdedpjgfnlcodoo-013.html)
- [Web Socket Testing](chrome-extension://fgponpodhbmadfljofbimhhlengambbn/index.html)

websocket url格式：

- appid:4e7d7f42cad63759
- secret_key:8ab04dc8a43a325a4eb10efef299760f

<!-- 主播jwt:
encoded payload:{'creator': 'DEV', 'role': 'P', 'profileId': '10000', 'extId': 'extId', 'roomId': '22751564', 'userId': '10000', 'iat': 1595468723, 'exp': 1598060723, 'appId': '4e7d7f42cad63759'} jwt:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdG9yIjoiREVWIiwicm9sZSI6IlAiLCJwcm9maWxlSWQiOiIxMDAwMCIsImV4dElkIjoiZXh0SWQiLCJyb29tSWQiOiIyMjc1MTU2NCIsInVzZXJJZCI6IjEwMDAwIiwiaWF0IjoxNTk1NDY4NzIzLCJleHAiOjE1OTgwNjA3MjMsImFwcElkIjoiNGU3ZDdmNDJjYWQ2Mzc1OSJ9.Pt3Nj5NH4OKZGqlhPeKhzoOAVZ-Crj5H1dGjwckokhI
观众jwt:
encoded payload:{'creator': 'DEV', 'role': 'U', 'profileId': 'jm6L3RAw1dtSrfGOTxpB', 'extId': 'extId', 'roomId': '22751564', 'userId': '20000', 'iat': 1595468723, 'exp': 1598060723, 'appId': '4e7d7f42cad63759'} jwt:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdG9yIjoiREVWIiwicm9sZSI6IlUiLCJwcm9maWxlSWQiOiJqbTZMM1JBdzFkdFNyZkdPVHhwQiIsImV4dElkIjoiZXh0SWQiLCJyb29tSWQiOiIyMjc1MTU2NCIsInVzZXJJZCI6IjIwMDAwIiwiaWF0IjoxNTk1NDY4NzIzLCJleHAiOjE1OTgwNjA3MjMsImFwcElkIjoiNGU3ZDdmNDJjYWQ2Mzc1OSJ9.0Byo7Y011EqOgIGI1mZ2MaGvCGLOCE7OIgaLZI5zn2k -->

- [主播端测试用链接](ws://106.52.117.231:9090/ws?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdG9yIjoiREVWIiwicm9sZSI6IlAiLCJwcm9maWxlSWQiOiIxMDAwMCIsImV4dElkIjoiZXh0SWQiLCJyb29tSWQiOiIyMjc1MTU2NCIsInVzZXJJZCI6IjEwMDAwIiwiaWF0IjoxNTk1NDY4NzIzLCJleHAiOjE1OTgwNjA3MjMsImFwcElkIjoiNGU3ZDdmNDJjYWQ2Mzc1OSJ9.Pt3Nj5NH4OKZGqlhPeKhzoOAVZ-Crj5H1dGjwckokhI)

- [用户端试用链接](ws://106.52.117.231:9090/ws?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdG9yIjoiREVWIiwicm9sZSI6IlUiLCJwcm9maWxlSWQiOiJqbTZMM1JBdzFkdFNyZkdPVHhwQiIsImV4dElkIjoiZXh0SWQiLCJyb29tSWQiOiIyMjc1MTU2NCIsInVzZXJJZCI6IjIwMDAwIiwiaWF0IjoxNTk1NDY4NzIzLCJleHAiOjE1OTgwNjA3MjMsImFwcElkIjoiNGU3ZDdmNDJjYWQ2Mzc1OSJ9.0Byo7Y011EqOgIGI1mZ2MaGvCGLOCE7OIgaLZI5zn2k)

### ws 数据包格式

`{"protocol":100,"payload":"{}"}`

[协议具体内容](server-python/logic/protocol.py)

## 前端

构建能够通信的简单前端页面：

pixi.js框架：

[小游戏开发指南 - 虎牙小程序开发文档](https://dev.huya.com/docs/#/game/index)

[miniapp/main.js 基于pixijs的前端demo](https://github.com/huya-ext/miniapp/blob/ed805fe78d/examples/game-common-demo-a/client-pixi-js)

[【教程】使用webpack搭建pixi.js开发环境 - pixijs游戏开发 - SegmentFault 思否](https://segmentfault.com/a/1190000021724296)

<!-- React框架：

[React 元素渲染 | 菜鸟教程](https://www.runoob.com/react/react-rendering-elements.html)

[技术栈 - 虎牙小程序开发文档](http://dev.huya.com/docs#/base/stack)

代码分为viewer和streamer两个版本

index.js：观众端的入口文件
index_streamer.js：主播端的入口文件

执行顺序 index -> App(实例) -->

## 后端测试

情绪分类功能测试：

- 后端启动、前端主播建立链接
- [林绍钦颜值直播_林绍钦视频直播 - 虎牙直播](https://www.huya.com/22751564)
- 弹幕输入：
  - 主播真厉害
  - 主播不行啊
  - 牛逼
  - 哈哈哈哈哈
  - 哈哈
- 前端传入：{"protocol": 111,"payload": "{}"}
- 后端返回：{"protocol": 211, "payload": "{}"}
- 前端传入：{"protocol": 112, "payload": "{0.1}"}
- 弹幕输入：
  - 主播真厉害哦哦哦哦哦哦哦哦哦哦
  - 主播不行啊
  - 牛逼
  - 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
  - 哈哈
- 前端传入：{"protocol": 111,"payload": "{}"}
- 后端返回：{"protocol": 211, "payload": "{}"}

统计功能测试：

- 后端启动、前端主播建立链接
- [林绍钦颜值直播_林绍钦视频直播 - 虎牙直播](https://www.huya.com/22751564)

- {"protocol": 121,"payload": "{1:'yes',2:'no',3:'undefine'}"}
- 弹幕输入：
  - yes
  - yes!
  - 是
  - yeeeees
  - no
  - NO
  - undefine
- {"protocol": 122,"payload": "{}"}
- 弹幕输入yes
- {"protocol": 122,"payload": "{}"}
- {"protocol": 123,"payload": "{}"}
- 弹幕输入yes
- {"protocol": 122,"payload": "{}"}