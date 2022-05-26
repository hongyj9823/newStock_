파이썬 버젼 3.10.4


# 서버 가상환경 설정 방법(윈도우)

1. py -3 -m venv .venv
2. .venv\scripts\activate

3. cd newStockServer
4. pip install --upgrade pip //엑세스 거부 시 python -m pip install --upgrade pip

5. pip install -r requirements.txt
6. deactivate

7. cd ..
만약 java_home 관련 문제 생기면 .venv폴더를 지우고 https://konlpy.org/en/latest/install/#id2 를 참조하여 문제를 해결한 뒤 처음부터 다시 해주세요

# 클라이언트 처음 설치 방법

1. cd newstock_client
2. npm install

# 서버 시작 방법

1. .venv\scripts\activate
2. python newStockServer/manage.py runserver

3. 브라우저에 127.0.0.1:8000/db/keywords 쳐서 db확인
4. ctrl + C 로 서버 종료

#  클라이언트 시작방법

1. 새로운 cmd terminal 열기
2. cd newstock_client

3. npm start
4. ctrl + C 로 서버 종료


# 제공 API URL들
1. 127.0.0.1:8000/db/keywords : 뉴스탭에 출력할 모든 정보
2. 127.0.0.1:8000/db/stocks : 스톡탭 처음에 나올 시가총액 + 상승률

3. 127.0.0.1:8000/db/annual/stock=[a] : a에 대한 연간 차트
4. 127.0.0.1:8000/db/daily :  일일 차트

5. 127.0.0.1:8000/db/pastNews/query=[a]&date=[yymmdd] : 
    yymmdd날 a를 검색했을때 나오는 뉴스들


# DB has no column 뭐시기 오류
1. db.sqlite3 삭제
2. .venv\scripts\activate

3. cd newStockServer
4. python manage.py sqlmigrate db 0001

5. python manage.py migrate
6. python manage.py runserver
