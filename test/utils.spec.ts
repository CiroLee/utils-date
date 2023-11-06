import * as utils from '@src/utils';

describe('getType', () => {
  it('undefined type', () => {
    expect(utils.getType()).toBe('undefined');
  });
  it('null type', () => {
    expect(utils.getType(null)).toBe('null');
  });
  it('number type', () => {
    expect(utils.getType(123)).toBe('number');
  });
  it('boolean type', () => {
    expect(utils.getType(false)).toBe('boolean');
  });
  it('string type', () => {
    expect(utils.getType('use-utils')).toBe('string');
  });
  it('Array type', () => {
    expect(utils.getType([])).toBe('array');
  });
  it('Object type', () => {
    expect(utils.getType({})).toBe('object');
  });
  it('Function type', () => {
    expect(
      utils.getType(() => {
        console.log(123);
      }),
    ).toBe('function');
  });
  it('Date type', () => {
    expect(utils.getType(new Date('2022'))).toBe('date');
  });
});

describe('zeroFill test', () => {
  test('invalid param that will return itself', () => {
    const param1 = -Infinity;
    const param2 = Infinity;
    expect(() => utils.zeroFill(param1)).toThrow();
    expect(() => utils.zeroFill(param2)).toThrow();
  });
  test('param le zero', () => {
    const param1 = -9;
    const param2 = -10;
    expect(utils.zeroFill(param1)).toBe('-09');
    expect(utils.zeroFill(param2)).toBe('-10');
  });
  test('param ge zero', () => {
    const param1 = 0;
    const param2 = 1;
    const param3 = 10;
    expect(utils.zeroFill(param1)).toBe('00');
    expect(utils.zeroFill(param2)).toBe('01');
    expect(utils.zeroFill(param3)).toBe('10');
  });
});
