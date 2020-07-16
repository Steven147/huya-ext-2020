from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException 
from tencentcloud.nlp.v20190408 import nlp_client, models 
from IPython.display import display
import pandas as pd


# 读取弹幕json文件
from read_barrage import get_list_json

#情感分析 

def push(req,name,other):
    result = []
    k=1
    for i in get_list_json():
        print(i)
        item={}
        params = other%i 
        try:
            req.from_json_string(params)
            resp = name(req)
        except:
            continue
        stri=resp.to_json_string().split('"Sentiment":')[1].split(', "RequestId"')[0]
        Sent=stri.split('"')[1].split('"')[0]
        item["序号"]=k
        item["内容"]=i
        item["情感"]=Sent
        result.append(item)
        k+=1
    return result

#相似度分类 threshold为相似度阈值
def apush(threshold,pake1):
    areq,aname,aother = models.TextSimilarityRequest(), client.TextSimilarity,  '{\"SrcText\":\"%s\",\"TargetText\":[\"%s\"]}'
    classify=1
    for index,i in enumerate(pake1):
        #print(index,i)
        if len(i.keys())==3:
            i["类别"]=classify
            for m in pake1:
                if m["序号"]==i["序号"]:
                    continue
                if len(m.keys())==3:
                    try:
                        aparams = aother%(m["内容"],i["内容"])
                        areq.from_json_string(aparams)
                        resp = aname(areq) #将弹幕内容替换进字符串
                    except:
                        continue
                    simila=float(resp.to_json_string().split('"Score": ')[1].split(', ')[0])                
                    if simila > threshold:
                        m["类别"]=classify
            classify+=1
    return pake1

#打表
def table(content):
    column_name = ['序号','内容', '情感','类别']
    csv_name='Sentiment and Similarity.csv'
    xml_df = pd.DataFrame(content, columns=column_name)
    pd.set_option('display.width', 180) 
    xml_df.to_csv(csv_name, index=None) 
   

try: 
    cred = credential.Credential("AKIDHJmSnWNMO9bGju69RTEmfHbfX9cqlWcO", "iDSQ7lFMtAIAk4OccLnvmMV1GEzLPCkP") 
    httpProfile = HttpProfile()
    httpProfile.endpoint = "nlp.tencentcloudapi.com"
    clientProfile = ClientProfile()
    clientProfile.httpProfile = httpProfile
    client = nlp_client.NlpClient(cred, "ap-guangzhou", clientProfile) 

    # 情绪分析
    req,name,other = models.SentimentAnalysisRequest(), client.SentimentAnalysis, '{\"Text\":\"%s\"}'
    pake0=push(req,name,other)
    #print(push(req,name,other))

    # 语句分析
    areq,aname,aother = models.TextSimilarityRequest(), client.TextSimilarity,  '{\"SrcText\":\"%s\",\"TargetText\":[\"来啦\"]}'
    final=apush(0.7,pake0)
    display(final)
    table(final)

except TencentCloudSDKException as err: 
    print(err)



