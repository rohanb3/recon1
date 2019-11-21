<template>
  <div class="percent-cell">
    <span
      v-if="isIndicatorShown"
      class="indicator"
      :class="{
        bad,
        good,
        average,
      }"
    />
    <span>{{ value | percents }}</span>
  </div>
</template>

<script>
import { percents } from '@/filters/numberFormat';

export default {
  name: 'PercentCell',
  props: {
    column: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  filters: {
    percents,
  },
  computed: {
    value() {
      return this.item[this.column.field];
    },
    isIndicatorShown() {
      return this.column.options && this.column.options.withIndicator;
    },
    bad() {
      const upperBound = this.column.options ? this.column.options.bad : 0;

      return this.value <= upperBound;
    },
    average() {
      const upperBound = this.column.options ? this.column.options.average : 50;

      return this.value > (this.column.options.bad || 0) && this.value <= upperBound;
    },
    good() {
      return this.value > (this.column.options.average || 50);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.percent-cell {
  display: flex;
  align-items: center;

  .indicator {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 3px;
  }

  .bad {
    background: $base-red;
  }

  .average {
    background: $base-orange;
  }

  .good {
    background: $base-green;
  }
}
</style>
