import * as date from '@src/core';
const mockDate = new Date('2022-1-18 12:12:12'); // 星期二
const mockTimestamp = 1699264217000; // 2023-11-06T17:50:17+08:00
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
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const result = date.Week.index();
    spy.mockRestore();
    expect(result).toBe(2);
  });
});

describe('isBefore', () => {
  it('valid date, first date should be before second', () => {
    const result = date.isBefore(mockDate, mockTimestamp);
    expect(result).toBeTruthy();
  });
  it('invalid date, should throw error', () => {
    expect(() => date.isBefore(mockDate, 'xx')).toThrow();
  });
});
describe('isAfter', () => {
  it('valid date, first should be after second', () => {
    const result = date.isAfter(mockTimestamp, mockDate);
    expect(result).toBeTruthy();
  });
});

describe('dateFormat', () => {
  test('no option', () => {
    const result = date.dateFormat(mockDate);
    expect(result).toBe('2022-01-18 12:12:12');
  });
  test('option is string type', () => {
    const result = date.dateFormat(mockDate, 'yyyy/mm/dd');
    expect(result).toBe('2022/01/18');
  });
  test('option is object', () => {
    const result = date.dateFormat(mockDate, {
      format: 'yyyy/mm/dd HH:MM',
      padZero: false,
    });
    expect(result).toBe('2022/1/18 12:12');
  });
  test('format is invalid', () => {
    const result = date.dateFormat(mockDate, 'yy-mm-dd');
    expect(result).toBe('yy-01-18');
  });
  test('padZero is false', () => {
    const result = date.dateFormat(mockDate, {
      padZero: false,
    });
    expect(result).toBe('2022-1-18 12:12:12');
  });

  test('invalid date', () => {
    expect(() => {
      date.dateFormat('xx');
    }).toThrow();
  });
});

describe('dateOffset', () => {
  const initialDate = new Date('2023-05-01T00:00:00.000Z');

  it('should offset the year correctly', () => {
    const result = date.dateOffset(initialDate, 2, 'year');
    expect(result.getFullYear()).toBe(2025);
  });

  it('should offset the month correctly', () => {
    const result = date.dateOffset(initialDate, 3, 'month');
    expect(result.getMonth() + 1).toBe(7);
  });

  it('should offset the day correctly', () => {
    const result = date.dateOffset(initialDate, -5, 'day');
    expect(result.getDate()).toBe(26);
  });

  it('should offset the hour correctly', () => {
    const result = date.dateOffset(initialDate, 6, 'hour');
    expect(result.getUTCHours()).toBe(6);
  });

  it('should offset the minute correctly', () => {
    const result = date.dateOffset(initialDate, 30, 'minute');
    expect(result.getMinutes()).toBe(30);
  });

  it('should offset the second correctly', () => {
    const result = date.dateOffset(initialDate, 45, 'second');
    expect(result.getSeconds()).toBe(45);
  });

  it('should offset the millisecond correctly', () => {
    const result = date.dateOffset(initialDate, 500, 'millisecond');
    expect(result.getMilliseconds()).toBe(500);
  });

  it('should offset the week correctly', () => {
    const result = date.dateOffset(initialDate, -2, 'week');
    expect(result.getDate()).toBe(17);
  });
  it('invalid date', () => {
    expect(() => {
      date.dateOffset('xxx', 2, 'year');
    }).toThrow();
  });
  it('invalid amount', () => {
    expect(() => {
      date.dateOffset(initialDate, '2' as unknown as number, 'year');
    }).toThrow();
  });
  it('invalid timeUnit', () => {
    expect(() => {
      date.dateOffset(initialDate, 2, 'years' as any);
    }).toThrow();
  });
});

describe('min', () => {
  it('valid dates, should return the min date', () => {
    const dates = ['2022-1-1', '2022-12-1', new Date('2023-1-1 12:00:00')];
    const result = date.min(dates);
    expect(date.isEqual(result, dates[0])).toBeTruthy();
  });
  it('invalid dates, should throw error', () => {
    const dates = [new Date('2023-1-1 12:00:00'), ''];
    const dates2 = {};
    expect(() => date.min(dates)).toThrow();
    expect(() => date.min(dates2 as any[])).toThrow();
  });
});

describe('max', () => {
  it('valid dates, should return the max date', () => {
    const dates = ['2022-1-1', '2022-12-1', new Date('2023-1-1 12:00:00')];
    const result = date.max(dates);
    expect(date.isEqual(result, dates[2])).toBeTruthy();
  });
  it('invalid dates, should throw error', () => {
    const dates = [new Date('2023-1-1 12:00:00'), ''];
    const dates2 = {};
    expect(() => date.max(dates)).toThrow();
    expect(() => date.max(dates2 as any[])).toThrow();
  });
});
