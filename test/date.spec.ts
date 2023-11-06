import * as date from '@src/core/date';
const mockDate = new Date('2022-1-18 12:12:12'); // 星期二
const mockTimestamp = 1642479132;
describe('isDate', () => {
  it('assert the input is valid date', () => {
    const d1 = '2022年12月12日';
    const d2 = '2022 12 12';
    const d3 = '2022-12-12T12:12:00';
    const d4 = '2022-12-12 T12:12:00';
    const d5 = {};

    expect(date.isDate(d1)).toBeFalsy();
    expect(date.isDate(d2)).toBeTruthy();
    expect(date.isDate(d3)).toBeTruthy();
    expect(date.isDate(d4)).toBeFalsy();
    expect(date.isDate(d5)).toBeFalsy();
  });
});

describe('toDate', () => {
  it('string type, should convert to Date correctly', () => {
    const param = '2022-1-18 12:12:12';
    const result = date.toDate(param);
    expect(date.isEqual(mockDate, result)).toBeTruthy();
  });
  it('unix timestamp, should convert to Date correctly', () => {
    const result = date.toDate(mockTimestamp * 1000);
    expect(date.isEqual(mockDate, result)).toBeTruthy();
  });
  it('invalid date(e.g:{}), should throw error', () => {
    expect(() => date.toDate({} as any)).toThrow();
  });
  it('invalid date(e.g:""), should throw error', () => {
    expect(() => date.toDate('' as any)).toThrow();
  });
});

describe('isEqual', () => {
  it('valid date, should return date1 equals date2 correctly', () => {
    const date1 = new Date('2022-01-01 12:00:00');
    const date2 = new Date('2022-01-01 12:00:00');
    const result = date.isEqual(date1, date2);
    expect(result).toBe(true);
  });
  it('valid dates, data1 should isEqual date2', () => {
    const date1 = new Date('2022-01-01 12:00:00');
    const date2 = '2022-01-01 12:00:00';
    const result = date.isEqual(date1, date2);
    expect(result).toBe(true);
  });
  it('invalid date, should throw error', () => {
    const date1 = new Date('2022-01-01 12:00:00');
    const date2 = new Date('xx');
    expect(() => date.isEqual(date1, date2)).toThrow();
  });
});

describe('Week', () => {
  it('should return week index', () => {
    const result = date.Week.index(mockDate);
    expect(result).toBe(2);
  });
  it('should return Chinese week word', () => {
    const result = date.Week.zh(mockDate);
    expect(result).toBe('二');
  });
  it('should return English week word', () => {
    const result = date.Week.en(mockDate);
    expect(result).toBe('Tuesday');
  });
  it('should return English abbreviation', () => {
    const result = date.Week.abbr(mockDate);
    expect(result).toBe('Tue.');
  });
  it('invalid date, should throw error', () => {
    const d = new Date('xx');
    expect(() => date.Week.index(d)).toThrow();
    expect(() => date.Week.zh(d)).toThrow();
    expect(() => date.Week.en(d)).toThrow();
    expect(() => date.Week.abbr(d)).toThrow();
  });
  it('default date', () => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const result = date.Week.index();
    expect(result).toBe(2);
  });
});
