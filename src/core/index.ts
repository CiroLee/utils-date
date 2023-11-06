import { DateFormatOption, Time, TimeUnit } from '@src/types';
import { getType, zeroFill } from '@src/utils';
import { TimeUintMap, weekMapEn, weekMapZh } from './constants';

export class Week {
  private static check(fnName: string, date?: Time): Date {
    if (date && !isDate(date)) {
      throw new Error(`Week.${fnName}: invalid date`);
    }
    return date ? new Date(date) : new Date();
  }
  /**
   * @desc return the week index of the date, default is current Time
   * @param {Time} [date]
   * @returns {Number}
   */
  static index(date?: Time): number {
    const _date = Week.check('index', date);
    return _date.getDay();
  }
  /**
   * @desc return the Chinese week word of the date, default is current Time
   * @param {Time} [date]
   * @returns {String}
   */
  static zh(date?: Time): string {
    const _date = Week.check('zh', date);
    return weekMapZh[_date.getDay()];
  }
  /**
   * @desc return the English week word of the date, default is current Time
   * @param {Time} [date]
   * @returns {String}
   */
  static en(date?: Time): string {
    const _date = Week.check('en', date);
    return weekMapEn[_date.getDay()].val;
  }
  /**
   * @desc return the English week abbreviation of the date, default is current Time
   * @param {Time} [date]
   * @returns {String}
   */
  static abbr(date?: Time): string {
    const _date = Week.check('abbr', date);
    return weekMapEn[_date.getDay()].abbr;
  }
}
/**
 * @desc return if the date param is a valid Date
 * @param {any} date
 * @returns {Boolean}
 */
export function isDate(date: any): boolean {
  return !Number.isNaN(new Date(date).valueOf());
}

/**
 * @desc transfer a date param to Date if it is valid
 * @param {Time} date
 * @returns {Date}
 */
export function toDate(date: Time): Date {
  if (!isDate(date)) {
    throw new Error('toDate: date is invalid, can not transfer to Date');
  }
  return new Date(date);
}

/**
 * @desc format date default format is yyyy-mm-dd HH:MM:SS, unix timestamp needs to be accurate to milliseconds
 * @param  {Date} date
 * @param  {string | DateFormatOption} [option] config option
 */
export function dateFormat(date: Time, option?: string | DateFormatOption): string {
  if (!isDate(date)) {
    throw new Error('dateFormat: date is invalid');
  }

  let _option = {
    format: 'yyyy-mm-dd HH:MM:SS',
    padZero: true,
  };
  if (typeof option === 'string') {
    _option.format = option;
  } else if (
    (getType(option) === 'object', getType(option?.format) === 'string' || getType(option?.padZero) === 'boolean')
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
 * @desc return an offset date. support offsetting year, month, day, week etc.
 * @param {Time} date
 * @param {Number} amount operation value, integer is added, negative is subtracted
 * @param {TimeUnit} timeUnit unit
 */
export function dateOffset(date: Time, amount: number, timeUnit: TimeUnit): Date {
  if (!isDate(date)) {
    throw new Error('dateOffset: date is invalid');
  }
  if (typeof amount !== 'number') {
    throw new Error('dateOffset: amount is invalid');
  }
  if (!TimeUintMap[timeUnit]) {
    throw new Error('dateOffset: timeUnit is invalid');
  }
  const _date = toDate(date);
  return new Date(_date.getTime() + amount * TimeUintMap[timeUnit]);
}

export function min(dates: Time[]): Date {
  if (!Array.isArray(dates)) {
    throw new Error('min: dates must be an array');
  }
  if (dates.some((d) => !isDate(d))) {
    throw new Error('min: elements in dates must be valid date');
  }
  const datesNum = dates.map((d) => toDate(d).getTime());
  return new Date(Math.min(...datesNum));
}

export function max(dates: Time[]): Date {
  if (!Array.isArray(dates)) {
    throw new Error('max: dates must be an array');
  }
  if (dates.some((d) => !isDate(d))) {
    throw new Error('max: elements in dates must be valid date');
  }
  const datesNum = dates.map((d) => toDate(d).getTime());
  return new Date(Math.max(...datesNum));
}

/**
 * @desc return if the two dates same
 * @param {Time} first compared date
 * @param {Time} second compared date
 * @returns {Boolean}
 */
export function isEqual(first: Time, second: Time): boolean {
  if (!isDate(first) || !isDate(second)) {
    throw new Error('equal: both first and second must be valid Date');
  }
  const firstDate = toDate(first);
  const secondDate = toDate(first);
  return firstDate.getTime() === secondDate.getTime();
}
/**
 * @desc return if first date is before second one
 * @param {Time} first first date to compare
 * @param {Time} second second date to compare
 * @returns {Boolean}
 */
export function isBefore(first: Time, second: Time): boolean {
  if (!isDate(first) || !isDate(second)) {
    throw new Error('both first and second must be valid Date');
  }
  const firstDate = toDate(first);
  const secondDate = toDate(second);
  return firstDate.getTime() < secondDate.getTime();
}
/**
 * @desc return if first date is after second one
 * @param {Time} first first date to compare
 * @param {Time} second second date to compare
 * @returns {Boolean}
 */
export function isAfter(first: Time, second: Time): boolean {
  return !isBefore(first, second);
}
