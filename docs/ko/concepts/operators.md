# 연산자(Operator)

::: info 이 페이지에서 배울 것
- JSON UI에서 사용 가능한 연산자 전체 목록
- 산술, 비교, 논리 연산자 예제
- 문자열 연산 방법
:::

## 연산자 개요 {#overview}

JSON UI에서는 `size`, `offset`, `visible` 등 다양한 속성 값에 **연산식**을 사용할 수 있습니다. 연산식은 괄호 `()` 안에 작성합니다.

```json
"size": ["100% + 12px", "100%cm + 5px"],
"visible": "(not ($msg = 'loading'))"
```

## 산술 연산자 {#arithmetic}

| 연산자 | 설명 | 예시 |
|--------|------|------|
| `+` | 덧셈 | `($index + 2)` |
| `-` | 뺄셈 | `($index - 13)` |
| `*` | 곱셈 | `($var * 9)` |
| `/` | 나눗셈 | `($var / 12)` |

크기 단위와 함께 사용할 수 있습니다.

```json
"size": ["100% + 420px", "100% - 69px"]
```

## 문자열 연산 {#string}

`+`는 숫자 덧셈뿐만 아니라 **문자열 연결**에도 사용됩니다.

```json
($text + ' world')
('#' + $badge_name + '_icon')
```

`-`는 문자열에서 특정 부분 문자열을 **제거**합니다.

```json
($text - 'prefix:')
(#preserved_text - $update_string)
```

::: tip 데이터 보존 기법에서 활용
문자열 빼기는 트리거 문자열을 제거하고 실제 값만 추출하는 데이터 보존 패턴에서 핵심적으로 사용됩니다.
:::

## 비교 연산자 {#comparison}

| 연산자 | 설명 | 예시 |
|--------|------|------|
| `=` | 같음 | `($var = 12)`, `(#name = 'Wither')` |
| `>` | 보다 큼 | `($var > 13)` |
| `<` | 보다 작음 | `($var < 4)` |

크거나/작거나 같음은 `or`를 조합해 표현합니다.

```json
(#value > 2 or #value = 2)
(#value < 2 or #value = 2)
```

## 논리 연산자 {#logical}

| 연산자 | 설명 | 예시 |
|--------|------|------|
| `and` | 논리 AND — 둘 다 참일 때 | `($is_school and $is_open)` |
| `or` | 논리 OR — 하나라도 참일 때 | `($is_cool or $is_awesome)` |
| `not` | 논리 NOT — 참/거짓 반전 | `(not (#name = 'text'))` |

복잡한 조건도 조합할 수 있습니다.

```json
"visible": "(not (#hud_title_text_string = #preserved_text) and not ((#hud_title_text_string - $update_string) = #hud_title_text_string))"
```

## 연산식 적용 가능한 속성 {#applicable}

| 속성 | 예시 |
|------|------|
| `size` | `["100% + 12px", "100%cm + 5px"]` |
| `offset` | `["50% - 10px", 0]` |
| `visible` | `"(not ($msg = 'loading'))"` |
| `alpha` | 바인딩의 `source_property_name` 에서 |
| `text` (바인딩) | `"('§r' + #preserved_text - $update_string)"` |
