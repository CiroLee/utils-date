# utils-date

使用`typescript`为前端打造的轻量实用的日期工具函数

[![codecov](https://codecov.io/gh/cirolee/utils-date/branch/main/graph/badge.svg)](https://codecov.io/gh/cirolee/utils-date/branch/main) ![npm bundle size](https://img.shields.io/bundlephobia/min/utils-date) ![GitHub](https://img.shields.io/github/license/cirolee/utils-date)

[English](./README.md) | 简体中文

# 安装

```shell
# npm
npm install utils-date
#yarn
yarn add utils-date
#pnpm
pnpm add utils-date
```

# 使用

```ts
import { format } from 'utils-date';
format('2023-01-01 12:12:12', {
  format: 'yyyy/mm/dd',
  padZero: false,
});
// 2023/1/1
```

# API

- [format](#format)
- [Week](#week)
- [offset](#offset)
- [min](#min)
- [max](#max)
- [diff](#diff)
- [clone](#clone)
- [daysInMonth](#daysinmonth)
- [weekOfMonth](#weekofmonth)
- [weekOfYear](#weekofyear)
- [getTime](#gettime)
- [getUnixTime](#getunixtime)
- [toDate](#todate)
- [toObject](#toobject)
- [toArray](#toarray)
- [toTraditionalHour](#totraditionalhour)
- [isDate](#isdate)
- [isSame](#issame)
- [isBefore](#isbefore)
- [isAfter](#isafter)
- [isLeap](#isleap)

# types

```ts
type Time = Date | string | number;
type TimeUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond;
interface DateFormatOption {
  format?: string;
  padZero?: boolean;
}
interface DateObject {
  year: number;
  month: number;
  week: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}
```

## format

格式化日期。默认格式为`yyyy-mm-dd hh:mm:ss`，默认日期补零，如果不需要补零显示，请参考`DateFormatOption`配置。  
signature:

```ts
function format(date: Time, option?: string | DateFormatOption): string;
```

example:

```ts
format(new Date(1642479132000)); // 2022-01-18 12:12:12
format(new Date(1642479132000), false); // 2022-1-18 12:12:12
format(new Date(1642479132000), 'yyyy/mm/dd'); // 2022/01/18
format(new Date(1642479132000), 'yyyy年mm月dd日'); // 2022年01月18日
format(new Date(1642479132000), {
  format: 'yyyy/mm/dd HH:MM:SS',
  padZero: false,
}); // 2022/1/18 12:12:12
```

[⬆️ back](#api)

## Week

获取星期的静态类。

signature:

```ts
class Week {
  // 获取指定日期的星期索引，省略参数则获取当前日期的星期索引
  static index(date?: Time): number;
  // 获取指定日期的中文星期名称，省略参数则获取当前日期的中文星期名称
  static zh(date?: Time): string;
  // 获取指定日期的英文星期名称，省略参数则获取当前日期的英文星期名称
  static en(date?: Time): string;
  // 获取指定日期的英文星期名称简写，省略参数则获取当前日期的英文星期简写
  static abbr(date?: Time): string;
}
```

example:

```ts
// 假设当前日期为2023-11-8 12:12:12
Week.index(); // 2
Week.zh('2023-11-7 12:12:12'); // 二
Week.en('2023-11-8 12:12:12'); // Tuesday
Week.abbr('2023-11-8'); // Tue.
```

[⬆️ back](#api)

## offset

日期偏移。等价于对日期进行加减操作。支持对年、月、日、周、时、分、秒、毫秒进行偏移计算。

signature:

```ts
function offset(date: Time, amount: number, timeUnit: TimeUnit): Date;
```

example:

```ts
const date = new Date('2023-05-01T00:00:00');
offset(date, 3, 'month'); // 2023-08-01T00:00:00.000Z
offset(date, -3, 'day'); // 2023-04-27T16:00:00.000Z
```

[⬆️ back](#api)

## min

计算日期数组中的最小值。  
signature:

```ts
function min(dates: Time[]): Date;
```

example:

```ts
const dates = [new Date('2022-1-1 12:12:12'), '2022-1-1 14:12:12', '2021-12-31 12:12:12'];
min(dates); // 2021-12-31T12:12:12.000Z
```

[⬆️ back](#api)

## max

计算日期数组中的最大值。

signature:

```ts
function max(dates: Time[]): Date;
```

example:

```ts
const dates = [new Date('2022-1-1 12:12:12'), '2022-1-1 14:12:12', '2021-12-31 12:12:12'];
max(dates); // 2022-01-01T14:12:12.000Z
```

[⬆️ back](#api)

## diff

计算两个日期之间的差值。支持计算年、月、日、周、时、分、秒、毫秒为单位的差值。

signature:

```ts
function diff(first: Time, second: Time, unit: TimeUnit): number;
```

example:

```ts
diff('2022-12-1 12:12:12', '2022-1-1 12:12:12', 'day'); // 334p
diff('2022-12-1 12:12:12', '2022-12-1 22:12:12', 'hour'); // -10
```

[⬆️ back](#api)

## clone

克隆一个日期。

signature:

```ts
const old = new Date('2022-1-1 00:00:00');
const cloned = clone(old);
Object.is(old, cloned); // false
```

[⬆️ back](#api)

## daysInMonth

计算指定日期月份天数。

signature:

```ts
function daysInMonth(date: Time): number;
```

example:

```ts
daysInMonth('2022-1-1 00:00:00'); // 31
```

[⬆️ back](#api)

## weekOfMonth

计算指定日期是本月的第几周。

signature:

```ts
function weekOfMonth(date: Time): number;
```

example:

```ts
weekOfMonth('2023-11-8 12:12:12'); // 2
```

[⬆️ back](#api)

## weekOfYear

计算指定日期是本年的第几周。

signature:

```ts
function weekOfYear(date: Time): number;
```

example:

```ts
weekOfYear('2023-11-8 12:12:12'); // 45
```

[⬆️ back](#api)

## getTime

获取指定日期的毫秒时间戳。

signature:

```ts
function getTime(date: Time): number;
```

example:

```ts
getTime('2023-11-8 12:12:12'); // 1699416732000
```

[⬆️ back](#api)

## getUnixTime

获取指定日期的Unix时间戳。

signature:

```ts
function getUnixTime(date: Time): number;
```

example:

```ts
getUnixTime('2023-11-8 12:12:12'); // 1699416732
```

[⬆️ back](#api)

## toDate

将指定时间转为Date对象。

signature:

```ts
function toDate(date: Time): Date;
```

example:

```ts
toDate('2023-11-8 12:12:12'); // 2023-11-08T12:12:12.000Z
toDate(1699416732000); // 2023-11-08T12:12:12.000Z
```

[⬆️ back](#api)

## toObject

将指定时间转为对象。

signature:

```ts
function toObject(date: Time): DateObject;
```

example:

```ts
toObject('2023-11-8 12:12:12');
// output
{
  year: 2023,
  month: 10,
  day: 8,
  week: 3,
  hour: 12,
  minute: 12,
  second: 12,
  millisecond: 0
}
```

[⬆️ back](#api)

## toArray

将指定时间转为数组。

signature:

```ts
function toArray(date: Time): number[];
```

example:

```ts
toArray('2023-11-8 12:12:12'); // [2023, 10, 8, 12, 12, 12, 0]
```

[⬆️ back](#api)

## toTraditionalHour

将标准时间小时转换为中国传统对应时辰

signature:

```ts
function toTraditionalHour(hour: number): string;
```

example:

```ts
toTraditionalHour(12); // 午
toTraditionalHour(23); // 子
```

[⬆️ back](#api)

## isDate

判断指定时间是否为有效日期。 如：Date对象，合法的ISO时间字符串，Unix时间戳等。

signature:

```ts
isDate(date: any): boolean;
```

example:

```ts
isDate(new Date()); // true
isDate('2022-1-1'); // true
isDate({}); // false
```

[⬆️ back](#api)

## isSame

判断两个时间值是否相等。

signature:

```ts
function isSame(first: Time, second: Time): boolean;
```

example:

```ts
isSame('2022-1-1 12:12:12', new Date('2022-1-1 12:12:12')); // true
```

[⬆️ back](#api)

## isBefore

判断第一个日期是否在第二个日期之前。

signature:

```ts
function isBefore(first: Time, second: Time): boolean;
```

example:

```ts
isBefore('2022-1-1 12:12:12', '2022-1-3 12:12:12'); // true
```

[⬆️ back](#api)

## isAfter

判断第一个日期是否在第二个日期之后。

signature:

```ts
function isAfter(first: Time, second: Time): boolean;
```

example:

```ts
isAfter('2022-1-1 12:12:12', '2022-1-3 12:12:12'); // false
```

[⬆️ back](#api)

## isLeap

判断指定年份是否为闰年。

signature:

```ts
function isLeap(year: number): boolean;
```

example:

```ts
isLeap(2000); // true
```

[⬆️ back](#api)
