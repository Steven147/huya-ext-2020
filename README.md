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

## 后端

### 环境搭建

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

编辑 `main.py`, 把远程调试代码取消注释：
`sudo pip3 install websocket-client`

```py
# import ptvsd
# ptvsd.enable_attach(address = ('localhost', 5678))
# ptvsd.wait_for_attach()
```

进入src：`cd server-python`
执行：`python3 main.py`

### 生成测试用的jwt的方法

进入 src 目录，执行：
`python3 test/jwt_test.py`

会输出两个jwt字符串，一个主播端，一个观众端

小游戏获得用户鉴权信息

jwt：头部header 载荷payload 签名signature，包括roomid userid

websocket hyExt.WebSocket ws:// /?jwt=xxx (自动追加)

前端调用 hyExt.context.getUserInfo

观众、主播端都是依附在服务器上

### websocket调试
Chrome websocket调试插件：https://www.ijidi.cn/crx-download/pfdhoblngboilpfeibdedpjgfnlcodoo-013.html

websocket url格式：

`ws://127.0.0.1:9090/ws?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdG9yIjoiREVWIiwicm9sZSI6IlAiLCJwcm9maWxlSWQiOiIxMDAwMCIsImV4dElkIjoiZXh0SWQiLCJyb29tSWQiOiIxMDAwIiwidXNlcklkIjoiMTAwMDAiLCJpYXQiOjE1OTUwNjY1MjQsImV4cCI6MTU5NzY1ODUyNCwiYXBwSWQiOiJ1ZDgwMTM4MjY3MzEyOWRjIn0.ScHg_c6Xs5FeH1DnQFEI1bVyfaEcmb5Lnq9gwzNhHno`

### ws 数据包格式

`{"protocol":100,"payload":"{}"}`

## 前端

构建能够通信的简单前端页面：

pixi.js框架：

[小游戏开发指南 - 虎牙小程序开发文档](https://dev.huya.com/docs/#/game/index)

[miniapp/main.js 基于pixijs的前端demo](https://github.com/huya-ext/miniapp/blob/ed805fe78d/examples/game-common-demo-a/client-pixi-js)

[【教程】使用webpack搭建pixi.js开发环境 - pixijs游戏开发 - SegmentFault 思否](https://segmentfault.com/a/1190000021724296)

React框架：

[React 元素渲染 | 菜鸟教程](https://www.runoob.com/react/react-rendering-elements.html)

[技术栈 - 虎牙小程序开发文档](http://dev.huya.com/docs#/base/stack)

代码分为viewer和streamer两个版本

index.js：观众端的入口文件
index_streamer.js：主播端的入口文件

执行顺序 index -> App(实例)

## 任务

后端文件整理：

前端实践pixijs最基础小游戏，导出，然后理解demo
