import i18n from '@/i18n';
import { notEmpty } from '@/services/utils';

export const OPERATOR_NAME = 'BETWEEN';

const VALID_VALUE = '';

function cast(value) {
  return notEmpty(value) ? Number(value) : null;
}

function checkValue(value, { min }) {
  const val = Number(value);

  if (Number.isNaN(val)) {
    return i18n.t('field.must.consist.only.digits');
  }

  if (notEmpty(val) && notEmpty(min) && val < min) {
    return i18n.t('validation.rule.number.too.small', { min });
  }

  return VALID_VALUE;
}

function checkDiff(from, to) {
  const diff = cast(to) - cast(from);
  if (notEmpty(from) && notEmpty(to) && diff < 0) {
    return i18n.t('validation.rule.rage.negative');
  }

  return VALID_VALUE;
}

export default {
  apply({ from = null, to = null }) {
    const result = {};
    if (notEmpty(from)) {
      result.from = cast(from);
    }
    if (notEmpty(to)) {
      result.to = cast(to);
    }
    return result;
  },
  validate({ from = null, to = null }, options) {
    return checkValue(from, options) || checkValue(to, options) || checkDiff(from, to);
  },
};
