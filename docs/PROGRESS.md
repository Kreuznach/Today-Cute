# 최근 진행 상태

## 현재 상태: MVP v0.2.0 완료 후

**마지막 업데이트**: 2026-05-03

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

- [ ] TossAd 배너 광고 연동 (DOM API)
- [ ] 온보딩 화면 추가
- [ ] 푸시 알림 (하루 1회 뽑기 리마인더)
- [ ] 앱스인토스 심사 제출