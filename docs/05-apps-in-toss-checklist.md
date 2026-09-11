# Apps in Toss 배포 전 체크리스트

## SDK 버전 확인 (제일 먼저 확인하기!)

토스는 앱인토스(Apps in Toss) SDK를 **3.1 버전 이상**으로 쓰라고 권장해요.
SDK는 우리 앱이 토스 앱 안에서 잘 동작하도록 도와주는 "도구 상자" 같은 거예요.
너무 오래된 도구 상자를 쓰면 새로운 기능이 빠져 있거나, 토스에서 정한 규칙이 바뀌었을 때 문제가 생길 수 있어요.

**현재 이 프로젝트가 쓰는 버전**: `@apps-in-toss/web-framework` **3.4.0** (2026-09-11 기준 최신 정식 버전)

버전을 직접 확인하고 싶다면 터미널에 아래 명령어를 입력해보세요.

```bash
npm ls @apps-in-toss/web-framework
```

결과에 `3.4.0`처럼 3.1 이상 숫자가 보이면 안전해요. 만약 `2.x.x`처럼 낮은 버전이 보이면 아래처럼 업그레이드하세요.

```bash
npm install @apps-in-toss/web-framework@latest
```

> **주의**: 2.x → 3.x는 큰 버전이 바뀌는(major) 업그레이드라서 설정 파일 이름도 바뀌어요.
> - `granite.config.ts` → `apps-in-toss.config.ts` (파일 이름이 바뀜)
> - `outdir` → `webBundleDir` (설정 안의 이름이 바뀜)
> - `brand`에는 이제 `primaryColor`만 남아요 (`icon`은 앱인토스 콘솔에서 직접 등록)
>
> 이 프로젝트에는 이미 위 변환이 자동으로 적용되어 있어요. 만약 예전 `granite.config.ts` 파일을 다시 쓰고 있다면,
> 아래 명령어로 자동 변환할 수 있어요 (실행 전 git commit으로 백업해두는 걸 추천!).
>
> ```bash
> npx ait migrate v3
> ```

## 번들 업로드 전 확인

### 기능 체크리스트

- [ ] 하루 1회 뽑기 제한 정상 작동 (새로고침 후에도 유지)
- [ ] 재뽑기 1회 제한 정상 작동
- [ ] 재뽑기 후 자동 최종 확정 작동
- [ ] 광고 실패/취소 시 기존 카드 유지
- [ ] KST 자정 이후 새로운 뽑기 가능
- [ ] localStorage 저장 복원 정상 작동
- [ ] 배너 광고 탭 진입/이탈 시 노출/숨김 정상 작동

### UI/UX 체크리스트

- [ ] Safe Area 침범 없음 (iOS 기기, 안드로이드 에뮬레이터)
- [ ] 모바일 화면(375px~430px)에서 크리티컬 주요 UI 표시
- [ ] 탭 하이라이트 비활성화 (`-webkit-tap-highlight-color: transparent`)
- [ ] 과도한 애니메이션 없음 (접근성 고려)
- [ ] 외부 링크, iframe 없음

### 콘텐츠 체크리스트

- [ ] 점세/불괘/불언 등 문구 없음
- [ ] "당첨 확률", "뽑기", "행운 강화" 등 표현 없음
- [ ] 도박/포인트/쿠폰 등 재산상 이익 제공 없음
- [ ] 광고는 결과 화면에서만 노출 / 메인화면 하단(배너) 예측 가능한 위치에 표시

### 빌드 체크리스트

- [ ] TypeScript 타입 오류 없음 (`npm run type-check`)
- [ ] 클린빌드 성공 (`npm run build:ait`)
- [ ] `today-cute-pick.ait` 파일 생성 확인 (프로젝트 루트)
- [ ] `.ait` 압축에 `app.json` 포함 확인
- [ ] 번들 크기 적정

## 번들 업로드 방법

### 번들 구조 (`dist/` 및 `.ait` 루트)

```
today-cute-pick.ait
├── app.json        → Apps in Toss 매니페스트 (필수)
├── index.html      → 앱 진입점
├── favicon.svg
└── assets/
    ├── index-*.js
    ├── index-*.css
    └── react-*.js
```

`app.json`은 Apps in Toss 콘솔에서 번들 유효성을 검사할 때 반드시 존재해야 하는 매니페스트 파일입니다.  
`public/app.json`에 위치하며, Vite 빌드 시 `dist/`로 자동 복사됩니다.

### app.json 설정

`public/app.json` 파일을 확인하고, Apps in Toss 콘솔에서 발급받은 앱 ID를 `id` 필드에 업데이트하세요.

```json
{
  "schemaVersion": "1",
  "id": "today-cute-pick",
  "deploymentId": "019dec3e-45e7-7655-8259-d22013298640",
  "name": "오늘의 귀여운 뽑기",
  "version": "0.2.0",
  "entry": "index.html",
  "orientation": "portrait",
  "backgroundColor": "#ffffff"
}
```

> 참고: 이 파일에는 SDK 버전을 적는 칸이 없어요. SDK 버전은 `package.json`의
> `@apps-in-toss/web-framework` 값으로 관리돼요 (위 "SDK 버전 확인" 참고).

버전 변경 시 `public/app.json`의 `version`과 `package.json`의 `version`을 함께 업데이트하세요.

### .ait 파일 빌드

