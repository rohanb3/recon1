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
