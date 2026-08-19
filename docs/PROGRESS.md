# 최근 진행 상태

## 현재 상태: MVP v0.2.0 완료 후

**마지막 업데이트**: 2026-08-19 (v0.2.7)

---

## 완료된 작업

### 프로젝트 설정
- [x] Vite 5 + React 18 + TypeScript 5 프로젝트 생성
- [x] Tailwind CSS 3 설정 (커스텀 디자인 토큰 정의)
- [x] 모바일 Safe Area 지원 (env(safe-area-inset-*))
- [x] 기본 화면 동작 확인

### 타입 및 데이터
- [x] CuteCardResult, CuteCharacter 타입 정의 및 재활용
- [x] 12종 캐릭터 × 3개 = 36개 카드 데이터 작성
- [x] 캐릭터별 색상 팔레트, 이모지 기본 지정

### 유틸리티
- [x] KST 기준 날짜 계산 (getTodayKst, isToday)
- [x] 가중치 기반 랜덤 뽑기 (drawRandomCard, drawRandomCardExcept)
- [x] localStorage CRUD (cuteDrawStorage.ts)
  - 오늘 기록 저장/불러오기
  - 히스토리 관리 (최대 30개)
  - 재뽑기 상태 업데이트

### 광고 연동 (v0.2.0 완료)
- [x] 광고 추상화 레이어 (src/lib/ads.ts)
- [x] GoogleAdMob API 연동 (@apps-in-toss/web-framework)
  - loadAppsInTossAdMob: 사전 로드 (이벤트 기반 콜백)
  - showAppsInTossAdMob: 노출 (userEarnedReward, dismissed, failedToShow 이벤트)
- [x] AIT 환경 자동 감지 (isAitSupported())
- [x] 개발 환경: 1.5초 딜레이 후 자동 성공 시뮬레이션
- [x] 테스트 ID 자동 적용 (DEV 또는 VITE_AD_ENV=test)

### 타입 정의

### 훅
- [x] useCuteDraw - 전체 앱 상태 관리
  - 하루 1회 뽑기 제한
  - 재뽑기 1회 제한
  - 광고 실패 시 이전 카드 복귀
  - 화면 전환 흐름

### 컴포넌트
- [x] CuteCard - 사이즈별(sm/md/lg) 카드 UI
- [x] DrawBox - 뽑기 애니메이션 템스
- [x] CharacterCollection - 12종 캐릭터 목록
- [x] HistoryList - 기록 리스트 + 날짜 포맷

### 화면 (6개)
- [x] HomeScreen - 메인 진입 화면
- [x] DrawScreen - 뽑기 진행 화면
- [x] ResultScreen - 결과 확인 화면
- [x] FinalCardScreen - 최종 카드 확정 화면
- [x] CollectionScreen - 캐릭터 도감 화면
- [x] HistoryScreen - 뽑기 기록 화면

### AIT 빌드 시스템 (v0.2.0 완료)
- [x] @apps-in-toss/web-framework v2.4.7 설치
- [x] granite.config.ts 설정 (appName, brand, navigationBar 등)
- [x] .granite/app.json 설정 (today-cute-pick)
- [x] npm run build:ait → today-cute-pick.ait 생성 성공
- [x] vite-plugin-zip-pack 제거 (불필요)

---

## v0.2.7 수정 이력 (2026-08-19)

### 화면이 세로로 비는 문제
- **원인**: `.screen`은 `h-full`인데 홈 히어로·뽑기 박스·결과 카드가 고정 높이
- **수정**:
  - Home 히어로: `flex-1 min-h-[168px]`로 남는 세로 흡수
  - DrawBox: `w-64 h-80` → 부모를 채우는 가변 박스 (`max-h-[360px]`)
  - CuteCard `fill`: 결과/최종 화면에서 메시지 영역이 남은 높이를 사용
  - flex 자식 `min-h-0`으로 WebView 높이 계산 안정화

### 유입/흥미 (로컬 데이터만, 보상 없음)
- 요일 인사 (`getTodayGreeting`)
- 연속 방문 일수 (`getDrawStreak`) — “연속 N일째 카드를 받았어요”
- 최근 7일 말랑 도장 (`WeekStampRow`)
- 홈 컬렉션 미리보기 (미획득 `❓`)
- 의견·백로그: [docs/07-layout-and-engagement.md](07-layout-and-engagement.md)

---

## v0.2.6 수정 이력 (2026-05-18)

