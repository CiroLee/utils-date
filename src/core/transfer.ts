/**
 * transfer module
 * transfers that convert date to another format about date
 * all function names start with "to"
 */
import { DateObject, Time } from '@src/types';
import { isDate } from './validator';
import { getType } from '@src/utils';
import { traditionHoursMap } from './constants';

/**
 * @desc transfer a date param to Date if it is valid
 * @param {Time} date
 * @returns {Date}
 */
export function toDate(date: Time): Date {
  if (!isDate(date)) {
    throw new Error('toDate: date is invalid, can not transfer to Date');
  }
  if (getType(date) === 'date') {
    return date as Date;
  }
  if (typeof date === 'string') {
    return new Date(date.replaceAll('/', '-'));
  }
  return new Date(date);
}

/**
 * @desc convert an date to object
 * @param {Time} date
 * @returns {DateObject}
 */
export function toObject(date: Time): DateObject {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const month = _date.getMonth();
  const week = _date.getDay();
  const day = _date.getDate();
  const hour = _date.getHours();
  const minute = _date.getMinutes();
  const second = _date.getSeconds();
  const millisecond = _date.getMilliseconds();

  return { year, month, day, week, hour, minute, second, millisecond };
}

/**
 * @desc convert date to an array
 * @param {Time} date
 * @returns {Number[]}
 */
export function toArray(date: Time): number[] {
  const dateObj = toObject(date);
  return [dateObj.year, dateObj.month, dateObj.day, dateObj.hour, dateObj.minute, dateObj.second, dateObj.millisecond];
}

/**
 * @desc convert standard hours to Chinese traditional hours
 * @param {Number} hour standard hour
 * @return {String} traditional Chinese hour
 */
export function toTraditionalHour(hour: number): string {
  if (typeof hour !== 'number' || hour < 0 || hour > 23 || isNaN(hour)) {
    throw new Error('invalid hour');
  }
  const item = traditionHoursMap.find((s) => {
    const condition = [
      hour >= s.range[0][0] && hour < s.range[0][1],
      s.range[1] ? hour >= s.range[1][0] && hour < s.range[1][1] : false,
    ];
    return condition.some(Boolean);
  });
  return item!.value;
}
