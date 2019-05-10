<template>
  <div class="date-year-month-day-cell" :title="value | dateDefaultFormat">
    {{ value | dateYearMonthDay }}
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import { dateYearMonthDay, dateDefaultFormat } from '@/filters/dateFormat';

export default {
  name: 'DateYearMonthDayCell',
  mixins: [nestedFieldCell],
  filters: {
    dateYearMonthDay,
    dateDefaultFormat,
  },
};
</script>
