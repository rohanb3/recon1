<template>
  <div id="datepicker" class="inline-datepicker">
    <airbnb-style-datepicker
      ref="datePicker"
      trigger-element-id="datepicker"
      :mode="mode"
      :date-one="startDate"
      :date-two="endDate"
      :inline="true"
      :show-action-buttons="false"
      :months-to-show="monthsToShow"
      :show-shortcuts-menu-trigger="false"
      @date-one-selected="date => $emit('dateOneSelected', date)"
      @date-two-selected="date => $emit('dateTwoSelected', date)"
    >
      <v-icon slot="previous-month-icon" color="#398ffb">arrow_left</v-icon>
      <v-icon slot="next-month-icon" color="#398ffb">arrow_right</v-icon>
    </airbnb-style-datepicker>
  </div>
</template>

<script>
export default {
  name: 'InlineDatepicker',
  props: {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
    monthsToShow: {
      type: Number,
      default: 2,
    },
    mode: {
      type: String,
      default: 'range',
    },
  },
  mounted() {
    this.$refs.datePicker.selectDate(this.startDate);
  },
  watch: {
    startDate() {
      this.$refs.datePicker.isSelectingDate1 = false;
    },
    endDate() {
      this.$refs.datePicker.isSelectingDate1 = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-datepicker /deep/ {
  .asd__day--hovered {
    background: transparent !important;
  }
}
</style>
