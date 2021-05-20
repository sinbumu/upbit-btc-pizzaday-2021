# upbit-btc-pizzaday-2021
pizza gazuaa


how to run

0.업비트 마이페이지 > open api 관리에 가서 open api 키 새로 만듬.
출금조회, 출금하기 체크하고 만들어야 하고 출금하기 때매 특정 ip에서만 실행에
내가 이걸 돌릴 컴퓨터의 현재 ipv4 주소 채워야 함.

https://upbit.com/mypage/open_api_management

1. set your information ".env" (UPBIT_OPEN_API_ACCESS_KEY, UPBIT_OPEN_API_SECRET_KEY)

2. npm i

3. node index.js

4. 별 이상 없다면 이벤트에 응모 대기를 시작 이라고 뜸...
그리고 크론잡으로 12:00 에 출금 요청을 쏜다. 
즉 12시 땡 하기 전에(최소 11:59분 59초엔) 켜놓을것 이후에 키면 출금요청 안함.

**시스템 시간 기준이므로 컴퓨터 시간이 한국시간에 맞춰있어야 함. 아닐경운 코드를 고치건 시각을 바꾸건 알아서 맞추든가 그냥 이 코드 쓰지 말자.
