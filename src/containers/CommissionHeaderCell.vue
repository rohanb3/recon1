<template>
  <sorting-header-cell
    :column="column"
    :sorting-field="sortingField"
    :sort-direction="sortDirection"
    :translation-values="commission"
    @sortDirectionChanged="onClickSortingHeaderCell"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';
import { SORTING_DIRECTION } from '@/constants';

// TODO: Refactor
export default {
  name: 'CommissionHeaderCell',
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
      return this.total[this.column.name]
        ? { total: `/ ${this.$t('total')}: $  ${this.total[this.column.name]}` }
        : { total: '' };
    },
  },
  methods: {
    onClickSortingHeaderCell(value) {
      this.$emit('sortDirectionChanged', value);
    },
  },
};
</script>
