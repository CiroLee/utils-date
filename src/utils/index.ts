import { TimeUintMap } from '@src/core/constants';
import { TimeUnit } from '@src/types';

export function getType(v?: any): string {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
}

export function zeroFill(num: number): string {
  if (num === Infinity || num === -Infinity) {
    throw new Error('zeroFill: num should not be Infinity');
  }
  if (num < 0) {
    return Math.abs(num) < 10 ? `-0${Math.abs(num)}` : `${num}`;
  }
  return num < 10 ? `0${num}` : `${num}`;
}

const setFuncsMap = {
  utc: {
    year: 'setUTCFullYear',
    month: 'setUTCMonth',
    day: 'setUTCDate',
    hour: 'setUTCHours',
    minute: 'setUTCMinutes',
    second: 'setUTCSeconds',
    millisecond: 'setUTCMilliseconds',
  },
  local: {
    year: 'setFullYear',
    month: 'setMonth',
    day: 'setDate',
    hour: 'setHours',
    minute: 'setMinutes',
    second: 'setSeconds',
    millisecond: 'setMilliseconds',
  },
} as const;

export function chooseSetFunc(unit: TimeUnit, utc?: boolean): string {
  if (unit === 'week' || !(unit in TimeUintMap)) {
    throw new Error('set: unit must be a valid TimeUnit');
  }
  const setMsp = utc ? setFuncsMap.utc : setFuncsMap.local;
  return setMsp[unit as keyof typeof setMsp];
}
