<template>
  <sorting-header-cell
    :column="column"
    :sorting-field="sortingField"
    :sort-direction="sortDirection"
    :args="args"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';
import { SORTING_DIRECTION } from '@/constants';

export default {
  name: 'SortingCellWithData',
  components: { SortingHeaderCell },
  props: {
    column: {
      type: Object,
      required: true,
    },
    sortingField: {
      validator(value) {
        return typeof value === 'string' || value === null;
      },
    },
    sortDirection: {
      required: true,
      validator(value) {
        return [SORTING_DIRECTION.DESC, SORTING_DIRECTION.ASC, null].includes(value);
      },
    },
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['storageData', 'totalCommissions']),
    total() {
      return this.totalCommissions(this.tableName);
    },
    args() {
      return { total: this.total[this.column.name] };
    },
  },
};
</script>
