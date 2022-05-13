import json
import urllib.request
from NewsTab.NewsObject import News
from urllib.request import urlopen
import urllib
from bs4 import BeautifulSoup as bs
from datetime import datetime
import datetime



def searchPresentNews(searchString : str):
    encText = urllib.parse.quote(searchString)
    url = "https://openapi.naver.com/v1/search/news.json?query=" + encText + "&display=20&sort=sim" # json 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", searchPresentNews.client_id)
    request.add_header("X-Naver-Client-Secret", searchPresentNews.client_secret)

    response = urllib.request.urlopen(request)
    rescode = response.getcode()

    if rescode != 200:
        print("Error Code:" + rescode)
        return []
    response_body = response.read()
    data = json.loads(response_body.decode('utf-8'))

    searchResult = data['items']
    newsList = []
    i = 0
    for item in searchResult:
        if "https://news.naver.com/main/read.naver" in item['link']:
        
            title = item['title']
            
            newsList.append(News(title, item['link']))
            i += 1

    return newsList
        
searchPresentNews.client_id = "64WKg75K5bFMpuR5yHAP"
searchPresentNews.client_secret = "9vPr6PUv0R"



def searchPastNews(query : str, searchDate: datetime):
    parsedQuery = urllib.parse.quote(query)
    dateFormat = searchDate.strftime('%Y.%m.%d')
    url= "https://search.naver.com/search.naver?where=news&query="+parsedQuery+"&sm=tab_opt&sort=0&pd=3&ds="+dateFormat+"&de="+dateFormat
    html = urlopen(url)
    soup = bs(html, "html.parser")

    soup = soup.find("ul", "list_news")

    if soup == None:
        return []

    newsList = []
    soup = soup.find_all("a", "news_tit")
    for i in soup:
        newsList.append(News(i['title'], i['href']))
    
    return newsList
