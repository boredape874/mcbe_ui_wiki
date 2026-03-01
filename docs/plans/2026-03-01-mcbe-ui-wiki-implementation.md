# MCBE UI Wiki Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** VitePress 기반 MCBE UI 위키 사이트를 VSC 다크 테마로 구성하고 GitHub Pages에 자동 배포

**Architecture:** VitePress 기본 테마를 CSS 변수 오버라이드로 VSC 다크 테마화. i18n은 URL 기반(`/ko/`, `/en/`). GitHub Actions가 `main` push 시 빌드 후 `gh-pages` 브랜치에 배포.

**Tech Stack:** VitePress 1.x, Node.js, GitHub Actions, GitHub Pages

---

### Task 1: VitePress 프로젝트 초기화

**Files:**
- Create: `package.json`
- Create: `docs/.vitepress/config.ts`

**Step 1: package.json 생성**

```json
{
  "name": "mcbe-ui-wiki",
  "version": "1.0.0",
  "description": "마인크래프트 베드락 UI 위키",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.6.3"
  }
}
```

**Step 2: 의존성 설치**

```bash
npm install
```

Expected: `node_modules/` 생성, `package-lock.json` 생성

**Step 3: docs/.vitepress 디렉터리 생성**

```bash
mkdir -p docs/.vitepress/theme
```

**Step 4: 개발 서버 기동 확인 (빌드 전 smoke test)**

```bash
npm run docs:dev
```

Expected: `http://localhost:5173` 에서 VitePress 기본 페이지 접근 가능 (404여도 서버 기동이면 OK)

Ctrl+C 로 종료

**Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: initialize VitePress project"
```

---

### Task 2: VitePress 메인 설정 (config.ts)

**Files:**
- Create: `docs/.vitepress/config.ts`

**Step 1: config.ts 작성**

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MCBE UI Wiki',
  description: '마인크래프트 베드락 에디션 UI 개발 문서',

  locales: {
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko/',
      title: 'MCBE UI Wiki',
      description: '마인크래프트 베드락 에디션 UI 개발 문서',
      themeConfig: {
        nav: [
          { text: '홈', link: '/ko/' },
          { text: '시작하기', link: '/ko/getting-started/what-is-mcbe-ui' },
          { text: '레퍼런스', link: '/ko/reference/control-types' },
        ],
        sidebar: {
          '/ko/': [
            {
              text: '시작하기',
              items: [
                { text: 'MCBE UI란?', link: '/ko/getting-started/what-is-mcbe-ui' },
                { text: '개발 환경 설정', link: '/ko/getting-started/setup' },
                { text: '첫 번째 UI 만들기', link: '/ko/getting-started/first-ui' },
              ],
            },
            {
              text: '개념',
              items: [
                { text: 'JSON UI 기초', link: '/ko/concepts/json-ui-basics' },
                { text: '요소(Element) 시스템', link: '/ko/concepts/elements' },
                { text: '바인딩(Binding)', link: '/ko/concepts/bindings' },
                { text: '애니메이션', link: '/ko/concepts/animations' },
                { text: '변수와 조건', link: '/ko/concepts/variables-and-conditions' },
              ],
            },
            {
              text: '레퍼런스',
              items: [
                { text: '컨트롤 타입 목록', link: '/ko/reference/control-types' },
                { text: '프로퍼티 전체 목록', link: '/ko/reference/properties' },
                { text: '바인딩 이름 목록', link: '/ko/reference/binding-names' },
                { text: '글로벌 변수 목록', link: '/ko/reference/global-variables' },
              ],
            },
          ],
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'MCBE UI Wiki',
      description: 'Minecraft Bedrock Edition UI Development Documentation',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
        ],
        sidebar: {
          '/en/': [],
        },
      },
    },
  },

  themeConfig: {
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YOUR_USERNAME/mcbe_ui_wiki' },
    ],
  },
})
```

> **주의:** `YOUR_USERNAME` 부분은 실제 GitHub 유저명으로 교체 필요

**Step 2: 개발 서버로 설정 확인**

```bash
npm run docs:dev
```

Expected: 사이드바가 올바르게 표시됨

**Step 3: Commit**

```bash
git add docs/.vitepress/config.ts
git commit -m "feat: add VitePress config with i18n and sidebar"
```

---

### Task 3: VSC 다크 테마 적용

**Files:**
- Create: `docs/.vitepress/theme/index.ts`
- Create: `docs/.vitepress/theme/custom.css`

**Step 1: theme/index.ts 작성**

