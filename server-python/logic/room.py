import threading
import json
from enum import Enum
from config import DefaultConfig
from logger import log
from .protocol import PROTOCOL
from util import ws_channel_util
from util import jwt_util
from hy_subscriber.subscriber import LiveSubscriber
from .player import Player

from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.nlp.v20190408 import nlp_client, models
cred = credential.Credential("AKIDHJmSnWNMO9bGju69RTEmfHbfX9cqlWcO", "iDSQ7lFMtAIAk4OccLnvmMV1GEzLPCkP")
httpProfile = HttpProfile()
httpProfile.endpoint = "nlp.tencentcloudapi.com"
clientProfile = ClientProfile()
clientProfile.httpProfile = httpProfile
client = nlp_client.NlpClient(cred, "ap-guangzhou", clientProfile)

barrage_set=[]
threshold=0.7
barrage_num=0
dic=[]
def saveMessage(data):
    global barrage_set,barrage_num,threshold,dic
    log= classify(barrage_set,data,threshold)
    #log.info(classify([],"bala",0.7))
    if log !=False:
        barrage_num+=1
        log["序号"]=barrage_num
        flag=0
        for item in barrage_set:
            if item["类别"]==log["类别"]:
                item['内容']=log['内容']
                item['序号']=log['序号']
                flag=1
                break
        if flag==0:
            barrage_set.append(log)
        dic.append(log.copy())

def push(req, name,data):
    params = '{\"Text\":\"%s\"}' % data
    try:
        req.from_json_string(params)
        resp = name(req)
    except:
        return False
    stri = resp.to_json_string().split('"Positive":')[1].split(', "Sentiment"')[0]
    Sent = float(stri)
    return Sent


# 相似度分类 threshold为相似度阈值
def apush(threshold, lis,data):
    areq, aname, aother = models.TextSimilarityRequest(), client.TextSimilarity, '{\"SrcText\":\"%s\",\"TargetText\":[\"%s\"]}'
    max=0
    maxindex=1
    for index,i in enumerate(lis):
        try:
            aparams = aother % (data, i["内容"])
            areq.from_json_string(aparams)
            resp = aname(areq)  # 将弹幕内容替换进字符串
        except:
            return 0,False
        simila = float(resp.to_json_string().split('"Score": ')[1].split(', ')[0])
        if simila > max:
            max=simila
            maxindex=index
    if max >threshold:
        lis[maxindex]["数量"]+=1
        return lis[maxindex]["数量"],lis[maxindex]["类别"]
    elif max<=threshold:
        return 1,len(lis)+1



# 打表

def classify(lis,data,threshold):
    try:
        # 情绪分析
        req, name = models.SentimentAnalysisRequest(), client.SentimentAnalysis
        Sent = push(req, name, data)
        # print(push(req,name,other))
        if Sent==False:
            return False

        # 语句分析
        if len(lis)==0 :
            count={"内容":data,"情感":Sent,"类别":1,"数量":1}
            return count
        else:    
            #print(lis)       
            num,belong = apush(threshold,lis,data)
            #print(num,belong)
            if belong == False:
                return False
            count = {"内容": data, "情感": Sent, "类别": belong,"数量":num}
            return count

    except TencentCloudSDKException as err:
        print(err)
# 处理弹幕的逻辑
#from barrege import saveMessage, getTable



class ERoomState(Enum):
    """ 房间状态枚举定义 """
    Gaming = 1
    GameOver = 2


