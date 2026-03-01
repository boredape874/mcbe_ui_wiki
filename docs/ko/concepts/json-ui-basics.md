# JSON UI의 기본

::: info 이 페이지에서 배울 것
- JSON UI 파일의 기본 구조
- 네임스페이스(Namespace)란 무엇인가
- 요소(Element)란 무엇인가
- 사용 가능한 요소 유형(Type) 목록
- 그전에 시2발 json 문법이나 쳐 배우고오세요
:::

## 네임스페이스(Namespace) {#namespace}

네임스페이스는 **UI 파일의 이름** 입니다... 이름은 무조건 하나고, 이 이름들을 통해 다른 파일에서 해당 파일의 요소를 사용할 수 있습니다.

```json
{
  "namespace": "screen_hud_ui",
  "panel": {
    //이 안에는 label이나 image등등
  }
}
```

다른 네임스페이스에서 이 요소를 참조(사용)하려면 `네임스페이스.요소이름` 형식을 사용합니다.

```json
{
  "namespace": "inventory_ui",
  "test@example_ui.screen_hud_ui": {}
}
```

`@` 뒤에 오는 `example_ui.example_panel`은 `example_ui` 네임스페이스의 `example_panel` 요소를 **상속**한다는 의미입니다. 같은 네임스페이스 안이라면 네임스페이스 부분을 생략할 수 있습니다.

::: tip
네임스페이스는 파일마다 고유해야 합니다. 같은 이름의 네임스페이스가 두 파일에 있으면 충돌이 발생합니다.
:::

## 요소(Element) {#element}

**요소**는 JSON의 기본 문법인데, 이 요소를 통해서 화면에 표시되는걸 조정합니다.

```json
{
  "element": {
    "type": "image",
    "image": "보드 야짤"
  }
}
```

::: warning 이름 충돌 주의
요소는 같은 이름을 가져도 되지만, 같은 네임스페이스 안에서 이름이 겹치면 예기치 않은 동작이 발생할 수 있습니다.(참조만 제대로 하면 뎀 ㅋ)
:::

## 요소 유형(Type) {#types}

`type` 속성으로 요소의 종류를 지정합니다.

| type | 설명 |
|------|------|
| `label` | 텍스트를 표시합니다 |
| `image` | 파일 경로로 이미지를 표시합니다 |
| `button` | 클릭 가능한 상호작용 요소입니다. 그냥 버튼임 ㅋ |
| `panel` | 다른 요소들을 담는 컨테이너입니다(흔히 엄마라고 부릅니다.). 내가 낳은 자식 요소들이 서로 겹쳐 배치됩니다 |
| `stack_panel` | 자식 요소들을 순서대로 쌓아 배치하는 배치 순서도입니다 |
| `grid` | 여러 행과 열로 구성된 (그니까 대충 띄어쓰기 칸임) 컨테이너입니다 |
| `factory` | 다른 요소를 기반으로 요소를 동적(실시간이 아니라는 뜻)으로 렌더링합니다 |
| `custom` / `renderer` | 하드코딩된 JSON UI 요소를 렌더링합니다.(존나 어려움 비추) |

### label 예제

```json
{
  "namespace": "bored",
  "이것은패널이다": {
    "type": "label",
    "text": "버그락 에디션"
  }
}
```

### image 예제

```json
{
  "이것은패널의이름이다": {
    "type": "image",
    "texture": "textures/ui/hud_tip_text_background",
    "size": [1, 1] //(사이즈는 비율로 하는걸 추천함)
  }
}
```

### panel 예제

```json
{
  "my_panel": {
    "type": "panel",
    "size": [1, 1],
    "controls": [
      {
        "child_label": {
          "type": "label",
          "text": "이것은 글이다"
        }
      }
    ]
  }
}
```

::: info controls 배열
자식 요소는 `controls` 배열 안에 객체(Object) 형태로 추가합니다. 각 객체(Object)의 키(값)가 자식 요소의 이름이 됩니다.
:::

## 상속(@) {#inheritance}

`요소이름@참조(사용)대상(참조대상이라는것은다른ui의네임스페이스)` 형식으로 요소를 상속(사용)하고 속성(내용)을 오버라이드 할 수 있습니다(오버라이드 = 덮어쓰기).

```json
{
  "namespace": "크고우람한나의버튼",
  "bigjson": {
    "type": "button",
    "size": [1800000, 32]
  },
  "bigjson@크고우람한나의버튼": {
    "size": [10202, 32]
  }//코드가 이상함 하람님
}
```

`bigjson은 크고우람한나의버튼을 그대로 사용, `size`만 `[200, 32]`로 덮어씁니다.
