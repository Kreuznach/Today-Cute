# 향후 Supabase 확장 스키마

## 개요

MVP는 localStorage 기반으로 운영합니다.  
추후 서버 저장이 필요할 경우 아래 Supabase 스키마로 확장할 수 있습니다.  
모든 테이블은 `cute_` 접두사를 사용합니다.

---

## 테이블 정의

### `cute_users`

**역할**: 사용자 정보 관리 (Toss 사용자 연동)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK, Supabase auth.users.id 참조 |
| toss_user_id | text | Apps in Toss 사용자 식별자 (unique) |
| created_at | timestamptz | 가입일 |
| updated_at | timestamptz | 최근 업데이트 |

**RLS 고려사항**: `auth.uid() = id` 조건으로 본인 데이터만 접근  
**MVP에서 제외한 이유**: Apps in Toss 로그인 연동이 별도 심사 필요

---

### `cute_daily_draws`

**역할**: 하루 1회 뽑기 기록 저장

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| user_id | uuid | cute_users.id 참조 |
| date_kst | date | KST 기준 날짜 (YYYY-MM-DD) |
| first_card_id | text | 첫 번째 카드 ID |
| final_card_id | text | 최종 카드 ID (재뽑기 후 변경 가능) |
| used_redraw | boolean | 재뽑기 사용 여부 |
| finalized | boolean | 최종 확정 여부 |
| created_at | timestamptz | 뽑기 시각 |
| finalized_at | timestamptz | 확정 시각 |

**RLS 고려사항**: 본인 레코드만 SELECT/INSERT, UPDATE 허용  
**Unique 제약**: `(user_id, date_kst)` 복합 unique (하루 1회 보장)  
**MVP에서 제외한 이유**: 로그인 없이는 user_id 연동 불가

---

### `cute_characters`

**역할**: 캐릭터 마스터 데이터 (서버 관리형)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| character_key | text | PK |
| character_name | text | 캐릭터명 |
| base_mood | text | 기본 무드 |
| emoji | text | 이모지 |
| color_from | text | 그라디언트 시작색 |
| color_to | text | 그라디언트 끝색 |
| is_active | boolean | 활성 여부 |
| sort_order | int | 정렬 순서 |

**RLS 고려사항**: 모든 사용자 READ 허용, WRITE는 관리자만  
**MVP에서 제외한 이유**: 현재 캐릭터가 클라이언트 코드에 하드코딩되어 있어 불필요

---

### `cute_cards`

**역할**: 카드 마스터 데이터

| 컬럼 | 타입 | 설명 |
|------|------|------|
| card_id | text | PK |
| character_key | text | cute_characters.character_key 참조 |
| rarity | text | 'normal' / 'special' / 'seasonal' |
| mood_title | text | 오늘의 무드 제목 |
| message | text | 응원 메시지 |
| today_point | text | 오늘의 포인트 |
| small_action | text | 작은 행동 |
| collection_theme | text | 컬렉션 테마 |
| is_active | boolean | 활성 여부 |

**RLS 고려사항**: 모든 사용자 READ 허용  
**MVP에서 제외한 이유**: 클라이언트에 하드코딩, 변경 빈도 낮음

---

### `cute_collections`

**역할**: 사용자별 획득 캐릭터/카드 컬렉션

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| user_id | uuid | cute_users.id 참조 |
| character_key | text | 획득한 캐릭터 키 |
| card_id | text | 획득한 카드 ID |
| obtained_at | timestamptz | 획득 시각 |

**RLS 고려사항**: 본인 레코드만 접근  
**MVP에서 제외한 이유**: 로그인 없이는 user_id 연동 불가

---

### `cute_ad_redraw_logs`

**역할**: 광고 재뽑기 이력 (광고 분석/검증용)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| user_id | uuid | cute_users.id 참조 |
| date_kst | date | KST 날짜 |
| ad_result | text | 'success' / 'failed' / 'cancelled' |
| before_card_id | text | 재뽑기 전 카드 ID |
| after_card_id | text | 재뽑기 후 카드 ID |
| created_at | timestamptz | 이력 생성 시각 |

**RLS 고려사항**: 본인 레코드만 INSERT/SELECT  
**MVP에서 제외한 이유**: 광고 SDK 미연동 상태, mock 모드에서 로그 불필요

---

## Supabase 연동 시 작업 순서

1. Supabase 프로젝트 생성
2. 위 스키마 마이그레이션 실행
3. RLS 정책 설정
4. Apps in Toss 로그인 연동 (사용자 식별자 획득)
5. `src/features/cute-draw/storage/cuteDrawStorage.ts`에 Supabase 클라이언트 추가
6. localStorage 저장 로직을 Supabase INSERT/UPDATE로 교체
7. 오프라인 대응: localStorage를 캐시로 유지, 온라인 시 서버 동기화
