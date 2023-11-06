import { Time } from '@src/types';

const weekMapZh = ['日', ' 一', '二', '三', '四', '五', '六'];
const weekMapEn = [
  { val: 'Sunday', abbr: 'Sun.' },
  { val: 'Monday', abbr: 'Mon.' },
  { val: 'Tuesday', abbr: 'Tue.' },
  { val: 'Wednesday', abbr: 'Wed.' },
  { val: 'Thursday', abbr: 'Thu.' },
  { val: 'Friday', abbr: 'Fri.' },
  { val: 'Saturday', abbr: 'Sat.' },
];
export class Week {
  private static check(fnName: string, date?: Time): Date {
    if (date && !isDate(date)) {
      throw new Error(`Week.${fnName}: invalid date`);
    }
    return date ? new Date(date) : new Date();
  }
  static index(date?: Time): number {
    const _date = Week.check('index', date);
    return _date.getDay();
  }
  static zh(date?: Time): string {
    const _date = Week.check('zh', date);
    return weekMapZh[_date.getDay()];
  }
  static en(date?: Time): string {
    const _date = Week.check('en', date);
    return weekMapEn[_date.getDay()].val;
  }
  static abbr(date?: Time): string {
    const _date = Week.check('abbr', date);
    return weekMapEn[_date.getDay()].abbr;
  }
}
/**
 * @desc return if the date param is a valid Date
 * @param date {any}
 * @returns boolean
 */
export function isDate(date: any): boolean {
  return !Number.isNaN(new Date(date).valueOf());
}

/**
 * @desc transfer a date param to Date if it is valid
 * @param date {Time}
 * @returns Date
 */
export function toDate(date: Time): Date {
  if (!isDate(date)) {
    throw new Error('toDate: date is invalid, can not transfer to Date');
  }
  return new Date(date);
}

/**
 * @desc return if the two dates same
 * @param first {Time} first compared date
 * @param second  {Time} second compared date
 * @returns boolean
 */
export function isEqual(first: Time, second: Time): boolean {
  if (!isDate(first) || !isDate(second)) {
    throw new Error('equal: both first and second must be valid Date');
  }
  const firstDate = toDate(first);
  const secondDate = toDate(first);
  return firstDate.getTime() === secondDate.getTime();
}
