import moment from 'moment';
import { DATE_FORMATS } from '@/constants';
import contextRageFilterData from '@/mixins/contextRageFilterData';

export default {
  mixins: [contextRageFilterData],
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    selectedDateRangeFrom() {
      return moment(this.filters[this.fromFilterName]).format(DATE_FORMATS.MONTH_DAY_FULL_YEAR);
    },
    selectedDateRangeTo() {
      return moment(this.filters[this.toFilterName]).format(DATE_FORMATS.MONTH_DAY_FULL_YEAR);
    },
    selectedDateRange() {
      return {
        from: this.selectedDateRangeFrom,
        to: this.selectedDateRangeTo,
      };
    },
    isSelectedDateRange() {
      return this.filters[this.fromFilterName] && this.filters[this.toFilterName];
    },
  },
};