**클린빌드 (권장 - 프로젝트 업로드 시 항상 사용)**:
```bash
npm run clean
npm run build:ait
```
`npm run clean`이 기존 `dist/`와 `.ait` 파일을 지우고, `npm run build:ait`가 타입 검사(`tsc`) → 웹 빌드(`vite build`) → 앱인토스 패키징(`ait build`)을 순서대로 실행해 `today-cute-pick.ait`를 새로 만들어요.

**일반 빌드 (개발 중 빠른 확인용)**:
```bash
npm run build
```
`build:ait`와 똑같이 타입 검사 → 웹 빌드 → `.ait` 패키징까지 실행해요. 기존 파일을 지우지 않고 덮어쓰기 때문에, 업로드용 최종본을 만들 때는 꼭 위의 클린빌드를 먼저 실행하세요.

### 업로드 절차

1. `npm run build:ait` 실행 (클린빌드)
2. 프로젝트 루트의 `today-cute-pick.ait` 파일 확인
3. Apps in Toss 콘솔 → 미니앱 → 번들 업로드 → `.ait` 파일 선택
4. 심사 제출 후 승인 시 테스트 링크로 확인

> **주의**: 과거 zip 파일 업로드 방식은 더 이상 사용하지 않습니다.  
> `today-cute-pick.ait`는 자동 생성되는 Apps in Toss 전용 번들 형식입니다.

## 광고 설정

### 보상형 광고 (카드 재뽑기)
- 광고 그룹 ID: `ait.v2.live.be5532d27f574f4b` → 설정 완료
- mock 모드 자동 제거 (실제 ID가 있을 때 운영 환경에서는 실제 광고 노출)

### 배너 광고 (메인화면 하단)
- 광고 그룹 ID: `ait.v2.live.PENDING` → **발급 후 교체 필요**
- `src/lib/ads.ts`의 `BANNER_AD_ID` 상수 업데이트
- PENDING 상태에서는 자동으로 mock 모드 작동 (플레이스홀더 표시)

## 캐릭터 이미지 에셋 가이드

### 현재 방식 (MVP)

이모지 + CSS 그라디언트로 캐릭터를 표현합니다.  
별도 이미지 파일 없이 작동하며, 번들 크기를 최소화합니다.

```ts
// characters.ts에서 각 캐릭터의 색상과 이모지 정의
{
  characterKey: 'sleepy-otter',
  emoji: '🦦',
  colorFrom: '#A8D8EA',
  colorTo: '#C4E6F3',
}
```

### 실제 이미지 추가 방법

1. **파일 규격**
   - 포맷: `.webp` (권장, 파일 크기 최소화)
   - 크기: `256×256px` 또는 `512×512px` (2배 이상)
   - 배경: 투명(PNG 또는 WebP 사용 권장)
   - 파일명: `{characterKey}.webp` (예: `sleepy-otter.webp`)

2. **파일 배치**
   ```
   public/assets/characters/
   ├── sleepy-otter.webp
   ├── picky-cat.webp
   ├── hyper-hamster.webp
   ├── soft-chick.webp
   ├── walk-dog.webp
   ├── lazy-turtle.webp
   ├── cloud-bunny.webp
   ├── sparkle-fox.webp
   ├── shy-panda.webp
   ├── rascal-raccoon.webp
   ├── steady-bear.webp
   ├── star-penguin.webp
   ├── pure-sheep.webp
   ├── ocean-octopus.webp
   ├── tiny-frog.webp
   ├── sweet-koala.webp
   ├── dreamy-whale.webp
   ├── morning-bird.webp
   ├── wise-owl.webp
   ├── brave-lion.webp
   ├── calm-elephant.webp
   ├── flower-butterfly.webp
   ├── mini-deer.webp
   └── happy-pig.webp
   ```

3. **타입 확장** (`src/features/cute-draw/types.ts`):
   ```ts
   export interface CuteCharacter {
     // ...기존 필드
     assetPath?: string;  // 추가
   }
   ```

4. **데이터 업데이트** (`src/features/cute-draw/data/characters.ts`):
   ```ts
   {
     characterKey: 'sleepy-otter',
     assetPath: '/assets/characters/sleepy-otter.webp',
     // ...
   }
   ```

5. **컴포넌트 폴백 처리** (`CuteCard.tsx`, `CharacterCollection.tsx`):
   ```tsx
   {character.assetPath ? (
     <img
       src={character.assetPath}
       alt={character.characterName}
       className="w-full h-full object-contain"
       onError={(e) => { e.currentTarget.style.display = 'none'; }}
     />
   ) : (
     <span className="text-3xl">{character.emoji}</span>
   )}
   ```

6. **번들 크기 주의**
   - 24종 × 512×512px WebP → 최대 2~3MB 이상
   - Apps in Toss 번들 크기 제한 확인 필요
   - 필요 시 128×128px 축소 권장

## 테스트 시나리오

| 시나리오 | 예상 결과 |
|---------|----------|
| 최초 접속 | 홈 화면, "오늘 카드 뽑기" 버튼, 배너 광고 플레이스홀더(DEV) |
| 카드 뽑기 | 1.2초 애니메이션 → 결과 화면 |
| 카드 확정 | 최종 카드 화면, 다시 뽑기 불가 |
| 광고 재뽑기 | 안내 모달 → 1.5초 로딩(mock) → 새 카드 최종 확정 |
| 재접속 시 | 오늘 기록 유지, 뽑기 불가 |
| 다음날 접속 | 전날에도 표시 "오늘 카드 뽑기" 가능 |
| 기록 화면 | 최근 7일 카드 목록 표시 |
| 컬렉션 화면 | 획득 캐릭터 활성, 미획득 잠금 표시 (24종) |
