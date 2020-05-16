# 【eriko-scroller.js】

```text=
version: v1.0.0
last updated: 2020.5.16
```

## Availability

```shell=
npm install --save eriko-scroller.js
```

## Usage

```javascript=
import '[path]]/eriko-scroller.js';

// target element
var es = new window.ErikoScroller()
es.addObservableScrollEvent([target id], [option], [debugger]);
```

## Parameter

### example

```javascript=
const targetId = '#element';
const option = {
  type: 'w',
  top: 1,
  bottom: 1,
  enterEvent: handleEnterEvent,
  leaveEvent: handleLeaveEvent,
  aboveEvent: handleAboveEvent,
  underEvent: handleUnderEvent,
};
const debugger = true;
```

### document

name | type | optional | default
--- | --- | --- | ---
`targetId` | `string` | no |
`option` | `object` | no |
`debugger` | `boolean` | yes | `false`

#### `option`

name | type | optional | default | options
--- | --- | --- | --- | ---
`type` | `string` | no | | `'w'` / `'p'`
`top` | `number` | yes | 0
`bottom` | `number` | yes | 0
`enterEvent` | `function` | yes | `null`
`leaveEvent` | `function` | yes | `null`
`aboveEvent` | `function` | yes | `null`
`underEvent` | `function` | yes | `null`

`type`:  
`'w'`: [screen mode] - window.innerHeight  
`'p'`: [pixel mode] - pixel  
