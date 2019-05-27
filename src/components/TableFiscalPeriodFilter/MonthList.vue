<template>
  <div class="months">
    <div
      class="month"
      v-for="(month, index) in monthList"
      :key="month"
      :class="{ active: value === month, disabled: isDisabledMonth(month) }"
      @click="onSelectMonth(monthsEn[index])"
    >
      {{ month }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MonthList',
  props: {
    value: {
      type: String,
      required: true,
    },
    activeYear: {
      type: Number,
      required: true,
    },
  },
  computed: {
    monthsEn() {
      return moment()
        .locale('en')
        .localeData()
        .months();
    },
    monthList() {
      return moment.months();
    },
  },
  methods: {
    onSelectMonth(monthName) {
      if (!this.isDisabledMonth(monthName)) {
        this.$emit('input', monthName);
      }
    },
    numberMonth(month) {
      return moment()
        .month(month)
        .format('MM');
    },
    isDisabledMonth(month) {
      return moment(`${this.activeYear}-${this.numberMonth(month)}-01`).isAfter(
        moment().format('YYYY-MM-DD'),
        'month'
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.months {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 280px;
  width: 350px;
  padding: 38px 59px 0;

  .month {
    color: $base-text-color;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: left;
    cursor: pointer;

    &.disabled {
      color: $base-red;
      opacity: 0.54;
      cursor: default;
    }

    &.active {
      color: $active-link-color;
    }
  }
}
</style>
