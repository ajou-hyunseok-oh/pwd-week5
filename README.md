# 🍜 PWD Week 5 - Ajou Campus Foodmap API (Express + MongoDB)

> 실전 웹서비스 개발 5주차: Express + MongoDB(Mongoose)로 백엔드 REST API를 구현하고, 3주차 React 프론트엔드와 연동합니다. 제보(Submission) → 승인 시 실제 맛집(Restaurant)으로 등록되는 워크플로를 포함합니다.

---

## 📚 주차 자료
- 4주차 문서 구성을 바탕으로 DB 연동/제보 승인 흐름이 추가되었습니다.

---

## 🛠️ 프로젝트 소개

### 만들어볼 서비스
**Ajou Campus Foodmap API** - 아주대학교 주변 맛집 데이터를 DB에 저장/조회/관리하고, 사용자 제보를 받아 승인/거절하는 백엔드 서비스.

### 주요 기능
- `/health`: 서버/DB 상태 확인 (mongoose 연결 상태 포함)
- `/api/restaurants`:
  - `GET /` 전체 맛집 목록
  - `GET /:id` 개별 맛집 상세
  - `GET /popular?limit=5` 평점 상위 맛집
  - `POST /` 신규 맛집 등록(추천메뉴 정규화)
  - `PUT /:id` 맛집 수정
  - `DELETE /:id` 맛집 삭제
- `/api/submissions` (제보 관리):
  - `GET /?status=pending|approved|rejected` 제보 목록 필터 조회
  - `GET /:id` 단건 조회
  - `POST /` 신규 제보 등록 (기본 `pending`)
  - `PUT /:id` 제보 수정/상태 업데이트
  - `DELETE /:id` 제보 삭제
- 초기 시드: 서버 시작 시 `ensureSeededOnce`로 `src/data/restaurants.json`을 한 번만 삽입

### 사용 기술
- Runtime: Node.js 22
- Framework: Express 5, cors
- Database: MongoDB Atlas(or 로컬) + Mongoose 8
- 구성: MVC(S) - `routes / controllers / services / models / middleware`
- 환경변수: dotenv
- 테스트: Jest + Supertest + mongodb-memory-server (실 DB 없이 구동)

---

## ✅ 사전 준비사항

### 1) 필수 프로그램
```bash
node --version   # 22.x 권장
npm --version    # 10.x 권장
git --version
```

### 2) 계정/인프라
- GitHub 저장소
- MongoDB Atlas 계정(권장) 또는 로컬 MongoDB

### 3) 환경 변수(.env)
루트(`pwd-week5/.env`)에 아래 값을 설정하세요.
```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
DB_NAME=ajou-foodmap
PORT=3000
```

---

## 🚀 실행 방법

### 설치 & 개발 서버 실행
```bash
cd pwd-week5
npm install
npm run dev   # nodemon로 개발 서버 실행
```
- 기본 주소: `http://localhost:3000`
- 헬스 체크:
```bash
curl http://localhost:3000/health
# 응답 예: { "status": "ok", "db": 1 }  # 1: connected
```

### 프로덕션 실행
```bash
npm start
```

---

## 📁 폴더 구조
```
src/
 ├─ app.js                     # Express 앱 구성 (라우팅/미들웨어)
 ├─ config/db.js               # Mongoose 연결/종료 유틸
 ├─ controllers/
 │   ├─ restaurants.controller.js
 │   └─ submissions.controller.js
 ├─ data/restaurants.json      # 초기 시드 데이터
 ├─ middleware/
 │   ├─ error.middleware.js
 │   └─ notFound.middleware.js
 ├─ models/
 │   ├─ restaurant.model.js    # 맛집 스키마
 │   └─ submission.model.js    # 제보 스키마
 ├─ routes/
 │   ├─ restaurants.routes.js
 │   └─ submissions.routes.js
 ├─ services/
 │   ├─ restaurants.service.js # 맛집 비즈니스 로직
 │   └─ submissions.service.js # 제보 비즈니스 로직
 └─ utils/asyncHandler.js      # 비동기 에러 핸들러
server.js                      # 서버 시작 + DB 연결 + 시드 주입
```

---

## 🗃️ 데이터 모델

### Restaurant (`src/models/restaurant.model.js`)
```js
{
  id: Number,            // sequence id (unique)
  name: String,          // required
  category: String,      // required
  location: String,      // required
  priceRange: String,    // default '정보 없음'
  rating: Number,        // default 0
  description: String,   // default ''
  recommendedMenu: [String], // default []
  likes: Number,         // default 0
  image: String          // default ''
}
```
- 컨트롤러에서 `recommendedMenu`는 문자열 입력 시 `,` 기준으로 정규화됩니다.

