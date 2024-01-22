import {
  Week,
  clone,
  daysInMonth,
  diff,
  format,
  getTime,
  getUnixTime,
  max,
  min,
  offset,
  weekOfMonth,
  weekOfYear,
} from '@src/core/common';
import { isSame } from '@src/core/validator';
import { TimeUnit } from '@src/types';
const mockDate = new Date('2022-1-18 12:12:12'); // 星期二
describe('Week', () => {
  it('should return week index', () => {
    const result = Week.index(mockDate);
    expect(result).toBe(2);
  });
  it('should return Chinese week word', () => {
    const result = Week.zh(mockDate);
    expect(result).toBe('二');
  });
  it('should return Chinese week word width custom prefix', () => {
    const result = Week.zh(mockDate, '周');
    expect(result).toBe('周二');
  });
  it('should return English week word', () => {
    const result = Week.en(mockDate);
    expect(result).toBe('Tuesday');
  });
  it('should return English abbreviation', () => {
    const result = Week.abbr(mockDate);
    expect(result).toBe('Tue.');
  });
  it('default date', () => {
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const result = Week.index();
    spy.mockRestore();
    expect(result).toBe(2);
  });
  it('invalid date, should throw error', () => {
    const d = new Date('xx');
    expect(() => Week.index(d)).toThrow();
    expect(() => Week.zh(d)).toThrow();
    expect(() => Week.en(d)).toThrow();
    expect(() => Week.abbr(d)).toThrow();
  });
  it('isWorkDay, should return correctly width valid date', () => {
    const result = Week.isWorkDay(mockDate);
    expect(result).toBeTruthy();
  });
  it('isWeek test', () => {
    expect(Week.isWeek(mockDate, 'Tuesday')).toBeTruthy();
  });
  it('isWeekEnd, input date is weekend, should return true', () => {
    const result = Week.isWeekEnd(offset(mockDate, 4, 'day'));
    expect(result).toBeTruthy();
  });
  it('isWeekEnd, input data is not weekend, should return false', () => {
    const result = Week.isWeekEnd(mockDate);
    expect(result).toBeFalsy();
  });
});

describe('format', () => {
  it('no option', () => {
    const result = format(mockDate);
    expect(result).toBe('2022-01-18 12:12:12');
  });
  it('option is string type', () => {
    const result = format(mockDate, 'yyyy/mm/dd');
    expect(result).toBe('2022/01/18');
  });
  it('option is object', () => {
    const result = format(mockDate, {
      format: 'yyyy/mm/dd HH:MM',
      padZero: false,
    });
    expect(result).toBe('2022/1/18 12:12');
  });
  it('option is object and format is default', () => {
    const result = format(mockDate, {
      padZero: false,
    });
    expect(result).toBe('2022-1-18 12:12:12');
  });
  it('option is object and padZero is default', () => {
    const result = format(mockDate, {
      format: 'yyyy/mm/dd HH:MM',
    });
    expect(result).toBe('2022/01/18 12:12');
  });
  it('format is invalid', () => {
    const result = format(mockDate, 'yy-mm-dd');
    expect(result).toBe('yy-01-18');
  });
  it('padZero is false', () => {
    const result = format(mockDate, {
      padZero: false,
    });
    expect(result).toBe('2022-1-18 12:12:12');
  });
});

