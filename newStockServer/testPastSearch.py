from NewsTab.NewsSearcher import searchPastNews
from datetime import datetime

newsList = searchPastNews("삼성전자", datetime(year = 2021, month = 10, day = 4))

for news in newsList:
    print(f"title: {news.title}\nurl: {news.url}\n")