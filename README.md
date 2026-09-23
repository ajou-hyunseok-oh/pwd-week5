# 📚 PWD Week 5 - React와 Vercel로 만드는 Ajou Campus Foodmap

> **2026년 2학기 실용 웹 개발 5주차**: React의 핵심 개념을 학습하고, 실제 작동하는 웹 서비스를 Vercel에 배포합니다.
## 📋 강의 자료
- [5주차 강의자료](https://ajou-hyunseok-oh.github.io/pwd-2026-2/)

---

## 🎯 프로젝트 소개

### 만들게 될 서비스
**아주 캠퍼스 푸드맵** - 아주대학교 주변 맛집을 소개하고 제보받는 커뮤니티 서비스

### 주요 기능
- 🍜 맛집 목록 보기
- ❤️ 좋아요 기능 (LocalStorage)
- 🔍 카테고리별 필터링
- 📝 맛집 제보 (백엔드 API 연동)
- 🏆 인기 TOP 5
- 📱 반응형 디자인

### 사용 기술
- **Frontend**: React 19.1
- **Vite**: Build Tool
- **Routing**: React Router v7
- **Styling**: Emotion (CSS-in-JS)
- **Forms**: React Hook Form
- **State**: useState, useEffect
- **API**: Axios, React Query
- **Deployment**: Vercel

---

## ✅ 사전 준비사항

### 1. 필수 프로그램 설치

#### Node.js 설치 확인
```bash
# Node.js 버전 확인 (22.0.0 이상 필요)
node --version

# npm 버전 확인 (11.0.0 이상 필요)
npm --version
```

> ⚠️ Node.js가 없다면 [nodejs.org](https://nodejs.org)에서 LTS 버전을 다운로드하세요.

#### Git 설치 확인
```bash
# Git 버전 확인
git --version
```

> ⚠️ Git이 없다면 [git-scm.com](https://git-scm.com)에서 다운로드하세요.

### 2. 계정 준비
- ✅ [GitHub 계정](https://github.com) (코드 저장용)
- ✅ [Vercel 계정](https://vercel.com) (배포용 - GitHub 계정으로 가입 권장)

### 3. 에디터 준비
- 📝 [VS Code](https://code.visualstudio.com) 권장
- 추천 확장 프로그램:  
  - Prettier: 코드 스타일을 자동으로 정리하여 일관된 형식을 유지
  - Auto Rename Tag: HTML/XML 태그의 시작 또는 종료 태그를 수정하면 자동으로 짝 태그도 함께 변경

---

## 🚀 프로젝트 시작하기

### Step 1: React + Vite 프로젝트 개발환경 구축

```bash
# React 프로젝트 폴더 생성성
mkdir pwd-week5

# 프로젝트 폴더로 이동
cd pwd-week5

# 개발 서버 실행 (테스트)
npm create vite@latest . -- --template react

> npx
> create-vite . react

│
◆  Select a framework:
│  ○ Vanilla
│  ○ Vue
│  ● React
│  ○ Preact
│  ○ Lit
│  ○ Svelte
│  ○ Solid
│  ○ Qwik
│  ○ Angular
│  ○ Marko
│  ○ Others

 Select a variant:
│  ○ TypeScript
│  ○ TypeScript + SWC
│  ○ JavaScript
│  ● JavaScript + SWC
│  ○ React Router v7 ↗
│  ○ TanStack Router ↗
│  ○ RedwoodSDK ↗
│  ○ RSC ↗


 Scaffolding project in C:\Users\hsoh\WorkspaceAjou\pwd-week5...
    npm install
    npm run dev


npm install

added 112 packages, and audited 113 packages in 4s

29 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


npm run dev

> pwd-week5@0.0.0 dev
> vite


  VITE v7.1.5  ready in 317 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

> 💡 브라우저에서 http://localhost:5173 이 열리면 성공!

### Step 2: 프로젝트 GitHub 저장소 연동
// 깃허브 접속 후 pwd-week5 저장소 생성 후

```bash
# 현재 폴더를 Git 저장소(Repository)로 초기화(Initialize)
git init

# 모든 변경 파일을 스테이징(Staging Area)에 추가
git add .

# 스테이징된 파일을 커밋(Commit)으로 기록 (-m: 메시지(Message) 옵션)
git commit -m "Init pwd-week5 : React + Vite app"

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

## 📦 주요 라이브러리 설치
### 각 라이브러리 설명

| 라이브러리 | 용도 | 버전 |
|-----------|------|------|
| react-dom | Dom 관리 | ^19.1.1 |
| react-router-dom | 페이지 라우팅 | ^7.9.1 |
| axios | HTTP 통신 | ^1.12.1 |
| react-hook-form | 폼 관리 | ^7.62.0 |
| @emotion/react | CSS-in-JS | ^11.11.0
| @tanstack/react-query |서버 상태 관리 | ^5.87.4 | |
| react-icons | 아이콘 | ^5.5.0 |
| react-toastify | 알림 메시지 | ^11.0.5 |
| react-spinners | 로딩 애니메이션 | ^0.17.0 |
---

```json
/* package.json */
{
  "name": "pwd-week5",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@tanstack/react-query": "^5.87.4",
    "axios": "^1.12.1",
    "react-hook-form": "^7.62.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.1",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5"    
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react-swc": "^4.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}
```

### 한 번에 모두 설치하기

```bash
npm install
```
---

## 📁 프로젝트 구조

### 폴더 구조 생성

```bash
# src 폴더 안에 필요한 폴더들 생성
mkdir src/components src/pages src/services src/styles
```

### 최종 구조

```
pwd-week5/
├── src/
│   ├── components/         # 재사용 컴포넌트
│   │   ├── Header.jsx
│   │   ├── NotFound.jsx
│   │   ├── PopularRestaurants.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── RestaurantList.jsx
│   │   └── SubmitRestaurant.jsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── DetailPage.jxs
│   │   ├── HomePage.jsx
│   │   ├── ListPage.jsx
│   │   ├── PopularPage.jsx
│   │   └── SubmitPage.jsx
│   ├── services/          # API 로직
│   │   └── api.jsx
│   ├── styles/            # 스타일
│   │   └── GlobalStyles.jsx
│   ├── App.css           # 기본 스타일
│   ├── App.js            # 메인 앱
│   ├── index.css         # 기본 스타일
│   └── main.jsx          # 진입점
├── .gitignore
├── index.html            # 앱 진입 HTML
├── package.json
└── README.md
└── vite.config.js
```

---

## 🔧 핵심 컴포넌트 구현

### 1. index.html 수정

```html
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
    <noscript>이 앱을 실행하려면 JavaScript를 활성화해야 합니다.</noscript>    
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>      
  </body>
</html>

```

### 2. 메인 앱 구조
```jsx
/* src/main.jsx */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```jsx
/* src/App.jsx */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
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
      <BrowserRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/restaurant/:id" element={<DetailPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2026 Ajou Campus Foodmap | Made with React</p>
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
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
```

### 3. 스타일(CSS)
- 전체 애플리케이션 (src/index.css)
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

- App 컴포넌트와 하위 컴포넌트(src/App.css)
```css
/* 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #f5f5f5;
  color: #333;
}

/* 레이아웃 */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

/* 기본 버튼 스타일 */
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background: #f0f0f0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 기본 폼 스타일 */
input, select, textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

/* 푸터 */
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* 로딩 */
.loading {
  text-align: center;
  padding: 2rem;
}

/* 에러 */
.error {
  color: red;
  padding: 1rem;
  text-align: center;
}
```

- @emotion 패키지를 이용한 전역 스타일 적용(src/styles/GlobalStyles.jsx)
```jsx
/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Emotion으로 관리할 글로벌 스타일 */
      a {
        color: inherit;
        text-decoration: none;
      }
      
      ul {
        list-style: none;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    `}
  />
);

export default GlobalStyles;
```


### 4. 연습용 가상 서버 (src/services/api.jsx)
```jsx
import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 실습용 가짜 API
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API 에러:', error);
    return Promise.reject(error);
  }
);

// API 함수들
export const restaurantAPI = {
  // 맛집 목록 가져오기 (가짜 데이터)
  getRestaurants: async () => {
    // 실제로는 백엔드 API를 호출하지만, 실습용으로 가짜 데이터 반환
    return {
      data: [
        {
          id: 1,
          name: "송림식당",
          category: "한식",
          location: "경기 수원시 영통구 월드컵로193번길 21 원천동",
          priceRange: "7,000-13,000원",
          rating: 4.99,
          description: "맛있는 한식 맛집입니다.",
          recommendedMenu: ["순두부", "김치찌개","소불고기", "제육볶음"],
          likes: 0,
          image: "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MTJfODEg/MDAxNjU0OTYzNTM3MjE1.1BfmrmOsz_B6DBHAnhQSs6qfNIDnssofR-DrzMfigIIg.JHHDheG6ifJjtfKUqLss_mLXWFE9fNJ5BmepNUVXSOog.PNG.cary63/image.png?type=w966"
        },
        {
          id: 2,
          name: "별미떡볶이",
          category: "분식",
          location: "경기 수원시 영통구 아주로 42 아카데미빌딩",
          priceRange: "7,000-10,000원",
          rating: 4.98,
          description: "바삭한 튀김과 함께하는 행복한 한입",
          recommendedMenu: ["떡볶이", "튀김", "순대", "어묵"],
          likes: 0,
          image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTJfMjcg%2FMDAxNzU0OTQ5ODk1Mjg0.GR6i3mNpJJXyqQrozGEJ65InCDBGlEmxc0aCeVHncJgg.sduDPX67J8hhoGxq4vLohpS4dXk1w-706dQLPfVs1iwg.JPEG%2Foutput%25A3%25DF1564208956.jpg"
        },
        {
          id: 3,
          name: "Sogo",
          category: "일식",
          location: "경기 수원시 영통구 월드컵로193번길 7",
          priceRange: "10,000-16,000원",
          rating: 4.89,
          description: "일식 맛집, 구 허수아비,",
          recommendedMenu: ["냉모밀", "김치돈까스나베", "코돈부르"],
          likes: 0,
          image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190707_63%2F1562462598960nPDMy_JPEG%2FW7iKQEhTMzCF3flC1t0pzgzF.jpeg.jpg"
        }
      ]
    };
  },

  // 맛집 상세 정보 가져오기
  getRestaurantById: async (id) => {
    const restaurants = await restaurantAPI.getRestaurants();
    const restaurant = restaurants.data.find(r => r.id === parseInt(id));
    return { data: restaurant };
  },

  // 인기 맛집 가져오기
  getPopularRestaurants: async () => {
    const restaurants = await restaurantAPI.getRestaurants();
    const sorted = [...restaurants.data].sort((a, b) => b.rating - a.rating);
    return { data: sorted.slice(0, 5) };
  }
};

export default api;
```
---

### 5. 컴포넌트 (src/components/)

```jsx
/* src/components/Header.jsx */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHome, FaList, FaFire, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Ajou Campus Foodmap
      </h1>
      <Nav>
        <NavLink to="/" className={isActive('/')}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/list" className={isActive('/list')}>
          <FaList /> List
        </NavLink>
        <NavLink to="/popular" className={isActive('/popular')}>
          <FaFire /> Popular Top 3
        </NavLink>
        <NavLink to="/submit" className={isActive('/submit')}>
          <FaPlus /> Submit New restaurant
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
```

```jsx
/* src/components/NotFound.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';

const Container = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border-radius: 8px;
  transition: background 0.3s;
  
  &:hover {
    background: #5a67d8;
  }
`;

function NotFound() {
  return (
    <Container>
      <Icon />
      <Title>404 - 페이지를 찾을 수 없습니다</Title>
      <Message>요청하신 페이지가 존재하지 않습니다.</Message>
      <HomeLink to="/">홈으로 돌아가기</HomeLink>
    </Container>
  );
}

export default NotFound;
```

```jsx
/* src/components/PopularRestaurants.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaTrophy, FaStar } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const RankingList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;

const RankingItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.3s;
  
  &:hover {
    background: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RankBadge = styled.div`
  font-size: 1.5rem;
  width: 50px;
  text-align: center;
  
  svg {
    font-size: 1.5rem;
  }
`;

const RestaurantInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
  
  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
`;

function PopularRestaurants({ restaurants }) {
  const getRankIcon = (rank) => {
    if (rank === 0) return <FaTrophy color="gold" />;
    if (rank === 1) return <FaTrophy color="silver" />;
    if (rank === 2) return <FaTrophy color="#CD7F32" />;
    return rank + 1;
  };

  return (
    <Container>
      <Title>🔥 이번 주 인기 TOP 5</Title>
      
      <RankingList>
        {restaurants.map((restaurant, index) => (
          <RankingItem key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
            <RankBadge>{getRankIcon(index)}</RankBadge>
            <RestaurantInfo>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.category} • {restaurant.location}</p>
            </RestaurantInfo>
            <Rating>
              <FaStar color="gold" />
              {restaurant.rating}
            </Rating>
          </RankingItem>
        ))}
      </RankingList>
    </Container>
  );
}

export default PopularRestaurants;
```

```jsx
/* src/components/RestaurantCard.jsx */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaStar, FaHeart, FaMapMarkerAlt, FaWonSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Styled Components는 그대로 유지
const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
`;

const CategoryBadge = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

// $liked로 변경 (transient prop)
const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$liked ? '#ff4757' : '#ddd'};
  background: ${props => props.$liked ? '#ff4757' : 'white'};
  color: ${props => props.$liked ? 'white' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #ff4757;
    background: #ff4757;
    color: white;
  }
`;

const DetailLink = styled(Link)`
  color: #667eea;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

function RestaurantCard({ restaurant }) {
  // State 초기화
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(restaurant.likes || 0);

  // 컴포넌트 마운트 시 LocalStorage에서 데이터 복원
  useEffect(() => {
    // 1. 좋아요 여부 복원
    try {
      const likedRestaurants = JSON.parse(
        localStorage.getItem('likedRestaurants') || '[]'
      );
      if (likedRestaurants.includes(restaurant.id)) {
        setLiked(true);
      }

      // 2. 좋아요 수 복원
      const savedLikes = JSON.parse(
        localStorage.getItem('restaurantLikes') || '{}'
      );
      if (savedLikes[restaurant.id] !== undefined) {
        setLikes(savedLikes[restaurant.id]);
      }
    } catch (error) {
      console.error('LocalStorage 읽기 오류:', error);
    }
  }, [restaurant.id, restaurant.likes]);

  const handleLike = (e) => {
    // 이벤트 전파 방지 (중요!)
    e.preventDefault();
    e.stopPropagation();

    try {
      // 새로운 상태 계산
      const newLikedState = !liked;
      const newLikesCount = newLikedState 
        ? likes + 1 
        : Math.max(0, likes - 1); // 음수 방지

      // State 업데이트
      setLiked(newLikedState);
      setLikes(newLikesCount);

      // LocalStorage 업데이트 - 좋아요 여부
      const likedRestaurants = JSON.parse(
        localStorage.getItem('likedRestaurants') || '[]'
      );
      
      if (newLikedState) {
        // 좋아요 추가
        if (!likedRestaurants.includes(restaurant.id)) {
          likedRestaurants.push(restaurant.id);
        }
        toast.success(`${restaurant.name}을(를) 좋아요했습니다! ❤️`);
      } else {
        // 좋아요 취소
        const index = likedRestaurants.indexOf(restaurant.id);
        if (index > -1) {
          likedRestaurants.splice(index, 1);
        }
        toast.info('좋아요를 취소했습니다.');
      }
      
      localStorage.setItem('likedRestaurants', JSON.stringify(likedRestaurants));

      // LocalStorage 업데이트 - 좋아요 수
      const restaurantLikes = JSON.parse(
        localStorage.getItem('restaurantLikes') || '{}'
      );
      restaurantLikes[restaurant.id] = newLikesCount;
      localStorage.setItem('restaurantLikes', JSON.stringify(restaurantLikes));

      // 디버깅용 로그
      console.log('좋아요 업데이트:', {
        restaurantId: restaurant.id,
        liked: newLikedState,
        likes: newLikesCount
      });

    } catch (error) {
      console.error('좋아요 처리 오류:', error);
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card>
      <CardImage 
        src={restaurant.image || 'https://via.placeholder.com/300'} 
        alt={restaurant.name} 
      />
      <CardContent>
        <CardHeader>
          <CardTitle>{restaurant.name}</CardTitle>
          <CategoryBadge>{restaurant.category}</CategoryBadge>
        </CardHeader>
        
        <InfoRow>
          <FaMapMarkerAlt /> {restaurant.location}
        </InfoRow>
        <InfoRow>
          <FaWonSign /> {restaurant.priceRange}
        </InfoRow>
        <InfoRow>
          <FaStar color="gold" /> {restaurant.rating}/5.0
        </InfoRow>
        
        <p style={{ margin: '1rem 0', color: '#666' }}>
          {restaurant.description}
        </p>
        
        <ActionRow>
          <LikeButton 
            $liked={liked}  // $ prefix 추가
            onClick={handleLike}
            type="button"  // 명시적 type 지정
          >
            <FaHeart /> {likes}
          </LikeButton>
          <DetailLink to={`/restaurant/${restaurant.id}`}>
            자세히 보기 →
          </DetailLink>
        </ActionRow>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
```

```jsx
/* src/components/RestaurantList.jsx */
import React from 'react';
import styled from '@emotion/styled';
import RestaurantCard from './RestaurantCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.p`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

function RestaurantList({ restaurants }) {
  if (restaurants.length === 0) {
    return <NoResults>해당 카테고리에 맛집이 없습니다.</NoResults>;
  }

  return (
    <ListContainer>
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </ListContainer>
  );
}

export default RestaurantList;
```

```jsx
/* src/components/SubmitRestaurant.jsx */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;
  
  svg {
    font-size: 4rem;
    color: #4caf50;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #4caf50;
    margin-bottom: 1rem;
  }
`;

function SubmitRestaurant() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Vercel에 배포한 화면에서 별도 백엔드 API로 제출
      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
      const response = await fetch(`${apiBaseUrl}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          recommendedMenu: data.recommendedMenu
            .split(/[\n,]/)
            .map((item) => item.trim())
            .filter(Boolean)
        })
      });
      if (!response.ok) {
        throw new Error('제보 저장에 실패했습니다.');
      }
      if (response.ok) {
        setSubmitted(true);
        toast.success('맛집이 성공적으로 제보되었습니다! 🎉');
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      toast.error('제출 중 오류가 발생했습니다.');
    }
  };

  if (submitted) {
    return (
      <FormContainer>
        <SuccessMessage>
          <FaCheckCircle />
          <h3>제보 감사합니다!</h3>
          <p>여러분의 제보로 캠퍼스 푸드맵이 더욱 풍성해집니다.</p>
          <button onClick={() => setSubmitted(false)}>
            다른 맛집 제보하기
          </button>
        </SuccessMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>🍽️ 새로운 맛집 제보하기</FormTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <FormGroup>
          <Label htmlFor="restaurantName">맛집 이름 *</Label>
          <Input
            id="restaurantName"
            {...register("restaurantName", {
              required: "맛집 이름은 필수입니다"
            })}
            placeholder="예: OO식당"
          />
          {errors.restaurantName && (
            <ErrorMessage>{errors.restaurantName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">카테고리 *</Label>
          <Select
            id="category"
            {...register("category", {
              required: "카테고리를 선택해주세요"
            })}
          >
            <option value="">선택하세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="분식">분식</option>
            <option value="카페">카페</option>
            <option value="기타">기타</option>
          </Select>
          {errors.category && (
            <ErrorMessage>{errors.category.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="location">위치 *</Label>
          <Input
            id="location"
            {...register("location", {
              required: "위치는 필수입니다"
            })}
            placeholder="예: 아주대학교 정문 도보 5분"
          />
          {errors.location && (
            <ErrorMessage>{errors.location.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priceRange">가격대</Label>
          <Input
            id="priceRange"
            {...register("priceRange")}
            placeholder="예: 8,000-12,000원"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="recommendedMenu">추천 메뉴</Label>
          <Textarea
            id="recommendedMenu"
            {...register("recommendedMenu")}
            placeholder="예: 치즈닭갈비, 막국수, 볶음밥"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="review">한줄평</Label>
          <Textarea
            id="review"
            {...register("review")}
            placeholder="이 맛집만의 특별한 점을 알려주세요"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="submitterName">제보자 이름</Label>
          <Input
            id="submitterName"
            {...register("submitterName")}
            placeholder="선택사항"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="submitterEmail">이메일</Label>
          <Input
            id="submitterEmail"
            type="email"
            {...register("submitterEmail", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식이 아닙니다"
              }
            })}
            placeholder="선택사항 (답변받을 이메일)"
          />
          {errors.submitterEmail && (
            <ErrorMessage>{errors.submitterEmail.message}</ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '제출 중...' : '맛집 제보하기'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SubmitRestaurant;
```

### 6. 페이지 (src/pages/)
```jsx
/* src/pages/DetailPage.jsx */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { restaurantAPI } from '../services/api';
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowLeft } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const DetailContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const InfoSection = styled.div`
  margin: 2rem 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f5f5f5;
  }
`;

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantAPI.getRestaurantById(id),
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
      </div>
    );
  }

  if (error || !data?.data) {
    return <div className="error">맛집을 찾을 수 없습니다.</div>;
  }

  const restaurant = data.data;

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> 뒤로 가기
      </BackButton>
      
      <h1>{restaurant.name}</h1>
      
      <RestaurantImage src={restaurant.image} alt={restaurant.name} />
      
      <InfoSection>
        <h3>기본 정보</h3>
        <p><FaMapMarkerAlt /> {restaurant.location}</p>
        <p><FaDollarSign /> {restaurant.priceRange}</p>
        <p><FaStar color="gold" /> {restaurant.rating}/5.0</p>
      </InfoSection>
      
      <InfoSection>
        <h3>소개</h3>
        <p>{restaurant.description}</p>
      </InfoSection>
      
      <InfoSection>
        <h3>추천 메뉴</h3>
        <MenuList>
          {restaurant.recommendedMenu.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </MenuList>
      </InfoSection>
    </DetailContainer>
  );
}

export default DetailPage;
```

```jsx
/* src/pages/HomePage.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaMapMarkedAlt, FaUtensils, FaStar } from 'react-icons/fa';

const HomeContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #667eea;
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

function HomePage() {
  return (
    <HomeContainer>
      <Title>우리 학교 맛집을 찾아보세요!</Title>
      <Subtitle>캠퍼스 주변 숨은 맛집들을 한눈에</Subtitle>
      
      <CardGrid>
        <Card to="/list">
          <FaMapMarkedAlt />
          <h3>맛집 둘러보기</h3>
          <p>카테고리별로 맛집을 찾아보세요</p>
        </Card>
        
        <Card to="/popular">
          <FaStar />
          <h3>인기 맛집 TOP</h3>
          <p>이번 주 가장 인기있는 맛집</p>
        </Card>
        
        <Card to="/submit">
          <FaUtensils />
          <h3>맛집 제보하기</h3>
          <p>새로운 맛집을 알려주세요</p>
        </Card>
      </CardGrid>
    </HomeContainer>
  );
}

export default HomePage;
```

```jsx
/* src/pages/ListPage.jsx */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import RestaurantList from '../components/RestaurantList';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const FilterContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

function ListPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '한식', '중식', '일식', '양식', '아시안', '분식', '카페'];

  // React Query로 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantAPI.getRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
        <p>맛집 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  const filteredData = selectedCategory === '전체' 
    ? data?.data 
    : data?.data.filter(r => r.category === selectedCategory);

  return (
    <PageContainer>
      <h2>맛집 목록</h2>
      
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <RestaurantList restaurants={filteredData || []} />
    </PageContainer>
  );
}

export default ListPage;
```

```jsx
/* src/pages/PopularPage.jsx */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PopularRestaurants from '../components/PopularRestaurants';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';

function PopularPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-restaurants'],
    queryFn: restaurantAPI.getPopularRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
        <p>인기 맛집을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  return <PopularRestaurants restaurants={data?.data || []} />;
}

export default PopularPage;
```

```jsx
/* src/pages/SubmitPage.jsx */
import React from 'react';
import SubmitRestaurant from '../components/SubmitRestaurant';

function SubmitPage() {
  return <SubmitRestaurant />;
}

export default SubmitPage;
```
---

## 📝 제보 API 연결 설정
### 1. 배포용 API 주소 설정

Vercel 정적 배포에서는 기존 Netlify Forms의 숨겨진 폼과 제출 처리를 사용할 수 없습니다. 위 제보 폼 예제는 별도 백엔드의 `POST /api/submissions`로 JSON을 전송합니다. 실제 저장소의 `SubmitRestaurant.jsx`는 이미 `submissionAPI.createSubmission()`으로 같은 API를 호출합니다.

백엔드 API는 이 저장소에 포함되어 있지 않으므로 별도로 실행·배포된 서버가 필요합니다. 폼 필드(`restaurantName`, `category`, `location` 등)와 배열 형태의 `recommendedMenu`를 받아 저장하는 API를 준비합니다. 기존 연습용 가상 서버 예제는 그대로 유지하며, 해당 가상 서버만으로 제보가 저장되지는 않습니다.

로컬에서는 프로젝트 루트의 `.env.local`에 API 주소를 설정합니다.

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

- 로컬 백엔드가 없다면 준비된 HTTPS API 주소를 사용합니다.
- 주소 끝에 `/api`를 붙이지 않습니다. 요청 코드에서 `/api/submissions`를 추가합니다.
- `.env.local` 수정 후 개발 서버를 다시 시작합니다.
- Vercel에는 방문자의 컴퓨터를 가리키는 `localhost` 대신 외부에서 접속 가능한 HTTPS API 주소를 설정합니다.
- 백엔드 CORS에서 로컬 및 실제 Vercel 사이트 origin, 사용하는 HTTP 메서드와 `Content-Type`, OPTIONS 사전 요청을 허용합니다.
- `VITE_` 변수는 브라우저에 공개되므로 비밀 키나 DB 비밀번호를 넣지 않습니다. [Vite 환경변수 문서](https://vite.dev/guide/env-and-mode)

---

## 🌐 Vercel 배포

### 1. Vercel 계정 연결

1. [vercel.com](https://vercel.com) 로그인
2. `Add New` → `Project` 선택
3. GitHub 저장소 Import 화면으로 이동

### 2. GitHub 연결

1. GitHub 계정 연결
2. GitHub 저장소 접근 권한 승인
3. 실습 리포지토리 검색
4. 리포지토리 선택 후 `Import`

### 3. 빌드 설정

자동으로 감지되지만, 확인 필요:

- **Framework Preset**: `Vite`
- **Root Directory**: `package.json`이 있는 프로젝트 루트
- **Production Branch**: `main` (실제 기본 브랜치에 맞게 설정)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: `VITE_API_BASE_URL`에 실제 HTTPS 백엔드 주소 입력 (Production과 Preview에 설정)

README의 `BrowserRouter` 예제를 사용하는 경우, 상세 페이지 직접 접속·새로고침을 위해 프로젝트 루트에 `vercel.json`을 추가합니다. 실제 저장소의 `HashRouter`는 그대로 사용할 수 있습니다.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

이 설정은 화면 라우팅용이며 API를 구현하지 않습니다. API 요청은 설정한 외부 백엔드 주소로 보냅니다. [Vercel Vite 배포 문서](https://vercel.com/docs/frameworks/frontend/vite)

`Deploy` 클릭!

### 4. 배포 상태 확인

1. 배포 로그에서 설치 및 빌드 성공 확인
2. 성공 시 생성된 `https://<project-name>.vercel.app` 주소로 접속 (실제 할당된 도메인 사용)
3. GitHub의 Production Branch에 변경을 push한 뒤 새 배포가 생성되는지 확인

### 5. 사이트 주소 확인

1. 프로젝트의 `Settings` → `Domains`에서 실제 도메인 확인
2. 실제 사이트 origin을 백엔드 CORS 허용 목록에 등록
3. Preview 배포에서도 제보를 테스트한다면 해당 origin도 백엔드에서 허용

### 6. 제보 확인

1. 배포한 사이트에서 테스트 제보 제출
2. 개발자 도구의 Network에서 `POST /api/submissions` 요청 주소와 성공 응답 확인
3. 백엔드의 저장 데이터 또는 실제 저장소의 제보 관리 화면에서 제출한 항목 확인

---

## 🐛 트러블슈팅

### 문제 1: Vercel 배포 실패

```text
빌드 결과 디렉터리 dist를 찾을 수 없음

# 해결방법
1. Vercel 프로젝트의 빌드 설정 확인
2. Root Directory가 package.json이 있는 폴더인지 확인
3. Build Command를 'npm run build', Output Directory를 'dist'로 설정
4. 빌드 로그의 오류 수정 후 재배포
```

### 문제 2: 제보가 작동하지 않음

1. VITE_API_BASE_URL이 실제 HTTPS 백엔드 주소인지 확인
2. 백엔드의 POST /api/submissions 구현과 저장 상태 확인
3. 백엔드에서 실제 프런트엔드 origin과 OPTIONS 요청을 허용했는지 확인
4. Vercel 환경변수 변경 후 새 배포 실행 (빌드 시 반영됨)

## 💬 도움 & 질문
- [Practical Web Service TA] (https://chatgpt.com/g/g-68bbbf3aa57081919811dd57100b1e46-ajou-digtalmedia-practical-web-service-ta)
---


---
## 📚 추가 학습 자료

### 공식 문서
- [React 공식 문서](https://react.dev)
- [React Router 문서](https://reactrouter.com)
- [Vercel 문서](https://vercel.com/docs/frameworks/frontend/vite)

### 추천 강의
- [생활코딩 React](https://opentutorials.org/course/4900)


## 📝 제출 방법
### 마감일
- 2026년 10월 18일 23:59까지 (한국시간)
### GitHub URL 
(예: https://github.com/<username>/pwd-week5)
### Vercel App URL
(예: https://<project-name>.vercel.app)
### 실습 체크리스트
- GitHub 저장소에 프로젝트 버전 관리가 바르게 되고 있는가?
- React로 개발한 컴포넌트와 페이지들이 모두 바르게 동작하는가?
- Vercel에 GitHub 저장소가 연결되어 자동 배포가 이루어 지고 있는가?
- 맛집 정보 제출 시 연결한 백엔드 API에 데이터가 잘 제출 되었는가?


## 🎉 축하합니다!

이제 여러분은:
- ✨ React로 실제 작동하는 웹 서비스를 만들었습니다
- ✨ 주요 React 라이브러리를 사용할 수 있습니다
- ✨ Git과 GitHub를 활용할 수 있습니다
- ✨ Vercel로 웹사이트를 배포할 수 있습니다

**다음 주**: Node.js와 Express로 백엔드 API 만들기

---

*Last Updated: 2026.09.23*\
*Created by: Hyunseok Oh - Ajou Digital Media Practical Web Service*