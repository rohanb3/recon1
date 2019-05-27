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
          <v-btn
            small
            depressed
            :disabled="isNotSelectedMonthOrYear"
            class="button button-apply"
            @click.stop="onApply"
            >{{ $t('apply') }}</v-btn
          >
        </div>
        <div class="vertical-hr"></div>
        <div class="year-list-wrapper">
          <year-list :list-of-years="listOfYears" v-model="selectedYear" />
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
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import MonthList from './MonthList';
import YearList from './YearList';
import moment from 'moment';
import { warnMessage } from '@/services/notifications';

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
    listOfYears() {
      return Array.from(new Set(this.items.map(year => Number(year.name.split(' ').pop())).sort()));
    },
    isNotSelectedMonthOrYear() {
      return !this.selectedYear || !this.selectedMonth;
    },
    selectedFiscalPeriodForTitle() {
      if (this.isNotSelectedMonthOrYear) return '';
      return `: ${this.selectedMonth} ${this.selectedYear}`;
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
  },
  watch: {
    selectedYear() {
      this.selectedMonth = '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/popper.scss';

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
  .button-apply {
    margin: 0 0 38px 59px;
    background: $base-green !important;
    color: $base-white;
    text-transform: capitalize;
    font-size: 14px;
  }
}

.big-spinner {
  position: absolute;
  left: 40%;
  top: 40%;
  height: 70px !important;
  width: 70px !important;
  color: $base-blue;
}

.year-list-wrapper {
  margin-top: 10px;
  width: 350px;
}
</style>
