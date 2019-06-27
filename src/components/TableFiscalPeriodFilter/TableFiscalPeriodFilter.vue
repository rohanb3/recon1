<template>
  <div class="fiscal-period-filter" @click="showFilter">
    <div
      class="fiscal-period-filter-editor"
      ref="tableFilter"
      :style="{ minWidth: minWidthFilterEditor }"
    >
      {{ title }}{{ selectedFiscalPeriodForTitle }}
    </div>
    <popper
      trigger="click"
      ref="popper"
      :options="options"
      :boundaries-selector="boundariesSelector"
      @show="onShow"
      @hide="hideFilter"
    >
      <div class="popper">
        <div class="month-wrapper" :class="{ blurred: loadingStatus }">
          <month-list v-model="selectedMonth" :active-year="selectedYear" />
        </div>
        <div class="vertical-hr"></div>
        <div class="year-list-wrapper">
          <year-list :list-of-years="listOfYears" v-model="selectedYear" />
          <v-btn
            small
            depressed
            :disabled="isNotSelectedMonthOrYear"
            class="button button-clear"
            @click.stop="onClear"
            >{{ $t('clear.selected') }}</v-btn
          >
          <v-btn
            small
            depressed
            :disabled="isNotSelectedMonthOrYear"
            class="button button-apply"
            @click.stop="onApply"
            >{{ $t('apply') }}</v-btn
          >
        </div>
        <v-progress-circular
          v-if="loadingStatus"
          class="big-spinner"
          indeterminate
        ></v-progress-circular>
      </div>
      <div slot="reference" class="datepicker-toggler">
        <div class="caret"></div>
      </div>
    </popper>
  </div>
</template>

<script>
import moment from 'moment';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import MonthList from './MonthList';
import YearList from './YearList';

import { warnMessage } from '@/services/notifications';

const FOUR_DIGITS_REGEX = /\d{4}/;

export default {
  name: 'TableFiscalPeriodFilter',
  mixins: [tableToolbarBalloon],
  components: {
    MonthList,
    YearList,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loadingStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minWidthFilterEditor: 'auto',
      selectedYear: moment().year(),
      selectedMonth: '',
    };
  },
  computed: {
    fiscalPeriodId() {
      return (
        this.items.find(
          fiscalPeriod =>
            fiscalPeriod.name.includes(this.selectedYear) &&
            fiscalPeriod.name.includes(this.selectedMonth)
        ) || {}
      ).id;
    },
    selectedFiscalPeriodName() {
      return (this.items.find(fiscalPeriod => fiscalPeriod.selected) || {}).name || '';
    },
    preselectedYear() {
      return this.selectedFiscalPeriodName.split(' ').pop() || '';
    },
    preselectedMonth() {
      return this.selectedFiscalPeriodName.split(' ').shift() || '';
    },
    listOfYears() {
      return Array.from(
        new Set(this.items.map(year => Number(year.name.split(' ').pop())).sort())
      ).filter(year => FOUR_DIGITS_REGEX.test(year));
    },
    isNotSelectedMonthOrYear() {
      return !this.selectedYear || this.selectedMonth === '';
    },
    selectedFiscalPeriodForTitle() {
      return !this.preselectedMonth ? '' : `: ${this.preselectedMonth} ${this.preselectedYear}`;
    },
  },
  methods: {
    showFilter() {
      this.minWidthFilterEditor = `${this.$refs.tableFilter.offsetWidth}px`;
      this.checkAndShow();
    },
    hideFilter() {
      this.minWidthFilterEditor = 'auto';
      this.onHide();
    },
    onApply() {
      if (this.fiscalPeriodId) {
        this.$emit('selectFiscalPeriod', this.fiscalPeriodId);
        this.hide();
      } else {
        warnMessage('fiscal.period.not.found');
      }
    },
    onClear() {
      this.selectedYear = 0;
      this.selectedMonth = '';
      this.$emit('clearFiscalPeriod');
    },
  },
  watch: {
    selectedYear() {
      this.selectedMonth = '';
    },
    selectedFiscalPeriodName() {
      this.selectedYear = Number(this.preselectedYear);
      this.selectedMonth = this.preselectedMonth;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/popper.scss';
@import '@/assets/styles/mixins.scss';

.fiscal-period-filter {
  height: 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  border: 1px solid $table-toolbar-section-border-color;
  font-size: 12px;
  color: $table-toolbar-section-color;
  font-weight: 500;
  border-radius: 3px;
}

.fiscal-period-filter-editor {
  overflow: hidden;
  max-width: 210px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.popper {
  display: flex;
  flex-flow: column nowrap;
  flex-direction: row;
  cursor: default;
}

.vertical-hr {
  border-right: 2px solid $vertical-hr-color;
  opacity: 0.3;
}

.caret {
  border: 1px solid $base-blue;
  width: 7px;
  height: 7px;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  margin: -4px 0 0 5px;
}

.month-wrapper {
  text-align: left;
}

.big-spinner {
  position: absolute;
  left: 40%;
  top: 40%;
  height: 70px !important;
  width: 70px !important;
  color: $base-blue;
}

.year-list-wrapper /deep/ {
  margin-top: 10px;
  width: 350px;
  margin: 10px 30px 0 20px;
  text-align: right;

  .button {
    @include button;
  }
}
</style>
