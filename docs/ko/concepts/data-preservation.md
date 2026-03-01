# 데이터 보존(Data Preservation)

::: info 이 페이지에서 배울 것
- 데이터 보존 기법이 필요한 상황
- `property_bag`과 `binding_condition` 활용
- 보이는 요소와 숨겨진 제어 패널을 분리하는 구조
- 완성 예제: 화면 상단 actionbar
:::

## 데이터 보존이 필요한 이유 {#why}

타이틀(`/title`) 명령어로 전달되는 텍스트는 화면에 잠깐 표시되었다가 사라집니다. 이 값이 사라진 뒤에도 **마지막으로 받은 값을 유지**하고 싶을 때 데이터 보존 기법을 사용합니다.

## 기본 구조 {#structure}

보이는 부분(`label`)과 두뇌 역할을 하는 숨겨진 패널(`data_control`)로 나눕니다.

```
preserved_title_display (label)  ← 화면에 표시
└── data_control (panel, size 0)  ← 값을 보존하고 전달
```

```json
{
  "preserved_title_display": {
    "$update_string": "update",
    "type": "label",
    "text": "#text",
    "controls": [
      {
        "data_control": {
          "type": "panel",
          "size": [0, 0],
          "property_bag": {
            "#preserved_text": ""
          },
          "bindings": [
            {
              "binding_name": "#hud_title_text_string"
            },
            {
              "binding_name": "#hud_title_text_string",
              "binding_name_override": "#preserved_text",
              "binding_condition": "visibility_changed"
            },
            {
              "binding_type": "view",
              "source_property_name": "(not (#hud_title_text_string = #preserved_text) and not ((#hud_title_text_string - $update_string) = #hud_title_text_string))",
              "target_property_name": "#visible"
            }
          ]
        }
      }
    ],
    "bindings": [
      {
        "binding_type": "view",
        "source_control_name": "data_control",
        "source_property_name": "(#preserved_text - $update_string)",
        "target_property_name": "#text"
      }
    ]
  }
}
```

## 구조 설명 {#explanation}

| 부분 | 역할 |
|------|------|
| `property_bag` | `#preserved_text` 지역 변수를 선언하고 `""`로 초기화. 선언 없이 읽으면 empty 오류 발생 |
| `binding_condition: "visibility_changed"` | 요소의 표시 여부가 바뀌는 순간(데이터가 들어오는 순간)에만 값을 보존 |
| `source_property_name: "(#preserved_text - $update_string)"` | 보존된 값에서 트리거 문자열을 제거하고 실제 텍스트만 추출 |
| `resolve_sibling_scope` | `data_control`이 `label`의 자식이 아닌 형제일 때 필요 |

## 숫자 인식 문제 해결 {#number-issue}

`(#preserved_text - $update_string)` 계산 결과가 `-123`처럼 **숫자로 해석**될 수 있습니다. `label`의 `text`는 문자열만 받기 때문에, 보이지 않는 문자 `§r`을 앞에 붙여 강제로 문자열로 만듭니다.

```json
"source_property_name": "('§r' + #preserved_text - $update_string)"
```

## 완성 예제: 화면 상단 actionbar {#example}

타이틀 명령어로 데이터를 받아 화면 상단에 배경과 함께 텍스트를 표시하는 완성 예제입니다.

```
actionbar_top (image, 배경)
├── data_control (panel, size 0)  ← 값 보존
└── label (label)                 ← 텍스트 표시
```

```json
{
  "actionbar_top": {
    "$update_string": "top:",
    "type": "image",
    "anchor_from": "top_middle",
    "anchor_to": "top_middle",
    "texture": "textures/ui/hud_tip_text_background",
    "size": ["100%cm + 12px", "100%cm + 5px"],
    "offset": [0, 10],
    "layer": 10,
    "alpha": 0.5,
    "controls": [
      {
        "data_control": {
          "type": "panel",
          "size": [0, 0],
          "property_bag": {
            "#preserved_text": ""
          },
          "bindings": [
            {
              "binding_name": "#hud_title_text_string"
            },
            {
              "binding_name": "#hud_title_text_string",
              "binding_name_override": "#preserved_text",
              "binding_condition": "visibility_changed"
            },
            {
              "binding_type": "view",
              "source_property_name": "(not (#hud_title_text_string = #preserved_text) and not ((#hud_title_text_string - $update_string) = #hud_title_text_string))",
              "target_property_name": "#visible"
            }
          ]
        }
      },
      {
        "label": {
          "type": "label",
          "text": "#text",
          "bindings": [
            {
              "binding_type": "view",
              "source_control_name": "data_control",
              "resolve_sibling_scope": true,
              "source_property_name": "('§r' + #preserved_text - $update_string)",
              "target_property_name": "#text"
            }
          ]
        }
      }
    ]
  }
}
```

### 사용 방법

이 요소를 HUD에 추가한 뒤, 아래 명령어로 텍스트를 전달합니다.

```
/title @s actionbar top:표시할 텍스트
```

`top:` 이후의 문자열이 화면 상단에 표시됩니다. `$update_string`을 다른 값으로 바꾸면 원하는 트리거 문자열을 사용할 수 있습니다.
