/**
 * common module
 * common operations about date
 */
import { DateFormatOption, Time, TimeUnit, WeekName } from '@src/types';
import { chooseSetFunc, getType, zeroFill } from '@src/utils';
import { toDate } from './transfer';
import { TimeUintMap, weekMapEn, weekMapZh, weekIndex } from './constants';
import { isDate } from './validator';

/**
 * @description static class of week
 * @method index return the week index for the specified date
 * @method zh return the Chinese week word for the specified date
 * @method en return the English week word for the specified date
 * @method abbr return the English week abbreviation for the specified date
 */
export class Week {
  private static check(fnName: string, date?: Time): Date {
    if (date && !isDate(date)) {
      throw new Error(`Week.${fnName}: invalid date`);
    }
    return date ? new Date(date) : new Date();
  }
  /**
   * @description return the week index of the date, default is current Time
   * @param {Time} [date]
   * @returns {Number}
   */
  static index(date?: Time): number {
    const _date = Week.check('index', date);
    return _date.getDay();
  }
  /**
   * @description return the Chinese week word of the date, default is current Time
   * @param {Time} [date]
   * @returns {String}
   */
  static zh(date?: Time, prefix = ''): string {
    const _date = Week.check('zh', date);
    return prefix + weekMapZh[_date.getDay()];
  }
  /**
   * @description return the English week word of the date, default is current Time
   * @param {Time} [date]
   * @returns {String}
   */
  static en(date?: Time): string {
    const _date = Week.check('en', date);
    return weekMapEn[_date.getDay()].val;
  }
  /**
   * @description return the English week abbreviation of the date, default is current Time
   * @param {Time} [date]
   * @returns {String}
   */
  static abbr(date?: Time): string {
    const _date = Week.check('abbr', date);
    return weekMapEn[_date.getDay()].abbr;
  }
  /**
   * @description whether the given date is workday(between Monday and Friday)
   * @param {Time} date given date, default is current
   * @returns {Boolean}
   */
  static isWorkDay(date?: Time): boolean {
    const index = Week.index(date);
    return index >= 1 && index <= 5;
  }
  /**
   * @description whether the given date is weekend(Sunday or Saturday)
   * @param {Time} date given date, default is current
   * @returns {Boolean}
   */
  static isWeekEnd(date?: Time): boolean {
    return !Week.isWorkDay(date);
  }
  /**
   * @description whether the given date is the same week as weekName
   * @param {Time} date
   * @param {WeekName} weekName target week name
   * @returns {Boolean}
   */
  static isWeek(date: Time, weekName: WeekName): boolean {
    return Week.index(date) === weekIndex[weekName];
  }
}

/**
 * @description format date default format is yyyy-mm-dd HH:MM:SS, unix timestamp needs to be accurate to milliseconds
 * @param  {Time} date
 * @param  {string | DateFormatOption} [option] config option
 */
export function format(date: Time, option?: string | DateFormatOption): string {
  let _option = {
    format: 'yyyy-mm-dd HH:MM:SS',
    padZero: true,
  };
  if (typeof option === 'string') {
    _option.format = option;
  } else if (
    getType(option) === 'object' &&
    (getType(option?.format) === 'string' || getType(option?.padZero) === 'boolean')
  ) {
    _option = {
      ..._option,
      ...option,
    };
  }

  const _date = toDate(date);

  const o = {
    yyyy: _date.getFullYear(),
    mm: _option.padZero ? zeroFill(_date.getMonth() + 1) : _date.getMonth() + 1,
    dd: _option.padZero ? zeroFill(_date.getDate()) : _date.getDate(),
    HH: _option.padZero ? zeroFill(_date.getHours()) : _date.getHours(),
    MM: _option.padZero ? zeroFill(_date.getMinutes()) : _date.getMinutes(),
    SS: _option.padZero ? zeroFill(_date.getSeconds()) : _date.getSeconds(),
  };

  return _option.format
    .replace(/yyyy/g, `${o.yyyy}`)
    .replace(/mm/g, `${o.mm}`)
    .replace(/dd/g, `${o.dd}`)
    .replace(/HH/g, `${o.HH}`)
    .replace(/MM/g, `${o.MM}`)
    .replace(/SS/g, `${o.SS}`);
}

/**
 * @description return an offset date. support offsetting year, month, day, week etc.
 * @param {Time} date
 * @param {Number} amount operation value, integer is added, negative is subtracted
 * @param {TimeUnit} timeUnit unit
 */
