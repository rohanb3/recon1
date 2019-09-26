import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

export default {
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    selectedDateRangeFrom() {
      return moment(this.filters[this.filteredFieldFrom]).format(DATE_FORMATS.MONTH_DAY_FULL_YEAR);
    },
    selectedDateRangeTo() {
      return moment(this.filters[this.filteredFieldTo]).format(DATE_FORMATS.MONTH_DAY_FULL_YEAR);
    },
    selectedDateRange() {
      return {
        from: this.selectedDateRangeFrom,
        to: this.selectedDateRangeTo,
      };
    },
    isSelectedDateRange() {
      return this.filters[this.filteredFieldFrom] && this.filters[this.filteredFieldTo];
    },
  },
};
