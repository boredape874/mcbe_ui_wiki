# 요소(Element) 시스템

::: info 이 페이지에서 배울 것
- 요소의 크기(size)와 위치(offset) 지정 방법
- size에서 사용 가능한 단위 전체 목록
- 앵커(anchor) 개념
:::

## size 속성 {#size}

`size`는 요소의 너비와 높이를 `[width, height]` 형태로 지정합니다.

```json
{
  "my_element": {
    "type": "image",
    "texture": "textures/ui/Black",
    "size": [100, 50]
  }
}
```

숫자만 아니라 다양한 단위 표현을 조합할 수 있습니다.

## size 단위 {#size-units}

| 단위 | 설명 | 예시 |
|------|------|------|
| `px` (숫자) | 고정 픽셀 크기 | `100`, `"30px"` |
| `%` | 부모 요소 기준 비율 | `"100%"`, `"50%"` |
| `%c` | 모든 자식 요소의 전체 영역 기준 | `"100%c"` |
| `%cm` | 가장 큰 보이는 자식 기준 | `"100%cm"` |
| `%sm` | 형제(sibling) 요소 크기 기준 | `"100%sm"` |
| `%x` | 자기 자신의 너비 기준 | `"100%x"` |
| `%y` | 자기 자신의 높이 기준 | `"100%y"` |
| `fill` | 부모의 남은 공간을 채움 | `"fill"` |
| (생략) | 기본값 `100%` 적용 | - |

단위는 연산자와 함께 사용할 수 있습니다.

```json
"size": ["100% + 12px", "100%cm + 5px"]
```

::: tip %c vs %cm
- `%c` : 보이지 않는 자식 요소까지 포함한 전체 영역 기준이라 의도보다 크게 계산될 수 있습니다.
- `%cm` : **보이는** 자식 요소 중 가장 큰 것을 기준으로 계산합니다.

배경이 레이블 크기에 맞춰야 할 때는 `%cm`을 사용하는 것이 안전합니다.
:::

## offset 속성 {#offset}

`offset`은 앵커 기준으로 요소의 위치를 이동시킵니다.

```json
{
  "my_label": {
    "type": "label",
    "text": "상단 중앙",
    "anchor_from": "top_middle",
    "anchor_to": "top_middle",
    "offset": [0, 10]
  }
}
```

offset도 size와 동일한 단위 표현을 사용할 수 있습니다.

```json
"offset": ["50% - 10px", 0]
```

## anchor 속성 {#anchor}

앵커는 요소가 부모의 어느 지점에 붙을지, 그리고 요소 자신의 어느 지점이 그 기준점이 될지를 결정합니다.

| 앵커 값 | 위치 |
|---------|------|
| `top_left` | 좌상단 |
| `top_middle` | 상단 중앙 |
| `top_right` | 우상단 |
| `left_middle` | 좌측 중앙 |
| `center` | 정중앙 |
| `right_middle` | 우측 중앙 |
| `bottom_left` | 좌하단 |
| `bottom_middle` | 하단 중앙 |
| `bottom_right` | 우하단 |

```json
{
  "my_element": {
    "type": "label",
    "text": "우하단에 고정",
    "anchor_from": "bottom_right",
    "anchor_to": "bottom_right"
  }
}
```

- `anchor_from` : 부모의 기준 지점
- `anchor_to` : 이 요소 자신의 기준 지점

## layer 속성 {#layer}

같은 부모를 가진 요소들이 겹칠 때, `layer` 값이 클수록 앞에 그려집니다.

```json
{
  "background": {
    "type": "image",
    "texture": "textures/ui/Black",
    "layer": 0
  },
  "foreground_label": {
    "type": "label",
    "text": "앞에 표시",
    "layer": 1
  }
}
```
