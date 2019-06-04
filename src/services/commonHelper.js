/* eslint-disable import/prefer-default-export */
export function getPercentage(num, amount, precision = 0) {
  // eslint-disable-next-line no-restricted-globals
  if (num && amount && !isNaN(num) && !isNaN(amount)) {
    const result = (num / amount) * 100;
    return Number(result.toFixed(precision));
  }
  return 0;
}
/* eslint-enable import/prefer-default-export */
