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
      { icon: 'github', link: 'https://github.com/boredape874/mcbe_ui_wiki' },
    ],
  },
})
