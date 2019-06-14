<template>
  <table-pie-chart :datasets="chartData" />
</template>

<script>
import TablePieChart from '@/components/charts/PieChart/TablePieChart';

export default {
  name: 'DisputChart',
  props: {
    statistics: {
      type: Array,
      required: true,
    },
  },
  components: {
    TablePieChart,
  },
  computed: {
    chartData() {
      return {
        backgroundColor: this.markerColorList,
        data: this.percentList,
        tooltip: this.tooltip,
      };
    },
    percentList() {
      return this.statistics.map(statistic => statistic.percent);
    },
    markerColorList() {
      return this.statistics.map(statistic => statistic.color);
    },
    tooltip() {
      return this.statistics.map(statistic => ({
        title: statistic.sectionName,
        data: [
          {
            label: this.$t('percentage'),
            value: `${statistic.percent}%`,
          },
          {
            label: this.$t('quantity'),
            value: statistic.totalQuantity,
          },
          {
            label: this.$t('comission.difference'),
            value: statistic.commission,
          },
        ],
      }));
    },
  },
};
</script>
