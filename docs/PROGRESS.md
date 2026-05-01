# 개발 진행 상황

## 현재 상태: MVP v0.1.0 완료 ✅

**작업 완료일**: 2026-05-01

---

## 완료된 작업

### 프로젝트 설정
- [x] Vite 5 + React 18 + TypeScript 5 프로젝트 구성
- [x] Tailwind CSS 3 설정 (모바일 최적화 커스텀 테마)
- [x] 모바일 Safe Area 대응 (`env(safe-area-inset-*)`)
- [x] 빌드 성공 확인

### 타입 및 데이터
- [x] `CuteCardResult`, `CuteCharacter` 등 핵심 타입 정의
- [x] 12종 캐릭터 × 3장 = 36장 카드 데이터 작성
- [x] 캐릭터별 이모지, 그라디언트 색상 지정

### 유틸리티
- [x] KST 기준 날짜 계산 (`getTodayKst`, `isToday`)
- [x] 랜덤 카드 뽑기 (`drawRandomCard`, `drawRandomCardExcept`)
- [x] localStorage CRUD (`cuteDrawStorage.ts`)
  - 오늘 기록 저장/복원/확정
  - 히스토리 저장 (최대 30일)
  - 컬렉션 업데이트

### 광고 레이어
- [x] 광고 추상화 (`src/lib/ads.ts`)
- [x] 개발 환경: mock 모드 (1.5초 후 성공 시뮬레이션)
- [x] 실제 연동 준비: `AD_GROUP_ID` 상수 + 주석 가이드

### 핵심 훅
- [x] `useCuteDraw` - 전체 앱 상태 관리
  - 하루 1회 뽑기 제한
  - 재뽑기 1회 제한
  - 광고 실패 시 기존 카드 유지
  - 화면 전환 로직

### 컴포넌트
- [x] `CuteCard` - 크기별 (sm/md/lg) 카드 UI
- [x] `DrawBox` - 뽑기 애니메이션 박스
- [x] `CharacterCollection` - 12종 컬렉션 그리드
- [x] `HistoryList` - 기록 목록 + 상세 보기

### 화면 (6개)
- [x] `HomeScreen` - 홈 (오늘 카드 상태 표시)
- [x] `DrawScreen` - 카드팩 애니메이션 뽑기
- [x] `ResultScreen` - 결과 + 재뽑기 모달
- [x] `FinalCardScreen` - 최종 카드 확인
- [x] `HistoryScreen` - 최근 7일 기록
- [x] `CollectionScreen` - 12종 컬렉션

### 문서
- [x] `docs/01-overview.md` - 프로젝트 개요
- [x] `docs/02-mvp-spec.md` - MVP 상세 명세
- [x] `docs/03-card-dictionary.md` - 카드 사전
- [x] `docs/04-ad-flow.md` - 광고 재뽑기 플로우
- [x] `docs/05-apps-in-toss-checklist.md` - 검수 체크리스트
- [x] `docs/06-future-supabase-schema.md` - Supabase 확장 스키마
- [x] `README.md` 업데이트

---

## 빌드 결과

```
dist/index.html                   0.80 kB │ gzip:  0.46 kB
dist/assets/index-*.css          18.69 kB │ gzip:  4.08 kB
dist/assets/index-*.js           33.17 kB │ gzip: 11.60 kB
dist/assets/react-*.js          140.87 kB │ gzip: 45.26 kB
✓ built in 810ms
```

---

## 다음 작업 (v0.2.0 예정)

- [ ] 실제 이미지 에셋 추가 (`public/assets/characters/`)
- [ ] Apps in Toss 콘솔 광고 그룹 ID 등록
- [ ] Apps in Toss 내부 테스트 링크로 검수
- [ ] 번들 업로드 및 검수 제출

## 장기 로드맵

- [ ] 캐릭터 24종 확장 (계절/날씨)
- [ ] Supabase 연동 (docs/06-future-supabase-schema.md 참조)
- [ ] Apps in Toss 로그인 연동
- [ ] 히스토리 서버 동기화
