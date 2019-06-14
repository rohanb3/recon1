import { Bar, mixins } from 'vue-chartjs';
import ChartjsLabels from 'chartjs-plugin-labels';

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.addPlugin(ChartjsLabels);
    this.renderChart(this.chartData, this.options);
  },
};
