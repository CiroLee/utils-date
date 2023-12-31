import { toArray, toDate, toObject, toTraditionalHour } from '@src/core/transfer';
import { isSame } from '@src/core/validator';
const mockDate = new Date('2022-1-18 12:12:12'); // 星期二
describe('toObject', () => {
  it('valid date, should return date object correctly', () => {
    const result = toObject(mockDate);
    expect(result.year).toBe(2022);
  });
});

describe('toArray', () => {
  it('should convert to array correctly', () => {
    const result = toArray(mockDate);
    expect(result[0]).toBe(2022);
  });
});

describe('toDate', () => {
  it('string type, should convert to Date correctly', () => {
    const param = '2022-1-18 12:12:12';
    const result = toDate(param);
    expect(isSame(mockDate, result)).toBeTruthy();
  });
  it('unix timestamp, should convert to Date correctly', () => {
    const result = toDate(1642479132000);
    expect(isSame(mockDate, result)).toBeTruthy();
  });
  it('Date type param, should return the same value', () => {
    const result = toDate(mockDate);
    expect(result).toBe(mockDate);
  });
  it('invalid date(e.g:{}), should throw error', () => {
    expect(() => toDate({} as any)).toThrow();
  });
  it('invalid date(e.g:""), should throw error', () => {
    expect(() => toDate('' as any)).toThrow();
  });
});

describe('toTraditionalHour', () => {
  it('valid hour input, should convert correctly', () => {
    const result = toTraditionalHour(12);
    expect(result).toBe('午');
  });
  it('invalid hour input, should throw error', () => {
    expect(() => toTraditionalHour(-1)).toThrow();
    expect(() => toTraditionalHour(25)).toThrow();
    expect(() => toTraditionalHour('1' as any)).toThrow();
    expect(() => toTraditionalHour(NaN)).toThrow();
  });
});
