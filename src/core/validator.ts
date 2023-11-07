/**
 * validator module
 * include validates that validate date matching the rules
 * all function names start width "is"
 */
import { Time } from '@src/types';
import { toDate } from './transfer';

/**
 * @desc return if the date param is a valid Date
 * @param {any} date
 * @returns {Boolean}
 */
export function isDate(date: any): boolean {
  return !Number.isNaN(new Date(date).valueOf());
}

/**
 * @desc return if the two dates same
 * @param {Time} first compared date
 * @param {Time} second compared date
 * @returns {Boolean}
 */
export function isEqual(first: Time, second: Time): boolean {
  const firstDate = toDate(first);
  const secondDate = toDate(second);
  return firstDate.getTime() === secondDate.getTime();
}

/**
 * @desc return if first date is before second one
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
 * @desc return if first date is after second one
 * @param {Time} first first date to compare
 * @param {Time} second second date to compare
 * @returns {Boolean}
 */
export function isAfter(first: Time, second: Time): boolean {
  return !isBefore(first, second);
}
