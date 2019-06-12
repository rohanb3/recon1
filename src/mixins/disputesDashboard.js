const SECTION_TOTAL_DISPUTES = 'Total Disputes';

export default {
  computed: {
    totalStatistics() {
      return this.getSection(SECTION_TOTAL_DISPUTES);
    },
  },
  methods: {
    getSection(sectionName) {
      return this.parseStatistics(
        this.statistics.find(statistic => statistic.sectionName === sectionName) || {}
      );
    },
    parseStatistics(statistics) {
      const {
        sectionName,
        data: { total: totalQuantity, rows: { Percent, Commission } = {} } = {},
      } = statistics;

      return { sectionName, totalQuantity, Percent, Commission };
    },
  },
};
