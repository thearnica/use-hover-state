<hr>
<div align="center">
  <h1 align="center">
    useHoverState()
  </h1>
The one aware of keyboard navigation as well 😉
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=use-hover-state">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/use-hover-state?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/use-hover-state">
    <img alt="Types" src="https://img.shields.io/npm/types/use-hover-state?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/use-hover-state?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i use-hover-state</pre>
<hr>

A React hook for tracking user interaction with the DOM elements, combining 🖱mouse events and ⌨️ keyboard focus

## Quick Start

```tsx
import * as React from 'react';
import { useHoverState } from 'use-hover-state';

const Component = (props) => {
  const [isHovering, hoverState] = useHoverState();
  return <div {...hoverState}>{isHovering ? 'Hovering' : 'Not hovering'}</div>;
};
```

## API

### useHoverState(options?)

#### Returns [`boolean`, `spreadProps`]

This hook returns a tuple with the:

- boolean `isHovered` state, representing current active state of an element
- object `spreadProps`, which one should spread on the given element
- object `realState`, which one can use to distinguish mouse and keyboard activity

#### HoverOptions

| Property   | Type   | Description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| enterDelay | number | Delays setting `isHovering` to `true` for this amount in `ms`  |
| leaveDelay | number | Delays setting `isHovering` to `false` for htis amount in `ms` |

You almost certainty need to set `leaveDelay` to a non zero value

### supportsHover

A hover feature detector

```tsx
import { supportsHover } from 'react-hover-state';

switch (supportsHover()) {
  case true:
    'yes';
  case false:
    'no';
  default:
    'this is server';
}
```

## See also

- [@react-hook/hover](https://github.com/jaredLunde/react-hook/tree/master/packages/hover) similar package without
  keyboard functionality

## LICENSE

MIT
