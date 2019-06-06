<template>
  <div class="selected-date-range">
    <span v-if="!!selectedFiscalPeriod">
      {{ $t('selected.fiscal.period') }}: {{ selectedFiscalPeriod }}
    </span>
    <span v-else>
      {{ $t('selected.date.range') }}{{ selectedDateRange | dateRange({ prefix: ': ' }) }}
    </span>
  </div>
</template>

<script>
import dateRange from '@/filters/boundaries';

export default {
  name: 'ShowSelectedFilterRange',
  props: {
    selectedDateRange: {
      required: true,
    },
    selectedFiscalPeriod: {
      required: true,
    },
  },
  filters: {
    dateRange,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.selected-date-range {
  @include selected-date-range;
}
</style>
