# 🍜 PWD Week 5 - MongoDB를 활용한 MERN Stack 웹서비스 개발

> ** 실전 웹서비스 개발 5주차 ** : Express + MongoDB(Mongoose)로 백엔드 REST API를 구현하고, 3주차 React 프론트엔드에 Admin, Submissions 폼을 연동합니다. 맛집(Restaurant) 정보의 CRUD와 제보(Submission) → 승인 시 실제 맛집(Restaurant)으로 등록되는 워크플로를 포함합니다.

---

## 📚 주차 자료
- [5주차 강의자료](https://drive.google.com/file/d/1Nftat9McRHMlH3qWtc2WijiBbihw7GMm/view?usp=drive_link)

---

## 🛠️ 프로젝트 소개

### 만들어볼 서비스
**MongoDB 연동 Ajou Campus Foodmap API + React(운영, 제보 페이지)**
- 아주대학교 주변 맛집 데이터를 DB에 저장/조회/관리
- 사용자 제보를 받아 승인/거절

### 서버 주요 기능
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


### 프론트엔드 주요 기능
- admin 페이지 : 맛집 추가, 삭제, 조회, 수정
- submissions 페이지 : 제보, 조회, 승인, 거부

## Foodmap API 레퍼런스

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
- GitHub 계정 (코드 저장 및 협업)
- Vercel또는 Netlify 계정 (GitHub 연동 권장)
- Render 계정 ([render.com](https://render.com), GitHub 연동 권장)
- MongoDB Atlas 계정

### 3) 환경 변수(.env)
루트(`pwd-week5/.env`)에 아래 값을 설정하세요.
```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net (프로젝트 설정에서 제공)
```

---

## 🚀 프로젝트 시작하기

### Step 1. MongoDB Atlas DB 구축
1. MongoDB Atlas 계정 생성
- MongoDB Atlas 웹사이트 접속
- 페이지 우측 상단의 Sign Up 버튼을 클릭하여 MongoDB Atlas 계정을 생성
- 구글 계정으로 생성해도 상관 없음

2. MongoDB Atlas 클러스터 생성
- 계정 생성 후 로그인하면 Create a Cluster 버튼 확인 후클릭하여 클러스터 생성을 시작
- 클러스터 생성 화면에서 다음과 같은 설정을 진행합니다.

- Cloud Provider & Region: 클라우드 서비스 제공자와 데이터베이스를 호스팅할 지역을 선택. (예: AWS, Google Cloud 등)
- Cluster Tier: 사용하려는 클러스터의 성능과 크기를 선택. (무료 클러스터는 M0)
- Cluster Name: 클러스터 이름을 지정.
- Create Cluster 버튼을 클릭하여 클러스터 생성이 완료될 때까지 기다림. (최소 5분 소요될 수 있음)

3. Database 생성
- 클러스터가 준비되면, 클러스터 대시보드에서 Collections 탭을 클릭.
- Create Database 버튼을 클릭하여 새로운 데이터베이스를 생성.
- 데이터베이스 이름을 입력하고, 첫 번째 컬렉션 이름을 입력.
- Create 버튼을 클릭하여 데이터베이스가 생성.

4. DB 사용자 생성 및 비밀번호 설정
- MongoDB Atlas 대시보드에서 Database Access 탭을 클릭.
- Add New Database User 버튼을 클릭하여 새로운 데이터베이스 사용자를 추가.
- 사용자 이름과 비밀번호를 입력.
Username: 사용자의 이름을 설정.
Password: 안전한 비밀번호를 입력.
- Database User Privileges: 사용자에게 필요한 권한을 설정.
Read and write to any database: 모든 데이터베이스에 읽기/쓰기 권한 부여
Read only: 읽기 전용 권한 부여
Atlas admin: Atlas 관리 권한 부여
- Add User 버튼을 클릭하여 사용자가 생성.

5. 화이트리스트 설정 (IP 허용)
- MongoDB Atlas 대시보드에서 Network Access 탭을 클릭.
- IP Whitelist 섹션에서 Add IP Address 버튼을 클릭하여 화이트리스트에 IP 주소를 추가.
- Allow access from anywhere: 모든 IP에서 접근 허용하려면 0.0.0.0/0을 입력.
- Add IP Address 버튼을 클릭하여 설정을 완료.

6. 클러스터 연결 (연결 문자열)
- Clusters 탭으로 돌아가서 Connect 버튼을 클릭.
- Connect your application을 선택.
- MongoDB 연결 문자열을 확인하고 복사하여 애플리케이션 코드에서 사용 가능.
- Username과 Password는 앞서 설정한 DB 사용자 이름과 비밀번호로 교체.

7. Render 환경 변수 등록을 위해 일단 저장
- MONGODB_URI : 'mongodb+srv://<username>:<password>@<cluster0>.mongodb.net/...'
- DB_NAME :  '....'
---

### Step 2: Express 프로젝트 개발환경 구축

```bash
# Express 프로젝트 폴더 생성
mkdir pwd-week5

# 프로젝트 폴더로 이동
cd pwd-week5

# 프로젝트 생성
$ npm install express --save
```
---

### Step 3: 프로젝트 GitHub 저장소 연동
// 깃허브 접속 후 pwd-week5 저장소 생성 후

```bash
# 현재 폴더를 Git 저장소(Repository)로 초기화(Initialize)
git init

# 모든 변경 파일을 스테이징(Staging Area)에 추가
git add .

# 스테이징된 파일을 커밋(Commit)으로 기록 (-m: 메시지(Message) 옵션)
git commit -m "Init pwd-week5 : Express"

# 기본 브랜치(Branch) 이름을 main으로 변경 (-m: move)
git branch -m main

# 원격(Remote) 저장소 'origin' 등록 (GitHub URL로 연결)
git remote add origin https://github.com/<username>/pwd-week5.git

# 로컬 main을 원격 origin/main으로 최초 푸시(Push) (-u: 업스트림(Upstream) 설정)
#  → 이후에는 git push 만으로도 동일 브랜치에 푸시 가능
git push -u origin main
```

// 이후 코드 수정 시
```bash
git add .

git commit -m "....."

git push -u origin main
```

---

### Step 4. 의존성 설치 & 로컬 서버 실행 테스트
패키지 의존성(package.json) 설정
```json
{
  "name": "pwd-week5",
  "version": "1.0.0",
  "private": true,
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest --runInBand",
    "test:watch": "jest --watch --runInBand"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "mongoose": "^8.18.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "mongodb-memory-server": "^10.2.1",
    "nodemon": "^3.1.7",
    "supertest": "^7.0.0"
  }
}
```

```bash
# 패키지 설치
npm install

# 개발용 서버 실행
npm run dev
```

- 웹 브라우저 기본 주소: `http://localhost:3000`
- 응답 메시지 확인

```bash
# 헬스 체크
curl http://localhost:3000/health
```

---

### Step 5. 폴더 구조
```
src/
 ├─ app.js                        # Express 앱 구성 (라우팅/미들웨어)
 ├─ config/db.js                  # Mongoose 연결/종료 유틸
 ├─ controllers/
 │   ├─ restaurants.controller.js # 맛집 컨트롤러
 │   └─ submissions.controller.js # 제보 컨트롤러
 ├─ data/restaurants.json         # 초기 시드 데이터(DB 초기화 용)
 ├─ middleware/
 │   ├─ error.middleware.js
 │   └─ notFound.middleware.js
 ├─ models/
 │   ├─ restaurant.model.js       # 맛집 스키마
 │   └─ submission.model.js       # 제보 스키마
 ├─ routes/
 │   ├─ restaurants.routes.js     # 맛집 라우팅
 │   └─ submissions.routes.js     # 제보 라우팅
 ├─ services/
 │   ├─ restaurants.service.js    # 맛집 비즈니스 로직
 │   └─ submissions.service.js    # 제보 비즈니스 로직
 └─ utils/asyncHandler.js         # 비동기 에러 핸들러
tests/                            # 모듈 테스트 코드
 ├─ restaurants.routes.test.js    # 라우팅 테스트
 └─ restaurants.service.test.js   # 서비스 구현 테스트
package.json                      # 패키지 의존성
server.js                         # 서버 시작 + DB 연결 + 시드 주입
```

---

### Step 6. Back-end 기능 구현

4주차 실습내용을 기반으로 
- src/data/restaurants.json: 4주차 변경 없음
- src/middleware/error.middleware.js: 4주차 변경 없음
- src/middleware/notFound.middleware.js: 4주차 변경 없음


```js
// server.js
require('dotenv').config();
const { connectDB, closeDB } = require('./src/config/db');
const createApp = require('./src/app');
const { ensureSeededOnce } = require('./src/services/restaurants.service');

const PORT = process.env.PORT || 3000;

const app = createApp();

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI, process.env.DB_NAME);
    await ensureSeededOnce();
    if (require.main === module) {
      app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    }
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();

// graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down...');
  await closeDB();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down...');
  await closeDB();
  process.exit(0);
});

module.exports = app;
```

```js
// src/app.js
const express = require('express');
const cors = require('cors');
const restaurantsRouter = require('./routes/restaurants.routes');
const submissionsRouter = require('./routes/submissions.routes');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/error.middleware');
const mongoose = require('mongoose');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (req, res) => {
    const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
    res.json({ status: 'ok', db: state });
  });

  app.use('/api/restaurants', restaurantsRouter);
  app.use('/api/submissions', submissionsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
```


```js
// src/config/db.js
const mongoose = require('mongoose');

async function connectDB(uri, dbName) {
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Set it in environment variables.');
  }
  await mongoose.connect(uri, {
    dbName,
    autoIndex: process.env.NODE_ENV !== 'production',
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
    family: 4,
  });
  mongoose.connection.on('connected', () => {
    console.log(`[MongoDB] connected: ${mongoose.connection.name}`);
  });
  mongoose.connection.on('error', (err) => {
    console.error('[MongoDB] connection error:', err);
  });
}

async function closeDB() {
  try {
    await mongoose.connection.close(false);
    console.log('[MongoDB] connection closed');
  } catch (err) {
    console.error('[MongoDB] error on close:', err);
  }
}

module.exports = { connectDB, closeDB };
```

```js
// src/routes/restaurants.routes.js
const express = require('express');
const restaurantsController = require('../controllers/restaurants.controller');

const router = express.Router();

// CRUD 전용 엔드포인트
// 인기 맛집
router.get('/popular', restaurantsController.getPopularRestaurants);
router.get('/', restaurantsController.getRestaurants);
router.get('/:id', restaurantsController.getRestaurant);
router.post('/', restaurantsController.createRestaurant);
router.put('/:id', restaurantsController.updateRestaurant);
router.delete('/:id', restaurantsController.deleteRestaurant);

module.exports = router;
```

```js
// src/routes/submissions.routes.js
const express = require('express');
const controller = require('../controllers/submissions.controller');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
```

```js
// src/models/restaurant.model.js
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    location: { type: String, required: true },
    priceRange: { type: String, default: '정보 없음' },
    rating: { type: Number, default: 0 },
    description: { type: String, default: '' },
    recommendedMenu: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    image: { type: String, default: '' }
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    },
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);
```

```js
// src/models/submission.model.js
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    restaurantName: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    location: { type: String, required: true },
    priceRange: { type: String, default: '' },
    recommendedMenu: { type: [String], default: [] },
    review: { type: String, default: '' },
    submitterName: { type: String, default: '' },
    submitterEmail: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true }
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    },
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

module.exports = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
```

```js
// src/controllers/restaurants.controller.js
const restaurantService = require('../services/restaurants.service');
const asyncHandler = require('../utils/asyncHandler');

const normaliseMenu = (menu) => {
  if (!menu) return [];
  if (Array.isArray(menu)) return menu;
  if (typeof menu === 'string') {
    return menu
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

exports.getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await restaurantService.getAllRestaurants();
  res.json({ data: restaurants });
});

exports.getPopularRestaurants = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 5;
  const restaurants = await restaurantService.getPopularRestaurants(limit);
  res.json({ data: restaurants });
});

exports.getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await restaurantService.getRestaurantById(req.params.id);

  if (!restaurant) {
    res.status(404).json({ error: { message: 'Restaurant not found' } });
    return;
  }

  res.json({ data: restaurant });
});

exports.createRestaurant = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    recommendedMenu: normaliseMenu(req.body?.recommendedMenu)
  };

  const restaurant = await restaurantService.createRestaurant(payload);
  res.status(201).json({ data: restaurant });
});

exports.updateRestaurant = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    recommendedMenu: normaliseMenu(req.body?.recommendedMenu)
  };

  const updated = await restaurantService.updateRestaurant(req.params.id, payload);
  if (!updated) {
    res.status(404).json({ error: { message: 'Restaurant not found' } });
    return;
  }
  res.json({ data: updated });
});

exports.deleteRestaurant = asyncHandler(async (req, res) => {
  const deleted = await restaurantService.deleteRestaurant(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: { message: 'Restaurant not found' } });
    return;
  }
  res.status(204).send();
});
```

```js
// src/controllers/submissions.controller.js
const submissionsService = require('../services/submissions.service');
const asyncHandler = require('../utils/asyncHandler');

const normaliseMenu = (menu) => {
  if (!menu) return [];
  if (Array.isArray(menu)) return menu;
  if (typeof menu === 'string') {
    return menu.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

exports.list = asyncHandler(async (req, res) => {
  const items = await submissionsService.listSubmissions(req.query.status);
  res.json({ data: items });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await submissionsService.getSubmissionById(req.params.id);
  if (!item) return res.status(404).json({ error: { message: 'Submission not found' } });
  res.json({ data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const payload = {
    restaurantName: req.body.restaurantName,
    category: req.body.category,
    location: req.body.location,
    priceRange: req.body.priceRange ?? '',
    recommendedMenu: normaliseMenu(req.body.recommendedMenu),
    review: req.body.review ?? '',
    submitterName: req.body.submitterName ?? '',
    submitterEmail: req.body.submitterEmail ?? '',
    status: 'pending',
  };

  const required = ['restaurantName', 'category', 'location'];
  const missing = required.find((k) => !payload[k]);
  if (missing) {
    res.status(400).json({ error: { message: `'${missing}' is required` } });
    return;
  }

  const created = await submissionsService.createSubmission(payload);
  res.status(201).json({ data: created });
});

exports.update = asyncHandler(async (req, res) => {
  const payload = {
    restaurantName: req.body.restaurantName,
    category: req.body.category,
    location: req.body.location,
    priceRange: req.body.priceRange,
    recommendedMenu: Array.isArray(req.body.recommendedMenu) ? req.body.recommendedMenu : undefined,
    review: req.body.review,
    submitterName: req.body.submitterName,
    submitterEmail: req.body.submitterEmail,
    status: req.body.status,
  };
  const updated = await submissionsService.updateSubmission(req.params.id, payload);
  if (!updated) return res.status(404).json({ error: { message: 'Submission not found' } });
  res.json({ data: updated });
});

exports.remove = asyncHandler(async (req, res) => {
  const deleted = await submissionsService.deleteSubmission(req.params.id);
  if (!deleted) return res.status(404).json({ error: { message: 'Submission not found' } });
  res.status(204).send();
});
```

```js
// src/services/restaurants.service.js
const path = require('path');
const { readFileSync } = require('fs');
const Restaurant = require('../models/restaurant.model');

const DATA_PATH = path.join(__dirname, '..', 'data', 'restaurants.json');

function readSeedDataSync() {
  const raw = readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

async function getNextRestaurantId() {
  const max = await Restaurant.findOne().sort('-id').select('id').lean();
  return (max?.id || 0) + 1;
}

function getAllRestaurantsSync() {
  // 동기 데모 전용: 파일에서 즉시 반환
  const data = readSeedDataSync();
  return JSON.parse(JSON.stringify(data));
}

async function getAllRestaurants() {
  const docs = await Restaurant.find({}).lean();
  return docs;
}

async function getRestaurantById(id) {
  const numericId = Number(id);
  const doc = await Restaurant.findOne({ id: numericId }).lean();
  return doc || null;
}

async function getPopularRestaurants(limit = 5) {
  const docs = await Restaurant.find({}).sort({ rating: -1 }).limit(limit).lean();
  return docs;
}

async function createRestaurant(payload) {
  const requiredFields = ['name', 'category', 'location'];
  const missingField = requiredFields.find((field) => !payload[field]);
  if (missingField) {
    const error = new Error(`'${missingField}' is required`);
    error.statusCode = 400;
    throw error;
  }

  const nextId = await getNextRestaurantId();
  const doc = await Restaurant.create({
    id: nextId,
    name: payload.name,
    category: payload.category,
    location: payload.location,
    priceRange: payload.priceRange ?? '정보 없음',
    rating: payload.rating ?? 0,
    description: payload.description ?? '',
    recommendedMenu: Array.isArray(payload.recommendedMenu) ? payload.recommendedMenu : [],
    likes: 0,
    image: payload.image ?? ''
  });
  return doc.toObject();
}

async function resetStore() {
  const seed = readSeedDataSync();
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(seed);
}

async function ensureSeededOnce() {
  const count = await Restaurant.estimatedDocumentCount();
  if (count > 0) return { seeded: false, count };
  const seed = readSeedDataSync();
  await Restaurant.insertMany(seed);
  return { seeded: true, count: seed.length };
}

async function updateRestaurant(id, payload) {
  const numericId = Number(id);
  const updated = await Restaurant.findOneAndUpdate(
    { id: numericId },
    {
      $set: {
        name: payload.name,
        category: payload.category,
        location: payload.location,
        priceRange: payload.priceRange,
        rating: payload.rating,
        description: payload.description,
        recommendedMenu: Array.isArray(payload.recommendedMenu) ? payload.recommendedMenu : undefined,
        image: payload.image,
      }
    },
    { new: true, runValidators: true, lean: true }
  );
  return updated;
}

async function deleteRestaurant(id) {
  const numericId = Number(id);
  const deleted = await Restaurant.findOneAndDelete({ id: numericId }).lean();
  return deleted;
}

module.exports = {
  getAllRestaurants,
  getAllRestaurantsSync,
  getRestaurantById,
  getPopularRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  resetStore,
  ensureSeededOnce,
};
```

```js
// src/services/submissions.service.js
const Submission = require('../models/submission.model');

async function getNextSubmissionId() {
  const max = await Submission.findOne().sort('-id').select('id').lean();
  return (max?.id || 0) + 1;
}

async function listSubmissions(status) {
  const filter = status ? { status } : {};
  return await Submission.find(filter).sort({ createdAt: -1 }).lean();
}

async function getSubmissionById(id) {
  const numericId = Number(id);
  return await Submission.findOne({ id: numericId }).lean();
}

async function createSubmission(payload) {
  const nextId = await getNextSubmissionId();
  const doc = await Submission.create({ id: nextId, ...payload });
  return doc.toObject();
}

async function updateSubmission(id, payload) {
  const numericId = Number(id);
  return await Submission.findOneAndUpdate(
    { id: numericId },
    { $set: payload },
    { new: true, runValidators: true, lean: true }
  );
}

async function deleteSubmission(id) {
  const numericId = Number(id);
  return await Submission.findOneAndDelete({ id: numericId }).lean();
}

module.exports = {
  listSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmission,
  deleteSubmission,
};
```

### Step 7. Front-end 기능 구현
3주차 실습내용을 기반으로 

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="캠퍼스 주변 맛집을 찾아보세요!" />
    <title>Ajou Campus Foodmap - 우리 학교 맛집 지도</title>
  </head>
  <body>
    <!-- Netlif form 제거  -->

    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>      
  </body>
</html>
```

```jsx
// src/App.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
import AdminPage from './pages/AdminPage';
import SubmissionsPage from './pages/SubmissionsPage';
import SubmitPage from './pages/SubmitPage';

// Components
import Header from './components/Header';
import NotFound from './components/NotFound';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// React Query Client 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/restaurant/:id" element={<DetailPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/submissions" element={<SubmissionsPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2025 Ajou Campus Foodmap | Made with React</p>
          </footer>
        </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
```

```jsx
//src/pages/AdminPage.jsx
import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantAPI } from '../services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;

const Panel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  th, td { border-bottom: 1px solid #eee; padding: 0.5rem; text-align: left; }
  th { background: #fafafa; }
  tr:hover { background: #fafafa; }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
`;

const Danger = styled(Button)`
  color: #ff4757;
  border-color: #ffb3ba;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-height: 80px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

function AdminPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantAPI.getRestaurants,
  });

  const restaurants = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const createMutation = useMutation({
    mutationFn: restaurantAPI.createRestaurant,
    onSuccess: () => {
      toast.success('생성 완료');
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => restaurantAPI.updateRestaurant(id, payload),
    onSuccess: () => {
      toast.success('수정 완료');
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => restaurantAPI.deleteRestaurant(id),
    onSuccess: () => {
      toast.info('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      if (selected?.id) setSelected(null);
    },
  });

  const onEdit = (row) => {
    setSelected(row);
    setValue('name', row.name);
    setValue('category', row.category);
    setValue('location', row.location);
    setValue('priceRange', row.priceRange || '');
    setValue('rating', row.rating ?? 0);
    setValue('description', row.description || '');
    setValue('recommendedMenu', (row.recommendedMenu || []).join(', '));
    setValue('image', row.image || '');
  };

  const onResetForm = () => {
    setSelected(null);
    reset();
  };

  const onSubmit = async (form) => {
    const recommendedMenu = typeof form.recommendedMenu === 'string'
      ? form.recommendedMenu.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
      : [];

    const payload = {
      name: form.name?.trim(),
      category: form.category,
      location: form.location?.trim(),
      priceRange: form.priceRange?.trim() || undefined,
      rating: form.rating !== '' && form.rating !== undefined ? Number(form.rating) : undefined,
      description: form.description?.trim() || undefined,
      recommendedMenu: recommendedMenu.length ? recommendedMenu : undefined,
      image: form.image?.trim() || undefined,
    };

    if (selected?.id) {
      await updateMutation.mutateAsync({ id: selected.id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const onDelete = async (row) => {
    if (!confirm(`[삭제] ${row.name}을(를) 삭제할까요?`)) return;
    await deleteMutation.mutateAsync(row.id);
  };

  const categories = useMemo(() => ['한식','중식','일식','양식','아시안','분식','카페','기타'], []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      <Title>관리자 - 레스토랑 관리</Title>
      <Grid>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>이름</th>
                <th>카테고리</th>
                <th>평점</th>
                <th>위치</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.category}</td>
                  <td>{r.rating}</td>
                  <td>{r.location}</td>
                  <td>
                    <Actions>
                      <Button onClick={() => onEdit(r)}>수정</Button>
                      <Danger onClick={() => onDelete(r)}>삭제</Danger>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>

        <Panel>
          <h3>{selected ? `수정: ${selected.name}` : '새 레스토랑 추가'}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <label htmlFor="name">이름 *</label>
              <Input id="name" {...register('name', { required: '이름은 필수입니다' })} />
            </FormRow>
            <FormRow>
              <label htmlFor="category">카테고리 *</label>
              <Select id="category" {...register('category', { required: '카테고리는 필수입니다' })}>
                <option value="">선택</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </FormRow>
            <FormRow>
              <label htmlFor="location">위치 *</label>
              <Input id="location" {...register('location', { required: '위치는 필수입니다' })} />
            </FormRow>
            <FormRow>
              <label htmlFor="priceRange">가격대</label>
              <Input id="priceRange" {...register('priceRange')} />
            </FormRow>
            <FormRow>
              <label htmlFor="rating">평점</label>
              <Input id="rating" type="number" step="0.01" min="0" max="5" {...register('rating')} />
            </FormRow>
            <FormRow>
              <label htmlFor="recommendedMenu">추천 메뉴</label>
              <Textarea id="recommendedMenu" {...register('recommendedMenu')} placeholder="쉼표 또는 줄바꿈으로 구분" />
            </FormRow>
            <FormRow>
              <label htmlFor="image">이미지 URL</label>
              <Input id="image" {...register('image')} />
            </FormRow>
            <FormRow>
              <label htmlFor="description">설명</label>
              <Textarea id="description" {...register('description')} />
            </FormRow>
            <Actions>
              <Button type="submit" disabled={isSubmitting}>{selected ? '수정' : '생성'}</Button>
              <Button type="button" onClick={onResetForm}>초기화</Button>
            </Actions>
          </form>
        </Panel>
      </Grid>
    </Container>
  );
}

export default AdminPage;
```

```jsx
//src/pages/SubmissionsPage.jsx
import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionAPI, restaurantAPI } from '../services/api';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: ${props => (props.$active ? '#667eea' : 'white')};
  color: ${props => (props.$active ? 'white' : '#333')};
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  th, td { border-bottom: 1px solid #eee; padding: 0.5rem; text-align: left; vertical-align: top; }
  th { background: #fafafa; }
  tr:hover { background: #fafafa; }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
`;

const Danger = styled(Button)`
  color: #ff4757;
  border-color: #ffb3ba;
`;

function SubmissionsPage() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState('pending');

  const { data, isLoading, error } = useQuery({
    queryKey: ['submissions', status],
    queryFn: () => submissionAPI.listSubmissions(status === 'all' ? undefined : status),
  });

  const items = data?.data || [];

  const approveMutation = useMutation({
    mutationFn: async (submission) => {
      const payload = {
        name: submission.restaurantName,
        category: submission.category,
        location: submission.location,
        priceRange: submission.priceRange || undefined,
        description: submission.review || undefined,
        recommendedMenu: Array.isArray(submission.recommendedMenu) ? submission.recommendedMenu : undefined,
      };
      await restaurantAPI.createRestaurant(payload);
      await submissionAPI.updateSubmission(submission.id, { status: 'approved' });
    },
    onSuccess: () => {
      toast.success('승인하여 레스토랑에 등록했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id }) => submissionAPI.updateSubmission(id, { status: 'rejected' }),
    onSuccess: () => {
      toast.info('제보를 거절했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => submissionAPI.deleteSubmission(id),
    onSuccess: () => {
      toast.info('제보를 삭제했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });

  const statuses = useMemo(() => [
    { key: 'pending', label: '대기' },
    { key: 'approved', label: '승인' },
    { key: 'rejected', label: '거절' },
    { key: 'all', label: '전체' },
  ], []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      <Title>제보 관리</Title>
      <Controls>
        {statuses.map(s => (
          <FilterButton key={s.key} $active={status === s.key} onClick={() => setStatus(s.key)}>
            {s.label}
          </FilterButton>
        ))}
      </Controls>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>제보 내용</th>
            <th>제보자</th>
            <th>상태/액션</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>
                <div><strong>{it.restaurantName}</strong> ({it.category})</div>
                <div>{it.location}</div>
                {it.priceRange && <div>가격대: {it.priceRange}</div>}
                {Array.isArray(it.recommendedMenu) && it.recommendedMenu.length > 0 && (
                  <div>메뉴: {it.recommendedMenu.join(', ')}</div>
                )}
                {it.review && <div>한줄평: {it.review}</div>}
              </td>
              <td>
                <div>{it.submitterName || '-'}</div>
                <div>{it.submitterEmail || '-'}</div>
              </td>
              <td>
                <div style={{ marginBottom: '0.5rem' }}>상태: {it.status}</div>
                <Actions>
                  <Button onClick={() => approveMutation.mutate(it)} disabled={it.status === 'approved'}>승인</Button>
                  <Button onClick={() => rejectMutation.mutate({ id: it.id })} disabled={it.status === 'rejected'}>거절</Button>
                  <Danger onClick={() => { if (confirm('삭제하시겠습니까?')) deleteMutation.mutate(it.id); }}>삭제</Danger>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SubmissionsPage;
```

```jsx
//src/services/api.jsx
import axios from 'axios';

const DEFAULT_BASE_URL = 'http://localhost:3000';
const rawBaseUrl = import.meta.env?.VITE_API_BASE_URL || DEFAULT_BASE_URL;
const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log('API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export const restaurantAPI = {
  getRestaurants: async () => {
    const response = await api.get('/api/restaurants');
    return response.data;
  },

  createRestaurant: async (payload) => {
    const response = await api.post('/api/restaurants', payload);
    return response.data;
  },

  updateRestaurant: async (id, payload) => {
    const response = await api.put(`/api/restaurants/${id}`, payload);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.status;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/api/restaurants/${id}`);
    return response.data;
  },

  getPopularRestaurants: async () => {
    const response = await api.get('/api/restaurants/popular');
    return response.data;
  },
};

export const submissionAPI = {
  createSubmission: async (payload) => {
    const response = await api.post('/api/submissions', payload);
    return response.data;
  },
  listSubmissions: async (status) => {
    const response = await api.get('/api/submissions', { params: { status } });
    return response.data;
  },
  updateSubmission: async (id, payload) => {
    const response = await api.put(`/api/submissions/${id}`, payload);
    return response.data;
  },
  deleteSubmission: async (id) => {
    const response = await api.delete(`/api/submissions/${id}`);
    return response.status;
  },
};

export default api;
```

---

## Step 8. 배포
### Render Express 배포
1. 4주차 실습 서버 프로젝트 삭제
2. 새 Web Service 생성(GitHub pwd-week5 연동)
3. 환경 설정을 다음과 같이 입력합니다.
   - **Name**: `pwd-week4-<nickname>`
   - **Region**: Singapore (ap-southeast-1) 권장
   - **Branch**: `main`
   - **Root Directory**: 비워둠
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
   - **Auto Deploy**: Yes
4. Environment Variables 추가
   - MongoDB Atlas에서 생성해둔 MONGODB_URI(mongodb+srv://<userid>:<password>@<projectname>.ktfnu5b.mongodb.net/?retryWrites=true&w=majority&appName=<projectname>),  DB_NAME 추가
5. `Create Web Service` 클릭 → 빌드 로그가 성공(`Live`)인지 확인합니다.


### Netlify React App 배포
pwd-wee3 admin, submissions 개발 후 
- Netlify 무료 크레딧 모두 소진 시 Vercel에 배포
- 다른 무료 서비스 조사하여 배포 가능
---


## 📎 제출 가이드

- **제출 마감**: 강의 공지 확인 (예: 10월 12일 23:59)
- **제출 항목**
- GitHub Repository: `https://github.com/<username>/pwd-week5`
- Backend URL: `https://pwd-week5-<username>.onrender.com`
- Frontend URL: `https://pwd-week3-[username].netlify.app` or  `https://pwd-week3-[username].vercel.app`

- **체크리스트**
  - `npm test` 가 로컬에서 통과하나요?
  - 주요 REST 엔드포인트가 Render에서 정상 동작하나요?  
  - React 프론트엔드(3주차)와 연동 테스트를 완료했나요?

---


---
## 📚 추가 학습 자료
- [Express 공식 문서](https://expressjs.com/ko/)
- [W3Schools MongoDB 튜토리얼] (https://www.w3schools.com/mongodb/)

---

---

## 💬 질문 & 도움
- [Practical Web Service TA](https://chatgpt.com/g/g-68bbbf3aa57081919811dd57100b1e46-ajou-digtalmedia-practical-web-service-ta)

---

## 🎉 수고하셨습니다!
이번 주차를 통해
- Express + Mongoose로 CRUD API 설계/구현
- 제보 → 승인 → 본 데이터 반영 워크플로 설계
- Jest + In-Memory Mongo로 신뢰성 있는 테스트
- 프론트/백 분리 배포와 환경변수 구성