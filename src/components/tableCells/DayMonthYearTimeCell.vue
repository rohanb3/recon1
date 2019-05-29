<template>
  <div class="day-month-year-time-cell">{{ value | dateDefaultFormat }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import { dateDefaultFormat } from '@/filters/dateFormat';

export default {
  name: 'DayMonthYearTimeCell',
  mixins: [nestedFieldCell],
  filters: {
    dateDefaultFormat,
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.day-month-year-time-cell {
  opacity: 0.56;
  color: $base-text-color;
}
</style>
