# JSON UI 기초

::: info 이 페이지에서 배울 것
- JSON UI 파일의 기본 구조
- 네임스페이스(Namespace)란 무엇인가
- 요소(Element)란 무엇인가
- 사용 가능한 요소 유형(Type) 목록
:::

## 네임스페이스(Namespace)

네임스페이스는 **UI 파일의 식별자** 역할을 합니다. 모든 UI 파일은 반드시 하나의 네임스페이스를 가져야 하며, 이를 통해 다른 파일에서 해당 파일의 요소에 접근할 수 있습니다.

```json
{
  "namespace": "example_ui",
  "example_panel": {
    // 내용...
  }
}
```

다른 네임스페이스에서 이 요소를 참조하려면 `네임스페이스.요소이름` 형식을 사용합니다.

```json
{
  "namespace": "example_ui2",
  "test@example_ui.example_panel": {}
}
```

`@` 뒤에 오는 `example_ui.example_panel`은 `example_ui` 네임스페이스의 `example_panel` 요소를 **상속**한다는 의미입니다. 같은 네임스페이스 안이라면 네임스페이스 부분을 생략할 수 있습니다.

::: tip
네임스페이스는 파일마다 고유해야 합니다. 같은 이름의 네임스페이스가 두 파일에 있으면 충돌이 발생합니다.
:::

## 요소(Element)

**요소**는 JSON UI의 기본 단위입니다. 화면에 표시되는 모든 것(텍스트, 이미지, 버튼 등)은 요소로 정의됩니다.

```json
{
  "element": {
    "type": "label",
    "text": "이것은 요소입니다."
  }
}
```

::: warning 이름 충돌 주의
요소는 같은 이름을 가져도 되지만, 같은 네임스페이스 안에서 이름이 겹치면 예기치 않은 동작이 발생할 수 있습니다.
:::

## 요소 유형(Type)

`type` 속성으로 요소의 종류를 지정합니다.

| type | 설명 |
|------|------|
| `label` | 텍스트를 표시합니다 |
| `image` | 지정한 경로의 이미지를 표시합니다 |
| `button` | 클릭 가능한 상호작용 요소입니다 |
| `panel` | 다른 요소들을 담는 컨테이너입니다. 자식 요소들이 서로 겹쳐 배치됩니다 |
| `stack_panel` | 자식 요소들을 순서대로 쌓아 배치하는 컨테이너입니다 |
| `grid` | 여러 행과 열로 구성된 격자형 컨테이너입니다 |
| `factory` | 다른 요소를 기반으로 요소를 동적으로 렌더링합니다 |
| `custom` / `renderer` | 하드코딩된 JSON UI 요소를 렌더링합니다 |

### label 예제

```json
{
  "namespace": "example",
  "my_label": {
    "type": "label",
    "text": "안녕하세요!"
  }
}
```

### image 예제

```json
{
  "my_image": {
    "type": "image",
    "texture": "textures/ui/hud_tip_text_background",
    "size": [200, 20]
  }
}
```

### panel 예제

```json
{
  "my_panel": {
    "type": "panel",
    "size": [100, 50],
    "controls": [
      {
        "child_label": {
          "type": "label",
          "text": "패널 안의 텍스트"
        }
      }
    ]
  }
}
```

::: info controls 배열
자식 요소는 `controls` 배열 안에 객체 형태로 추가합니다. 각 객체의 키가 자식 요소의 이름이 됩니다.
:::

## 상속(@)

`요소이름@참조대상` 형식으로 다른 요소를 상속하고 속성을 덮어쓸 수 있습니다.

```json
{
  "namespace": "example",
  "base_button": {
    "type": "button",
    "size": [120, 32]
  },
  "big_button@base_button": {
    "size": [200, 32]
  }
}
```

`big_button`은 `base_button`의 모든 속성을 그대로 가지되, `size`만 `[200, 32]`로 덮어씁니다.
