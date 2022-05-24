from NewsTab.KeywordGenerator import generateKeywords
from NewsTab.SelectStock import getTopStocks
from StockTab.WebCrawler import getPriceOnly, getRateOnly
from db.models import Keywords, Stocks, AnnualPrice, DailyPrice
from datetime import datetime



# Keywords DB
def updateKeywordsDB():
    print('Keyword Gen Running (Update)')
    display_keywords = generateKeywords(getTopStocks())

    print('Clearing Keywords Database (Update)')
    Keywords.objects.all().delete()
    
    print('Filling Keywords Database (Update)')
    for keyword, info in display_keywords.items():
        importance = info[0]
        related_stocks = info[1]
        summary = info[2]
        news_titles = []
        news_urls = []
        for news in info[3]:
            news_titles.append(news[0])
            news_urls.append(news[1])
        for _ in range(3 - len(info[3])):
            news_titles.append(None)
            news_urls.append(None)
        Keywords(keywords_text=keyword, related_stocks = related_stocks, 
                importance=importance, summarized_text=summary, 
                news_title_1=news_titles[0], news_url_1=news_urls[0],
                news_title_2=news_titles[1], news_url_2=news_urls[1],
                news_title_3=news_titles[2], news_url_3=news_urls[2],).save()

    print('Keyword Gen Finished (Update)')


def updateStocksDB():
    print('Updating Stocks DB')
    datas = Stocks.objects.values_list('stock_code')
    for data in datas:
        r = getRateOnly(data[0])
        item = Stocks.objects.get(stock_code=data[0])
        item.change_rate = r
        item.save()

# TODO: AnnualPrice DB
def updateAnnualPriceDB():
    print('Updating Annual Price DB')
    pass


def updateDailyPriceDB():
    print('Updating Daily Price DB')
    datas = Stocks.objects.values_list('stock_name', 'stock_code')
    now = datetime.now().strftime("%H%M")
    if now >= "0900" and now <= "1500":
        for data in datas:
            p = getPriceOnly(data[1])
            DailyPrice(stock_name=data[0], time=now, price=p).save()


import random
def testUpdate():
    for keyword in Keywords.objects.all():
        dif = random.randrange(-1000, 1001)
        keyword.importance += dif
        keyword.save()
    