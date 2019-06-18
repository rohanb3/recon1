<template>
  <v-container fluid class="dispute-bar-chart">
    <v-layout row>
      <v-flex>
        <p class="table-name">{{ $t('disputes.dashboard.total.created.disputes') }}</p>
      </v-flex>
      <total-created-disputes-toolbar :filters="filters" @select="onSelect"/>
    </v-layout>
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
import TotalCreatedDisputesToolbar from '@/components/DisputesDashboard/TotalCreatedDisputes/TotalCreatedDisputesToolbar';
import { getDailyStatistics } from '@/services/statisticsRepository';
import { errorMessage } from '@/services/notifications';
import { DATE_FORMATS } from '@/constants';
import { dateRange } from '@/services/dateHelper';

export default {
  name: 'TotalCreatedDisputesChart',
  components: {
    BarChart,
    LazyLoadForChart,
    TotalCreatedDisputesToolbar,
  },
  mounted() {
    this.initDate();
    this.loadDailyStatistics();
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
        .utc()
        .format();
      this.filters.createdTo = moment()
        .endOf('day')
        .utc()
        .format();
    },
    labelTooltip({ additionalYValue, nameOfAdditionalValue }) {
      if (!nameOfAdditionalValue) return null;
      return `${nameOfAdditionalValue} ${additionalYValue}`;
    },
    async loadDailyStatistics(resetPrevious = true) {
      this.loadingStatus = true;
      try {
        const { data } = await getDailyStatistics({
          CreatedFrom: this.filters.createdFrom,
          CreatedTo: this.filters.createdTo,
          countQyt: this.filters.countQyt,
          countCreated: this.filters.countCreated,
        });
        if (resetPrevious) {
          this.dailyStatistics = this.mergeDates(data);
        } else {
          this.dailyStatistics = this.mergeDates(data).concat(
            this.dailyStatistics
          );
        }
      } catch {
        errorMessage();
      } finally {
        this.loadingStatus = false;
      }
    },
    async onLoadDate() {
      this.filters.createdTo = moment
        .utc(this.filters.createdFrom)
        .subtract(1, 'days')
        .format();
      this.filters.createdFrom = moment
        .utc(this.filters.createdFrom)
        .subtract(1, 'month')
        .format();
      await this.loadDailyStatistics(false);
    },
    genDays() {
      this.filters.createdFrom;
      this.filters.createdTo;
    },
    mergeDates(data) {
      const dayList = dateRange(
        this.filters.createdFrom,
        this.filters.createdTo
      ).map(date => {
        const [dayNumber] = date.split(' ');
        return { xValue: date, dayNumber: Number(dayNumber) };
      });

      data
        .filter(({ yValue }) => yValue)
        .forEach(({ xValue, ...dailyStatistics }) => {
          const dayListIndex = dayList.findIndex(
            day => day.dayNumber === xValue
          );
          dayList[dayListIndex] = {
            ...dayList[dayListIndex],
            ...dailyStatistics,
          };
        });

      return dayList;
    },
    onSelect(filters) {
      this.filters = filters;
      this.initDate();
      this.loadDailyStatistics();
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