### Submission (`src/models/submission.model.js`)
```js
{
  id: Number,                // sequence id (unique)
  restaurantName: String,    // required
  category: String,          // required
  location: String,          // required
  priceRange: String,        // optional
  recommendedMenu: [String], // optional
  review: String,            // optional
  submitterName: String,     // optional
  submitterEmail: String,    // optional
  status: 'pending'|'approved'|'rejected' // default 'pending'
}
```

---

## 🔌 API 레퍼런스

### Health
- `GET /health`
  - 응답: `{ status: 'ok', db: <mongooseState> }`

### Restaurants
- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `GET /api/restaurants/popular?limit=5`
- `POST /api/restaurants`
  - body 예시
    ```json
    {
      "name": "송림식당",
      "category": "한식",
      "location": "아주대 정문",
      "priceRange": "7,000-13,000원",
      "rating": 4.5,
      "description": "깔끔하고 맛있음",
      "recommendedMenu": ["순두부", "김치찌개"]
    }
    ```
- `PUT /api/restaurants/:id`
- `DELETE /api/restaurants/:id`

### Submissions
- `GET /api/submissions?status=pending|approved|rejected`
- `GET /api/submissions/:id`
- `POST /api/submissions`
  - body 예시
    ```json
    {
      "restaurantName": "테스트 식당",
      "category": "한식",
      "location": "아주대 정문",
      "priceRange": "8,000-12,000원",
      "recommendedMenu": ["김치찌개"],
      "review": "가성비 좋음",
      "submitterName": "홍길동",
      "submitterEmail": "test@example.com"
    }
    ```
- `PUT /api/submissions/:id`
- `DELETE /api/submissions/:id`

---

## 🧪 빠른 점검(curl)
```bash
# Health
curl http://localhost:3000/health

# 맛집 목록
curl http://localhost:3000/api/restaurants

# 인기 맛집 3개
curl "http://localhost:3000/api/restaurants/popular?limit=3"

# 제보 생성 (PowerShell)
curl -X POST http://localhost:3000/api/submissions ^
  -H "Content-Type: application/json" ^
  -d "{\"restaurantName\":\"테스트\",\"category\":\"한식\",\"location\":\"अ주대\"}"
```
> macOS/Linux는 줄바꿈에 `\` 사용

---

## 🧰 테스트
```bash
npm test
```
- `mongodb-memory-server`를 사용하여 메모리 상의 MongoDB로 테스트가 실행됩니다.
- 실 DB 연결이 필요 없습니다.

---

## 🌐 배포 가이드(예: Render)
1) 새 Web Service 생성(GitHub 연동)
2) 설정 예시
   - Name: `pwd-week5-<nickname>`
   - Branch: `main`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `MONGODB_URI`
     - `DB_NAME`
     - (선택) `PORT`
3) 배포 후
   - `https://pwd-week5-<username>.onrender.com/health` 200 확인
   - 프론트엔드(3주차) `.env.production`에 `VITE_API_BASE_URL`로 Render 도메인 설정

---

## 🔗 Week3(React) 연동 팁
- `pwd-week3/src/services/api.jsx`는 `import.meta.env.VITE_API_BASE_URL`을 기본으로 사용합니다.
- 배포 환경에서는 반드시 HTTPS 백엔드 주소를 사용하세요(혼합 콘텐츠 차단 방지).
- HashRouter(`/#/...`)로 배포하면 정적 호스팅에서 404 없이 동작합니다.

---

## 🧯 트러블슈팅
- Mongo 연결 실패: `MONGODB_URI`, `DB_NAME` 재확인, IP 허용 목록/Network Access 점검
- CORS: 기본 `cors()`로 대부분 허용되나, 필요 시 `origin` 화이트리스트 지정
- 첫 호출이 느림: 무료 인스턴스는 슬립 후 웜업 지연 발생 가능
- 404(정적 호스팅): 프론트는 HashRouter 권장 또는 리라이트 설정 필요

---

## 📎 제출 가이드(예시)
- GitHub Repository: `https://github.com/<username>/pwd-week5`
- Backend URL: `https://pwd-week5-<username>.onrender.com`
- Frontend URL: `https://<배포-도메인>/#/`

---

## 🙌 학습 포인트
- Express + Mongoose로 CRUD API 설계/구현
- 제보 → 승인 → 본 데이터 반영 워크플로 설계
- Jest + In-Memory Mongo로 신뢰성 있는 테스트
- 프론트/백 분리 배포와 환경변수 구성