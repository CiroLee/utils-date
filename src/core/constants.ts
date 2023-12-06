export const TimeUintMap = {
  millisecond: 1,
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
  month: 1000 * 60 * 60 * 24 * 30,
  year: 1000 * 60 * 60 * 24 * 365,
};

export const weekMapZh = ['日', ' 一', '二', '三', '四', '五', '六'];
export const weekMapEn = [
  { val: 'Sunday', abbr: 'Sun.' },
  { val: 'Monday', abbr: 'Mon.' },
  { val: 'Tuesday', abbr: 'Tue.' },
  { val: 'Wednesday', abbr: 'Wed.' },
  { val: 'Thursday', abbr: 'Thu.' },
  { val: 'Friday', abbr: 'Fri.' },
  { val: 'Saturday', abbr: 'Sat.' },
];

export const traditionHoursMap = [
  {
    range: [
      [23, 24],
      [0, 1],
    ],
    value: '子',
  },
  {
    range: [[1, 3]],
    value: '丑',
  },
  {
    range: [[3, 5]],
    value: '寅',
  },
  {
    range: [[5, 7]],
    value: '卯',
  },
  {
    range: [[7, 9]],
    value: '辰',
  },
  {
    range: [[9, 11]],
    value: '巳',
  },
  {
    range: [[11, 13]],
    value: '午',
  },
  {
    range: [[13, 15]],
    value: '未',
  },
  {
    range: [[15, 17]],
    value: '申',
  },
  {
    range: [[17, 19]],
    value: '酉',
  },
  {
    range: [[19, 21]],
    value: '戌',
  },
  {
    range: [[21, 23]],
    value: '亥',
  },
];
