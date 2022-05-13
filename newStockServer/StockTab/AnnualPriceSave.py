from urllib import parse
import requests
from ast import literal_eval

def get_sise(code, start_time, end_time, time_from='day') :
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
