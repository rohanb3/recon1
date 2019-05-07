import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

export default {
  methods: {
    prettifyDate(date) {
      if (date === '') return '';
      return moment.utc(date).format(DATE_FORMATS.SHORT_DAY_MONTH_FULL_YEAR);
    },
  },
};
