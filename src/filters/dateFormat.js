import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

export const dateMonthYear = date => {
  if (date === '') return '';
  return moment.utc(date).format(DATE_FORMATS.MONTH_FULL_YEAR);
};

export const dateYearMonthDay = date => {
  if (date === '') return '';
  return moment.utc(date).format(DATE_FORMATS.FULL_YEAR_SHORT_MONTH_SHORT_DAY);
};

export const dateDefaultFormat = date => {
  if (date === '') return '';
  return moment.utc(date).format(DATE_FORMATS.DEFAULT_DATE_FORMAT);
};
