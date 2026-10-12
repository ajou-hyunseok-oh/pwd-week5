# TypeScript README 실습 재현성 검토

검토일: 2026-10-12. 대상은 TypeScript로 전환한 현재 작업 트리와 README입니다.

**수정된 README의 A 경로는 프로젝트 생성부터 브라우저 기능 확인·배포용 빌드까지 재현됩니다.** B 경로도 설치·타입 검사·린트·빌드는 통과하지만 기존 lockfile의 의존성 취약점 경고 23건은 남아 있습니다. 실제 GitHub push와 Vercel 계정 배포는 이번 검증 범위에 포함하지 않았습니다.

## 재현 방법과 범위

- macOS arm64, Node.js 24.21.0, npm 11.20.0, Playwright를 통한 Chromium으로 검증했습니다.
- A 경로: 빈 임시 폴더에 `create-vite@7.1.2`의 `react-swc-ts` 템플릿 생성 → 초기 `npm install` → README의 TypeScript·HTML·CSS·JSON 예제 23개 파일 추출 → README에 지정한 설정 파일 적용 → 다시 설치·검사·빌드했습니다.
- B 경로: 현재 소스·설정·lockfile을 별도 폴더에 복사하고 `npm ci`로 설치했습니다.
- 두 경로 모두 기존 작업 폴더의 `node_modules`를 공유하거나 링크하지 않았습니다. README 검증에 CSS 예제도 포함했습니다.
- A 경로에서 새로 생성한 lockfile을 또 다른 빈 의존성 환경으로 복사해 `npm ci`와 빌드가 재현되는지 확인했습니다.
- 브라우저 검증은 각 경로의 production build를 `vite preview`로 실행했습니다. README는 일반 경로, 저장소는 해시 경로를 사용했습니다.

이전 전환 작업의 README 검증은 기존 의존성을 공유했으므로 신규 설치 시 선택되는 버전까지 검증한 결과는 아니었습니다. 이번 검토에서 그 범위를 보완했습니다.

## 발견한 문제와 수정

| 문제 | 재현 결과·실습 영향 | 적용한 수정 |
| --- | --- | --- |
| 좋아요 저장 실패에도 성공 표시 | LocalStorage 쓰기를 실패시키면 성공·오류 알림이 함께 표시되고 숫자가 증가했습니다. 두 경로에서 재현됐습니다. | 두 저장값의 쓰기를 완료한 뒤 상태·성공 알림을 변경합니다. 두 번째 쓰기가 실패하면 먼저 저장한 좋아요 목록을 복원합니다. 추가·취소 각각의 실패도 검증했습니다. |
| 모바일 가로 넘침 | 375px·320px 뷰포트에서 문서 너비가 439px이 되어 메뉴가 화면 밖으로 나갔습니다. | 메뉴 줄바꿈, 모바일 본문 여백, 카드 그리드 최소 너비를 수정했습니다. 320px에서 홈·목록·인기·상세·제보·404 경로도 확인했습니다. |
| 두 시작 경로의 중복 수행 가능성 | 완성 저장소 실행 뒤 새 프로젝트를 다시 만들 수 있는 흐름이었습니다. clone·작업 폴더·서버 종료 안내도 부족했습니다. | A/B 중 하나 선택, Fork·clone·`cd`, `Ctrl+C`와 새 터미널 사용, B 경로의 생략 범위를 명시했습니다. |
| 설정 적용 방법의 모호함 | package.json 전체 교체와 재설치, 설정 파일 내용 복사가 선택 사항처럼 읽힐 수 있었습니다. | 전체 교체·재설치·설정 파일 5개 적용을 명시했습니다. `eslint.config.js`와 `.ts`가 함께 남지 않도록 안내했습니다. |
| 최종 코드보다 먼저 배포할 가능성 | 최초 템플릿 push 뒤 구현 코드·lockfile·rewrite 설정을 다시 push해야 하는 시점이 분명하지 않았습니다. | Vercel Import 앞에 rewrite 생성 → 타입 검사·린트·빌드·미리보기 → 최종 commit/push 순서를 배치했습니다. |
| 새 실습에도 불필요한 배포 패키지 포함 | 신규 설치에서 high 경고 5건이 `gh-pages → globby → fast-glob/micromatch → braces` 의존 경로에 걸렸습니다. | Vercel용 README package.json에서 `gh-pages`, `predeploy`, `deploy`를 제외했습니다. 이후 신규 설치 audit는 0건입니다. 기존 저장소의 GitHub Pages 명령과 lockfile은 별도 유지했습니다. |
| 저장 결과를 확인하는 주소·상태 혼동 | 포트가 다르면 LocalStorage가 분리되고, 제보는 pending이라 목록에 즉시 나타나지 않습니다. | 개발·미리보기·Production 주소의 저장 분리, pending 상태, 제보 관리 화면의 범위를 설명했습니다. |

컴포넌트와 CSS 수정은 실제 소스와 README 예제에 함께 적용했습니다. 라이브러리 표와 제출 체크리스트도 현재 구성에 맞췄습니다.

## 검증 결과

| 검증 | A: README로 새로 구현 | B: 완성 저장소 |
| --- | --- | --- |
| 의존성 설치 | `npm install` 통과 | `npm ci` 통과 |
| TypeScript 검사 | 통과 | 통과 |
| ESLint | 통과 | 통과 |
| production build | 통과 | 통과 |
| 브라우저 | 20/20 통과 | 20/20 통과 |
| `npm audit` | 0건 | moderate 4, high 19, 총 23건 |
| 새 lockfile로 clean install 후 빌드 | 통과 | 기존 lockfile clean install 통과 |

