import requests
import operator



def getTopStocks():
    response = requests.get(getTopStocks.url, headers=getTopStocks.headers)
    jsonObjs = response.json()
    dataList = jsonObjs['data']

    # 주식 이름 : 상승률
    upRateDic={}
    for data in dataList :
        upRateDic[data['name']] = data['changePrice']

    response = requests.get(getTopStocks.url2, headers=getTopStocks.headers)
    jsonObjs = response.json()
    dataList = jsonObjs['data']

    for data in dataList :
        upRateDic[data['name']] = data['changePrice']

    sortedDic = dict(sorted(upRateDic.items(), key=operator.itemgetter(1), reverse=True))
    topStock = {}

    keyList = list(sortedDic.keys())
    valueList = list(sortedDic.values())

    for i in range(0, 20):
        topStock[keyList[i]] = valueList[i]
    
    return topStock


getTopStocks.url = 'https://finance.daum.net/api/trend/price_performance?page=1&perPage=30&intervalType=TODAY&market=KOSPI&changeType=RISE&pagination=true&order=desc'
getTopStocks.url2 = 'https://finance.daum.net/api/trend/price_performance?page=2&perPage=30&intervalType=TODAY&market=KOSPI&changeType=RISE&pagination=true&order=desc'
getTopStocks.headers = {
                'Referer': 'http://finance.daum.net',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
            }