describe('dateOffset', () => {
  const initialDate = new Date('2023-05-01T00:00:00.000Z');

  it('should offset the year correctly', () => {
    const result = offset(initialDate, 2, 'year');
    expect(result.getFullYear()).toBe(2025);
  });

  it('should offset the month correctly', () => {
    const result = offset(initialDate, 3, 'month');
    expect(result.getMonth() + 1).toBe(8);
  });

  it('should offset the day correctly', () => {
    const result = offset(initialDate, -5, 'day');
    expect(result.getDate()).toBe(26);
  });

  it('should offset the hour correctly', () => {
    const result = offset(initialDate, 6, 'hour');
    expect(result.getUTCHours()).toBe(6);
  });

  it('should offset the minute correctly', () => {
    const result = offset(initialDate, 30, 'minute');
    expect(result.getMinutes()).toBe(30);
  });

  it('should offset the second correctly', () => {
    const result = offset(initialDate, 45, 'second');
    expect(result.getSeconds()).toBe(45);
  });

  it('should offset the millisecond correctly', () => {
    const result = offset(initialDate, 500, 'millisecond');
    expect(result.getMilliseconds()).toBe(500);
  });

  it('should offset the week correctly', () => {
    const result = offset(initialDate, -2, 'week');
    expect(result.getDate()).toBe(17);
  });
  it('invalid amount', () => {
    expect(() => {
      offset(initialDate, '2' as unknown as number, 'year');
    }).toThrow();
  });
  it('invalid timeUnit', () => {
    expect(() => {
      offset(initialDate, 2, 'years' as any);
    }).toThrow();
  });
});

describe('min', () => {
  it('valid dates, should return the min date', () => {
    const dates = ['2022-1-1', '2022-12-1', new Date('2023-1-1 12:00:00')];
    const result = min(dates);
    expect(isSame(result, dates[0])).toBeTruthy();
  });
  it('invalid dates, should throw error', () => {
    const dates = [new Date('2023-1-1 12:00:00'), ''];
    const dates2 = {};
    expect(() => min(dates)).toThrow();
    expect(() => min(dates2 as any[])).toThrow();
  });
});

describe('max', () => {
  it('valid dates, should return the max date', () => {
    const dates = ['2022-1-1', '2022-12-1', new Date('2023-1-1 12:00:00')];
    const result = max(dates);
    expect(isSame(result, dates[2])).toBeTruthy();
  });
  it('invalid dates, should throw error', () => {
    const dates = [new Date('2023-1-1 12:00:00'), ''];
    const dates2 = {};
    expect(() => max(dates)).toThrow();
    expect(() => max(dates2 as any[])).toThrow();
  });
});

describe('diff', () => {
  const d1 = new Date('2023-12-01 12:00:00');
  const d2 = new Date('2021-12-01 12:00:00');
  it('type is detail, should return detail object of diff', () => {
    const result: Record<TimeUnit, number> = {
      year: 2,
      month: 24.3333,
      day: 730,
      week: 104.2857,
      hour: 17520,
      minute: 1051200,
      second: 63072000,
      millisecond: 63072000000,
    };

    Object.keys(result).forEach((k) => {
      expect(diff(d1, d2, k as TimeUnit)).toBeCloseTo(result[k as TimeUnit]);
    });
  });
  it('invalid unit, should throw error', () => {
    expect(() => diff(d1, d2, 'xx' as unknown as TimeUnit)).toThrow();
  });
});

describe('clone', () => {
  it('should clone date correctly', () => {
    const result = clone(mockDate);
    expect(result).not.toBe(mockDate);
  });
  it('input is not Date type, should throw error', () => {
    expect(() => clone('2023-11-6 12:12:12' as any)).toThrow();
  });
});

describe('daysInMonth', () => {
  it('should return days correctly', () => {
    const result = daysInMonth(mockDate);
    expect(result).toBe(31);
  });
});

describe('weekOfYear', () => {
  it('should return week correctly', () => {
    const result = weekOfYear(mockDate);
    expect(result).toBe(3);
  });
});

describe('weekOfMonth', () => {
  it('should return week correctly', () => {
    const result = weekOfMonth(mockDate);
    expect(result).toBe(3);
  });
});

describe('getTime', () => {
  it('should return milliseconds correctly', () => {
    const result = getTime(mockDate);
    expect(result).toBe(1642479132000);
  });
});
describe('getUnixTime', () => {
  it('should return milliseconds correctly', () => {
    const result = getUnixTime(mockDate);
    expect(result).toBe(1642479132);
  });
});
