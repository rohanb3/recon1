import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  watch: {
    data: {
      handler() {
        this.renderChart(this.data, this.options);
      },
      deep: true,
    },
  },
};
