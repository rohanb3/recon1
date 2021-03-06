<template>
  <div class="table-dates-editor" @click="checkAndShow">
    <div class="date-range">{{ title }}{{ dateRange }}</div>
    <popper
      class="popper-datepicker"
      trigger="click"
      ref="popper"
      :options="options"
      :boundaries-selector="boundariesSelector"
      @show="onShow"
      @hide="onHide"
    >
      <div class="popper">
        <div class="datepicker-controls">
          <ul class="predefined-ranges">
            <li class="range-value" @click="setToday">{{ $t('today') }}</li>
            <li class="range-value" @click="setYesterday">{{ $t('yesterday') }}</li>
            <li class="range-value" @click="setLastSevenDays">{{ $t('last.7.days') }}</li>
            <li class="range-value" @click="setLastThirtyDays">{{ $t('last.30.days') }}</li>
            <li class="range-value" @click="setPreviousMonth">{{ previousMonthName }}</li>
            <li class="range-value" @click="setPreviousPreviousMonth">
              {{ previousPreviousMonthName }}
            </li>
          </ul>
        </div>
        <div class="datepicker">
          <inline-datepicker
            v-if="isShown"
            :start-date="formattedStartDate"
            :end-date="formattedEndDate"
            @dateOneSelected="setFormattedStartDate"
            @dateTwoSelected="setFormattedEndDate"
          />
          <v-btn
            small
            depressed
            :disabled="isSelectedDate"
            class="button button-clear"
            @click.stop="onClearDateRange"
            >{{ $t('clear.selected') }}</v-btn
          >
          <v-btn
            small
            depressed
            class="button button-apply"
            :disabled="isSelectedDate"
            @click.stop="applyDateRange"
            >{{ $t('apply') }}</v-btn
          >
        </div>
      </div>

      <div slot="reference" class="datepicker-toggler">
        <div class="caret" :class="{ opened: isShown }"></div>
      </div>
    </popper>
  </div>
</template>

<script>
import moment from 'moment';
import InlineDatepicker from '@/components/InlineDatepicker';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import { DATE_FORMATS } from '@/constants';

export default {
  name: 'TableDatesEditor',
  components: {
    InlineDatepicker,
  },
  mixins: [tableToolbarBalloon],
  props: {
    title: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    dateRangeFormat: {
      type: String,
      default: DATE_FORMATS.DAY_FULL_MONTH,
    },
  },
  data() {
    return {
      formattedStartDate: this.formatDayForDatePicker(this.startDate),
      formattedEndDate: this.formatDayForDatePicker(this.endDate),
      previousMonthName: moment
        .utc()
        .subtract(1, 'month')
        .format(DATE_FORMATS.MONTH_ONLY),
      previousPreviousMonthName: moment
        .utc()
        .subtract(2, 'month')
        .format(DATE_FORMATS.MONTH_ONLY),
    };
  },
  computed: {
    dateRange() {
      if (this.isNotSelectDate) {
        return '';
      }
      return `: ${this.prettifiedStartDate} - ${this.prettifiedEndDate}`;
    },
    prettifiedStartDate() {
      return this.prettifyDate(this.startDate);
    },
    prettifiedEndDate() {
      return this.prettifyDate(this.endDate);
    },
    isNotSelectDate() {
      return this.startDate === '' || this.endDate === '';
    },
    isSelectedDate() {
      return !this.formattedStartDate.length && !this.formattedEndDate.length;
    },
  },
  methods: {
    applyDateRange() {
      const startDate = moment(this.formattedStartDate || this.formattedEndDate)
        .startOf('day')
        .utc()
        .format();

      const endDate = moment(this.formattedEndDate || this.formattedStartDate)
        .endOf('day')
        .utc()
        .format();

      this.$emit('applyDateRange', { startDate, endDate });
      this.hide();
    },
    onClearDateRange() {
      this.formattedStartDate = '';
      this.formattedEndDate = '';
      this.$emit('clearDateRange');
    },
    prettifyDate(date) {
      return moment
        .utc(date)
        .local()
        .format(this.dateRangeFormat);
    },
    formatDayForDatePicker(date) {
      if (date.length === 0) return '';
      return moment
        .utc(date || moment())
        .local()
        .format(DATE_FORMATS.FULL_YEAR_SHORT_MONTH_SHORT_DAY);
    },
    setToday() {
      const today = moment.utc();
      this.setRange(today);
    },
    setYesterday() {
      const yesterday = moment.utc().subtract(1, 'day');
      this.setRange(yesterday);
    },
    setLastSevenDays() {
      const startDate = moment().subtract(6, 'day');
      const endDate = moment();
      this.setRange(startDate, endDate);
    },
    setLastThirtyDays() {
      const startDate = moment().subtract(29, 'day');
      const endDate = moment();
      this.setRange(startDate, endDate);
    },
    setPreviousMonth() {
      const startDate = moment()
        .subtract(1, 'month')
        .startOf('month');
      const endDate = moment()
        .subtract(1, 'month')
        .endOf('month');
      this.setRange(startDate, endDate);
    },
    setPreviousPreviousMonth() {
      const startDate = moment()
        .subtract(2, 'month')
        .startOf('month');
      const endDate = moment()
        .subtract(2, 'month')

        .endOf('month');
      this.setRange(startDate, endDate);
    },
    setRange(startDate, endDate) {
      this.setFormattedStartDate(startDate);
      this.setFormattedEndDate(endDate || startDate);
    },
    setFormattedStartDate(date) {
      this.formattedStartDate = this.formatDayForDatePicker(date);
      if (!this.formattedEndDate.length) {
        this.formattedEndDate = this.formattedStartDate;
      }
    },
    setFormattedEndDate(date) {
      this.formattedEndDate = this.formatDayForDatePicker(date);
      if (!this.formattedStartDate.length) {
        this.formattedStartDate = this.formattedEndDate;
      }
    },
  },
  watch: {
    isShown(value) {
      if (value) {
        this.setRange(this.startDate, this.endDate);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '@/assets/styles/popper.scss';
@import '@/assets/styles/mixins.scss';

.table-dates-editor {
  height: 20px;
  margin-right: 10px;
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  border: 1px solid $table-toolbar-section-border-color;
  border-radius: 3px;
  font-size: 12px;
  color: $table-toolbar-section-color;
  font-weight: 500;
  white-space: nowrap;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}
.date-range {
  margin-right: 10px;
}
.caret {
  border-top: 3px solid $table-header-icon-color;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  transition: transform 0.3s;
  &.opened {
    transform: rotateX(-180deg);
  }
}
.popper {
  display: flex;
  flex-flow: row;
  margin-top: 5px;
  margin-right: 35px;
  cursor: default;
}
.datepicker-controls {
  width: 150px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border-right: 2px solid $table-datepicker-divider-color;
  color: $table-datepicker-color;
}
.predefined-ranges {
  width: 100%;
  text-align: left;
  .range-value {
    padding-left: 8px;
    margin: 4px 0;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: $table-datepicker-hover-color;
    }
  }
}
.datepicker {
  margin-right: 10px;
  text-align: right;

  .button {
    @include button;
  }
}
</style>
