# Hansung University Interactive 3D Campus

## Overview

한성대학교 캠퍼스맵을 바탕으로 만든 인터랙티브 건축 모형 아틀라스입니다. 한국어 UI, 건물 검색과 상세 정보, 카메라 이동, 투어를 제공합니다.

**The 3D campus is a stylized interpretation based on reference campus maps and is not intended as a survey-grade or navigation-grade digital twin.**

## Tech Stack

Next.js 16 App Router · TypeScript · React 19 · Three.js · React Three Fiber 9 · drei 10 · Lucide. `package-lock.json`에 설치 버전이 기록됩니다. 별도 서버, API 키, 유료 서비스가 필요하지 않습니다.

## Campus snapshot update — 2026-11-02

사용자가 제공한 나무위키 HTML(문서 수정 시각 2026-09-06)을 읽어 건물별 설명과 외형을 보완했습니다. 중앙 공간은 상상마당 잔디광장으로 수정했고 미래마당·풋살/테니스장·학군단·제1별관을 추가해 총 24곳을 탐색할 수 있습니다. 설명은 시설 성격과 연결 관계를 요약하며, 운영 시간·요금·예정/철거 시설을 현재 이용 정보로 제공하지 않습니다.

상세 패널에는 로컬 WebP 사진 23장이 표시됩니다. 사진 크레딧은 일반 텍스트이며, 사이트의 나무위키 이동 링크는 제거했습니다. 추가 장소의 위치는 일러스트와 본문 이웃 관계에서 추정한 임의 좌표입니다. 사진 목록은 `data/namuPhotos.json`, 설명은 `data/campusStories.ts`, 변경 근거와 원본 사진 대응은 `artifacts/namu-campus/UPDATE.md`에 정리했습니다. 이미지의 권리는 각 원저작자에게 있으며, 저장본의 본문 라이선스 안내는 개별 사진의 권리를 일괄 보장하지 않습니다.

## Naksan landscape — 2026-11-02

중문을 6시로 볼 때 학군단 쪽 3시에서 공학관 뒤 12시까지 이어지는 산 능선과 낙산성곽을 추가했습니다. 사용자 제공 낮·밤 사진의 석축, 여장, 녹지와 따뜻한 조명을 스타일화했습니다. 기본·평면 시점을 넓혀 전체 풍경이 보이도록 했으며 이름·경로·녹지 레이어가 새 풍경에도 적용됩니다. 실제 측량 지형이나 성곽 선형을 복원한 것은 아닙니다.

`components/campus/NaksanLandscape.tsx`에 지형·성곽·산책로·조명·수목을 모듈화했습니다. 반복 구조는 인스턴싱하며, 야간 벽면 조명은 절차적으로 만든 부드러운 빛 표현을 사용합니다. 새 검증: `node scripts/verify-fortress.mjs`. 변경 근거와 결과는 `artifacts/NAKSAN_UPDATE.md`에 있습니다.

## Features

- 상세 패널에서 건물·출입구·광장·코트 사진 23장을 표시합니다. `public/images/campus-stories/`의 최적화된 로컬 파일을 우선 사용하여 외부 이미지 서버에 의존하지 않습니다. 원본 비율·출처를 유지하고 모바일에서는 상세 패널을 스크롤할 수 있습니다.
- `data/campusPhotos.ts`에서 장소와 사진을 연결하고 `components/ui/BuildingPhoto.tsx`에서 로딩 실패 안내를 처리합니다. 이미지 변경·로딩·모바일 패널 검증은 `scripts/verify-photos.mjs`, 결과는 `artifacts/photo-verification.json`에 기록합니다.

- 주요 건물 17곳, 출입구 3곳, 안내실과 광장·코트 3곳: 총 24개 장소
- `campus_map_main.png`를 우선한 공간 관계, 단차 지형과 옹벽, 계단, 보행로, 운동장과 테니스 코트
- 건물별 외형·입면, 인스턴싱된 수목, 그림자
- 한글·영문·분류 검색, 범주 필터, 건물 표면 및 라벨 선택, 가까운 장소 탐색
- 약 1.1초 카메라 이동, 중단 가능한 회전·이동·확대, 전체 보기와 평면 보기
- 9개 장소 투어: 정문 → 미래관 → 상상관 → 우촌관 → 진리관 → 연구관 → 공학관 A → 상상빌리지 → 남문
- 주간/황혼 모드, 이름·경로·녹지 레이어, 원본 지도 보기
- `/?location=future-hall` 형식의 직접 링크
- 좁은 화면의 목록 서랍, 라벨 밀도 감소, 키보드 버튼 탐색, reduced-motion 지원
- WebGL2 미지원 시 참조 지도와 장소 브라우저 제공

## Local Development

Node.js 20.9 이상을 사용하세요.

```bash
npm install
npm run dev
```

기본 주소: http://localhost:3000. 포트가 사용 중이면:

