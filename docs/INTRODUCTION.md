너는 Apps in Toss(WebView) 미니앱 개발에 익숙한 시니어 프론트엔드 엔지니어이자 제품 설계자다.

이번 프로젝트는 “오늘의 귀여운 뽑기”라는 Toss in App 미니앱을 초기 개발하는 것이다.
앱의 핵심은 사용자가 하루에 한 번 귀여운 캐릭터 카드를 뽑고, 오늘의 응원 메시지와 작은 행동 제안을 받는 것이다.

중요:
- 실제 Apps in Toss 콘솔에 번들 업로드 및 검수 제출 가능한 MVP를 목표로 한다.
- WebView 기반 Toss in App 미니앱으로 가정한다.
- TDS(Toss Design System)를 사용할 수 있는 구조를 우선 고려한다.
- 라이트 모드 기준으로 설계한다.
- Safe Area를 침범하지 않도록 한다.
- 외부 링크, iframe, 외부 서비스 이동은 사용하지 않는다.
- 현금, 포인트, 쿠폰, 경품 등 재산상 이익은 전혀 제공하지 않는다.
- 운세/점괘/예언처럼 보이지 않게 “귀여운 응원 카드” 톤으로 만든다.
- “희귀 확률업”, “대박”, “행운 강화” 같은 표현은 사용하지 않는다.
- 광고는 사용자가 예상 가능한 결과 화면에서만 노출한다.
- 광고 시청 후 재뽑기는 하루 1회만 가능하며, 두 번째 카드는 오늘의 최종 카드로 강제 확정된다.
- 실제 광고 연동 전에는 mock 모드로 개발하고, 추후 Apps in Toss 광고 API로 교체 가능하게 만든다.
- 앱인토스 광고는 공식 문서 기준으로 사전 로드 후 노출하는 흐름을 고려한다.
- 현재 프로젝트 구조를 먼저 분석하고, 기존 Apps in Toss 설정이 있다면 최대한 유지하되 복잡하면 정리한다.

서비스명:
- 국문명: 오늘의 귀여운 뽑기
- 보조 후보: 오늘의 응원 카드, 오늘의 말랑 카드
- 영문 appName 후보: today-cute-draw
- 내부 prefix: cute

MVP 핵심 기능:
1. 하루 1회 캐릭터 카드 뽑기
2. 12종 캐릭터 기반 카드 결과 출력
3. 광고 시청 후 하루 1회 한정 재뽑기
4. 재뽑기 결과는 최종 카드로 저장
5. 최근 7일 카드 기록
6. 카드 컬렉션 화면
7. localStorage 기반 저장
8. 추후 Supabase 확장 가능 구조

초기 캐릭터 12종:
1. 졸린 수달
2. 새침 고양이
3. 과몰입 햄스터
4. 말랑 병아리
5. 산책 강아지
6. 느긋한 거북이
7. 구름 토끼
8. 반짝 여우
9. 소심한 판다
10. 장난꾸러기 라쿤
11. 든든한 곰돌이
12. 별빛 펭귄

추후 확장:
- 24종: 계절/날씨 캐릭터 추가
- 36종: 직장/학교/소비/취미 캐릭터 추가
- 48종: 이벤트/스페셜 카드 추가
- 60종: 시즌 컬렉션/한정 카드 추가

카드 결과 구조:
각 카드에는 아래 필드를 가진다.

type CuteCardResult = {
  cardId: string;
  characterKey: string;
  characterName: string;
  rarity: "normal" | "special" | "seasonal";
  moodTitle: string;
  message: string;
  todayPoint: string;
  smallAction: string;
  collectionTheme: string;
};

캐릭터 구조:
type CuteCharacter = {
  characterKey: string;
  characterName: string;
  baseMood: string;
  visualHint: string;
  cards: CuteCardResult[];
};

초기 데이터:
- 캐릭터 12종
- 각 캐릭터당 카드 3개 이상
- 총 36개 이상 카드
- 이미지가 아직 없을 수 있으므로, 우선 CSS 기반 카드/이모지/색상/심볼로 대체 가능한 구조를 만든다.
- 추후 이미지 에셋이 들어와도 쉽게 교체 가능하게 characterImageKey 또는 assetPath 필드를 고려한다.

화면 구성:

1. 홈 화면
- 앱 제목: 오늘의 귀여운 뽑기
- 부제: 하루 한 번, 오늘의 응원 카드를 뽑아보세요
- 오늘 카드 뽑기 버튼
- 이미 오늘 카드가 확정된 경우 “오늘 카드 보기” 버튼
- 최근 기록/컬렉션 진입 버튼

2. 카드 뽑기 화면
- 귀여운 랜덤박스 또는 카드팩 애니메이션
- “카드 뽑기” 버튼
- 1~2초 정도의 가벼운 뽑기 연출
- 과한 사운드/무거운 애니메이션은 제외

3. 결과 화면
- 캐릭터 카드 크게 표시
- 캐릭터명
- 오늘의 무드
- 응원 메시지
- 오늘의 포인트
- 작은 행동
- 버튼:
  - 오늘 카드 확정하기
  - 광고 보고 한 번 더 뽑기

4. 광고 후 재뽑기 흐름
- 안내 모달:
  - “광고 시청 후 오늘 카드를 한 번 더 뽑을 수 있어요.”
  - “두 번째 카드는 오늘의 최종 카드로 저장돼요.”
  - “재뽑기는 하루 1회만 가능해요.”
- 광고 mock 성공 시 재뽑기 실행
- 광고 실패 또는 취소 시 기존 카드 유지
- 재뽑기 후 자동 최종 확정

