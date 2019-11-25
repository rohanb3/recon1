<template>
  <chart :chartData="chartData" :options="options" />
</template>

<script>
import Chart from './Chart';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';
import { getMinAndMax } from '../../../services/utils';

export default {
  name: 'BarChart',
  components: {
    Chart,
  },
  props: {
    datasets: {
      type: Array,
      required: true,
    },
    labelAboveBar: {
      type: Function,
      default: () => '',
    },
    xAxisLabel: {
      type: String,
      default: '',
    },
    yAxisLabel: {
      type: String,
      default: '',
    },
    xValueKeyName: {
      type: Function,
      default: ({ xValue }) => xValue,
    },
    yValueKeyName: {
      type: Function,
      default: ({ yValue }) => yValue,
    },
    displayTooltip: {
      type: Boolean,
      default: true,
    },
    titleTooltip: {
      type: Function,
      default: tooltipItem => tooltipItem.label,
    },
    labelTooltip: {
      type: Function,
      default: null,
    },
  },
  computed: {
    yAxisStep() {
      const { min, max } = getMinAndMax(this.datasets, el => el.yValue);
      const range = min === max ? min : Math.abs(max) + Math.abs(min);
      return Math.ceil(range / 10) || 1;
    },
    options() {
      return {
        animation: {
          duration: 0,
        },
        plugins: {
          labels: {
            render: this.labelAboveBar,
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
                labelString: this.xAxisLabel,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: this.yAxisStep,
              },
              gridLines: {
                display: true,
              },
              scaleLabel: {
                display: true,
                labelString: this.yAxisLabel,
              },
            },
          ],
        },
        tooltips: {
          enabled: this.displayTooltip,
          titleFontColor: STATISTIC_COLOR_SCHEMA.BRIGHT_GREY,
          titleFontStyle: 'italic',
          displayColors: false,
          backgroundColor: STATISTIC_COLOR_SCHEMA.WHITE,
          borderColor: STATISTIC_COLOR_SCHEMA.GREY,
          borderWidth: 1,
          bodyFontColor: STATISTIC_COLOR_SCHEMA.BROWN,
          callbacks: {
            title: (() => {
              const self = this;
              return function customTitleTooltip([tooltipItem], secondParameter) {
                let tooltip =
                  secondParameter &&
                  secondParameter.datasets &&
                  secondParameter.datasets[0] &&
                  secondParameter.datasets[0].customTooltips &&
                  secondParameter.datasets[0].customTooltips[tooltipItem.index];
                tooltip = tooltip ? tooltip.replace(/↵/g, '\n') : '';
                const tooltipCustom = {
                  ...tooltipItem,
                  label: `${tooltipItem.label}\n${tooltip}`,
                };
                return self.titleTooltip(tooltipCustom);
              };
            })(),
            label(tooltipItem, data) {
              const label = data.datasets[tooltipItem.datasetIndex].labelTooltips;

              if (label) {
                return label[tooltipItem.index];
              }
              return '';
            },
          },
        },
      };
    },
    chartData() {
      return {
        labels: this.xValues,
        datasets: [
          {
            backgroundColor: STATISTIC_COLOR_SCHEMA.BRIGHT_BLUE,
            hoverBackgroundColor: STATISTIC_COLOR_SCHEMA.BLUE,
            data: this.yValues,
            labelTooltips: this.labelTooltipList,
            customTooltips: this.customTooltipList,
          },
        ],
      };
    },
    xValues() {
      return this.datasets.map(this.xValueKeyName);
    },
    yValues() {
      return this.datasets.map(this.yValueKeyName);
    },
    labelTooltipList() {
      if (!this.labelTooltip) return null;
      return this.datasets.map(this.labelTooltip);
    },
    customTooltipList() {
      function processCustomLabelData(curr) {
        if (!curr) return null;
        const approved =
          curr.nameOfConfirmApprovedDisputes &&
          `${curr.nameOfConfirmApprovedDisputes}: ${curr.totalConfirmApprovedDisputes}`;
        const rejected =
          curr.nameOfConfirmRejectedDisputes &&
          `${curr.nameOfConfirmRejectedDisputes}: ${curr.totalConfirmRejectedDisputes}`;
        let res = '';
        if (approved) {
          res += `${approved}↵`;
        }
        if (rejected) {
          res += `${rejected}↵`;
        }
        return res;
      }
      return this.datasets.map(processCustomLabelData);
    },
  },
};
</script>
