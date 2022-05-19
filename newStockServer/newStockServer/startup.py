import threading
import time
from datetime import datetime, timedelta

from NewsTab.KeywordGenerator import generateKeywords
from NewsTab.SelectStock import getTopStocks
from StockTab.WebCrawler import getAllSise, getStocksInfo, getPriceOnly
from db.models import AnnualPrice, Keywords, Stocks, DailyPrice



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
            '삼성바이오로직스', '셀트리온', 'HMM', '대한항공', '삼성생명', '삼성화재', '두산에너빌리티', '한온시스템', '삼성물산', '이마트',
            'POSCO홀딩스', '고려아연', '리노공업', '동진쎄미켐', '셀트리온제약', '씨젠', 'CJ제일제당', '오리온', '미래에셋증권', '메리츠증권',
            '에코프로비엠', '에코프로', '셀트리온헬스케어', 'CJ프레시웨이', '에스에프에이', '고영', '알테오젠', '레고켐바이오', '엘앤에프', '대주전자재료',
            '천보', '솔브레인', '포스코케미칼', '쌍용C&E', '현대건설', 'GS건설', '스튜디오드래곤', 'JYP Ent.', '케이엠더블유', '서진시스템',
            '지씨셀', 'HLB생명과학', '카카오게임즈', '펄어비스', '안랩', '디어유', '오스템임플란트', '파크시스템스', '하림지주', '매일유업']
    code = ['005930', '373220', '035420', '035720', '105560', '034730', '051910', '096770', '005380', '000270',
            '207940', '068270', '011200', '003490', '032830', '000810', '034020', '018880', '028260', '139480',
            '005490', '010130', '058470', '005290', '068760', '096530', '097950', '271560', '006800', '008560',
            '247540', '086520', '091990', '051500', '056190', '098460', '196170', '141080', '066970', '078600',
            '278280', '357780', '003670', '003410', '000720', '006360', '253450', '035900', '032500', '178320',
            '144510', '067630', '293490', '263750', '053800', '376300', '048260', '140860', '003380', '267980']

    print('Filling Stock Database')
    for i in range(0, len(code)):
        price, rate = getStocksInfo(code[i])
        Stocks(stock_name=name[i], stock_code=code[i],
                start_price=price, change_rate=rate).save()



def initAnnualPriceDB():
    print('Clearing Annual Price Database')
    # 할지 안할지 생각해보기

    AnnualPrice.objects.all().delete()

    datas = Stocks.objects.values_list('stock_name', 'stock_code')
    today = datetime.today().strftime("%Y%m%d")
    lastyear = (datetime.today() - timedelta(365)).strftime("%Y%m%d")

    print('Filling Annual Price Database')
    for data in datas:
        siseList = getAllSise(data[1], lastyear, today, 'day')
        for j in range(1, len(siseList)):
             #'날짜', '시가', '고가', '저가', '종가'
            AnnualPrice(stock_name=data[0], date=siseList[j][0], start_price=siseList[j][1],
                        max_price=siseList[j][2], min_price=siseList[j][3], end_price=siseList[j][4]).save()
        


def initDailyPriceDB():
    datas = Stocks.objects.values_list('stock_name', 'stock_code')
    now = datetime.now().strftime("%H%M")
    if now >= "0900" and now <= "1500":
        if now == "0900":
            print('Clearing Daily Database')
            DailyPrice.objects.all().delete()

        for data in datas:
            p = getPriceOnly(data[1])
            DailyPrice(stock_name=data[0], time=now, price=p).save()



def initAll():
    init_funcs = [initKeywordsDB, initStockDB, initAnnualPriceDB, initDailyPriceDB]

    threads = [threading.Thread(target = func) for func in init_funcs]
    
    for thread in threads:
        thread.start()
    
    for thread in threads:
        thread.join()

