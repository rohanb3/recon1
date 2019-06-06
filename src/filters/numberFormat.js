export const numberSign = (value = 0) => `#${String(Number(value)).padStart(4, '0')}`;

export const addSpaceBetweenNumbers = number => {
  return number || number === 0 ? number.toLocaleString('ru-RU') : '';
};

export const percents = number => {
  return number || number === 0 ? `${number}%` : '';
};
