<template>
  <table-dates-editor
    :boundaries-selector="`.${getTableName}-table`"
    :start-date="startDate"
    :title="$t('custom.range')"
    :end-date="endDate"
    @applyDateRange="handleFilterByDate"
    @clearDateRange="onClearDateRange"
  />
</template>

<script>
import TableDatesEditor from '@/components/TableDatesEditor';
import { FILTER_NAMES } from '@/constants';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';

export default {
  name: 'CustomRangeFilter',
  components: {
    TableDatesEditor,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    filters() {
      return this.tableData.filters || {};
    },
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    startDate() {
      return this.filters[FILTER_NAMES.CREATED_FROM];
    },
    endDate() {
      return this.filters[FILTER_NAMES.CREATED_TO];
    },
    getTableName() {
      return this.tableName.toLowerCase();
    },
  },
  methods: {
    handleFilterByDate(value) {
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: FILTER_NAMES.CREATED_FROM,
            value: value.startDate,
          },
          {
            name: FILTER_NAMES.CREATED_TO,
            value: value.endDate,
          },
          {
            name: FILTER_NAMES.FISCAL_PERIOD_TO,
            value: '',
          },
          {
            name: FILTER_NAMES.FISCAL_PERIOD_ID,
            value: null,
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
    onClearDateRange() {
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: FILTER_NAMES.CREATED_FROM,
            value: '',
          },
          {
            name: FILTER_NAMES.CREATED_TO,
            value: '',
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
  },
};
</script>
