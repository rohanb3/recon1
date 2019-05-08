<template>
  <div class="date-year-month-day-cell">{{ value | dateYearMonthDay }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import { dateYearMonthDay } from '@/filters/dateFormat';

export default {
  name: 'DateYearMonthDayCell',
  mixins: [nestedFieldCell],
  filters: {
    dateYearMonthDay,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.date-year-month-day-cell {
  color: $base-text-color;
  opacity: 0.6;
}
</style>
