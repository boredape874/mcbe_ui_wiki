# 바인딩(Binding)

::: info 이 페이지에서 배울 것
- 바인딩(`#`)이란 무엇인가
- binding_name과 binding_name_override 사용법
- binding_type: "view"로 조건 연결하기
- visible, enabled 등 불리언 속성에 바인딩 활용하기
:::

## 바인딩이란?

**바인딩**은 게임 엔진에서 하드코딩된 값이나 다른 요소의 상태를 UI 요소의 속성에 연결하기 위해 사용합니다.

변수(`$`)가 UI 내부에서 정의되고 전달되는 값이라면, 바인딩(`#`)은 **게임 엔진이 직접 제공하는 데이터**입니다.

```json
{
  "title_label": {
    "type": "label",
    "text": "#title_text",
    "bindings": [
      {
        "binding_name": "#title_text"
      }
    ]
  }
}
```

`binding_name`으로 엔진이 제공하는 값을 불러오고, 그 값을 `text` 속성에서 `#title_text`로 참조합니다.

## binding_name_override

바인딩으로 가져온 값을 다른 이름으로 바꿔 사용할 수 있습니다.

```json
{
  "title_label": {
    "type": "label",
    "text": "#display_text",
    "bindings": [
      {
        "binding_name": "#title_text",
        "binding_name_override": "#display_text"
      }
    ]
  }
}
```

`#title_text`로 값을 가져오지만, 요소 안에서는 `#display_text`라는 이름으로 사용합니다.

## visible / enabled에 바인딩 활용

`visible`이나 `enabled` 같은 불리언 속성은 바인딩과 자주 함께 사용됩니다.

```json
{
  "mobile_hint": {
    "type": "label",
    "text": "모바일 전용 안내",
    "bindings": [
      {
        "binding_name": "#is_mobile",
        "binding_name_override": "#visible"
      }
    ]
  }
}
```

`#is_mobile`이 `true`이면 표시, `false`이면 숨김.

```json
{
  "start_button": {
    "type": "button",
    "bindings": [
      {
        "binding_name": "#can_start",
        "binding_name_override": "#enabled"
      }
    ]
  }
}
```

## binding_type: "view"

`binding_type: "view"`는 **다른 요소의 상태**를 이 요소의 속성으로 가져올 때 사용합니다.

### 다른 요소의 상태 감시

체크박스(toggle)가 선택됐을 때 패널을 표시하는 예제입니다.

```json
{
  "settings_panel": {
    "type": "panel",
    "bindings": [
      {
        "binding_type": "view",
        "source_control_name": "sound_toggle",
        "source_property_name": "#checked",
        "target_property_name": "#visible"
      }
    ]
  },
  "sound_toggle": {
    "type": "toggle"
  }
}
```

`sound_toggle`의 `#checked` 값이 `settings_panel`의 `#visible`에 연결됩니다.

### 조건식을 직접 작성

`source_property_name`에 조건식을 넣어 조건부로 속성을 제어할 수 있습니다.

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

타이틀 텍스트가 `'hello world'`가 아닐 때만 표시됩니다.

## binding_type: "global"

전역 바인딩은 특정 부모 요소에 종속되지 않고, 게임 전체에서 제공되는 데이터를 가져올 때 사용합니다.

```json
{
  "binding_name": "#hud_title_text_string",
  "binding_name_override": "#text",
  "binding_type": "global"
}
```

## resolve_sibling_scope

`source_control_name`으로 참조할 대상이 **부모-자식** 관계가 아닌 **형제** 관계일 때 `resolve_sibling_scope: true`를 추가합니다.

```json
{
  "label": {
    "type": "label",
    "text": "#text",
    "bindings": [
      {
        "binding_type": "view",
        "source_control_name": "data_control",
        "resolve_sibling_scope": true,
        "source_property_name": "#preserved_text",
        "target_property_name": "#text"
      }
    ]
  }
}
```

## 요소 수정 (modifications)

기존 바닐라 요소의 `bindings` 배열에 새 바인딩을 추가할 때는 `modifications`를 사용합니다.

```json
{
  "hud_title_text/title_frame/title": {
    "modifications": [
      {
        "array_name": "bindings",
        "operation": "insert_back",
        "value": {
          "binding_type": "view",
          "source_property_name": "(not (#text = 'hello world'))",
          "target_property_name": "#visible"
        }
      }
    ]
  }
}
```

`operation`에는 `insert_front`, `insert_back`, `remove` 등을 사용할 수 있습니다.