5. 최종 카드 화면
- 오늘의 최종 카드 표시
- “내일 다시 새로운 카드를 뽑을 수 있어요” 안내
- 최근 7일 기록으로 이동
- 컬렉션으로 이동

6. 최근 기록 화면
- 최근 7일 카드 목록
- 날짜, 캐릭터명, moodTitle 표시
- 상세 클릭 시 카드 다시 보기

7. 컬렉션 화면
- 12종 캐릭터 목록 표시
- 획득한 캐릭터는 활성 표시
- 아직 못 뽑은 캐릭터는 실루엣/잠금 느낌으로 표시
- MVP에서는 상세한 확률/희귀도 시스템은 제외

저장 구조:
localStorage 기준으로 아래 정보를 저장한다.

- cute_today_record
  - dateKst
  - firstCard
  - finalCard
  - usedRedraw
  - finalized
  - createdAt
  - finalizedAt

- cute_history
  - 최근 30일 또는 7일 기록 배열

- cute_collection
  - 획득한 characterKey 목록
  - 획득한 cardId 목록

KST 날짜 처리:
- KST 기준 오늘 날짜를 계산한다.
- 새로고침해도 오늘 카드 상태가 유지되어야 한다.
- 하루 1회 뽑기 제한과 재뽑기 1회 제한이 명확히 적용되어야 한다.

광고 구조:
- 실제 Apps in Toss 광고 API를 바로 하드코딩하지 말고 src/lib/ads.ts로 추상화한다.
- 개발 환경에서는 mockAdMode를 사용한다.
- 추후 loadAppsInTossAdMob / showAppsInTossAdMob 기반으로 교체 가능하게 한다.
- 광고 로드 실패 시 안전한 폴백을 제공한다.

광고 문구:
사용할 문구:
- “오늘 카드 다시 뽑기”
- “광고 시청 후 한 번 더 뽑을 수 있어요”
- “두 번째 카드는 오늘의 최종 카드로 저장돼요”
- “재뽑기는 하루 1회만 가능해요”

피해야 할 문구:
- “대박 카드”
- “희귀 확률 업”
- “행운 강화”
- “더 좋은 카드 받기”
- “운세 바꾸기”
- “꽝 피하기”

추천 파일 구조:
- src/features/cute-draw/types.ts
- src/features/cute-draw/data/characters.ts
- src/features/cute-draw/utils/date.ts
- src/features/cute-draw/utils/random.ts
- src/features/cute-draw/storage/cuteDrawStorage.ts
- src/features/cute-draw/hooks/useCuteDraw.ts
- src/features/cute-draw/components/CuteCard.tsx
- src/features/cute-draw/components/DrawBox.tsx
- src/features/cute-draw/components/CharacterCollection.tsx
- src/features/cute-draw/components/HistoryList.tsx
- src/lib/ads.ts
- docs/01-overview.md
- docs/02-mvp-spec.md
- docs/03-card-dictionary.md
- docs/04-ad-flow.md
- docs/05-apps-in-toss-checklist.md
- docs/06-future-supabase-schema.md

구현할 것:
1. 현재 프로젝트 구조 분석
2. Apps in Toss 설정 확인
3. 타입 정의
4. 12종 캐릭터 데이터 작성
5. 카드 랜덤 뽑기 로직 작성
6. KST 기준 하루 1회 제한 구현
7. 광고 재뽑기 mock flow 구현
8. 홈/뽑기/결과/기록/컬렉션 화면 구현
9. localStorage 저장/복원 구현
10. 빌드 확인
11. 문서 작성

이번 1차 작업에서 제외할 것:
- 실제 Supabase 저장
- 사용자 로그인
- 푸시/스마트 메시지
- 실제 공유 기능
- 실제 이미지 에셋 대량 제작
- 복잡한 희귀도/확률 시스템
- 인앱 결제
- 리더보드

Supabase 확장 문서:
MVP는 localStorage로 만들되, docs/06-future-supabase-schema.md에 추후 확장 테이블을 제안하라.
테이블명은 cute_ 접두사를 사용한다.

예상 테이블:
- cute_users
- cute_daily_draws
- cute_characters
- cute_cards
- cute_collections
- cute_ad_redraw_logs

각 테이블에 대해 역할, 주요 컬럼, RLS 고려사항, MVP에서 당장 만들지 않는 이유를 작성하라.

품질 기준:
- TypeScript 타입 오류 없어야 함
- 빌드 성공해야 함
- 모바일 화면에서 사용성이 좋아야 함
- 카드 뽑기 결과가 새로고침 후에도 유지되어야 함
- 하루 1회 제한이 적용되어야 함
- 광고 재뽑기는 하루 1회만 가능해야 함
- 광고 실패 시 기존 카드가 유지되어야 함
- 문구가 점괘/사행성/확률형 과금처럼 보이지 않아야 함
- 캐릭터 이미지가 없어도 MVP가 예쁘게 보이도록 카드 UI를 구성해야 함

작업 방식:
바로 구현하기 전에 먼저 현재 프로젝트 구조를 분석하고, 생성/수정할 파일 목록과 구현 계획을 보여줘.
그 다음 진행해도 되는 구조라면 실제 구현까지 진행해라.

최종 보고:
작업 완료 후 아래를 정리하라.
- 생성/수정한 파일 목록
- 실행 방법
- 빌드 방법
- Apps in Toss 테스트 시 확인할 것
- 광고 그룹 ID를 넣어야 하는 위치
- 실제 이미지 에셋을 추가할 위치
- Supabase를 붙일 경우 다음 작업