```typescript
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

**Step 2: theme/custom.css 작성**

```css
/* VSC Dark Theme Override */
:root {
  --vp-c-bg: #1e1e1e;
  --vp-c-bg-soft: #252526;
  --vp-c-bg-mute: #2d2d2d;
  --vp-c-bg-alt: #252526;

  --vp-c-text-1: #d4d4d4;
  --vp-c-text-2: #a0a0a0;
  --vp-c-text-3: #858585;

  --vp-c-brand-1: #569cd6;
  --vp-c-brand-2: #4080b0;
  --vp-c-brand-3: #2a5f8f;
  --vp-c-brand-soft: rgba(86, 156, 214, 0.14);

  --vp-c-divider: #3c3c3c;
  --vp-c-border: #3c3c3c;
  --vp-c-gutter: #1e1e1e;

  --vp-code-bg: #2d2d2d;
  --vp-code-color: #d4d4d4;
  --vp-code-block-bg: #1e1e1e;

  --vp-nav-bg-color: #323233;
  --vp-sidebar-bg-color: #252526;

  --vp-c-tip-1: #4ec9b0;
  --vp-c-tip-2: #3aaa96;
  --vp-c-tip-3: #2d8a78;
  --vp-c-tip-soft: rgba(78, 201, 176, 0.14);

  --vp-c-warning-1: #dcdcaa;
  --vp-c-warning-2: #c0c090;
  --vp-c-warning-3: #a0a070;
  --vp-c-warning-soft: rgba(220, 220, 170, 0.14);

  --vp-c-danger-1: #f44747;
  --vp-c-danger-2: #d03030;
  --vp-c-danger-3: #a02020;
  --vp-c-danger-soft: rgba(244, 71, 71, 0.14);
}

/* 다크 모드 강제 적용 */
.dark {
  --vp-c-bg: #1e1e1e;
  --vp-c-bg-soft: #252526;
  --vp-c-bg-mute: #2d2d2d;
}

/* Nav 바 */
.VPNav {
  background-color: #323233 !important;
  border-bottom: 1px solid #3c3c3c !important;
}

/* Sidebar */
.VPSidebar {
  background-color: #252526 !important;
  border-right: 1px solid #3c3c3c !important;
}

/* 사이드바 활성 항목 — VSC 파일 트리 선택 효과 */
.VPSidebarItem.is-active > .item > .VPLink,
.VPSidebarItem.is-active > .item > span {
  border-left: 2px solid #569cd6;
  padding-left: 14px;
  color: #569cd6 !important;
}

/* 폰트 */
:root {
  --vp-font-family-base: 'Segoe UI', system-ui, sans-serif;
  --vp-font-family-mono: 'Consolas', 'Courier New', monospace;
}

/* 코드 블록 */
div[class*='language-'] {
  background-color: #1e1e1e !important;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
}

/* 인라인 코드 */
:not(pre) > code {
  background-color: #2d2d2d !important;
  color: #d7ba7d !important;
  border-radius: 3px;
  padding: 2px 5px;
}

/* 스크롤바 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #1e1e1e;
}
::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 테이블 */
.vp-doc table {
  border-collapse: collapse;
  width: 100%;
}
.vp-doc th {
  background-color: #2d2d2d;
  color: #569cd6;
  border: 1px solid #3c3c3c;
}
.vp-doc td {
  border: 1px solid #3c3c3c;
}
.vp-doc tr:nth-child(even) {
  background-color: #252526;
}

/* 링크 색상 */
.vp-doc a {
  color: #569cd6;
}
.vp-doc a:hover {
  color: #9cdcfe;
}
```

**Step 3: 개발 서버에서 테마 확인**

```bash
npm run docs:dev
```

Expected: 다크 VSC 색상 팔레트 적용 확인

**Step 4: Commit**

```bash
git add docs/.vitepress/theme/
git commit -m "feat: apply VSC dark theme to VitePress"
```

---

### Task 4: 한국어 콘텐츠 페이지 스캐폴딩

**Files:**
- Create: `docs/ko/index.md`
- Create: `docs/ko/getting-started/what-is-mcbe-ui.md`
- Create: `docs/ko/getting-started/setup.md`
- Create: `docs/ko/getting-started/first-ui.md`
- Create: `docs/ko/concepts/json-ui-basics.md`
- Create: `docs/ko/concepts/elements.md`
- Create: `docs/ko/concepts/bindings.md`
- Create: `docs/ko/concepts/animations.md`
- Create: `docs/ko/concepts/variables-and-conditions.md`
- Create: `docs/ko/reference/control-types.md`
- Create: `docs/ko/reference/properties.md`
- Create: `docs/ko/reference/binding-names.md`
- Create: `docs/ko/reference/global-variables.md`

**Step 1: 디렉터리 생성**

```bash
mkdir -p docs/ko/getting-started docs/ko/concepts docs/ko/reference
```

**Step 2: docs/ko/index.md (홈페이지) 작성**

```markdown
---
layout: home

hero:
  name: "MCBE UI Wiki"
  text: "마인크래프트 베드락 UI 개발 문서"
  tagline: JSON UI를 처음 접하는 분도 쉽게 배울 수 있도록 만들어진 문서입니다.
  actions:
    - theme: brand
      text: 시작하기
      link: /ko/getting-started/what-is-mcbe-ui
    - theme: alt
      text: 레퍼런스
      link: /ko/reference/control-types