```bash
npm run dev -- --port 3100
```

## Production Build

```bash
npm run typecheck
npm run build
npm run start
```

브라우저 전용 3D 코드는 `dynamic(..., { ssr: false })`로 분리했습니다. 루트 페이지는 정적 사전 렌더링됩니다.

## Deploy to Vercel

1. 이 폴더를 GitHub 저장소에 업로드합니다. `.next`와 `node_modules`는 제외합니다.
2. Vercel에서 **Add New → Project**를 선택하여 저장소를 가져옵니다.
3. Framework Preset을 **Next.js**로 설정합니다. Root Directory는 이 `package.json`이 있는 폴더입니다.
4. 설치 명령은 `npm install`, 빌드 명령은 `npm run build`, 출력 디렉터리는 기본값을 사용합니다.
5. 별도 환경 변수 없이 **Deploy**를 실행합니다.

현재 구현은 로컬 프로덕션 빌드 검증까지 포함합니다. 실제 Vercel 계정 배포는 수행하지 않았습니다.

## Project Structure

```text
app/
  layout.tsx              메타데이터와 한국어 문서
  page.tsx                앱 진입점
  globals.css             반응형 UI와 시각 테마
components/
  ui/Atlas.tsx            검색, 선택, 상세, 투어, 보기 상태
  campus/CampusCanvas.tsx Canvas, 조명, 카메라, 렌더링 지표
  campus/Building.tsx     데이터 기반 건물, 창문, 선택 표시와 라벨
  campus/Landscape.tsx    지형, 경로, 수목, 운동장과 테니스 코트
data/campus.ts            타입, 장소, 상대 좌표, 인접 장소, 투어
public/images/            제공된 캠퍼스맵 사본
scripts/verify.mjs        브라우저 기능 검증
scripts/inspect.mjs       화면 및 참조 영상 확인
artifacts/                검증 결과와 실제 화면 캡처
user_preparation/         사용자가 제공한 원본 자료 (보존)
```

## Campus Data

`data/campus.ts`의 `Location` 배열을 편집합니다. `position`은 `[x, elevation, z]`, `size`는 `[width, height, depth]`이며 모두 임의 단위입니다. `id`는 URL과 투어에 사용됩니다. `nearby`는 이 모형의 평면 거리로 계산한 가까운 3개 장소이며 실제 보행 거리나 접근성을 나타내지 않습니다. 분류는 탐색을 위한 대표 분류입니다. 건물별 설명은 공식 캠퍼스맵의 층별 시설 목록을 요약했습니다.

### Reference interpretation and assumptions

- 주 참조는 `campus_map_main.png`; `campus_map.webp`는 형태, 추가 장소와 녹지를 보완하는 자료입니다.
- 화면 앞쪽에 우촌관, 그 오른쪽 진리관·학송관·탐구관, 중앙에 상상관·미래관·운동장, 뒤쪽에 연구관·지선관·공학관을 놓았습니다.
- +x는 참조 그림의 오른쪽, +z는 그림의 앞쪽입니다. 실제 동서남북으로 보정하지 않았습니다. 지시문의 시작 좌표보다 제공된 지도 배치를 우선했습니다.
- 뒤쪽 공학관과 상상빌리지 방향으로 높아지는 7단 지형입니다. 높이, 축척, 층수, 계단과 보행로는 개략적인 시각적 추정입니다.
- 정문·중문·남문과 상상빌리지는 보조 지도의 표기를 이용했습니다. 안내실은 정문 인접 지점으로 해석했습니다.
- `reference.mp4`는 브라우저에서 재생하여 밝은 건축 모형, 저채도 녹지, 얇은 UI 패널이라는 시각적 방향을 참고했습니다. 영상의 도시 배치를 캠퍼스 배치에 적용하지 않았습니다.
- 공식 영문 시그니처는 사용자가 제공한 `hansung-signature-en-transparent.png`를 원본 비율로 표시합니다.

## Controls

| 조작 | 동작 |
|---|---|
| 왼쪽 드래그 / 한 손가락 드래그 | 회전 |
| 오른쪽 드래그 / 두 손가락 이동 | 평행 이동 |
| 스크롤 / 핀치 / + − | 확대·축소 |
| 건물·라벨·목록 클릭 | 선택 및 시점 이동 |
| 전체 보기 / 초기화 | 캠퍼스 전체로 복귀 |
| 평면 보기 | 위에서 보는 시점 |
| 레이어 버튼 | 이름·경로·수목 표시 제어 |
| 캠퍼스 투어 | 이전·다음·종료가 있는 9개 장소 산책 |
| Esc | 열린 패널을 닫고 전체 보기로 복귀 |
| Tab, Enter, Space | UI 버튼 및 장소 탐색 |

시점 이동 중 직접 드래그하면 자동 이동을 중단합니다. 운영체제의 동작 줄이기 설정을 따릅니다.

## Validation

