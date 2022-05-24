import requests
from urllib import parse
from ast import literal_eval

def getAllSise(code, start_time, end_time, time_from='day') :
    get_param = {
        'symbol':code,
        'requestType':1,
        'startTime':start_time,
        'endTime':end_time,
        'timeframe':time_from
    }
    get_param = parse.urlencode(get_param)
    url="https://api.finance.naver.com/siseJson.naver?%s"%(get_param)
    response = requests.get(url)
    return literal_eval(response.text.strip())


def getStocksInfo(code):
    url = 'https://finance.daum.net/api/quotes/A' + code + '?summary=false&changeStatistics=true'
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Cookie': 'webid=8768f176266d41889f2dc98d74331167; TIARA=zbY5jrj3o1xP3dEpRJQ2FYD4h.iM_83PXo-IHOhFsbMdIVm5i.FEbTgbNoqBXIDhVC-WFFkcmwTykjh3QxVD._LpV56MTbgb; _ga=GA1.2.1654528727.1651214088; KAKAO_STOCK_CHART_ENABLED_INDICATORS=["sma","column"]; _gid=GA1.2.1246154632.1652535656; KAKAO_STOCK_RECENT=["A005930","Q570077","A001795","A001790","Q580018","Q530081","A090460"]; __T_=1; webid_sync=1652537081208; _dfs=OE5iWm9tQTEyVUNVdlpaVEVjY2lQYXhJTFpYR1IrNTY1WkZuNVdOWlp6WW9zbnBsYjJvUXBsVGMxZG9Zb1VGU1lBRkNiRDRtOWM2bkk4Z21RNTVYd3c9PS0tYUQvc2IzUm5EVlRtYlZOVDh5alI4QT09--9d587e25b3bfbfbbf12931e6e4a26071a29fcb09; _gat_gtag_UA_128578811_1=1; _T_ANO=Dlk/jvgMwIqoToVFg0KHcgeNmEjvB1ZmdVMyPPuPBod1K9GLfTXyUiM04eWqXZQOANVry3ks0vbAqsla3+s74l3fQLYN47aRHbMB92k9oPqyU9+6tS/hh99UIPimPNv0lnlrQ/0uC/zAMk0cvSVYhTu7M/svDP5x378CE4C/LWfD4utovoq8jEcwgBPnLl2V/yqo+PztHRd2wfBYr7JWix7u8ScGBusmyG/PxFi7yTlRj6wC3NEX8rMkNxIoTrIvy7iUka4FH/roj3TnnU7QBeArirHpYiosXIhU5p66mRUk+iwNqHgazQbBznpy+RXgACCuYej6DpacomBiTvm3UQ==',
        'Host': 'finance.daum.net',
        'If-None-Match': 'W/"23501689faaaf24452ece4a039a904fd"',
        'Referer': 'http://finance.daum.net/quotes/A069500',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    jsonObjs = response.json()
    price = jsonObjs['marketCap']
    rate = round(jsonObjs['changeRate']*100, 2)
    
    return price, rate


