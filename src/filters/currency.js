export default (value = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(value)
    .replace(/^(\D+)/, '$1 ');
