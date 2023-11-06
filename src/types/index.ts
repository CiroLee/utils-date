import { TimeUintMap } from '@src/core/constants';

export type Time = Date | string | number;
export interface DateFormatOption {
  format?: string;
  padZero?: boolean;
}

export type TimeUnit = keyof typeof TimeUintMap;
