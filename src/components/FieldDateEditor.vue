<template>
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
      <div class="datepicker">
        <inline-datepicker :start-date="formattedStartDate" @dateOneSelected="onDateSelected" />
      </div>
    </div>
    <div slot="reference">
      <slot></slot>
    </div>
  </popper>
</template>

<script>
import moment from 'moment';
import InlineDatepicker from '@/components/InlineDatepicker';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import { FULL_YEAR_SHORT_MONTH_SHORT_DAY } from '@/constants/dateFormats';

export default {
  name: 'FieldDateEditor',
  components: {
    InlineDatepicker,
  },
  mixins: [tableToolbarBalloon],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formattedStartDate: this.formatDayForDatePicker(this.value),
    };
  },
  methods: {
    formatDayForDatePicker(date) {
      if (date === '') return '';
      return moment.utc(date).format(FULL_YEAR_SHORT_MONTH_SHORT_DAY);
    },
    onDateSelected(date) {
      this.$emit('input', date);
      this.hide();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '@/assets/styles/popper.scss';

.datepicker /deep/ {
  margin: 0 10px;
  .asd__selected-date-one {
    border-radius: 4px;
  }
}

.popper /deep/ {
  top: 55px !important;

  .popper__arrow {
    border-width: 0 15px 15px 15px !important;
    top: -15px !important;

    border-bottom-color: $popper-background-color;
  }
}
</style>
