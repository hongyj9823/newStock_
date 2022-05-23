from django.db import models

# Create your models here.
class Keywords(models.Model):
    keywords_text = models.CharField(max_length=30)
    importance = models.FloatField()
    related_stocks = models.CharField(max_length=30)
    summarized_text = models.CharField(max_length=200)
    news_title_1 = models.CharField(max_length=100, default=None, blank=True, null=True)
    news_url_1 = models.CharField(max_length=100, default=None, blank=True, null=True)
    news_title_2 = models.CharField(max_length=100, default=None, blank=True, null=True)
    news_url_2 = models.CharField(max_length=100, default=None, blank=True, null=True)
    news_title_3 = models.CharField(max_length=100, default=None, blank=True, null=True)
    news_url_3 = models.CharField(max_length=100, default=None, blank=True, null=True)

class Stocks(models.Model) :
    stock_name = models.CharField(max_length=100)
    stock_code = models.CharField(max_length=10)
    market_cap = models.IntegerField()
    change_rate = models.FloatField()
# class Stocks(models.Model) :
#     stock_name = models.CharField(max_length=100)
#     stock_code = models.CharField(max_length=10)
#     market_cap = models.IntegerField()
#     change_rate = models.FloatField()

class AnnualPrice(models.Model) :
    stock_name = models.CharField(max_length=100)
    date = models.CharField(max_length=10)
    start_price = models.IntegerField()
    max_price = models.IntegerField()
    min_price = models.IntegerField()
    end_price = models.IntegerField()

class DailyPrice(models.Model) :
    stock_name = models.CharField(max_length=100)
    time = models.CharField(max_length=5)
    price = models.IntegerField()