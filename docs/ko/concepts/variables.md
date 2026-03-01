# 변수(Variable)

::: info 이 페이지에서 배울 것
- 변수(`$`)의 개념
- 전역 변수 (`_global_variables.json`)
- 요소 안에서 지역 변수 정의하기
- 변수 파생(상속)으로 요소 재사용하기
:::

## 변수란? {#what-is}

변수는 이름 앞에 `$`가 붙는 값입니다. 하나의 요소 안에서 값을 재사용하거나, 자식 요소에 데이터를 전달할 때 사용합니다.

| 종류 | 접두사 | 정의 위치 |
|------|--------|----------|
| 변수 | `$` | UI 파일 또는 `_global_variables.json` |
| 바인딩 | `#` | 게임 엔진이 직접 제공 |

변수(`$`)는 UI 작성자가 직접 만들고 관리합니다. 바인딩(`#`)은 다음 페이지에서 다룹니다.

## 전역 변수 {#global}

`_global_variables.json`은 **모든 네임스페이스에서 공유**할 수 있는 변수를 정의하는 파일입니다.

```json
// RP/ui/_global_variables.json
{
  "$text_global": "test",
  "$default_color": [1, 1, 1]
}
```

다른 파일에서는 별도 선언 없이 바로 사용할 수 있습니다.

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

## 지역 변수 정의 {#local}

요소 안에서 직접 변수를 선언하고 같은 요소 내에서 사용할 수 있습니다.

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

::: tip 자식 요소도 부모의 변수를 사용할 수 있습니다
`controls` 안의 자식 요소는 부모에서 선언한 변수를 그대로 참조할 수 있습니다.
:::

### 변수로 참조 대상 지정

변수를 사용해 자식 요소가 어떤 요소를 상속할지도 동적으로 결정할 수 있습니다.

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

## 변수 파생 (상속) {#derivation}

`요소이름@부모요소` 형식으로 기존 요소를 상속하면서 **일부 변수 값만 바꿀 수** 있습니다.

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

`primary_button`은 `base_button`을 상속합니다.

- `$width` → `160`으로 덮어씀
- `$height`, `$is_enabled` → `base_button`의 값 그대로 유지

### 다른 네임스페이스 요소 상속

```json
{
  "namespace": "my_ui",
  "my_button@vanilla_ui.common_button": {
    "$button_text": "클릭"
  }
}
```
