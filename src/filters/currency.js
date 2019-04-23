// eslint-disable-next-line import/prefer-default-export
export const dollar = (value = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(value)
    .replace(/^(\D+)/, '$1 ');
