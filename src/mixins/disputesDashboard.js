import { GREEN_COLOR, BLUE_COLOR, ORANGE_COLOR, GREY_COLOR } from '@/services/colorSchema';

const SECTION_TOTAL_DISPUTES = 'Total Disputes';

export default {
  computed: {
    totalStatistics() {
      return this.getSection(SECTION_TOTAL_DISPUTES);
    },
    markerColorList() {
      return [GREEN_COLOR, BLUE_COLOR, ORANGE_COLOR, GREY_COLOR];
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