수정 전 브라우저 검증은 32개 중 26개 통과, 6개 실패였습니다. 저장 실패와 모바일 결함을 수정하고 회귀 검증을 추가한 뒤 **40개 모두 통과**했습니다. JS 실행 오류와 백엔드 fetch/XHR 요청은 두 경로 모두 0건입니다.

검증한 기능은 목록·필터·빈 결과·상세 URL 직접 접속/새로고침·없는 맛집·404·평점순 인기 목록·좋아요 추가/취소/새로고침·필수 입력 검증·메뉴 문자열 변환·제보 저장/새로고침·브라우저별 저장 분리·선택 필드 생략·저장 실패·잘못된 저장 데이터·모바일 레이아웃입니다. 테스트 당시 초기 음식 이미지 3개도 실제 외부 요청으로 로드됐습니다. 이후 이미지 제공처의 가용성까지 보장하는 결과는 아닙니다.

### 신규 설치와 기존 lockfile의 차이

README의 `^` 범위는 고정 버전이 아닙니다. 이번 설치에서 확인한 주요 버전은 다음과 같습니다.

| 패키지 | A 신규 설치 | B 기존 lockfile |
| --- | --- | --- |
| React / React DOM | 19.3.0 | 19.1.1 |
| React Router DOM | 7.18.4 | 7.9.1 |
| React Query | 5.104.2 | 5.87.4 |
| React Hook Form | 7.90.0 | 7.62.0 |
| Vite | 7.3.7 | 7.1.5 |
| TypeScript | 5.9.3 | 5.9.3 |
| ESLint | 9.39.5 | 9.35.0 |

`npm ci`는 각 프로젝트가 커밋한 lockfile을 재현합니다. Vercel Install Command에도 `npm ci`를 안내하고 lockfile을 push하도록 명시했습니다. [npm ci 공식 문서](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

## 남아 있는 사항

1. **기존 저장소의 의존성 경고:** B 경로의 23건은 설치 실패를 뜻하지 않지만 보안 업데이트 검토가 필요합니다. 직접 의존성에는 Axios, React Router DOM, Vite, gh-pages가 포함되며 모든 항목이 production 브라우저 취약점이라는 뜻은 아닙니다. A 경로의 최신 호환 버전으로 주요 기능이 검증됐지만, 기존 배포 명령의 제거·변경이나 전체 lockfile 갱신은 이번 README 검토에서 수행하지 않았습니다. [원본 audit 결과](readme-review-2026-10-12/repository-audit.json)
2. **도구 지원 경고:** 새 설치에서도 ESLint 9 지원 종료 경고가 표시됩니다. 검사 자체는 통과했습니다. 실습 중 강제 메이저 업그레이드와 혼동하지 않도록 안내했으며, 장기적인 도구 갱신은 별도 검토 대상입니다.
3. **실제 Vercel 완료 확인:** 설정 문법, Node 24 선택, GitHub Import·Production branch·SPA rewrite를 공식 문서와 대조했습니다. 원격 설치·빌드, 계정 권한, Git 자동 배포, 공개 도메인 접근은 실제 계정에서 최종 확인해야 합니다. 로컬 `vite preview` 통과는 Vercel CDN에서 rewrite가 실행됐다는 증거가 아닙니다. [Vite SPA 설정](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas), [Node 24](https://vercel.com/changelog/node-js-24-lts-is-now-generally-available-for-builds-and-functions), [Git 연동](https://vercel.com/docs/git), [접근 보호](https://vercel.com/docs/deployment-protection)
4. **배포할 변경분:** 현재 검토한 TypeScript 전환·README·설정 파일들이 GitHub에 반영되어야 학생이 Fork/clone 또는 링크로 같은 내용을 사용할 수 있습니다. 이번 작업에서는 commit·push·공개 배포를 실행하지 않았습니다.
5. **범위:** Windows·Linux 실행, 실제 모바일 기기, Firefox·Safari, 선택 기능인 관리자 화면 전체는 이번 README 기본 실습 검증에 포함하지 않았습니다. 저장소 관리자 기능은 앞선 TypeScript 전환 검증과 별개의 범위입니다.

## 근거 파일

- [환경·버전·검증 요약 JSON](readme-review-2026-10-12/results.json)
- [수정 전 브라우저 결과](readme-review-2026-10-12/browser-before.json), [수정 후 40개 결과](readme-review-2026-10-12/browser-after.json)
- [모바일 수정 전](readme-review-2026-10-12/readme-mobile-before.png), [수정 후](readme-review-2026-10-12/readme-mobile-after.png)
- [README 신규 설치](readme-review-2026-10-12/readme-install-after.txt), [타입 검사](readme-review-2026-10-12/readme-typecheck.txt), [린트](readme-review-2026-10-12/readme-lint.txt), [빌드](readme-review-2026-10-12/readme-build.txt)
- [README lockfile clean install](readme-review-2026-10-12/readme-ci-install.txt), [clean install 후 빌드](readme-review-2026-10-12/readme-ci-build.txt)
- [저장소 설치](readme-review-2026-10-12/repository-install.txt), [타입 검사](readme-review-2026-10-12/repository-typecheck.txt), [린트](readme-review-2026-10-12/repository-lint.txt), [빌드](readme-review-2026-10-12/repository-build.txt)
- [README 신규 설치의 수정 전 audit](readme-review-2026-10-12/readme-audit.json), [수정 후 audit](readme-review-2026-10-12/readme-audit-after.json)
