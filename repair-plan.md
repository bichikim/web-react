# 수선 계획

이 문서는 레포 다각도 리뷰 결과를 바탕으로, 시간을 나눠 단계적으로 처리할 수 있게 만든 실행 계획서입니다.

## 진행 원칙

- 위험도와 파급도 기준으로 `P0 -> P1 -> P2` 순서로 진행
- 각 단계는 "수정 -> 테스트 -> 확인"을 한 묶음으로 완료
- 한 번에 큰 변경보다 작은 단위 PR(또는 커밋)로 쪼개서 처리

## P0 (즉시 처리: 보안/크래시)

### 1) 클라이언트 하드코딩 API 키 제거

- 대상: `apps/client/src/queries/query-context.ts`
- 작업:
  - 하드코딩된 Kakao REST 키 제거
  - 클라이언트에서 직접 비밀키를 들고 있지 않도록 서버 경유 구조로 변경
  - 임시로라도 환경변수 기반 주입(`import.meta.env`)으로 이동하고, 공개 범위 명확화
- 완료 기준:
  - 소스 코드에 비밀키 문자열이 남아있지 않음
  - 런타임에서 인증 헤더가 의도대로 주입됨

### 2) `react-hooks`의 `isRef` null-safe 처리

- 대상: `packages/react-hooks/src/is-ref/index.ts`
- 작업:
  - `typeof value === 'object'` 조건에 `value !== null` 가드 추가
- 완료 기준:
  - `isRef(null)` 호출 시 예외 없이 `false` 반환
  - 관련 테스트 케이스 추가

### 3) `react-signals` 예외 안전성 보장

- 대상: `packages/react-signals/src/utils.ts`
- 작업:
  - `untrack`, `batch`에 `try/finally` 적용
  - 콜백 throw 시에도 전역 상태가 복구되도록 보장
- 완료 기준:
  - 예외 발생 테스트에서 이후 시그널 동작이 정상
  - 상태 오염 재현 케이스가 사라짐

### 4) `react-components` Slot 크래시/미렌더 수정

- 대상:
  - `packages/react-components/src/components/slot/Slots.tsx`
  - `packages/react-components/src/components/slot/use-slots.ts`
- 작업:
  - `Slots`에서 `children`을 렌더하도록 수정
  - Provider 외부 사용 시 null-safe 처리(명확한 fallback 또는 에러 메시지)
- 완료 기준:
  - `Slots` 내부 `Slot` 렌더링 정상 동작
  - Provider 누락 시 런타임 TypeError 미발생

## P1 (이번 주: 계약/런타임 안정화)

### 5) 공통 빌드 CJS export 정책 정리

- 대상:
  - `packages/lib-config/src/create-vite-config.mts`
  - `packages/react-hooks/package.json`
  - `packages/react-signals/package.json`
- 작업:
  - 두 방향 중 하나를 선택해 통일:
    - A안: CJS 서브패스 파일을 실제로 생성
    - B안: ESM-only 정책으로 명확화하고 CJS 서브패스 제거
- 완료 기준:
  - `exports`와 실제 `dist` 산출물이 1:1로 일치
  - 패키지 소비 시 `MODULE_NOT_FOUND`/`ERR_PACKAGE_PATH_NOT_EXPORTED` 없음

### 6) `apps/client` SSR 스크립트와 실제 구조 일치화

- 대상:
  - `apps/client/package.json`
  - (필요 시) SSR 엔트리/tsconfig 파일
- 작업:
  - 실제 SSR을 유지할지, CSR-only로 단순화할지 결정
  - 결정에 맞게 스크립트/경로를 정리
- 완료 기준:
  - `pnpm --filter @app/client build`가 실패 없이 완료
  - `start` 경로가 실제 산출물과 일치

### 7) `vite.config.ts` 런타임 설정 정리

- 대상: `apps/client/vite.config.ts`
- 작업:
  - `define` 값에 문자열 리터럴이 아닌 실제 env 값 주입
  - `API_URL` 미설정 시 명확한 가드/에러 메시지 추가
  - PWA 아이콘 경로와 실제 파일 정합성 맞추기
- 완료 기준:
  - 개발 서버 프록시가 환경별로 안정 동작
  - PWA manifest 참조 자산 404 없음

## P2 (지속 개선: 테스트/품질 게이트)

### 8) 회귀 방지 테스트 보강

- 우선 대상:
  - `packages/react-hooks` (`isRef`, `useEvent`, observer 계열, interval 경계값)
  - `packages/react-components` (`slot`, `switch`, `progress-bar`)
  - `packages/react-signals` (`untrack`, `batch`, `immerSignal` 경계)
  - `apps/client` (`Wait` skip 테스트 복구, SSR/PWA smoke)
- 완료 기준:
  - 기존 `it.skip` 핵심 케이스 최소 1차 복구
  - 신규 버그 재현 테스트가 추가되어 재발 방지

### 9) 품질 게이트 강화

- 대상: 루트 테스트/린트 설정
- 작업:
  - 커버리지 threshold 도입 검토
  - CI(저장소 호스팅 설정 포함) 필수 체크 항목 문서화
- 완료 기준:
  - PR 머지 전 실패 기준이 명확
  - 회귀가 자동으로 감지되는 최소 게이트 확보

## 권장 작업 순서 (현실적인 묶음)

- 묶음 A (보안/크래시): P0-1,2,3,4
- 묶음 B (빌드/배포 안정화): P1-5,6,7
- 묶음 C (회귀 방지 체계): P2-8,9

## 실행 체크리스트

- [ ] A 묶음 완료
- [ ] 관련 단위 테스트 통과
- [ ] B 묶음 완료
- [ ] 빌드/실행 스모크 통과
- [ ] C 묶음 완료
- [ ] 최종 회귀 테스트 통과

## 검증 명령(기본)

- 루트 테스트: `pnpm test:unit`
- 커버리지: `pnpm test:coverage`
- 린트: `pnpm lint`
- 앱 빌드: `pnpm --filter @app/client build`

