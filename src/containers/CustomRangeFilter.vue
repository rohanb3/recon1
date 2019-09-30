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
import contextRageFilterData from '@/mixins/contextRageFilterData';

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
  mixins: [contextRageFilterData],
  computed: {
    filters() {
      return this.tableData.filters || {};
    },
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    startDate() {
      return this.filters[this.fromFilterName];
    },
    endDate() {
      return this.filters[this.toFilterName];
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
            name: this.fromFilterName,
            value: value.startDate,
          },
          {
            name: this.toFilterName,
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
            name: this.fromFilterName,
            value: '',
          },
          {
            name: this.toFilterName,
            value: '',
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
  },
};
</script>
