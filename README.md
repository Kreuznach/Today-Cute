# 오늘의 귀여운 뽑기 (today-cute-draw)

> Toss in App(WebView) 미니앱 — 하루 한 번, 오늘의 귀여운 응원 카드를 뽑아보세요

## 소개

사용자가 하루에 한 번 귀여운 캐릭터 카드를 뽑고, 오늘의 응원 메시지와 작은 행동 제안을 받는 Apps in Toss 미니앱입니다.

- 12종 귀여운 캐릭터 카드
- 하루 1회 뽑기 + 광고 시청 후 재뽑기 1회
- 최근 7일 기록 & 컬렉션 화면
- localStorage 저장 (새로고침 후에도 유지)

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
# → http://localhost:5173
```

## 빌드 방법

```bash
# 프로덕션 빌드
npm run build
# → dist/ 폴더에 번들 생성

# 빌드 미리보기
npm run preview

# 타입 체크
npm run type-check
```

## Apps in Toss 배포

1. `npm run build` 실행
2. `dist/` 폴더를 zip으로 압축
3. Apps in Toss 콘솔에서 번들 업로드
4. 검수 제출 전 내부 테스트 링크로 확인

## 광고 그룹 ID 설정

실제 광고 연동 시 `src/lib/ads.ts`의 `AD_GROUP_ID`를 수정하세요:

```ts
// src/lib/ads.ts
const AD_GROUP_ID = 'YOUR_AD_GROUP_ID_HERE'; // ← 발급받은 ID 입력
```

## 이미지 에셋 추가

현재 이모지 + CSS 그라디언트로 캐릭터를 표현합니다.  
실제 이미지는 `public/assets/characters/` 폴더에 추가하고,  
`src/features/cute-draw/data/characters.ts`의 `assetPath` 필드를 채우세요.

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite 5 |
| 스타일 | Tailwind CSS 3 |
| 저장소 | localStorage |
| 광고 | mock 모드 → Apps in Toss 광고 SDK |

## 문서

| 문서 | 내용 |
|------|------|
| [docs/PROGRESS.md](docs/PROGRESS.md) | 개발 진행 상황 |
| [docs/01-overview.md](docs/01-overview.md) | 프로젝트 개요 |
| [docs/02-mvp-spec.md](docs/02-mvp-spec.md) | MVP 상세 명세 |
| [docs/03-card-dictionary.md](docs/03-card-dictionary.md) | 카드 사전 (36종) |
| [docs/04-ad-flow.md](docs/04-ad-flow.md) | 광고 재뽑기 플로우 |
| [docs/05-apps-in-toss-checklist.md](docs/05-apps-in-toss-checklist.md) | 검수 체크리스트 |
| [docs/06-future-supabase-schema.md](docs/06-future-supabase-schema.md) | Supabase 확장 스키마 |
