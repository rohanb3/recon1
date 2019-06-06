import moment from 'moment';
import { FILTER_NAMES, DATE_FORMATS } from '@/constants';

export default {
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    selectedDateRangeFrom() {
      return moment(this.filters[FILTER_NAMES.CREATED_FROM]).format(
        DATE_FORMATS.MONTH_DAY_FULL_YEAR
      );
    },
    selectedDateRangeTo() {
      return moment(this.filters[FILTER_NAMES.CREATED_TO]).format(DATE_FORMATS.MONTH_DAY_FULL_YEAR);
    },
    selectedDateRange() {
      return {
        from: this.selectedDateRangeFrom,
        to: this.selectedDateRangeTo,
      };
    },
    isSelectedDateRange() {
      return this.filters[FILTER_NAMES.CREATED_FROM] && this.filters[FILTER_NAMES.CREATED_TO];
    },
    isSelectedFiscalPeriod() {
      return !!this.filters[FILTER_NAMES.FISCAL_PERIOD_ID];
    },
    selectedFiscalPeriod() {
      return this.filters[FILTER_NAMES.FISCAL_PERIOD_TO];
    },
  },
};
