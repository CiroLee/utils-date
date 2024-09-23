# utils-date

tiny and useful functions about date for frontend, written in typescript

[![codecov](https://codecov.io/gh/cirolee/utils-date/branch/main/graph/badge.svg)](https://codecov.io/gh/cirolee/utils-date/branch/main) ![npm bundle size](https://img.shields.io/bundlephobia/min/utils-date) ![GitHub](https://img.shields.io/github/license/cirolee/utils-date)

English | [简体中文](./README-ZH.md)

## install

```shell
# npm
npm install utils-date
#yarn
yarn add utils-date
#pnpm
pnpm add utils-date
```

## usage

```ts
import { format } from 'utils-date';
format('2023-01-01 12:12:12', {
  format: 'yyyy/mm/dd',
  padZero: false,
});
// 2023/1/1
```

## API

- [format](#format)
- [Week](#week)
- [offset](#offset)
- [min](#min)
- [max](#max)
- [diff](#diff)
- [clone](#clone)
- [set](#set)
- [daysInMonth](#daysinmonth)
- [daysOfYear](#daysofyear)
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
- [isPast](#ispast)
- [isFuture](#isfuture)
- [isToday](#istoday)
- [isBetween](#isbetween)

## types

```ts
type Time = Date | string | number;
type TimeUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
type WeekName = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
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

Format date. Default format is `yyyy-mm-dd hh:mm:ss`, the default date is zero-padded, if you don't need zero-padded display, please refer to `DateFormatOption` configuration.

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

Static class of the week.

signature:

```ts
class Week {
  // Get the week index of the specified date, default is for current date.
  static index(date?: Time): number;
  // Get the Chinese week name of the specified date, default is for current date.
  static zh(date?: Time, prefix?: string): string;
  // Get the English week name of the specified date, default is for current date.
  static en(date?: Time): string;
  // Get the abbreviation of the specified date, default is for current date.
  static abbr(date?: Time): string;
  // whether the given date is workday(between Monday and Friday)
  static isWorkDay(date?: Time): boolean;
  // whether the given date is weekend(Sunday or Saturday)
  static isWeekend(date?: Time): boolean;
  // whether the given date is the same week as weekName
  static isWeek(date: Time, weekName: WeekName): boolean;
}
```

example:

```ts
// if current date is 2023-11-8 12:12:12
Week.index(); // 2
Week.zh('2023-11-8 12:12:12'); // 二
Week.zh('2023-11-8 12:12:12', '周'); // 周二
Week.en('2023-11-8 12:12:12'); // Tuesday
Week.abbr('2023-11-8'); // Tue.
Week.isWorkDay(); // true
Week.isWeekend(); // false
Week.isWeek('2023-11-8', 'Tuesday'); // true
```

[⬆️ back](#api)

## offset

Date Offset. Equivalent to adding or subtracting dates. Supports offset calculation for year, month, day, week, hour, minute, second, millisecond.

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

Calculates the minimum value in an array of dates.  
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

Calculates the maximum value in an array of dates.

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

Calculates the difference between two dates. Supports calculating the difference in units of year, month, day, week, hour, minute, second, and millisecond.

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

Clone a date.

signature:

```ts
const old = new Date('2022-1-1 00:00:00');
const cloned = clone(old);
Object.is(old, cloned); // false
```

[⬆️ back](#api)

## set

return a new date with the applied changes, set utc:true, will use UTC method.

signature:

```ts
function set(date: Time, options: SetOptions): Date;

// setOptions
interface SetOptions {
  unit: Exclude<TimeUnit, 'week'>;
  value: number;
  utc?: boolean;
}
```

[⬆️ back](#api)

## daysInMonth

Calculates the number of days in the month for the specified date.

signature:

```ts
function daysInMonth(date: Time): number;
```

example:

```ts
daysInMonth('2022-1-1 00:00:00'); // 31
```

[⬆️ back](#api)

## daysOfYear

return the day of the year the specified date

signature:

```ts
function daysOfYear(date: Time): number;
```

example:

```ts
daysOfYear('2024-9-23 16:12:34'); // 267
```

[⬆️ back](#api)

## weekOfMonth

Calculates which week of the month the specified date is.

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

Calculates what week of the year the specified date is.

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

Gets the milliseconds of the specified date.

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

Gets the Unix timestamp for the specified date.

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

Turns the specified time into a Date object.

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

Turns the specified time into an object.

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

Turns the specified time into an array.

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

convert standard hours to Chinese traditional hours

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

Determines if the specified time is a valid date. E.g. Date object, legal ISO time string, Unix timestamp, etc.

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

Determine if two time values are equal.

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

if the first date precedes the second date.

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

if the first date is after the second date.

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

Determines whether the specified year is a leap year.

signature:

```ts
function isLeap(year: number): boolean;
```

example:

```ts
isLeap(2000); // true
```

[⬆️ back](#api)

## isPast

Determines if the specified time is in the past(compared to now).

signature:

```ts
function isPast(date: Time): boolean;
```

example:

```ts
isPast(new Date('1990-1-1 12:12:12')); // true
```

[⬆️ back](#api)

## isFuture

Determines if the specified time is in the future(compared to now).

signature:

```ts
function isFuture(date: Time): boolean;
```

example:

```ts
isFuture(new Date('2999-1-1 12:12:12')); // true
```

[⬆️ back](#api)

## isToday

Determines if the specified time is today.

signature:

```ts
function isToday(date: Time): boolean;
```

example:

```ts
const date = new Date('1900-01-23T00:00:00Z');
isToday(date); // false
```

[⬆️ back](#api)

## isBetween

Determines if the specified time is between the start date and end date.

signature:

```ts
function isBetween(date: Time, start: Time, end: Time): boolean;
```

example:

```ts
isBetween(new Date('2022-1-18 12:12:12'), '2022-01-01', '2022-12-31'); // true
```

[⬆️ back](#api)
