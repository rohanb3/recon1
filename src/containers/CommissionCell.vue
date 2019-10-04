<template>
  <sorting-header-cell
    :column="column"
    :sorting-field="sortingField"
    :sort-direction="sortDirection"
    :params="commission"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';
import { SORTING_DIRECTION } from '@/constants';

// TODO: Refactor
export default {
  name: 'CommissionCell',
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
    ...mapGetters(['storageData']),
    total() {
      return this.storageData(this.tableName).totalCommissions;
    },
    commission() {
      return { total: this.total[this.column.name] };
    },
  },
};
</script>
