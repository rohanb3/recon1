<template>
  <div
    class="selected-date-range"
    v-if="isSelectedDateRange || isSelectedFiscalPeriod"
    :selectedDateRange="selectedDateRange"
    :selectedFiscalPeriod="selectedFiscalPeriod"
  >
    <span v-if="!!selectedFiscalPeriod">
      {{ $t('selected.fiscal.period') }}: {{ selectedFiscalPeriod }}
    </span>
    <span v-else>
      {{ $t('selected.date.range') }}{{ selectedDateRange | dateRange({ prefix: ': ' }) }}
    </span>
  </div>
</template>

<script>
import { FILTER_NAMES } from '@/constants';
import dateRange from '@/filters/boundaries';
import tableDateRange from '@/mixins/tableDateRange';

export default {
  name: 'SelectedRangeFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  mixins: [tableDateRange],
  filters: {
    dateRange,
  },
  computed: {
    isSelectedFiscalPeriod() {
      return !!this.filters[FILTER_NAMES.FISCAL_PERIOD_ID];
    },
    selectedFiscalPeriod() {
      return this.filters[FILTER_NAMES.FISCAL_PERIOD_TO];
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.selected-date-range {
  @include selected-date-range;
}
</style>
