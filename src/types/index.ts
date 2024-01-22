export type Time = Date | string | number;
export interface DateFormatOption {
  format?: string;
  padZero?: boolean;
}
export interface DateObject {
  year: number;
  month: number;
  week: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}
export type TimeUnit = keyof DateObject;
export type WeekName = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
