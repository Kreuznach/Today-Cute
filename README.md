# 오늘의 귀여운 뽑기 (today-cute-pick)

> Toss in App(WebView) 미니앱으로 하루 한 번, 오늘의 귀여운 응원 카드를 뽑아보세요.

## 소개

사용자가 하루 한 번 귀여운 캐릭터 카드를 뽑고, 오늘의 응원 메시지와 함께 소소한 동기를 받는 Apps in Toss 미니앱입니다.

- 12종의 귀여운 캐릭터 카드
- 하루 1번 뽑기 + 광고 시청 후 재뽑기 1회
- 최근 7일 기록 & 컬렉션 화면
- localStorage 저장(새로고침 후에도 유지)

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
# 프로덕션 빌드 (타입 체크 → 웹 빌드 → .ait 패키징까지 한 번에)
npm run build
# → dist/ 폴더 + today-cute-pick.ait 생성

# 빌드 미리보기
npm run preview

# 타입 체크만 따로 하기
npm run type-check
```

## Apps in Toss 배포

> **SDK 버전**: `@apps-in-toss/web-framework` **3.4.0** 사용 중 (토스 권장 기준인 3.1 이상을 만족해요)

1. `npm run clean` 실행 (예전에 만든 dist/.ait 파일 정리)
2. `npm run build:ait` 실행 (클린빌드 — 타입 체크 → 웹 빌드 → `.ait` 패키징)
3. 프로젝트 루트의 `today-cute-pick.ait` 파일 확인
4. Apps in Toss 콘솔에서 번들 업로드 → `.ait` 파일 선택
5. 심사 제출 후 승인 시 링크로 확인

자세한 절차와 체크리스트는 [docs/05-apps-in-toss-checklist.md](docs/05-apps-in-toss-checklist.md)를 참고하세요.

## 광고 그룹 ID 설정

실제 광고 동작 시 `src/lib/ads.ts`의 광고 ID 상수를 설정하세요.

```ts
// src/lib/ads.ts
export const REWARD_AD_ID = 'YOUR_AD_GROUP_ID_HERE'; // → 발급받은 ID 입력
```

## 이미지 에셋 추가

현재 이모지 + CSS 그라디언트로 캐릭터를 표현합니다.  
실제 이미지는 `public/assets/characters/` 폴더에 추가하고,  
`src/features/cute-draw/data/characters.ts`의 `assetPath` 필드를 채우세요.

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite 5 |
| 스타일링 | Tailwind CSS 3 |
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
| [docs/05-apps-in-toss-checklist.md](docs/05-apps-in-toss-checklist.md) | 배포 전 체크리스트 |
| [docs/06-future-supabase-schema.md](docs/06-future-supabase-schema.md) | Supabase 확장 스키마 |
| [docs/07-layout-and-engagement.md](docs/07-layout-and-engagement.md) | 풀하이트 레이아웃 · 유입/흥미 의견 |
| [docs/08-fun-emoji-and-copy-ideas.md](docs/08-fun-emoji-and-copy-ideas.md) | 재미 · 재방문용 이모지/그림/문구 아이디어 (적용 완료) |
| [docs/09-character-image-guide.md](docs/09-character-image-guide.md) | 캐릭터 그림 만들기 · 변환 가이드 (적용 완료) |
| [docs/10-animation-guide.md](docs/10-animation-guide.md) | 움직이는 캐릭터 분석 · 가이드 (미적용) |
