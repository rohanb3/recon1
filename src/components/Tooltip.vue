<template>
  <div class="tooltip" :style="{ top: y + shiftTooltip + 'px', left: x + shiftTooltip + 'px' }">
    <div class="tooltip-header">{{ title }}</div>
    <div class="tooltip-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const SHIFT_TOOLTIP = 10;

export default {
  name: 'Tooltip',
  props: {
    title: {
      type: String,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      shiftTooltip: SHIFT_TOOLTIP,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.tooltip {
  position: fixed;
  z-index: 1;
  font-size: 12px;
  min-width: 132px;
  padding: 8px;
  background: $base-white;
  color: $tooltip-pie-chart-text-color;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;
  line-height: 20px;
}

.tooltip-header {
  font-weight: bold;
}

.tooltip-body {
  .tooltip-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .tooltip-value {
      color: $base-orange;
      padding-left: 5px;
    }
  }
}
</style>
