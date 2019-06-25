<template>
  <div class="filter-wrapper">
    <table-boundaries-filter
      :title="$t('orders.age.after.installation')"
      :from-placeholder="$t('from')"
      :to-placeholder="$t('to')"
      :min="0"
      boundaries-selector=".reviews-table"
      name="installationAge"
      :selected="age"
      @input="onSelectRange"
    />
  </div>
</template>

<script>
import TableBoundariesFilter from '@/components/TableBoundariesFilter';
import { FILTER_NAMES } from '@/constants';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';

export default {
  name: 'InstalationFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    age() {
      return {
        from: this.ageFrom,
        to: this.ageTo,
      };
    },
    ageFrom() {
      return this.tableData.filters[FILTER_NAMES.INSTALLATION_AGE_FROM];
    },
    ageTo() {
      return this.tableData.filters[FILTER_NAMES.INSTALLATION_AGE_TO];
    },
  },
  components: {
    TableBoundariesFilter,
  },
  methods: {
    onSelectRange(value) {
      const { from, to } = value;
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: FILTER_NAMES.INSTALLATION_AGE_FROM,
            value: from,
          },
          {
            name: FILTER_NAMES.INSTALLATION_AGE_TO,
            value: to,
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
  },
};
</script>
