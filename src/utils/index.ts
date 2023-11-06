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
