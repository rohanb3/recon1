<template>
  <div class="date-month-year-cell">{{ value | dateMonthYear }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import { dateMonthYear } from '@/filters/dateFormat';

export default {
  name: 'DateMonthYearCell',
  mixins: [nestedFieldCell],
  filters: {
    dateMonthYear,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.date-month-year-cell {
  color: $base-text-color;
  opacity: 0.6;
}
</style>
