import i18n from '@/i18n';
import { notEmpty } from '@/services/utils';

function getPointsForArray(value) {
  const [first] = value;
  const last = value[value.length - 1];
  return [first, last];
}

function getPointsForObject(value) {
  return [value.from, value.to];
}

export default (value, { prefix = '' } = {}) => {
  const [first, last] = Array.isArray(value) ? getPointsForArray(value) : getPointsForObject(value);
  const from = notEmpty(first) ? `${i18n.t('from')} ${first}` : '';
  const to = notEmpty(last) ? `${i18n.t('to')} ${last}` : '';
  const result = [from, to].filter(i => i).join(' ');

  return result ? `${prefix}${result}` : '';
};