def getPriceOnly(code):
    url = 'https://finance.daum.net/api/quotes/A' + code + '?summary=false&changeStatistics=true'
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Cookie': 'webid=8768f176266d41889f2dc98d74331167; TIARA=zbY5jrj3o1xP3dEpRJQ2FYD4h.iM_83PXo-IHOhFsbMdIVm5i.FEbTgbNoqBXIDhVC-WFFkcmwTykjh3QxVD._LpV56MTbgb; _ga=GA1.2.1654528727.1651214088; KAKAO_STOCK_CHART_ENABLED_INDICATORS=["sma","column"]; _gid=GA1.2.1246154632.1652535656; KAKAO_STOCK_RECENT=["A005930","Q570077","A001795","A001790","Q580018","Q530081","A090460"]; __T_=1; webid_sync=1652537081208; _dfs=OE5iWm9tQTEyVUNVdlpaVEVjY2lQYXhJTFpYR1IrNTY1WkZuNVdOWlp6WW9zbnBsYjJvUXBsVGMxZG9Zb1VGU1lBRkNiRDRtOWM2bkk4Z21RNTVYd3c9PS0tYUQvc2IzUm5EVlRtYlZOVDh5alI4QT09--9d587e25b3bfbfbbf12931e6e4a26071a29fcb09; _gat_gtag_UA_128578811_1=1; _T_ANO=Dlk/jvgMwIqoToVFg0KHcgeNmEjvB1ZmdVMyPPuPBod1K9GLfTXyUiM04eWqXZQOANVry3ks0vbAqsla3+s74l3fQLYN47aRHbMB92k9oPqyU9+6tS/hh99UIPimPNv0lnlrQ/0uC/zAMk0cvSVYhTu7M/svDP5x378CE4C/LWfD4utovoq8jEcwgBPnLl2V/yqo+PztHRd2wfBYr7JWix7u8ScGBusmyG/PxFi7yTlRj6wC3NEX8rMkNxIoTrIvy7iUka4FH/roj3TnnU7QBeArirHpYiosXIhU5p66mRUk+iwNqHgazQbBznpy+RXgACCuYej6DpacomBiTvm3UQ==',
        'Host': 'finance.daum.net',
        'If-None-Match': 'W/"23501689faaaf24452ece4a039a904fd"',
        'Referer': 'http://finance.daum.net/quotes/A069500',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    jsonObjs = response.json()
    price = jsonObjs['tradePrice']

    return price


def getRateOnly(code):
    url = 'https://finance.daum.net/api/quotes/A' + code + '?summary=false&changeStatistics=true'
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Cookie': 'webid=8768f176266d41889f2dc98d74331167; TIARA=zbY5jrj3o1xP3dEpRJQ2FYD4h.iM_83PXo-IHOhFsbMdIVm5i.FEbTgbNoqBXIDhVC-WFFkcmwTykjh3QxVD._LpV56MTbgb; _ga=GA1.2.1654528727.1651214088; KAKAO_STOCK_CHART_ENABLED_INDICATORS=["sma","column"]; _gid=GA1.2.1246154632.1652535656; KAKAO_STOCK_RECENT=["A005930","Q570077","A001795","A001790","Q580018","Q530081","A090460"]; __T_=1; webid_sync=1652537081208; _dfs=OE5iWm9tQTEyVUNVdlpaVEVjY2lQYXhJTFpYR1IrNTY1WkZuNVdOWlp6WW9zbnBsYjJvUXBsVGMxZG9Zb1VGU1lBRkNiRDRtOWM2bkk4Z21RNTVYd3c9PS0tYUQvc2IzUm5EVlRtYlZOVDh5alI4QT09--9d587e25b3bfbfbbf12931e6e4a26071a29fcb09; _gat_gtag_UA_128578811_1=1; _T_ANO=Dlk/jvgMwIqoToVFg0KHcgeNmEjvB1ZmdVMyPPuPBod1K9GLfTXyUiM04eWqXZQOANVry3ks0vbAqsla3+s74l3fQLYN47aRHbMB92k9oPqyU9+6tS/hh99UIPimPNv0lnlrQ/0uC/zAMk0cvSVYhTu7M/svDP5x378CE4C/LWfD4utovoq8jEcwgBPnLl2V/yqo+PztHRd2wfBYr7JWix7u8ScGBusmyG/PxFi7yTlRj6wC3NEX8rMkNxIoTrIvy7iUka4FH/roj3TnnU7QBeArirHpYiosXIhU5p66mRUk+iwNqHgazQbBznpy+RXgACCuYej6DpacomBiTvm3UQ==',
        'Host': 'finance.daum.net',
        'If-None-Match': 'W/"23501689faaaf24452ece4a039a904fd"',
        'Referer': 'http://finance.daum.net/quotes/A069500',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    jsonObjs = response.json()
    rate = round(jsonObjs['changeRate']*100, 2)

    return rate