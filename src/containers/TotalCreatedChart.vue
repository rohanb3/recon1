<template>
  <v-container fluid class="dispute-bar-chart">
    <slot name="toolbar" :onSelect="onSelect" :filters="filters"></slot>
    <lazy-load-for-chart
      :dataSets="dailyStatistics"
      v-slot:default="{ pieceOfData }"
      :loading="loadingStatus"
      @loadData="onLoadDate"
    >
      <bar-chart
        class="bar-chart"
        :datasets="pieceOfData"
        :xAxisLabel="$t('date')"
        :yAxisLabel="yAxisLabel"
        :labelTooltip="labelTooltip"
      />
      <v-progress-circular
        v-if="loadingStatus"
        class="big-spinner"
        :size="70"
        :width="7"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </lazy-load-for-chart>
  </v-container>
</template>

<script>
import moment from 'moment';
import LazyLoadForChart from '@/components/charts/LazyLoadForChart';
import BarChart from '@/components/charts/BarChart';
import { errorMessage } from '@/services/notifications';
import { dateRange } from '@/services/dateHelper';
import { DATE_FORMATS } from '@/constants';

export default {
  name: 'TotalCreatedChart',
  props: ['getDailyStatistics'],
  components: {
    BarChart,
    LazyLoadForChart,
  },
  async mounted() {
    this.initDate();
    this.dailyStatistics = await this.loadDailyStatistics();
  },
  data() {
    return {
      loadingStatus: false,
      dailyStatistics: [],
      filters: {
        countQyt: true,
        countCreated: false,
        createdFrom: '',
        createdTo: '',
      },
    };
  },
  computed: {
    yAxisLabel() {
      return this.filters.countQyt ? this.$t('quantity') : this.$t('money');
    },
  },
  methods: {
    initDate() {
      this.filters.createdFrom = moment()
        .startOf('day')
        .subtract(1, 'month')
        .format(DATE_FORMATS.FULL_YEAR_SHORT_MONTH_SHORT_DAY);
      this.filters.createdTo = moment()
        .add(1, 'day')
        .startOf('day')
        .format(DATE_FORMATS.FULL_YEAR_SHORT_MONTH_SHORT_DAY);
    },
    labelTooltip({ additionalYValue, nameOfAdditionalValue }) {
      if (!nameOfAdditionalValue) return null;
      return `${nameOfAdditionalValue} ${additionalYValue}`;
    },
    async loadDailyStatistics() {
      this.loadingStatus = true;
      try {
        const { data } = await this.getDailyStatistics({
          CreatedFrom: this.filters.createdFrom,
          CreatedTo: this.filters.createdTo,
          countQyt: this.filters.countQyt,
          countCreated: this.filters.countCreated,
        });

        return this.generateAndMergeDates(data);
      } catch {
        errorMessage();
        return Promise.reject();
      } finally {
        this.loadingStatus = false;
      }
    },
    async onLoadDate() {
      this.filters.createdTo = moment
        .utc(this.filters.createdFrom)
        .subtract(1, 'seconds')
        .format();
      this.filters.createdFrom = moment
        .utc(this.filters.createdFrom)
        .subtract(1, 'month')
        .format();
      this.dailyStatistics = (await this.loadDailyStatistics()).concat(this.dailyStatistics);
    },
    generateAndMergeDates(dailyStatistics) {
      const dayList = dateRange(
        this.filters.createdFrom,
        this.filters.createdTo,
        DATE_FORMATS.FULL_YEAR_SHORT_MONTH_SHORT_DAY
      ).map(date => {
        const statistic = dailyStatistics.find(day => {
          return moment(date).isSame(day.xValue, 'day');
        });

        const xValue = moment(date).format(DATE_FORMATS.DAY_SHORT_MONTH);

        if (statistic) {
          return { ...statistic, xValue };
        }
        return { xValue };
      });

      return dayList;
    },
    async onSelect(filters) {
      this.filters = filters;
      this.initDate();
      this.dailyStatistics = await this.loadDailyStatistics();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.dispute-bar-chart {
  @include table-base-container;
  position: relative;

  background-color: $base-white;
  margin-bottom: 8px;
  padding: 12px 20px;
  max-height: 323px;

  .table-name {
    font-size: 14px;
    color: $table-statistic-header-color;
    margin-bottom: 32px;
  }

  .bar-chart {
    height: 230px;
  }

  .big-spinner {
    top: 40%;
  }
}
</style>
