<template>
  <div @mousemove="onCursorPosition">
    <pie-chart class="pie-chart" :chartData="chartData" :options="options"></pie-chart>
    <tooltip v-show="showTooltip" :title="tooltipTitle" :x="cursorPositionX" :y="cursorPositionY">
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

const LABEL_CHART_COLOR = '#fff';

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
            fontColor: LABEL_CHART_COLOR,
            fontSize: 14,
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
            backgroundColor: this.datasets.backgroundColor,
            data: this.datasets.data,
          },
        ],
      };
    },
    tooltipTitle() {
      return this.datasets.tooltip[this.indexSection].title;
    },
    tooltipData() {
      return this.datasets.tooltip[this.indexSection].data;
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
.pie-chart {
  width: 150px;
  height: 150px;
}
</style>