`npm run build`와 `npm run typecheck`, Playwright 실브라우저 검증을 사용합니다. `artifacts/verification.json`에 실제 통과 항목과 테스트 시간이 저장됩니다. `artifacts/*.png`는 실제 화면 캡처입니다.

```bash
# 사용 가능한 Chrome/Chromium 실행 파일을 지정합니다.
CHROME_PATH="/path/to/chrome" TEST_URL="http://localhost:3100" node scripts/verify.mjs
```

검증 범위: 장소 수, 검색·빈 결과, 필터, 상세·URL·인접 장소, 3D 표면 클릭·호버, 회전·확대·이동, 레이어, 황혼, 투어 9단계, 평면 보기, 참조 지도, 직접 링크, 390×844 모바일, 브라우저 런타임 오류. 카메라 조작은 캔버스 이미지 변화까지 확인합니다. 터치 제스처와 실제 태블릿 GPU 성능은 별도 장치 검증이 필요합니다.

`canvas[data-render-stats]`에서 최근 렌더링의 FPS, draw calls, 삼각형 수, geometry 수와 DPR을 읽을 수 있습니다. 이는 현재 실행 환경의 관측값이며 보편적인 성능 보장이 아닙니다.

## Known Limitations

- 공식 캠퍼스맵의 시설 목록을 확인했습니다. 접근성·실측 위치·현재 출입 가능 여부는 검증하지 않았습니다. 길찾기 또는 무장애 동선 안내용으로 사용하지 마세요.
- 건물의 외형과 높이는 축약되어 있습니다. 일부 시점에서 라벨이 겹칠 수 있으며 레이어에서 숨길 수 있습니다.
- Google Fonts가 차단되면 시스템 산세리프 글꼴로 대체됩니다. 앱 실행 자체는 외부 폰트에 의존하지 않습니다.
- 소개 글은 2026-09-07 공식 캠퍼스맵의 시설 목록을 요약한 스냅샷입니다. 실시간 동기화하지 않으며 운영 시간은 포함하지 않습니다. 상상큐브와 출입구는 시설 목록이 없어 공식 표기와 사진에서 확인 가능한 내용으로만 설명합니다.
- 실제 Vercel URL 및 실제 모바일 기기 검증은 미수행입니다.

## Future Improvements

1. 학교 확인을 거친 공식 건물 용도·출입구·층별 정보 반영
2. 측량 또는 공개 공간 데이터로 좌표와 지형 보정
3. 접근성 동선 검증 후 보행 경로 안내 추가
4. 복잡한 회전 시점에 대한 동적 라벨 충돌 회피와 건물 입면 인스턴싱 확대

## References

[1] Hansung University, “Campus map,” `campus_map_main.png` and `campus_map.webp`, reference materials supplied by the user, Sep. 2026.

[2] User-provided reference, “reference.mp4,” local video, Sep. 2026.

[3] Poimandres, “Installation,” React Three Fiber Documentation. [Online]. Available: https://r3f.docs.pmnd.rs/getting-started/installation. [Accessed: Sep. 7, 2026].

[4] Vercel, “Installation” and “Deploying,” Next.js Documentation. [Online]. Available: https://nextjs.org/docs/app/getting-started/deploying. [Accessed: Sep. 7, 2026].

## University identity refinement — 2026-09-07

- UI palette: Sky Blue `#048DDB`, Blue `#0A4DA1`, Dark Blue `#032E6E`, Grey `#626466`. These RGB values were sampled from the solid swatches in the supplied `color-specification.png`; they are not claimed as Pantone-to-sRGB conversions.
- White/light blue UI with navy typography; dusk uses navy backgrounds and light blue accents. Vegetation remains naturally green.
- `data/buildingDetails.ts`: source-based descriptions, photo-derived facade colors and details. `ArchitectureDetails.tsx`: restrained additions without moving buildings or changing their footprints.
- Official `buildDetailView` responses have `cn: null`. The actual website populates its detail panels from `artclList` with `command=CONV`, matched by building name. Descriptions summarize those facility records rather than inventing missing prose.
- Official photo repetitions: A/B engineering share a photo; Humanities/Creativity share a photo; the three gates share a photo. Shared images are not evidence of distinct silhouettes. Original massing is preserved in ambiguous cases.
- Photo details: brick Woochon facade; white Haksong facade; gridded research/engineering facades; glazed Future/Creativity/Naksan fronts; dark Imagination podium; beige Village with colored window frames; blue stacked Cube modules.
- Source snapshots and resized photo references are kept in `artifacts/official-campus/` for review, not shipped as textures or shown as new campus photography.

[5] Hansung University, “Campus Map,” official building photos and floor-by-floor facility records. [Online]. Available: https://www.hansung.ac.kr/campusMap/hansung/view.do. [Accessed: Sep. 7, 2026].

[6] Hansung University, “Color specification” and “English signature,” PNG assets supplied by the user, Sep. 2026.
