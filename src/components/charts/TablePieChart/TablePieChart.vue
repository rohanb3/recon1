<template>
  <div @mousemove="onCursorPosition">
    <pie-chart class="pie-chart" :chartData="chartData" :options="options"></pie-chart>
    <tooltip
      v-show="visibleTooltip"
      :title="tooltipTitle"
      :x="cursorPositionX"
      :y="cursorPositionY"
    >
      <div class="tooltip-row" v-for="data in tooltipData" :key="data.label">
        <span>{{ data.label }}</span>
        <span class="tooltip-value">{{ data.value }}</span>
      </div>
    </tooltip>
  </div>
</template>

<script>
import PieChart from './PieChart';
import Tooltip from '@/components/Tooltip';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';

const TOTAL_PERCENT = 100;

export default {
  name: 'TablePieChart',
  components: {
    PieChart,
    Tooltip,
  },
  props: {
    datasets: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cursorPositionX: 0,
      cursorPositionY: 0,
      titleTooltip: '',
      showTooltip: false,
      indexSection: 0,
      options: {
        plugins: {
          labels: {
            render: 'percentage',
            fontColor: STATISTIC_COLOR_SCHEMA.WHITE,
            fontSize: 14,
            overlap: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.index + 1;
            },
          },
          custom: (() => {
            const self = this;
            return function customTooltips(tooltipModel) {
              const datasetIndex = (((tooltipModel.body || []).pop() || {}).lines || []).pop();

              if (tooltipModel.opacity === 0) {
                self.showTooltip = false;
                return;
              }

              if (tooltipModel.body) {
                self.indexSection = datasetIndex - 1;
              }
              self.showTooltip = true;
            };
          })(),
        },
      },
    };
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            backgroundColor: this.datasets.backgroundColor.concat(STATISTIC_COLOR_SCHEMA.WHITE),
            data: this.percentBallast,
          },
        ],
      };
    },
    percentBallast() {
      return this.datasets.data.concat(Math.max(0, TOTAL_PERCENT - this.sumPercent));
    },
    sumPercent() {
      return this.datasets.data.reduce((acc, percent) => acc + percent);
    },
    tooltipTitle() {
      return (this.datasets.tooltip[this.indexSection] || {}).title;
    },
    tooltipData() {
      return (this.datasets.tooltip[this.indexSection] || {}).data;
    },
    visibleTooltip() {
      return this.showTooltip && this.tooltipData;
    },
  },
  methods: {
    onCursorPosition(event) {
      this.cursorPositionX = event.clientX;
      this.cursorPositionY = event.clientY;
    },
  },
};
</script>

<style lang="scss" scoped>
.pie-chart /deep/ {
  width: 150px;
  height: 150px;

  #pie-chart {
    border: 1px solid #d6d6d6;
    border-radius: 50%;
  }
}
</style>