### 전체 화면 - 좌우 패딩 통일 (HomeScreen 기준 px-4)
- **문제**: CollectionScreen·HistoryScreen이 v0.2.5에서 `px-2`로 설정되어 다른 화면과 불일치
- **수정**: CollectionScreen·HistoryScreen 헤더·컨텐츠 영역 `px-2` → `px-4`로 복원
- **결과**: 전체 6개 화면 좌우 패딩 `px-4` (16px) 통일, 컨텐츠 너비 343px 기준 일치

---

## v0.2.5 수정 이력 (2026-05-18)

### CollectionScreen - 3열 그리드 복원 + 패딩 최소화
- **화면 패딩**: 헤더 + 컨텐츠 영역 `px-4` → `px-2` (좌우 여백 최소화)
- **그리드**: `grid-cols-2 gap-3` → `grid-cols-3 gap-2` (3열 복원)
- **아이템**: 이모지 영역 `w-20 h-20 text-4xl` → `w-14 h-14 text-2xl`, 내부 패딩 `p-4` → `p-3`, 이름 `text-sm` → `text-xs`

### HistoryScreen - 패딩 최소화 + 아이템 대형화
- **화면 패딩**: 헤더 + 컨텐츠 영역 `px-4` → `px-2` (좌우 여백 최소화)
- **리스트 아이템**: 패딩 `p-4` → `p-5`, 간격 `gap-3` → `gap-4`, 이모지 `w-16 h-16 text-3xl` → `w-20 h-20 text-4xl rounded-2xl`
- **텍스트**: 캐릭터명 `text-base font-medium` → `text-lg font-semibold`, 무드타이틀 `text-xs` → `text-sm`

---

## v0.2.4 수정 이력 (2026-05-18)

### 전체 화면 - 메인 콘텐츠 영역 레이아웃 패턴 통일
- **변경**: HomeScreen의 `flex-1 px-4 flex flex-col gap-3 pt-3` 패턴을 다른 화면에 일관 적용
- **DrawScreen**: 분리된 설명 div + flex-1 박스 + 안내 div → 단일 `flex-1 px-4 flex flex-col pt-3` 컨테이너로 통합
- **ResultScreen**: 서브타이틀 div 분리 제거 → `flex-1 px-4 flex flex-col gap-3 pt-3 overflow-y-auto`에 자막 + 카드 통합
- **FinalCardScreen**: `overflow-y-auto py-3` → `flex flex-col gap-3 pt-3 overflow-y-auto pb-3`, `mt-3` 제거 (gap이 대체)
- **HistoryScreen / CollectionScreen**: `pt-3` 추가로 헤더 하단 여백 통일

---

## v0.2.3 수정 이력 (2026-05-18)

### 홈 화면 - 마지막 업데이트 표시 변경
- **변경**: 사용자 뽑기 히스토리 날짜 → 미니앱 자체 업데이트 날짜 및 내역으로 교체
- **구현**: `HomeScreen` 내 정적 상수 `APP_UPDATE` 정의 (`date`, `description`)
- **정리**: `history` prop 불필요로 `HomeScreenProps`에서 제거, `App.tsx` 전달 제거

### 전체 화면 - 좌우 여백 최소화
- **변경**: 모든 화면의 `px-5`(20px) → `px-4`(16px), 과도한 수직 여백 축소
- **대상 파일**: HomeScreen, DrawScreen, ResultScreen, FinalCardScreen, HistoryScreen, CollectionScreen
- **컴포넌트**: HistoryList 아이템 `p-3.5` → `p-3`, `gap-3` → `gap-2`
- **컴포넌트**: CharacterCollection 그리드 `gap-3` → `gap-2`, 아이템 `p-3` → `p-2.5`, 이모지 아이콘 `w-14 h-14` → `w-12 h-12`
- **기타**: 카드 내 margin, gap도 소폭 축소하여 전반적 압축감 개선

---

## v0.2.2 수정 이력 (2026-05-18)

### 홈 화면 - 마지막 기록 표시
- **내용**: 홈 화면 하단 메뉴 아래에 "마지막 기록" 날짜 표시 추가
- **구현**:
  - `HomeScreenProps`에 `history: CuteHistoryItem[]` prop 추가
  - 오늘 카드가 확정된 경우 `todayRecord.dateKst`, 아니면 `history[0].dateKst` 사용
  - 기록 없을 시 "아직 기록이 없어요" 표시
  - `App.tsx`에서 `history` prop 전달

