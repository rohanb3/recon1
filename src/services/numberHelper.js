// eslint-disable-next-line import/prefer-default-export
export const range = (from, to) => {
  const numbers = [];
  for (let i = from; i <= to; i += 1) {
    numbers.push(i);
  }
  return numbers;
};
