/**
 * validator module
 * include validates that validate date matching the rules
 * all function names start width "is"
 */
import { Time } from '@src/types';
import { toDate, toObject } from './transfer';

/**
 * @description return if the date param is a valid Date
 * @param {any} date
 * @returns {Boolean}
 */
export function isDate(date: any): boolean {
  return !Number.isNaN(new Date(date).valueOf());
}

/**
 * @description return if first date value is the same as the second one
 * @param {Time} first compared date
 * @param {Time} second compared date
 * @returns {Boolean}
 */
export function isSame(first: Time, second: Time): boolean {
  const firstDate = toDate(first);
  const secondDate = toDate(second);
  return firstDate.getTime() === secondDate.getTime();
}

/**
 * @description return if first date is before second one
 * @param {Time} first first date to compare
 * @param {Time} second second date to compare
 * @returns {Boolean}
 */
export function isBefore(first: Time, second: Time): boolean {
  const firstDate = toDate(first);
  const secondDate = toDate(second);
  return firstDate.getTime() < secondDate.getTime();
}
/**
 * @description return if first date is after second one
 * @param {Time} first first date to compare
 * @param {Time} second second date to compare
 * @returns {Boolean}
 */
export function isAfter(first: Time, second: Time): boolean {
  return !isBefore(first, second);
}

/**
 * @description return if the year is leap
 * @param {Number} year
 */
export function isLeap(year: number): boolean {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

/**
 * @description whether the given date is in the past
 * @param {Time} date given date
 * @returns {Boolean}
 */
export function isPast(date: Time): boolean {
  return isBefore(date, new Date());
}

/**
 * @description whether the given date is in the future
 * @param {Time} date given date
 * @returns {Boolean}
 */
export function isFuture(date: Time): boolean {
  return isAfter(date, new Date());
}

/**
 * @description whether the given date is between start date and end date
 * @param {Time} date given date
 * @param {Time} start start date
 * @param {Time} end end date
 * @returns {Boolean}
 */
export function isBetween(date: Time, start: Time, end: Time): boolean {
  return isAfter(date, start) && isBefore(date, end);
}

/**
 * @description whether the given date is today
 * @param {Time} date given date
 * @returns {Boolean}
 */
export function isToday(date: Time): boolean {
  const today = toObject(new Date());
  const todayDate = toDate(`${today.year}/${today.month + 1}/${today.day}`);
  const given = toObject(date);
  const givenDate = toDate(`${given.year}/${given.month + 1}/${given.day}`);
  return isSame(todayDate, givenDate);
}
