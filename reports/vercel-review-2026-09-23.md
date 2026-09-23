# 5주차 Vercel 실습 재현성 조사 및 시뮬레이션

> **후속 정정 및 수정 검증:** 이번 주차는 백엔드 없는 프런트엔드 실습임을 확인했습니다. 아래 최초 조사에서 제시한 실제 API/DB 준비 조건은 철회합니다. 설치 명령을 React·SWC 템플릿에 맞추고, 실제 소스를 기존 가상 데이터와 LocalStorage에 연결했습니다. 저장소와 README 예제의 설치·빌드·lint가 통과했으며, 백엔드 없이 브라우저 검증 22개 항목이 통과했습니다(API 요청 0건). [후속 검증 결과](vercel-review-2026-09-23/frontend-only-results.json). 아래 본문과 이전 로그는 수정 전 조사 기록입니다.

조사 기준일: 2026년 9월 23일 · 대상: 2026년 2학기 PWD Week 5 · 검토 커밋: `35f4e58`

**판정: Vercel 배포 방식은 유효하지만, 현재 README를 그대로 따라 하는 실습은 빌드 단계에서 막힙니다. 최종 배포 결정은 설치 안내 보정과 실제 API 검증 후 진행하는 것을 권고합니다.**

이번 검토에서는 기존 README, 앱 코드, 의존성 파일을 변경하지 않았습니다. 별도 임시 폴더에서 설치·빌드·브라우저 검증을 수행했습니다. GitHub push, Vercel 프로젝트 생성, 실제 배포는 하지 않았습니다. 대시보드 메뉴는 조사일에 열람한 공식 문서와 대조했으며, 로그인한 실제 계정에서 클릭 검증한 결과는 아닙니다.

## 1. 확인한 도구 환경

| 항목 | 확인 결과 | 실습에 미치는 영향 |
| --- | --- | --- |
| Node.js | 공식 배포본 24.21.0 LTS, 동봉 npm 11.19.0으로 검증 | 로컬과 Vercel을 Node 24.x로 맞추는 방안 권고 |
| 기존 작업 환경 | Node 26.8.2 / npm 12.0.2 | Vercel과 맞추기 위해 별도 Node 24 환경에서 재검증 |
| Vercel Node | 공식 문서는 24.x 기본값, 22.x 및 20.x도 표기 | 지원 표기와 Node 자체 수명주기는 별개. 새 실습에는 24.x 권고 |
| 최신 Vite | npm 레지스트리 조회 결과 8.3.0 | 기존 lockfile의 7.1.5와 다름 |
| 최신 create-vite | 9.2.1 | 현재 React 템플릿은 React 플러그인 및 Oxlint 사용 |
| 최신 SWC 플러그인 | `@vitejs/plugin-react-swc` 4.3.3 | 기존 lockfile은 4.0.1 |
| Vite의 Node 조건 | `^20.19.0 || >=22.12.0` | README의 “22.0.0 이상”은 부정확 |