export function offset(date: Time, amount: number, timeUnit: TimeUnit): Date {
  if (typeof amount !== 'number') {
    throw new Error('dateOffset: amount is invalid');
  }
  if (!TimeUintMap[timeUnit]) {
    throw new Error('dateOffset: timeUnit is invalid');
  }

  const _date = clone(toDate(date));
  const stack = {
    year: (value: number) => _date.setFullYear(_date.getFullYear() + value),
    month: (value: number) => _date.setMonth(_date.getMonth() + value),
    day: (value: number) => _date.setDate(_date.getDate() + value),
    week: (value: number) => _date.setDate(_date.getDate() + value * 7),
    hour: (value: number) => _date.setHours(_date.getHours() + value),
    minute: (value: number) => _date.setMinutes(_date.getMinutes() + value),
    second: (value: number) => _date.setSeconds(_date.getSeconds() + value),
    millisecond: (value: number) => _date.setMilliseconds(_date.getMilliseconds() + value),
  };
  stack[timeUnit](amount);
  return _date;
}
/**
 * @description return min date of the date array
 * @param {Time[]} dates valid date array
 * @returns {Date}
 */
export function min(dates: Time[]): Date {
  if (!Array.isArray(dates)) {
    throw new Error('min: dates must be an array');
  }
  const datesNum = dates.map((d) => toDate(d).getTime());
  return new Date(Math.min(...datesNum));
}
/**
 * @description return max date of the date array
 * @param {Time[]} dates valid date array
 * @returns {Date}
 */
export function max(dates: Time[]): Date {
  if (!Array.isArray(dates)) {
    throw new Error('max: dates must be an array');
  }
  const datesNum = dates.map((d) => toDate(d).getTime());
  return new Date(Math.max(...datesNum));
}

/**
 * @description return the diff of two dates
 * @param {Date} first
 * @param {Date} second
 * @param {TimeUnit} unit unit of diff,support year, month, week, day etc.
 * @returns {Number}
 */
export function diff(first: Time, second: Time, unit: TimeUnit): number {
  if (!TimeUintMap[unit]) {
    throw new Error('diff: invalid unit');
  }
  const firstDate = toDate(first);
  const secondDate = toDate(second);
  const diff = firstDate.getTime() - secondDate.getTime();
  return Number(diff / TimeUintMap[unit]);
}
/**
 * @description return a cloned date
 * @param {Date} date
 * @returns {Date}
 */
export function clone(date: Date): Date {
  if (getType(date) !== 'date') {
    throw new Error('clone: date must be Date type');
  }
  return new Date(date.getTime());
}
/**
 * @description return the number of days in the specified month
 * @param {Time} date
 * @returns {Number}
 */
export function daysInMonth(date: Time): number {
  const d = toDate(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/**
 * @description return the week number of this month for the specified date
 * @param {Time }date
 * @returns {Number}
 */
export function weekOfMonth(date: Time): number {
  const d = toDate(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  const first = new Date(year, month, 1);
  const duration = (d.getTime() - first.getTime()) / TimeUintMap.day;
  return Math.ceil(duration / 7);
}
/**
 * @description return the week number of this year for the specified date
 * @param {Time} date
 * @returns {Number}
 */
export function weekOfYear(date: Time): number {
  const duration = daysOfYear(date);
  return Math.ceil(duration / 7);
}

/**
 * @description return the day of the year the specified date
 * @param {Time} date
 * @returns {Number}
 */
export function daysOfYear(date: Time): number {
  const d = toDate(date);
  const year = d.getFullYear();
  const first = new Date(year, 0, 1);
  const duration = (d.getTime() - first.getTime()) / TimeUintMap.day;
  return Math.ceil(duration);
}

/**
 * @description return the milliseconds of the specified date
 * @param {Time} date
 * @returns {Number}
 */
export function getTime(date: Time): number {
  return toDate(date).getTime();
}

/**
 * @description return the unix timestamp of the specified date
 * @param {Time} date
 * @returns {Number}
 */
export function getUnixTime(date: Time): number {
  return parseInt(getTime(date) / 1000 + '', 10);
}

interface SetOptions {
  unit: Exclude<TimeUnit, 'week'>;
  value: number;
  utc?: boolean;
}

/**
 * @description return a new date with the applied changes
 * @param {Time} date
 * @param {SetOptions} options
 * @returns {Date}
 */
export function set(date: Time, options: SetOptions): Date {
  const d = clone(toDate(date));
  const setFunc = chooseSetFunc(options.unit, options.utc);
  (d[setFunc as keyof Date] as Function)(options.value);
  return d;
}
