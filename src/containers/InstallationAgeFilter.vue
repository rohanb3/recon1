<template>
  <div class="filter-wrapper">
    <table-boundaries-filter
      :title="$t('orders.age.after.installation')"
      :from-placeholder="$t('from')"
      :to-placeholder="$t('to')"
      :min="0"
      boundaries-selector=".reviews-table"
      name="installationAge"
      v-model="age"
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
  data() {
    return {
      age: {},
    };
  },
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
  },
  components: {
    TableBoundariesFilter,
  },
  watch: {
    age(value) {
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
