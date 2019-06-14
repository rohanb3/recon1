<template>
  <div class="disputes_dashboard-table">
    <Disputes-Dashboard-Toolbar :tableName="tableName"/>
    <VuePerfectScrollbar class="statistic-list">
      <total-disputes-statistic :statistics="tableRows"/>
      <total-spectrum-dispute-statistic :statistics="tableRows"/>
      <total-xyz-dispute-statistic :statistics="tableRows"/>
      <total-created-disputes-chart :statistics="dailyStatistics" @loadDate="onLoadDate"/>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import moment from 'moment';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import TotalDisputesStatistic from '@/components/DisputesDashboard/TotalDisputesStatistic';
import TotalSpectrumDisputeStatistic from '@/components/DisputesDashboard/TotalSpectrumDisputeStatistic';
import TotalXyzDisputeStatistic from '@/components/DisputesDashboard/TotalXyzDisputeStatistic';
import DisputesDashboardToolbar from '@/containers/DisputesDashboardToolbar';
import TotalCreatedDisputesChart from '@/components/DisputesDashboard/TotalCreatedDisputesChart';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { getDailyStatistics } from '@/services/statisticsRepository';
import { ENTITY_TYPES } from '@/constants';
import { errorMessage } from '@/services/notifications';

export default {
  name: 'DisputesDashboardPage',
  components: {
    DisputesDashboardToolbar,
    TotalDisputesStatistic,
    TotalSpectrumDisputeStatistic,
    TotalXyzDisputeStatistic,
    VuePerfectScrollbar,
    TotalCreatedDisputesChart,
  },
  mixins: [lazyLoadTable],
  mounted() {
    this.loadDailyStatistics();
  },
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES_DASHBOARD,
      initialLoad: true,
      loadingStatus: false,
      dailyStatistics: [],
      createdFrom: '2019-05-01',
      createdTo: '2019-06-14',
    };
  },
  methods: {
    async loadDailyStatistics(resetPrevious = true) {
      this.loadingStatus = true;
      try {
        const { data } = await getDailyStatistics({
          CreatedFrom: this.createdFrom,
          CreatedTo: this.createdTo,
          countQyt: true,
          countCreated: true,
        });
        if (resetPrevious) {
          this.dailyStatistics = data;
        } else {
          console.log(data, data.concat(this.dailyStatistics));
          
          this.dailyStatistics = data.concat(this.dailyStatistics);
        }
      } catch {
        errorMessage();
      } finally {
        this.loadingStatus = false;
      }
    },
    async onLoadDate() {
      this.createdTo = this.createdFrom;
      this.createdFrom = moment(this.createdFrom).subtract(1, 'month').format();
      await this.loadDailyStatistics(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.statistic-list {
  margin-top: 30px;
  padding: 0 10px 0;
  height: calc(100vh - #{$header-height} - #{$table-toolbar-height} - 50px);
}
</style>
