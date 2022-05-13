from apscheduler.schedulers.background import BackgroundScheduler
from newStockServer.repeatedTask import updateKeywordsDB, updateStocksDB, updateAnnualPriceDB, updateDailyPriceDB


def scheduleAll():
    sched = BackgroundScheduler()

    sched.add_job(updateKeywordsDB, 'interval', minutes = 30)
    sched.add_job(updateStocksDB, 'interval', seconds = 10)
    sched.add_job(updateAnnualPriceDB, 'cron', hour = '4', minute = '0')
    sched.add_job(updateDailyPriceDB, 'interval', seconds = 5)

    sched.start()
