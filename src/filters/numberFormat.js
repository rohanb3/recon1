// eslint-disable-next-line import/prefer-default-export
export const numberSign = (value = 0) => `#${String(Number(value)).padStart(4, '0')}`;
