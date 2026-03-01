import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/mcbe_ui_wiki/',
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
                {
                  text: 'MCBE UI란?',
                  link: '/ko/getting-started/what-is-mcbe-ui',
                  items: [
                    { text: '리소스(Resource)란?', link: '/ko/getting-started/what-is-mcbe-ui#resource' },
                    { text: '리소스팩이란?', link: '/ko/getting-started/what-is-mcbe-ui#resource-pack' },
                    { text: 'UI 파트', link: '/ko/getting-started/what-is-mcbe-ui#ui-part' },
                  ],
                },
                { text: '개발 환경 설정', link: '/ko/getting-started/setup' },
                { text: '첫 번째 UI 만들기', link: '/ko/getting-started/first-ui' },
              ],
            },
            {
              text: '개념',
              items: [
                {
                  text: 'JSON UI 기초',
                  link: '/ko/concepts/json-ui-basics',
                  items: [
                    { text: '네임스페이스', link: '/ko/concepts/json-ui-basics#namespace' },
                    { text: '요소(Element)', link: '/ko/concepts/json-ui-basics#element' },
                    { text: '요소 유형(Type)', link: '/ko/concepts/json-ui-basics#types' },
                    { text: '상속(@)', link: '/ko/concepts/json-ui-basics#inheritance' },
                  ],
                },
                {
                  text: '요소(Element) 시스템',
                  link: '/ko/concepts/elements',
                  items: [
                    { text: 'size 속성', link: '/ko/concepts/elements#size' },
                    { text: 'size 단위', link: '/ko/concepts/elements#size-units' },
                    { text: 'offset 속성', link: '/ko/concepts/elements#offset' },
                    { text: 'anchor 속성', link: '/ko/concepts/elements#anchor' },
                    { text: 'layer 속성', link: '/ko/concepts/elements#layer' },
                  ],
                },
                {
                  text: '변수(Variable)',
                  link: '/ko/concepts/variables',
                  items: [
                    { text: '변수란?', link: '/ko/concepts/variables#what-is' },
                    { text: '전역 변수', link: '/ko/concepts/variables#global' },
                    { text: '지역 변수', link: '/ko/concepts/variables#local' },
                    { text: '변수 파생(상속)', link: '/ko/concepts/variables#derivation' },
                  ],
                },
                {
                  text: '연산자(Operator)',
                  link: '/ko/concepts/operators',
                  items: [
                    { text: '산술 연산자', link: '/ko/concepts/operators#arithmetic' },
                    { text: '문자열 연산', link: '/ko/concepts/operators#string' },
                    { text: '비교 연산자', link: '/ko/concepts/operators#comparison' },
                    { text: '논리 연산자', link: '/ko/concepts/operators#logical' },
                  ],
                },
                {
                  text: '바인딩(Binding)',
                  link: '/ko/concepts/bindings',
                  items: [
                    { text: '바인딩이란?', link: '/ko/concepts/bindings#what-is' },
                    { text: 'binding_name_override', link: '/ko/concepts/bindings#name-override' },
                    { text: 'visible / enabled', link: '/ko/concepts/bindings#visible-enabled' },
                    { text: 'binding_type: view', link: '/ko/concepts/bindings#type-view' },
                    { text: 'binding_type: global', link: '/ko/concepts/bindings#type-global' },
                    { text: 'resolve_sibling_scope', link: '/ko/concepts/bindings#sibling-scope' },
                    { text: 'modifications', link: '/ko/concepts/bindings#modifications' },
                  ],
                },
                {
                  text: '조건부 렌더링',
                  link: '/ko/concepts/conditional-rendering',
                  items: [
                    { text: '변수 방식', link: '/ko/concepts/conditional-rendering#variable' },
                    { text: '바인딩 방식', link: '/ko/concepts/conditional-rendering#binding' },
                    { text: '이미지 조건 표시', link: '/ko/concepts/conditional-rendering#image' },
                  ],
                },
                {
                  text: '애니메이션',
                  link: '/ko/concepts/animations',
                  items: [
                    { text: '요소 정의', link: '/ko/concepts/animations#definition' },
                    { text: '애니메이션 적용', link: '/ko/concepts/animations#apply' },
                    { text: 'anim_type 종류', link: '/ko/concepts/animations#anim-types' },
                    { text: '공통 속성', link: '/ko/concepts/animations#common-props' },
                  ],
                },
                {
                  text: '데이터 보존',
                  link: '/ko/concepts/data-preservation',
                  items: [
                    { text: '필요한 이유', link: '/ko/concepts/data-preservation#why' },
                    { text: '기본 구조', link: '/ko/concepts/data-preservation#structure' },
                    { text: '숫자 인식 문제', link: '/ko/concepts/data-preservation#number-issue' },
                    { text: '완성 예제', link: '/ko/concepts/data-preservation#example' },
                  ],
                },
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
      { icon: 'github', link: 'https://github.com/boredape874/mcbe_ui_wiki' },
    ],
  },
})
