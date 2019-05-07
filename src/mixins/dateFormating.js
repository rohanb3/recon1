import moment from 'moment';
import { SHORT_DAY_MONTH_FULL_YEAR } from '@/constants/dateFormats';

export default {
  methods: {
    prettifyDate(date) {
      if (date === '') return '';
      return moment.utc(date).format(SHORT_DAY_MONTH_FULL_YEAR);
    },
  },
};
