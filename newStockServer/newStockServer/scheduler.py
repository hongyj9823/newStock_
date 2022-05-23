from apscheduler.schedulers.background import BackgroundScheduler
from newStockServer.repeatedTask import updateKeywordsDB, updateStocksDB, updateAnnualPriceDB, updateDailyPriceDB, testUpdate


def scheduleAll():
    sched = BackgroundScheduler(timezone = 'Asia/Seoul')

    sched.add_job(updateKeywordsDB, 'interval', minutes = 30)
    sched.add_job(updateStocksDB, 'interval', minutes = 1)
    sched.add_job(updateAnnualPriceDB, 'cron', hour = '4', minute = '0')
    sched.add_job(updateDailyPriceDB, 'interval', minutes = 1)

    #sched.add_job(testUpdate, 'interval', seconds = 1)

    sched.start()
