import { isAfter, isBefore, isDate, isSame, isLeap, isPast, isFuture, isBetween, isToday } from '@src/core/validator';
const mockDate = new Date('2022-1-18 12:12:12'); // 星期二
const mockTimestamp = 1699264217000; // 2023-11-06T17:50:17+08:00
describe('isDate', () => {
  it('assert the input is valid date', () => {
    const d1 = '2022年12月12日';
    const d2 = '2022 12 12';
    const d3 = '2022-12-12T12:12:00';
    const d4 = '2022-12-12 T12:12:00';
    const d5 = {};

    expect(isDate(d1)).toBeFalsy();
    expect(isDate(d2)).toBeTruthy();
    expect(isDate(d3)).toBeTruthy();
    expect(isDate(d4)).toBeFalsy();
    expect(isDate(d5)).toBeFalsy();
  });
});

describe('isSame', () => {
  it('valid date, should return date1 equals date2 correctly', () => {
    const date1 = new Date('2022-01-01 12:00:00');
    const date2 = new Date('2022-01-01 12:00:00');
    const result = isSame(date1, date2);
    expect(result).toBe(true);
  });
  it('valid dates, data1 should isSame date2', () => {
    const date1 = new Date('2022-01-01 12:00:00');
    const date2 = '2022-01-01 12:00:00';
    const result = isSame(date1, date2);
    expect(result).toBe(true);
  });
});

describe('isBefore', () => {
  it('valid date, first date should be before second', () => {
    const result = isBefore(mockDate, mockTimestamp);
    expect(result).toBeTruthy();
  });
});
describe('isAfter', () => {
  it('valid date, first should be after second', () => {
    const result = isAfter(mockTimestamp, mockDate);
    expect(result).toBeTruthy();
  });
});

describe('isLeap', () => {
  it('judge input year is leap', () => {
    const year1 = 1996;
    const year2 = 2001;
    const year3 = 2100;
    const year4 = 2400;
    expect(isLeap(year1)).toBeTruthy();
    expect(isLeap(year2)).toBeFalsy();
    expect(isLeap(year3)).toBeFalsy();
    expect(isLeap(year4)).toBeTruthy();
  });
});

describe('isPast and isFuture test', () => {
  it('given date is in the past, should return true', () => {
    const result = isPast(mockDate);
    expect(result).toBeTruthy();
  });
  it('given date is in the future, should return true', () => {
    const result = isFuture('2999-12-31');
    expect(result).toBeTruthy();
  });
});

describe('isBetween test', () => {
  it('given date is between start date and end date', () => {
    const result = isBetween(mockDate, '2022-01-01', '2022-12-31');
    expect(result).toBeTruthy();
  });
});

describe('isToday test', () => {
  const RealDate = Date;
  function mockDate(isoDate: string): void {
    global.Date = class extends Date {
      constructor(...args: ConstructorParameters<typeof Date>) {
        super(...args);
      }
      static now(): number {
        return new Date(isoDate).getTime();
      }
    } as typeof Date;
  }
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should return true if the date is today', () => {
    mockDate('2024-01-22T00:00:00Z');
    expect(isToday(new Date())).toBe(true);
  });
  it('should return false if the date is not today', () => {
    mockDate('2024-01-22T00:00:00Z');
    const tomorrow = new Date('2024-01-23T00:00:00Z');
    expect(isToday(tomorrow)).toBe(false);
  });
});