class Room(object):
    """ 
    游戏房间，一般一个直播间对应一个游戏房间，同一个直播间游戏的玩家都会加入这个游戏房间
    核心的游戏玩法逻辑都在这里实现
    """

    # 房间号，就是主播直播间房间号
    roomId = None
    # 主播unionId
    presenterUid = None
    # 游戏开始时间
    gameStartedAt = None
    # 房间当前状态
    state = None
    # 所有连接到房间的观众和主播id列表
    allUids = []
    # 当前参与对局的观众和主播Player列表
    signedPlayers = {}
    #

    
    reconnTimes = 0
    # 游戏计时检测定时器
    timer = None

    # 监听虎牙直播间送礼弹幕等事件
    liveSubscriber = None

    # 重连虎牙直播间订阅服务的次数
    reconnTimes = 0

    def __init__(self, roomId, presenterUid):
        self.roomId = roomId
        self.presenterUid = presenterUid
        self.__connect_live_subscriber()

    def __connect_live_subscriber(self):
        """ 连虎牙直播间订阅服务 """
        if DefaultConfig.LIVE_SUBSCRIBER:
            wsUrl = jwt_util.build_huya_wsUrl(self.roomId)
            self.liveSubscriber = LiveSubscriber(
                self.roomId, wsUrl, DefaultConfig.LIVE_SUBSCRIBER_TOPICS,
                self.__live_message, self.__live_disconnect)
            self.liveSubscriber.connect()

    async def onJoin(self, uid):
        """ 玩家连接房间 """
        if not self.allUids.__contains__(uid):
            self.allUids.append(uid)
        data = {}
        data['uid'] = uid
        data['gaming'] = (self.state == ERoomState.Gaming)
        data['signedUp'] = (self.signedPlayers.__contains__(uid))
        # 房间内广播，玩家加入
        await self.__broadcast(PROTOCOL.S2CPlayerJoin, json.dumps((data)))

    

#     async def start(self, uid):
#         """ 开始游戏 """
#         if uid == self.presenterUid and self.state != ERoomState.Gaming and len(self.signedPlayers) >= DefaultConfig.MIN_PLAYER_CNT:
#             self.state = ERoomState.Gaming
#             self.gameStartedAt = int(time.time()*1000)  # 当前毫秒值
#             # 房间内广播，游戏开始
#             await self.__broadcast(PROTOCOL.S2CGameStart)

