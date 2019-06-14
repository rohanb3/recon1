<template>
  <div>
    <bar-chart class="bar-chart" :chartData="chartData" :options="options" />
    {{ xValues }}
  </div>
</template>

<script>
import BarChart from './BarChart';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';

export default {
  name: 'LazyLoadBarChart',
  components: {
    BarChart,
  },
  props: {
    datasets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        animation: {
          duration: 0,
        },
        plugins: {
          labels: {
            render: () => '',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              barThickness: 16,
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: 'Q-ty',
              },
            },
          ],
        },
        tooltips: {
          titleFontColor: STATISTIC_COLOR_SCHEMA.BROWN,
          titleFontStyle: 'italic',
          displayColors: false,
          backgroundColor: STATISTIC_COLOR_SCHEMA.WHITE,
        },
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.xValues,
        datasets: [
          {
            backgroundColor: STATISTIC_COLOR_SCHEMA.BRIGHT_BLUE,
            hoverBackgroundColor: STATISTIC_COLOR_SCHEMA.BLUE,
            data: this.yValues,
          },
        ],
      };
    },
    xValues() {
      return this.datasets.map(({ xValue }) => xValue);
    },
    yValues() {
      return this.datasets.map(({ yValue }) => yValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-chart {
  height: 230px;
}
</style>
