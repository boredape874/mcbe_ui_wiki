# MCBE UI Wiki — Design Document

**Date:** 2026-03-01
**Status:** Approved

---

## Overview

마인크래프트 베드락 에디션(MCBE) UI 시스템을 아예 모르는 초보자도 쉽게 이해할 수 있는 문서 사이트.
VitePress + VSC 다크 테마 스타일 + GitHub Pages 배포.

---

## Goals

- 대상: MCBE UI를 전혀 모르는 생초보자
- 언어: 한국어 우선 작성, 영어 추후 추가 (URL 기반 i18n `/ko/`, `/en/`)
- 콘텐츠: 개념 → 레퍼런스 순 학습 흐름
- 콘텐츠 작성: 유저가 직접 제공, 개발자는 마크다운 구조/스타일링 담당

---

## Tech Stack

| 항목 | 선택 |
|------|------|
| 프레임워크 | VitePress (최신) |
| 검색 | VitePress 내장 로컬 검색 |
| 배포 | GitHub Actions → `gh-pages` 브랜치 |
| 다국어 | VitePress i18n (URL 기반) |

---

## Directory Structure

```
mcbe_ui_wiki/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts
│   │   └── theme/
│   │       ├── index.ts
│   │       └── custom.css
│   ├── ko/
│   │   ├── index.md
│   │   ├── getting-started/
│   │   │   ├── what-is-mcbe-ui.md
│   │   │   ├── setup.md
│   │   │   └── first-ui.md
│   │   ├── concepts/
│   │   │   ├── json-ui-basics.md
│   │   │   ├── elements.md
│   │   │   ├── bindings.md
│   │   │   ├── animations.md
│   │   │   └── variables-and-conditions.md
│   │   └── reference/
│   │       ├── control-types.md
│   │       ├── properties.md
│   │       ├── binding-names.md
│   │       └── global-variables.md
│   └── en/
│       └── index.md
├── package.json
└── README.md
```

---

## Visual Design — VSC Dark Theme

| 역할 | 색상 |
|------|------|
| 배경 (content) | `#1e1e1e` |
| 배경 (sidebar) | `#252526` |
| 배경 (nav) | `#323233` |
| 강조색 (링크, 활성) | `#569cd6` |
| 텍스트 기본 | `#d4d4d4` |
| 텍스트 흐림 | `#858585` |
| 코드 블록 배경 | `#2d2d2d` |
| 구분선 | `#3c3c3c` |
| 사이드바 활성 보더 | `#569cd6` (좌측) |

**폰트:** `Consolas, 'Courier New', monospace` (코드) / `Segoe UI, sans-serif` (본문)

---

## Sidebar Structure

```
시작하기
├── MCBE UI란?        (리소스 → 리소스팩 → UI 파트 설명)
├── 개발 환경 설정
└── 첫 번째 UI 만들기

개념
├── JSON UI 기초
├── 요소(Element) 시스템
├── 바인딩(Binding)
├── 애니메이션
└── 변수와 조건

레퍼런스
├── 컨트롤 타입 목록
├── 프로퍼티 전체 목록
├── 바인딩 이름 목록
└── 글로벌 변수 목록
```

---

## Content Convention

- 각 페이지 상단에 "이 페이지에서 배울 것" 요약
- 구성: 개념 설명 → 코드 예제 → 주의사항
- 레퍼런스: 테이블 + 코드 예제 조합
- 콘텐츠는 유저 제공, 개발자는 마크다운 포맷/구조 정리 담당

---

## Deployment

- `main` 브랜치 push 시 GitHub Actions 자동 실행
- VitePress 빌드 후 `gh-pages` 브랜치에 결과물 배포
- GitHub Pages 소스: `gh-pages` 브랜치
