import requests
import json


def summarize(title : str, content : str):
    if content is None or len(title) + len(content) > 6000:
        return None
    
    data = {
        "document": {
            "title": title,
            "content" : content
        },
        "option": {
            "language": "ko",
            "model": "news", # Model used for summaries (general, news)
            "tone": "2", # Converts the tone of the summarized result. (0, 1, 2, 3)
            "summaryCount" : "3" # This is the number of sentences for the summarized document.
        }
    }

    response = requests.post(summarize.url, data=json.dumps(data), headers=summarize.headers)
    rescode = response.status_code
    if(rescode == 200):
        return response.text.replace('\\"', '"')[12:-2]
    else:
        print("Error : " + response.text)
        return None

summarize.headers = {
    "X-NCP-APIGW-API-KEY-ID": "hg2gkdp7wf", #Client ID
    "X-NCP-APIGW-API-KEY": "29YjzPzPKlb1X9pAzlsGI0YTrKrAgYFckJaHPK2n", #Client Secret
    "Content-Type": "application/json"
}

summarize.url = "https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize" 