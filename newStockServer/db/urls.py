from django.urls import path

from . import views

urlpatterns = [
    # /db/
    path('keywords', views.getKeywordDatabaseJson, name='getKeywordDatabaseJson'), 
    path('stocks', views.getStockDatabaseJson, name='getStockDatabaseJson'), 
    path('annual/stock=<str:stock_name>', views.getAnnualDatabaseJson, name='getAnnualDatabaseJson'),
        path('daily', views.getDailyDatabaseJson, name='getDailyDatabaseJson'),
    path('pastNews/query=<str:query>&date=<str:date>', views.getPastNewsJson, name='getPastNewsJson')
]
