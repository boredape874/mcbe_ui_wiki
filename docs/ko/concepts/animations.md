# 애니메이션

::: info 이 페이지에서 배울 것
- 애니메이션 요소를 정의하는 방법
- anim_type의 종류와 역할
- 요소에 애니메이션을 적용하는 방법
- 버튼 상태(default/hover/pressed/locked)별 애니메이션 연결
:::

## 애니메이션 요소 정의 {#definition}

JSON UI에서 애니메이션은 `type` 대신 **`anim_type`** 속성을 사용하는 별도의 요소로 정의합니다.

```json
{
  "namespace": "example",
  "anim_size": {
    "anim_type": "size",
    "easing": "linear",
    "from": ["100%", 27],
    "to": ["100% + 3px", 30],
    "duration": 1.25
  },
  "anim_alpha": {
    "anim_type": "alpha",
    "easing": "linear",
    "from": 1,
    "to": 0.5,
    "duration": 2
  }
}
```

## 요소에 애니메이션 적용 {#apply}

애니메이션을 적용할 요소의 `anims` 배열에 애니메이션 요소를 참조합니다.

```json
{
  "text_element": {
    "type": "label",
    "text": "애니메이션 텍스트",
    "anims": [
      "@example.anim_size",
      "@example.anim_alpha"
    ]
  }
}
```

::: tip 같은 네임스페이스라면 생략 가능
참조하는 애니메이션이 같은 네임스페이스에 있으면 네임스페이스 부분을 생략할 수 있습니다.

```json
"anims": ["@anim_size", "@anim_alpha"]
```
:::

## anim_type 종류 {#anim-types}

| anim_type | 값 형식 | 설명 |
|-----------|---------|------|
| `alpha` | `float` (0.0 ~ 1.0) | 요소의 불투명도를 애니메이션합니다 |
| `offset` | `배열 [x, y]` | 앵커 기준 요소의 위치를 애니메이션합니다 |
| `size` | `배열 [width, height]` | 요소의 크기를 애니메이션합니다 |
| `color` | `배열 [r, g, b]` (0.0 ~ 1.0) | 요소의 색상을 애니메이션합니다 |
| `flip_book` | `정수` | 프레임 단위로 이미지를 애니메이션합니다 |
| `uv` | `배열` | UV 텍스처 좌표를 기준으로 이미지를 애니메이션합니다 |
| `wait` | `숫자` | 대기(정지) 구간을 만듭니다 |
| `aseprite_flip_book` | - | 스프라이트 시트를 사용하는 flip_book입니다 |

## 공통 속성 {#common-props}

| 속성 | 설명 |
|------|------|
| `anim_type` | 애니메이션 종류 |
| `easing` | 보간 방식 (예: `linear`, `spring`, `ease_in`, `ease_out` 등) |
| `from` | 시작 값 |
| `to` | 끝 값 |
| `duration` | 재생 시간 (초) |
| `next` | 이 애니메이션이 끝난 후 재생할 다음 애니메이션 |
| `destroy_at_end` | 재생 후 요소를 제거할지 여부 |

## 버튼 상태 애니메이션 {#button-state-anims}

`button` 요소는 상태(default / hover / pressed / locked)마다 다른 자식 요소를 표시할 수 있습니다. 버튼에 각 상태의 자식 요소 이름을 지정하면, 엔진이 상태에 맞는 자식을 자동으로 보여주고 나머지는 숨깁니다.

| 속성 | 설명 |
|------|------|
| `default_control` | 기본(idle) 상태에서 표시할 자식 요소 이름 |
| `hover_control` | 마우스 오버 상태에서 표시할 자식 요소 이름 |
| `pressed_control` | 클릭(누름) 상태에서 표시할 자식 요소 이름 |
| `locked_control` | 비활성(`locked: true`) 상태에서 표시할 자식 요소 이름 |
| `animation_reset_name` | 상태 전환 시 재시작할 애니메이션 이벤트 이름 |

```json
{
  "my_button@common.button": {
    "size": [100, 20],
    "default_control": "default",
    "hover_control": "hover",
    "pressed_control": "pressed",
    "locked_control": "locked",
    "controls": [
      {
        "default": {
          "type": "image",
          "texture": "textures/ui/button_default",
          "animation_reset_name": "button.menu_select",
          "anims": ["@anim_fade_in"]
        }
      },
      {
        "hover": {
          "type": "image",
          "texture": "textures/ui/button_hover",
          "animation_reset_name": "button.menu_select",
          "anims": ["@anim_fade_in"]
        }
      },
      {
        "pressed": {
          "type": "image",
          "texture": "textures/ui/button_pressed",
          "animation_reset_name": "button.menu_select"
        }
      },
      {
        "locked@common.empty_panel": {}
      }
    ]
  }
}
```

::: tip animation_reset_name
`animation_reset_name`에 지정된 버튼 이벤트 이름이 발생하면 해당 자식 요소의 `anims`가 처음부터 재시작됩니다. 상태가 전환될 때 페이드인 등의 애니메이션을 매번 새로 재생하고 싶을 때 사용합니다.
:::

::: info pressed_control과 locked_control은 선택사항
필요한 상태만 선언하면 됩니다. 예를 들어 `default_control`과 `hover_control`만 있어도 동작합니다. 선언하지 않은 상태에서는 아무것도 표시되지 않습니다.
:::

## 예제: alpha 페이드 아웃 {#example-alpha}

```json
{
  "namespace": "example",
  "anim_fade_out": {
    "anim_type": "alpha",
    "easing": "linear",
    "from": 1,
    "to": 0,
    "duration": 0.5
  },
  "my_panel": {
    "type": "panel",
    "anims": ["@anim_fade_out"]
  }
}
```

## 예제: size 확장 {#example-size}

```json
{
  "namespace": "example",
  "anim_grow": {
    "anim_type": "size",
    "easing": "spring",
    "from": [0, 0],
    "to": ["100%", "100%"],
    "duration": 0.3
  }
}
```

## 바닐라 예제 참고 {#vanilla}

바닐라 파일에서 `@hud.anim_actionbar_text_alpha_out` 처럼 이미 정의된 애니메이션을 그대로 참조해서 사용할 수도 있습니다.

```json
{
  "my_label": {
    "type": "label",
    "text": "$actionbar_text",
    "alpha": "@hud.anim_actionbar_text_alpha_out"
  }
}
```
