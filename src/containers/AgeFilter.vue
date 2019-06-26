<template>
  <div class="filter-wrapper">
    <table-boundaries-filter
      :title="title"
      :from-placeholder="$t('from')"
      :to-placeholder="$t('to')"
      :min="0"
      boundaries-selector=".reviews-table"
      :selected="age"
      @input="onSelectRange"
      @clearRange="onClearRange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TableBoundariesFilter from '@/components/TableBoundariesFilter';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';

export default {
  name: 'OrderAgeFilter',
  props: {
    title: {
      type: String,
      required: true,
    },
    tableName: {
      type: String,
      required: true,
    },
    filterNames: {
      type: Object,
      required: true,
      validator(filters) {
        return filters.from && filters.to;
      },
    },
  },
  computed: {
    ...mapGetters(['tableData']),
    filters() {
      return this.tableData(this.tableName).filters;
    },
    age() {
      return {
        from: this.ageFrom,
        to: this.ageTo,
      };
    },
    ageFrom() {
      return this.filters[this.filterNames.from];
    },
    ageTo() {
      return this.filters[this.filterNames.to];
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
            name: this.filterNames.from,
            value: from,
          },
          {
            name: this.filterNames.to,
            value: to,
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
    onClearRange() {
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: this.filterNames.from,
            value: null,
          },
          {
            name: this.filterNames.to,
            value: null,
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
  },
};
</script>
