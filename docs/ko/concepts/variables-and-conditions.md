# 변수와 조건

::: info 이 페이지에서 배울 것
- 변수(`$`)의 개념과 정의 방법
- 변수 파생(상속)으로 요소 재사용하기
- 연산자 목록
- 조건부 렌더링 (visible 속성 활용)
- 데이터 보존(Data Preservation) 기법
:::

## 변수($)

변수는 이름 앞에 `$`가 붙는 값으로, 하나의 요소 안에서 값을 재사용하거나 자식 요소에 데이터를 전달할 때 사용합니다.

### 전역 변수 (_global_variables.json)

`_global_variables.json`은 **네임스페이스 간에 변수를 공유**하기 위한 파일입니다.

```json
// RP/ui/_global_variables.json
{
  "$text_global": "test"
}
```

```json
// RP/ui/test.json
{
  "namespace": "test",
  "my_label": {
    "type": "label",
    "text": "$text_global"
  }
}
```

### 지역 변수 정의

요소 안에서 직접 변수를 선언하고 사용할 수 있습니다.

```json
{
  "namespace": "example",
  "sample_panel": {
    "type": "panel",
    "$panel_size": [120, 40],
    "$panel_text": "Start Game",
    "$panel_alpha": 0.85,
    "$offset_y": 16,
    "size": "$panel_size",
    "alpha": "$panel_alpha",
    "offset": [0, "$offset_y"],
    "controls": [
      {
        "label": {
          "type": "label",
          "text": "$panel_text"
        }
      }
    ]
  }
}
```

변수를 통해 자식 요소의 참조 대상도 동적으로 지정할 수 있습니다.

```json
{
  "$child_template": "ui_templates.basic_button",
  "controls": [
    {
      "button@$child_template": {}
    }
  ]
}
```

## 변수 파생 (상속)

`요소이름@부모요소` 형식으로 기존 요소를 상속하면서 일부 변수 값만 바꿀 수 있습니다.

```json
{
  "namespace": "example",
  "base_button": {
    "type": "button",
    "$width": 120,
    "$height": 32,
    "$is_enabled": true
  },
  "primary_button@base_button": {
    "$width": 160
  }
}
```

`primary_button`은 `base_button`을 상속합니다. `$width`만 `160`으로 변경되며, `$height`와 `$is_enabled`는 그대로 유지됩니다.

## 연산자

변수와 바인딩 값에 다양한 연산자를 사용할 수 있습니다.

| 연산자 | 설명 | 예시 |
|--------|------|------|
| `+` | 덧셈 / 문자열 연결 | `"100% + 420px"`, `($text + ' my')`, `($index + 2)` |
| `-` | 뺄셈 / 문자열 제거 | `"100% - 69px"`, `($index - 13)` |
| `*` | 곱셈 | `($var * 9)`, `(#value * 5)` |
| `/` | 나눗셈 | `($var / 12)`, `(#value / 2)` |
| `=` | 같음 비교 | `($var = 12)`, `(#name = 'Wither')` |
| `>` | 보다 큼 | `($var > 13)` |
| `<` | 보다 작음 | `($var < 4)` |
| `> 또는 =` | 크거나 같음 | `(#value > 2 or #value = 2)` |
| `< 또는 =` | 작거나 같음 | `(#value < 2 or #value = 2)` |
| `and` | 논리 AND | `($is_school and $is_open)` |
| `or` | 논리 OR | `($is_cool or $is_awesome)` |
| `not` | 논리 NOT | `(not (#name = 'text'))` |

## 조건부 렌더링

JSON UI에는 일반적인 `if` 문이 없지만, `visible` 속성에 조건식을 넣어 UI 요소를 조건부로 표시하거나 숨길 수 있습니다.

### 변수를 사용한 조건부 렌더링

```json
{
  "status_label": {
    "type": "label",
    "text": "$status_message",
    "$msg": "$status_message",
    "visible": "(not ($msg = 'loading'))"
  }
}
```

`$status_message`가 `'loading'`이 아닐 때만 이 레이블이 표시됩니다.

::: warning 엔진 변수는 직접 비교할 수 없습니다
`$actionbar_text`처럼 엔진에서 직접 전달되는 변수는 바로 비교할 수 없습니다. 복사 변수를 만들어서 비교해야 합니다.

```json
{
  "actionbar_message": {
    "type": "label",
    "text": "$actionbar_text",
    "$atext": "$actionbar_text",
    "visible": "(not ($atext = 'hello world'))"
  }
}
```
:::

### 바인딩을 사용한 조건부 렌더링

바인딩(`#`)을 사용할 때는 `binding_type: "view"` 바인딩에서 조건식을 작성하고 `#visible`에 연결합니다.

```json
{
  "title": {
    "type": "label",
    "text": "#text",
    "bindings": [
      {
        "binding_name": "#hud_title_text_string",
        "binding_name_override": "#text",
        "binding_type": "global"
      },
      {
        "binding_type": "view",
        "source_property_name": "(not (#text = 'hello world'))",
        "target_property_name": "#visible"
      }
    ]
  }
}
```

## 데이터 보존 (Data Preservation)

타이틀(`/title`) 등 일시적으로 표시되는 데이터는 사라진 뒤에도 값을 유지해야 할 때가 있습니다. 이를 **데이터 보존** 기법으로 구현합니다.

### 기본 구조

보이는 `label`과, 두뇌 역할을 하는 숨겨진 `panel`(`data_control`)로 나눕니다.

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

### 구조 설명

| 부분 | 역할 |
|------|------|
| `property_bag` | `#preserved_text`라는 지역 변수를 선언하고 초기화. 초기값 `""`로 empty 오류 방지 |
| `binding_condition: "visibility_changed"` | 요소의 가시성이 바뀌는 순간(데이터가 들어오는 순간) 값을 보존 |
| `source_property_name: "(#preserved_text - $update_string)"` | 보존된 값에서 트리거 문자열을 제거해 실제 텍스트만 추출 |

::: warning 숫자 인식 문제
`(#preserved_text - $update_string)` 계산 결과가 `-123`처럼 숫자로 해석될 수 있습니다. `label`은 숫자를 받을 수 없으므로, 보이지 않는 문자열을 앞에 추가해 강제로 문자열로 만듭니다.

```json
"source_property_name": "('§r' + #preserved_text - $update_string)"
```
:::

### 응용: 화면 상단 actionbar

데이터 보존 기법으로 화면 상단에 actionbar와 유사한 요소를 구현한 완성 예제입니다.

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

이 요소를 HUD에 추가하려면 `/title @s actionbar top:표시할텍스트` 형식으로 타이틀 명령어를 사용합니다.
