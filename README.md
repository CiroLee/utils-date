# utils-date

tiny and useful functions about date for frontend, written in typescript

[![codecov](https://codecov.io/gh/cirolee/utils-date/branch/main/graph/badge.svg)](https://codecov.io/gh/cirolee/utils-date/branch/main) ![npm bundle size](https://img.shields.io/bundlephobia/min/utils-date) ![GitHub](https://img.shields.io/github/license/cirolee/utils-date)

# install

```shell
npm install utils-date
```

# usage

```ts
import { format } from 'utils-date';
format('2023-01-01 12:12:12', {
  format: 'yyyy/mm/dd',
  padZero: false,
});
// 2023/1/1
```