#         # 启动计时检测
#         self.timer = threading.Timer(
#             DefaultConfig.GAME_DURATION, self.__gameOver)
#         self.timer.start()


    async def onConnect(self):
        await self.__broadcast(PROTOCOL.S2CConnectStart, data={})

    async def returnTable(self):
        await self.__broadcast(PROTOCOL.S2CTableContent, data=dic)
        

    async def signup(self, uid, data):
        """ 加入游戏 """
        canSignup = True
        # 未加入游戏，且游戏人数没有满
        if not self.signedPlayers.__contains__(uid) and len(self.signedPlayers) >= DefaultConfig.MAX_PLAYER_CNT:
            canSignup = False

        if canSignup:
            # 加入列表
            if not self.signedPlayers.__contains__(uid):
                player = Player(uid)
                player.nick = data['nick']
                player.avatar = data['avatar']
                self.signedPlayers[uid] = player
            data = {}
            data['uid'] = uid
            data['success'] = True
            # 广播加入游戏成功
            await self.__broadcast(PROTOCOL.S2CPlayerSignup, json.dumps((data)))
        else:
            data = {}
            data['success'] = False
            # 发给当前用户，加入失败
            await self.__unicast(uid, PROTOCOL.S2CPlayerSignup, json.dumps((data)))

    async def __gameOver(self):
        """ 游戏结束 """
        # 广播游戏结束，可附带排行榜等数据
        await self.__broadcast(Protocol.S2CGameOver.uri, self.__build_rank())

        self.state = ERoomState.GameOver

        if DefaultConfig.LIVE_SUBSCRIBER:
            self.liveSubscriber.disconnect()

        from logic.room_mgr import room_manager
        room_manager.remove_room(self.roomId)


    async def gameOver(self, uid):
        """ 主播主动结束游戏 """
        if uid == self.presenterUid and self.state == ERoomState.Gaming:
            await self.__gameOver()


    async def playerScore(self, uid, data):
        """ 玩家上报得分 """
        if self.signedPlayers.__contains__(uid) and self.state == ERoomState.Gaming:
            self.signedPlayers[uid].score = data['score']
            data = self.__build_rank()
            await self.__broadcast(PROTOCOL.S2CRealtimeRank, data)

    def __build_rank(self):
        """ 构造实时得分排行榜 """
        data = sorted(self.signedPlayers,
                      key=lambda player: player.score, reverse=True)
        return data

    async def __broadcast(self, uri,  data=None,  exUids=None):
        """ 广播 """
        await ws_channel_util.broadcast(self.roomId, uri, data, self.allUids)

    # 
    async def __unicast(self, uid, uri,  data=None):
        """ 发送给指定用户 """
        await ws_channel_util.unicast(self.roomId, uid, uri, data)
    
    
    def lod(self,data):
        log.info(classify([],data,0.7))
    
    '''def saveMessage(data):
        log= classify(self.barrage_set,data,self.threshold)
        #log.info(classify([],"bala",0.7))
        if log !=False:
            self.barrage_num+=1
            log["序号"]=self.barrage_num
            flag=0
            for item in self.barrage_set:
                if item["类别"]==log["类别"]:
                    item['内容']=log['内容']
                    item['序号']=log['序号']
                    flag=1
                    break
            if flag==0:
                self.barrage_set.append(log)
            self.dic.append(log)'''
    
    
    

    def __live_message(self, notice, data):
        """ 收到虎牙直播间订阅消息回调 """

        log.info("收到直播间订阅消息:{},{},{}".format(self.roomId, notice, str(data)))
        if notice == "getSendItemNotice":
            # data dict 结构：
            # 'badgeName':'叶妃'
            # 'fansLevel':1
            # 'itemId':4
            # 'itemName':'虎粮'
            # 'nobleLevel':0
            # 'presenterNick':'xxx'
            # 'roomId':15687938
            # 'sendItemComboHits':1
            # 'sendItemCount':1
            # 'sendNick':'xxx'
            # 'senderAvatarurl':'http://huyaimg.msstatic.com/avatar/1021/...1509880585'
            # 'senderLevel':2
            # 'totalPay':0
            # 'unionId':'unck5...Bo'

            unionId = data['unionId']  # 发送者unionId
            sendNick = data['sendNick']  # 发送者昵称
            senderAvatarurl = data['senderAvatarurl']  # 发送者头像
            fansLevel = data['fansLevel']  # 粉丝等级
            itemId = data['itemId']  # 礼物id
            itemName = data['itemName']  # 礼物id
            sendItemComboHits = data['sendItemComboHits']  # 送礼连击数
            sendItemCount = data['sendItemCount']  # 送礼个数
            totalPay = data['totalPay']  # 礼物价值

            log.info("监听到直播间送礼消息:用户id：{}，昵称：{}，礼物Id:{}，礼物名称:{}，礼物数:{}，连击数:{}，totalPay:{}".format(
                unionId, sendNick, itemId, itemName, sendItemCount, sendItemComboHits, totalPay))
            # @TODO 业务逻辑。。。
            

        elif notice == "getMessageNotice":
            # 收到 弹幕消息
            # 'data':{'badgeName': '', 'content': 'xxx', 'fansLevel': 0, 'nobleLevel': 0, 'roomId': 12345678, 'sendNick': 'xxx', 'senderAvatarUrl': 'http://huyaimg.msst...521768567', 'senderGender': 0, 'senderLevel': 1, 'showMode': 0, 'unionId': 'unrm3gdloD/ZmcQCXRH...H/zi0j48p'}
            unionId = data['unionId']  # 发送者unionId
            sendNick = data['sendNick']  # 发送者昵称
            senderAvatarUrl = data['senderAvatarUrl']  # 发送者头像
            senderGender = data['senderGender']  # 发送者性别
            content = data['content']  # 弹幕内容
            log.info("监听到直播间弹幕消息:用户id：{}，昵称：{}，弹幕内容:{}".format(
                unionId, sendNick, content))
            #self.saveMessage(data['content'],threshold=0.7)
            saveMessage(data['content'])
            log.info(barrage_set)
            log.info(dic)
            #await returnTable()
            
            # @TODO 业务逻辑。。。
            # await saveMessage(data)

        else:
            log.info("监听到直播间{}消息,内容:{}".format(notice, str(data)))

    def __live_disconnect(self):
        """ 订阅服务连接断开回调 """

        log.warn("监听直播间订阅消息连接断开:{}".format(self.roomId))
        if self.state != ERoomState.GameOver:
            reTrytimer = threading.Timer(
                2+self.reconnTimes*2, self.__retry_connect_live_subscriber)
            reTrytimer.start()


    def __retry_connect_live_subscriber(self):
        """ 重连订阅服务 """

        if self.state == ERoomState.GameOver:
            return
        log.info("虎牙websocket断线重连 roomId:{}".format(self.roomId))
        self.__connect_live_subscriber()
        self.reconnTimes = self.reconnTimes + 1
        if self.reconnTimes >= 10:
            self.reconnTimes = 0
