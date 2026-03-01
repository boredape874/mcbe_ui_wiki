# 조건부 렌더링

::: info 이 페이지에서 배울 것
- `visible` 속성으로 UI 요소를 조건부로 표시/숨기는 방법
- 변수(`$`)를 사용한 조건부 렌더링
- 바인딩(`#`)을 사용한 조건부 렌더링
- 실전 예제 (actionbar, title)
:::

## 개요 {#overview}

JSON UI에는 일반적인 `if` 문이 없습니다. 대신 `visible` 속성에 조건식을 넣어 요소를 조건부로 표시하거나 숨깁니다.

```json
"visible": "(not ($msg = 'loading'))"
```

## 변수를 사용한 조건부 렌더링 {#variable}

변수(`$`)로 조건을 만들 때는 `visible` 속성에 직접 조건식을 씁니다.

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

`$status_message`가 `'loading'`이 아닐 때만 표시됩니다.

::: warning 엔진 변수는 직접 비교할 수 없습니다
`$actionbar_text`처럼 엔진에서 직접 전달되는 변수는 바로 비교에 사용할 수 없습니다. 복사 변수를 만들어서 비교해야 합니다.

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

### 실전 예제: actionbar 필터링

액션바에 `hello world`가 입력될 때 메시지를 숨기는 예제입니다.

```json
{
  "hud_actionbar_text/actionbar_message": {
    "$atext": "$actionbar_text",
    "visible": "(not ($atext = 'hello world'))"
  }
}
```

`/title @s actionbar hello world` 를 입력하면 아무 메시지도 표시되지 않습니다.

## 바인딩을 사용한 조건부 렌더링 {#binding}

바인딩(`#`)을 조건부 렌더링에 사용할 때는 `binding_type: "view"` 바인딩에서 조건식을 작성하고 `#visible`에 연결합니다.

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

### 실전 예제: 기존 타이틀 요소에 조건 추가

`modifications`를 사용해 바닐라 타이틀 요소에 조건을 추가할 수 있습니다.

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

`/title @a title hello world` 입력 시 타이틀이 표시되지 않습니다.

## 조건부로 이미지 표시하기 {#image}

타이틀이 `hello world`일 때만 16×16 검은 사각형을 HUD에 표시하는 예제입니다.

```json
{
  "black_conditional_image": {
    "type": "image",
    "texture": "textures/ui/Black",
    "size": [16, 16],
    "layer": 10,
    "$atext": "$actionbar_text",
    "visible": "($atext = 'hello world')"
  },
  "black_conditional_image_factory": {
    "type": "panel",
    "factory": {
      "name": "hud_actionbar_text_factory",
      "control_ids": {
        "hud_actionbar_text": "black_conditional_image@hud.black_conditional_image"
      }
    }
  },
  "root_panel": {
    "modifications": [
      {
        "array_name": "controls",
        "operation": "insert_front",
        "value": {
          "black_conditional_image_factory@hud.black_conditional_image_factory": {}
        }
      }
    ]
  }
}
```

## 정리 {#summary}

| 방식 | visible 위치 | 사용 상황 |
|------|-------------|----------|
| 변수 조건 | `"visible": "(조건식)"` | UI 내부 변수(`$`)로 제어할 때 |
| 바인딩 조건 | `bindings` 배열의 `view` 타입 | 엔진 데이터(`#`)로 제어할 때 |