features:
  - icon: 📦
    title: 리소스팩 UI
    details: 마인크래프트 베드락의 리소스팩 UI 시스템을 처음부터 배워봅니다.
  - icon: 📄
    title: JSON UI
    details: JSON 파일로 UI를 정의하는 방법과 구조를 이해합니다.
  - icon: 📚
    title: 상세 레퍼런스
    details: 컨트롤 타입, 프로퍼티, 바인딩 이름을 한눈에 확인합니다.
---
```

**Step 3: getting-started/what-is-mcbe-ui.md 작성**

```markdown
# MCBE UI란?

::: info 이 페이지에서 배울 것
- 마인크래프트 베드락 에디션에서 "리소스"란 무엇인가
- 리소스팩이란 무엇인가
- 리소스팩 안의 UI 파트가 무엇인가
:::

<!-- 내용은 유저가 작성 -->

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

**Step 4: 나머지 스캐폴드 페이지 작성 (공통 템플릿)**

각 파일을 아래 패턴으로 생성:

`docs/ko/getting-started/setup.md`:
```markdown
# 개발 환경 설정

::: info 이 페이지에서 배울 것
- 리소스팩 개발에 필요한 도구
- 폴더 구조 설정 방법
:::

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/getting-started/first-ui.md`:
```markdown
# 첫 번째 UI 만들기

::: info 이 페이지에서 배울 것
- 가장 간단한 JSON UI 파일 작성
- 게임에서 확인하는 방법
:::

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/concepts/json-ui-basics.md`:
```markdown
# JSON UI 기초

::: info 이 페이지에서 배울 것
- JSON UI 파일의 기본 구조
- 네임스페이스와 요소 이름 규칙
:::

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/concepts/elements.md`:
```markdown
# 요소(Element) 시스템

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/concepts/bindings.md`:
```markdown
# 바인딩(Binding)

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/concepts/animations.md`:
```markdown
# 애니메이션

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/concepts/variables-and-conditions.md`:
```markdown
# 변수와 조건

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/reference/control-types.md`:
```markdown
# 컨트롤 타입 목록

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/reference/properties.md`:
```markdown
# 프로퍼티 전체 목록

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/reference/binding-names.md`:
```markdown
# 바인딩 이름 목록

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

`docs/ko/reference/global-variables.md`:
```markdown
# 글로벌 변수 목록

> 📝 이 페이지의 본문 내용은 추후 추가 예정입니다.
```

**Step 5: 영어 플레이스홀더 생성**

`docs/en/index.md`:
```markdown
---
layout: home

hero:
  name: "MCBE UI Wiki"
  text: "Minecraft Bedrock UI Documentation"
  tagline: English documentation coming soon. Please refer to the Korean version.
  actions:
    - theme: alt
      text: 한국어로 보기
      link: /ko/
---
```

**Step 6: 빌드 테스트**

```bash
npm run docs:build
```

Expected: `docs/.vitepress/dist/` 생성, 에러 없음

**Step 7: Commit**

```bash
git add docs/ko/ docs/en/
git commit -m "feat: scaffold Korean content pages and English placeholder"
```

---

### Task 5: GitHub Actions 배포 워크플로우

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: 디렉터리 생성**

```bash
mkdir -p .github/workflows
```

**Step 2: deploy.yml 작성**

```yaml
name: Deploy VitePress to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for GitHub Pages deployment"
```

---

### Task 6: .gitignore 및 최종 정리

**Files:**
- Create: `.gitignore`

**Step 1: .gitignore 작성**

```
node_modules/
docs/.vitepress/dist/
docs/.vitepress/cache/
```

**Step 2: README.md 업데이트**

```markdown
# MCBE UI Wiki

마인크래프트 베드락 에디션 UI 개발 문서 사이트

## 로컬 개발

```bash
npm install
npm run docs:dev
```

## 빌드

```bash
npm run docs:build
```

## 배포

`main` 브랜치에 push 시 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.

## 라이선스

MIT
```

**Step 3: GitHub Pages 설정 안내**

GitHub 저장소 설정에서 수동으로 진행 필요:
1. `Settings` → `Pages`
2. `Source`: **GitHub Actions** 선택

**Step 4: config.ts의 base 설정 확인**

저장소 이름이 `mcbe_ui_wiki`인 경우 `config.ts`에 추가:

```typescript
base: '/mcbe_ui_wiki/',
```

> 커스텀 도메인을 사용한다면 `base: '/'` 유지

**Step 5: 전체 빌드 최종 확인**

```bash
npm run docs:build
```

Expected: 에러 없이 빌드 완료

**Step 6: 최종 Commit & Push**

```bash
git add .gitignore README.md docs/.vitepress/config.ts
git commit -m "chore: add gitignore, update README, set base path"
git push origin main
```

Expected: GitHub Actions 워크플로우 자동 실행 확인

---

## 완료 후 확인 사항

- [ ] `https://YOUR_USERNAME.github.io/mcbe_ui_wiki/ko/` 접속 확인
- [ ] 사이드바 한국어 메뉴 표시 확인
- [ ] VSC 다크 테마 색상 확인
- [ ] 로컬 검색 동작 확인
- [ ] 언어 전환 버튼 표시 확인
