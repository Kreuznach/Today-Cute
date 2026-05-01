# Apps in Toss 검수 체크리스트

## 번들 업로드 전 확인

### 기능 체크리스트

- [ ] 하루 1회 뽑기 제한 정상 동작 (새로고침 후에도 유지)
- [ ] 재뽑기 1회 제한 정상 동작
- [ ] 재뽑기 후 자동 최종 확정 동작
- [ ] 광고 실패/취소 시 기존 카드 유지
- [ ] KST 자정 이후 새로운 뽑기 가능
- [ ] localStorage 저장/복원 정상 동작

### UI/UX 체크리스트

- [ ] Safe Area 침범 없음 (iOS 노치, 홈 인디케이터)
- [ ] 모바일 화면(375px~430px)에서 스크롤 없이 주요 UI 표시
- [ ] 탭 하이라이트 비활성화 (`-webkit-tap-highlight-color: transparent`)
- [ ] 과도한 애니메이션 없음 (접근성 고려)
- [ ] 외부 링크, iframe 없음

### 콘텐츠 체크리스트

- [ ] 운세/점괘/예언 톤 문구 없음
- [ ] "희귀 확률업", "대박", "행운 강화" 등 표현 없음
- [ ] 현금/포인트/쿠폰 등 재산적 이익 제공 없음
- [ ] 광고는 결과 화면에서만 예측 가능한 위치에 표시

### 빌드 체크리스트

- [ ] TypeScript 타입 오류 없음 (`npm run type-check`)
- [ ] 빌드 성공 (`npm run build`)
- [ ] 번들 크기 적정 (현재: ~193KB raw / ~61KB gzip)
- [ ] `dist/` 폴더 내용이 Apps in Toss 콘솔 업로드 형식과 일치

## 번들 업로드 방법

1. `npm run build` 실행
2. `dist/` 폴더를 zip으로 압축
3. Apps in Toss 콘솔 → 미니앱 → 번들 업로드
4. 검수 제출 전 내부 테스트 링크로 확인

## 광고 설정

실제 광고 연동 시:
1. Apps in Toss 콘솔에서 광고 그룹 생성
2. 발급받은 광고 그룹 ID를 `src/lib/ads.ts`의 `AD_GROUP_ID`에 입력
3. mock 모드 자동 해제 (AD_GROUP_ID가 실제 값이면 mock 비활성화)
4. 재빌드 후 업로드

## 이미지 에셋 추가 방법

현재 MVP는 이모지 + CSS 그라디언트로 캐릭터를 표현합니다.  
실제 이미지 추가 시:

1. `public/assets/characters/` 폴더에 이미지 추가
   ```
   public/assets/characters/
   ├── sleepy-otter.webp
   ├── picky-cat.webp
   └── ...
   ```

2. `src/features/cute-draw/data/characters.ts`의 각 캐릭터에 `assetPath` 추가:
   ```ts
   {
     characterKey: 'sleepy-otter',
     assetPath: '/assets/characters/sleepy-otter.webp',
     // ...
   }
   ```

3. `CuteCard.tsx`에서 `assetPath`가 있으면 이미지, 없으면 이모지로 폴백

## 테스트 시나리오

| 시나리오 | 예상 결과 |
|---------|----------|
| 최초 접속 | 홈 화면, "오늘 카드 뽑기" 버튼 |
| 카드 뽑기 | 1.2초 애니메이션 후 결과 화면 |
| 카드 확정 | 최종 카드 화면, 재시도 불가 |
| 광고 재뽑기 | 안내 모달 → 1.5초 로딩 → 새 카드 최종 확정 |
| 앱 재시작 | 오늘 기록 유지, 뽑기 불가 |
| 다음날 접속 | 홈에서 다시 "오늘 카드 뽑기" 가능 |
| 기록 화면 | 최근 7일 카드 목록 표시 |
| 컬렉션 화면 | 획득 캐릭터 활성, 미획득 잠금 표시 |