Node 24는 조사일에 LTS이고 Node 26은 Current입니다. Node 20은 Node 공식 수명주기상 EOL이므로 Vercel 문서의 지원 목록만 보고 선택하면 안 됩니다. [Node 릴리스 현황](https://nodejs.org/en/about/previous-releases), [Vercel Node 버전 설정](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vite 시작 안내](https://vite.dev/guide/)

버전 조회 원본: [Vite](vercel-review-2026-09-23/latest-vite.json), [create-vite](vercel-review-2026-09-23/latest-create-vite.json), [실제 사용한 Node 배포 정보](vercel-review-2026-09-23/runtime.json). 버전은 조사일 스냅샷이며 이후 설치 시 달라질 수 있습니다.

## 2. 그대로 진행할 때 발생하는 문제

### A. README의 새 프로젝트 생성 경로: 빌드 실패

다음 순서로 재현했습니다.

1. 빈 폴더에서 `npm create vite@latest . -- --template react --no-interactive` 실행. 마지막 옵션만 자동 검증을 위해 추가했습니다.
2. README의 `package.json` 및 HTML·JSX·CSS 예제를 해당 파일로 추출했습니다.
3. `npm install` 후 `npm run build`, `npm run lint`를 실행했습니다.

확인된 문제:

- `--template react`는 템플릿을 이미 지정하므로 README에 제시된 React → JavaScript + SWC 선택 과정을 재현하지 않습니다.
- 생성된 `vite.config.js`는 `@vitejs/plugin-react`를 import합니다. README의 package.json은 `@vitejs/plugin-react-swc`만 선언합니다.
- 설치는 성공하지만 빌드는 `Cannot find package '@vitejs/plugin-react'`로 실패합니다.
- 최신 템플릿은 `lint: oxlint`를 사용합니다. README로 package.json을 교체하면 `lint: eslint .`가 되지만 `eslint.config.js`가 없어 lint도 실패합니다.
- README의 JSON 코드 블록 첫 줄 `/* package.json */`을 그대로 복사하면 JSON 파싱부터 실패합니다. 이번 설치 검증에서는 이 파일명 표시 주석을 제거했습니다.
- README의 설치 출력, 취약점 0건, Vite 7.1.5, 프레임워크 선택 메뉴는 현재 실행 결과를 보장하는 출력이 아닙니다.

증거: [최신 템플릿 package.json](vercel-review-2026-09-23/scaffold-package.json), [생성된 Vite 설정](vercel-review-2026-09-23/scaffold-vite.config.txt), [빌드 실패 로그](vercel-review-2026-09-23/readme-build.log), [lint 실패 로그](vercel-review-2026-09-23/readme-lint.log).

### B. 기존 저장소 설치 경로: 빌드는 성공, API가 필요

`npm ci` → `npm run build`는 통과했습니다. 기존 lockfile로 설치한 주요 버전은 다음과 같습니다.

| 라이브러리 | 저장소 lockfile 설치 | README의 범위로 새로 설치 |
| --- | --- | --- |
| React | 19.1.1 | 19.3.0 |
| React Router DOM | 7.9.1 | 7.18.4 |
| Axios | 1.12.2 | 1.20.0 |
| Vite | 7.1.5 | 7.3.6 |
| React SWC 플러그인 | 4.0.1 | 4.3.3 |

README의 `^` 버전 범위는 고정 버전이 아닙니다. 따라서 새 프로젝트와 저장소 복제 방식은 같은 라이브러리 버전으로 실행되지 않습니다. lockfile을 배포하고 `npm ci`로 설치하면 버전 재현성을 높일 수 있습니다. [npm ci 공식 설명](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

- 실제 소스의 `src/services/api.jsx`는 `/api/restaurants`, `/api/submissions` 등 실제 서버를 호출합니다. 기본 주소는 `http://localhost:3000`입니다.
- README의 맛집 API 예제는 배열을 반환하는 가상 서버입니다. 이 경로는 목록을 표시할 때 실제 API가 필요 없지만 제보에는 별도 서버가 필요합니다.
- README 예제는 `BrowserRouter`, 실제 소스는 `HashRouter`입니다. 검증 URL도 각각 `/list`와 `/#/list`로 다릅니다.
- 실제 소스에는 `/admin`, `/submissions`가 있지만 README의 App 예제에는 없습니다. 예제를 따라 작성한 학생은 제보 관리 화면을 사용할 수 없습니다.
- 실제 소스의 lint는 `SubmitRestaurant.jsx:153`의 미사용 `error` 변수 1건으로 실패했습니다. Vercel 기본 빌드 명령에는 lint가 포함되어 있지 않으므로 빌드 실패와는 구분해야 합니다.
- `npm run deploy`는 여전히 `gh-pages -d dist`입니다. Vercel 배포 명령이 아니며 이번 검증에서는 실행하지 않았습니다.

증거: [저장소 설치 로그](vercel-review-2026-09-23/repository-install.log), [빌드 로그](vercel-review-2026-09-23/repository-build.log), [lint 로그](vercel-review-2026-09-23/repository-lint.log).

### C. 의존성 점검

기존 lockfile의 `npm audit`는 취약 의존성 항목 **17건(high 13, moderate 4)**을 보고했습니다. 직접 의존성 중 Axios, React Router DOM, Vite가 포함됩니다. 이는 “17개 기능이 취약하다”거나 “17개 모두 정적 배포에 직접 악용된다”는 의미는 아닙니다. 개발 서버·빌드 도구와 브라우저 런타임의 노출 조건은 구분해야 합니다.

README 버전 범위를 신규 설치한 결과는 설치 시점에 audit 0건이었지만, 기존 저장소 의존성을 갱신한 결과를 검증한 것은 아닙니다. 이 결과만으로 현재 저장소가 안전하게 갱신되었다고 판단할 수 없습니다. 기존 lockfile의 패치 후보를 별도 적용하고 기능 검증하는 단계가 필요합니다. `npm audit fix --force`를 일괄 적용하지 않았습니다.

증거: [audit 원본](vercel-review-2026-09-23/repository-audit.log), [README 신규 설치 로그](vercel-review-2026-09-23/readme-install.log).

## 3. 현재 Vercel 대시보드와의 대응

| 실습 작업 | 공식 문서 기준 위치·동작 | 판정 |
| --- | --- | --- |
| 프로젝트 생성 | 팀 선택 → Add New… → Project → Git 저장소 Import | 현재 README와 일치 |
| 빌드 설정 | 프로젝트 Settings → Build and Deployment | README에 설정 위치 보완 필요 |
| Node 버전 | Build and Deployment → Node.js Version | 24.x 명시 권고 |
| Framework / 출력 | Vite / `npm run build` / `dist` | 현재 설정 유효 |
| 환경변수 | Settings → Environment Variables → 이름·값·적용 환경 → Save | Production·Preview 각각 확인; 변경 후 재배포 필요 |
| Production 브랜치 | Settings의 Environments에서 Production 및 Branch Tracking 확인 | `main` 문자열뿐 아니라 실제 추적 브랜치 확인 |
| 직접 URL 접속 | BrowserRouter SPA는 index.html rewrite 필요 | 현재 vercel.json이 공식 안내와 일치 |
| 첫 배포 | 새 프로젝트의 첫 배포는 Production | “일단 Deploy로 테스트”도 실제 배포에 해당 |
| 제출 주소 | Production 도메인과 개별 배포 URL의 접근 조건이 다를 수 있음 | 비로그인 브라우저에서 채점자 접근 확인 |

근거: [프로젝트 생성](https://vercel.com/docs/projects/managing-projects), [빌드 설정](https://vercel.com/docs/builds/configure-a-build), [환경변수 관리](https://vercel.com/docs/environment-variables/managing-environment-variables), [환경과 첫 배포](https://vercel.com/docs/deployments/environments), [Vite SPA rewrite](https://vercel.com/docs/frameworks/frontend/vite), [Deployment Protection](https://vercel.com/docs/deployment-protection).

수업 계정에서 추가 확인할 사항:

- Hobby 팀은 GitHub 조직의 비공개 저장소에서 배포할 수 없습니다. 학교 조직 저장소를 쓰는지, 학생 개인 저장소를 쓰는지 먼저 정해야 합니다.
- Git 연동 자동 배포에는 커밋 작성자의 계정·권한 조건이 있습니다. 자기 계정의 저장소와 연결된 Git 이메일을 사용하는 실습이 단순합니다.
- Production·Preview의 프런트엔드 origin을 백엔드 CORS에서 허용해야 합니다. API 환경변수 변경만으로 CORS가 해결되지는 않습니다.

계정 조건의 근거: [Vercel Git 배포 및 Hobby 제한](https://vercel.com/docs/git). 실제 계정의 요금제·권한·저장소 연결은 이번 로컬 검증 대상에 포함되지 않았습니다.

## 4. 브라우저 시뮬레이션 결과

macOS의 Chrome을 Playwright로 제어하여 **18개 시나리오 통과, 브라우저 pageerror 0건**을 확인했습니다.

검증 구성:

- 저장소: 원본 소스 그대로, 환경변수만 임시 API 주소로 지정하여 production build.
- README: 추출한 실습 코드에 대해 임시 폴더의 Vite 플러그인 import만 SWC로 보정한 뒤 production build.
- 각각 `vite preview`로 실행. 이는 로컬 production 산출물 검증이며 Vercel CDN·rewrite 실행 검증은 아닙니다.
- API: 별도 로컬 HTTP 서버, `{data: ...}` 응답 및 CORS/OPTIONS 구현, 테스트 제보는 프로세스 메모리에 저장.
- 외부 음식 이미지는 요청을 차단했습니다. 원격 이미지 가용성은 검증하지 않았습니다.

| 시나리오 | 저장소 코드 | README 코드(플러그인 보정 후) |
| --- | --- | --- |
| 맛집 목록 표시 | 통과 | 통과 |
| 카테고리 필터 및 빈 결과 | 통과 | 통과 |
| 상세 URL 직접 접속·새로고침 | `/#/restaurant/1` 통과 | `/restaurant/1` 통과 |
| 인기 목록 표시 | 통과 | 통과 |
| 필수 입력 누락 시 요청 차단 | 통과 | 통과 |
| JSON 제보 및 추천 메뉴 배열 변환 | 통과 | 통과 |
| 제보 목록 재조회·새로고침 | 통과 | 해당 화면 없음 |
| 서버 503 오류 메시지 | 통과 | 통과 |
| CORS 차단 시 오류 메시지 | 통과 | 통과 |
| 맛집 API 실패 시 오류 표시 | 통과 | 목록이 가상 데이터여서 해당 없음 |

**이 통과 결과는 원문 그대로의 README가 통과했다는 의미가 아닙니다.** 원문 설치 경로의 빌드 실패를 확인한 후, 원인을 분리하기 위해 임시 폴더만 보정했습니다.

실제 DB 저장, API 인증·인가, 관리자 승인·삭제, 실제 HTTPS 환경, Vercel 배포 및 GitHub 자동 재배포, Windows/Linux 환경, 모바일 화면, 좋아요 지속성은 이번 브라우저 검증에 포함하지 않았습니다. 모의 API의 성공을 실제 서비스 운영 가능 판정으로 확대하지 않았습니다.

증거: [18개 시나리오 및 요청 JSON](vercel-review-2026-09-23/browser-results.json), [브라우저 실행 로그](vercel-review-2026-09-23/browser-run.log), [저장소 제보 성공 화면](vercel-review-2026-09-23/repository-submit.png), [README 제보 성공 화면](vercel-review-2026-09-23/readme-submit.png).

## 5. 실습 내용을 유지하는 최소 보정안

새로운 강의 구조나 기능을 추가하는 대신 기존 순서에서 다음 부분만 보정하는 방안을 제안합니다. 아직 원본에 적용하지 않았습니다.

1. Node 설치 안내를 **24.x LTS 권장**으로 바꾸고, Vercel도 같은 major를 선택하도록 명시합니다. Node 22를 사용하는 경우 최소 22.12 이상이라고 적습니다.
2. React + SWC 실습을 유지하려면 생성 명령의 버전과 템플릿을 명시합니다. 검증 후보는 `npm create vite@7.1.2 . -- --template react-swc`입니다. 최신 메뉴 화면을 그대로 따라가라고 안내하지 않습니다.
3. README의 package.json 코드 블록에서 파일명 주석을 밖으로 옮깁니다. Vite·ESLint 설정도 해당 템플릿과 일치해야 합니다.
4. 검증된 package-lock.json을 수업 자료에 포함하고, 저장소 복제 경로에서는 `npm ci`를 사용합니다. 신규 코딩 실습의 첫 설치와 완성 저장소 실행을 한두 문장으로 구분합니다.
5. 기존 가상 API 예제는 유지하되, 완성 저장소의 실제 API 경로 및 제보 저장에 필요한 서버 준비 조건을 명시합니다. 현재 “다음 주에 백엔드 만들기”와 “이번 주 제보 저장” 사이의 선행 조건을 해결해야 합니다.
6. Vercel 설정에 Node 24.x, 빌드 설정 메뉴 위치, Production/Preview 환경변수, 실제 API 주소와 CORS 확인을 보완합니다.
7. 기존 lint 오류 1건을 수정하고, Vercel 실습에서 `npm run deploy`를 실행하면 안 된다는 점을 명시하거나 배포 스크립트를 별도 정리합니다.
8. 기존 lockfile의 의존성 보안 패치를 검토하고 수정 후보를 재검증합니다. Vite 8 전면 전환은 배포 플랫폼 변경에 필수적인 조치가 아닙니다.

보정안 추가 검증: 임시 폴더에서 `create-vite@7.1.2`의 `react-swc` 템플릿을 생성하고 README의 실습 코드를 적용했습니다. `npm install` 및 빌드는 통과했고 설치 시 audit 0건이었습니다. 생성 템플릿에 ESLint 설정도 있어 lint는 실행되지만 미사용 catch 변수 1건을 지적했습니다. 그 변수만 임시 복사본에서 제거한 후 lint도 통과했습니다. 설치 로그에는 ESLint 9 지원 종료 경고가 있어 도구 지원 기간 검토는 별도로 남습니다. 이 실험은 버전 범위의 신규 설치 결과이며, 원본 lockfile 갱신 검증과는 구분합니다.

증거: [고정 템플릿 생성](vercel-review-2026-09-23/pinned-scaffold.log), [보정안 설치](vercel-review-2026-09-23/corrected-install.log), [보정안 빌드](vercel-review-2026-09-23/corrected-build.log), [미사용 변수 제거 후 lint](vercel-review-2026-09-23/corrected-lint-fixed.log).

## 6. 배포 결정 기준

| 결정 단계 | 현재 상태 |
| --- | --- |
| Vercel을 실습 배포 플랫폼으로 채택 가능한가? | 가능: Vite 정적 배포 및 Git 연동 절차 유효 |
| 현재 README를 그대로 수업에 배포할 수 있는가? | 보정 필요: 새 프로젝트 경로에서 빌드 실패 재현 |
| 저장소가 Node 24에서 빌드되는가? | 통과 |
| 대표 화면 및 제보 요청 흐름이 동작하는가? | 모의 API 기준 통과 |
| 실제 서버와 DB까지 검증했는가? | 미검증: 실제 API 주소·테스트 데이터 미제공 |
| 실제 Vercel 계정에서 배포 가능한가? | 미검증: 로그인·권한·원격 빌드·접근 보호 확인 필요 |
| 이번 조사에서 배포했는가? | 하지 않음 |

다음 결정에 필요한 구체적 결과는 **최소 보정안의 원본 반영 → 고정 의존성 재검증 → 실제 API/DB 검증 → 실제 계정 설정 검토**입니다. 이 결과를 검토한 뒤 최종 배포 여부를 결정하면 됩니다.