### 최근 기록 화면 - 모바일 풀스크린 수정
- **원인**: `.screen` CSS 클래스가 `min-h-screen`으로 설정되어 flex-1 + overflow-y-auto가 제대로 동작하지 않음
- **해결**: `.screen` 클래스를 `min-h-screen` → `h-full`로 변경
  - 부모 컨테이너(`max-w-md h-full`)와 높이를 맞춰 viewport 전체를 채우도록 수정
  - `flex-1 overflow-y-auto` 스크롤 영역이 정확히 남은 공간을 채움
  - 모든 화면(홈, 뽑기, 결과, 최종, 기록, 컬렉션)에 동일 적용

### 빌드 환경 수정
- **원인**: `node_modules/csstype/index.d.ts` 파일이 다운로드 중 손상(3072줄에서 미완성 상태로 잘림)
- **해결**: 손상된 csstype 삭제 후 `npm install`로 재설치 (22569줄 정상 복구)
- **결과**: `tsc --noEmit && vite build` 전체 성공, `today-cute-pick.ait` 클린 빌드

---

## v0.2.1 수정 이력 (2026-05-08)

### 광고 후 상자 애니메이션 복원

- **원인**: 광고 시청 성공 후 바로 `final` 화면으로 이동하여 상자 여는 애니메이션 미표시
- **해결**:
  - `confirmRedrawModal`에서 새 카드 뽑기 후 `draw` 화면으로 이동 (1.2초 애니메이션)
  - 1.2초 후 새 카드와 함께 `result` 화면으로 전환
  - `DrawScreen`에 `isRedraw?: boolean` prop 추가 — 재뽑기 시 안내 텍스트/박스 변경
  - `useCuteDraw`에 `isRedrawAnimation` 상태 추가
  - `finalizeCard`에 중복 확정 가드 추가 (`todayRecord.finalized`이면 화면만 전환)
  - `ResultScreen` 확정 버튼 텍스트: 재뽑기 완료 후 "최종 카드 확인하기"로 변경

### AIT 빌드 복구 (v0.2.1)

- **환경 이슈**: Node.js v24.14.0 + Windows 경로 길이 제한으로 npm 설치 중 여러 파일 누락
- **해결 방법**:
  - `ts-interface-checker/dist/util.js` → `npm install --force ts-interface-checker`
  - `@clack/prompts/dist/index.mjs` → `npm install --force @clack/prompts`
  - `cosmiconfig-typescript-loader/dist/esm/typescript-compile-error.mjs` → 수동 ESM 심 생성
  - `@apps-in-toss/ait-format/dist/index.mjs` → 수동 ESM 심 생성 (전체 exports 포함)
  - `pathe/dist/utils.mjs`, `@shopify/semaphore/index.mjs` → ESM 심 생성
  - `recast/node_modules/source-map/lib/*` → `@granite-js/mpack`에서 복사
  - `source-map/lib/*` → C:\tmp\bb에 단축 경로로 설치 후 복사
  - `bluebird/js/release/*` → C:\tmp\bb에 단축 경로로 설치 후 복사
- **결과**: `today-cute-pick.ait` 3.59MB 빌드 성공 (2026-05-08)

---

## v0.2.0 수정 이력

### 한글 깨짐 수정 (granite.config.ts)
- **원인**: 배치 리네임 스크립트(Set-Content)가 UTF-8 BOM을 삽입하여 한글이 깨짐
- **해결**: [System.IO.File]::WriteAllText + UTF8NoBom 인코딩으로 재작성

### 광고 API 수정 (src/lib/ads.ts)
- **원인**: window.AppsInToss.loadAd/showAd 인터페이스는 존재하지 않음
- **해결**: GoogleAdMob.loadAppsInTossAdMob / showAppsInTossAdMob 이벤트 기반 API로 전면 교체
- **타입 수정**: ShowAdMobOptions.adUnitId → adGroupId (실제 타입 정의 기준)

---

## 다음 목표 (v0.3.x)

- [ ] 온보딩 1장 (하루 한 장 / 광고 재뽑기 / 점세 아님)
- [ ] 카드 단위 도감 진행률 (characterKeys + cardIds)
- [ ] TossAd 배너 광고 연동 (DOM API)
- [ ] 푸시 알림 (하루 1회 뽑기 리마인더)
- [ ] 앱스인토스 심사 제출