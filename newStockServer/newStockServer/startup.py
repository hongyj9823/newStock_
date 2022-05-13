import threading
import time
from datetime import datetime, timedelta

from NewsTab.KeywordGenerator import generateKeywords
from NewsTab.SelectStock import getTopStocks
from StockTab.AnnualPriceSave import get_sise
from db.models import AnnualPrice, Keywords, Stocks



def initKeywordsDB():
    print('Keyword Gen Running')
    display_keywords = generateKeywords(getTopStocks())

    print('Clearing Keywords Database')
    Keywords.objects.all().delete()
    
    print('Filling Keywords Database')
    start = time.perf_counter()
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

    elapsed = time.perf_counter() - start
    print(f'Keyword Gen Finished (runtime: {elapsed})')



def initStockDB():
    print('Clearing Stocks Database')
    Stocks.objects.all().delete()

    name = ['삼성전자', 'LG에너지솔루션', 'NAVER', '카카오', 'KB금융', 'SK', 'LG화학', 'SK이노베이션', '현대차', '기아',
                '삼성바이오로직스', '셀트리온', 'HMM', '대한항공', '삼성생명', '삼성화재', '두산에너빌리티', '한온시스템', '삼성물산', 'POSCO홀딩스']
    code = ['005930', '373220', '035420', '035720', '105560', '034730', '051910', '096770', '005380', '000270',
            '207940', '068270', '011200', '003490', '032830', '000810', '034020', '018880', '028260', '005490']

    print('Filling Stock Database')
    for i in range(0, len(code)):
        Stocks(stock_name=name[i], stock_code=code[i]).save()



def initAnnualPriceDB():
    print('Clearing Annual Price Database')
    AnnualPrice.objects.all().delete()

    name = ['삼성전자', 'LG에너지솔루션', 'NAVER', '카카오', 'KB금융', 'SK', 'LG화학', 'SK이노베이션', '현대차', '기아',
                '삼성바이오로직스', '셀트리온', 'HMM', '대한항공', '삼성생명', '삼성화재', '두산에너빌리티', '한온시스템', '삼성물산', 'POSCO홀딩스']
    code = ['005930', '373220', '035420', '035720', '105560', '034730', '051910', '096770', '005380', '000270',
            '207940', '068270', '011200', '003490', '032830', '000810', '034020', '018880', '028260', '005490']
    today = datetime.today().strftime("%Y%m%d")
    lastyear = (datetime.today() - timedelta(365)).strftime("%Y%m%d")

    print('Filling Annual Price Database')
    for i in range(0, len(code)):
        siseList = get_sise(code[i], lastyear, today, 'day')

        for j in range(1, len(siseList)):
            AnnualPrice(stock_name=name[i], date=siseList[j][0],
                        start_price=siseList[j][1], end_price=siseList[j][4]).save()


# TODO: 
def initDailyPriceDB():
    pass



def initAll():
    init_funcs = [initKeywordsDB] #, initStockDB, initAnnualPriceDB, initDailyPriceDB]

    threads = [threading.Thread(target = func) for func in init_funcs]
    
    for thread in threads:
        thread.start()
    
    for thread in threads:
        thread.join()

