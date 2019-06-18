<template>
  <div class="disputes_dashboard-table">
    <Disputes-Dashboard-Toolbar :tableName="tableName" />
    <div class="statistic-list">
      <total-disputes-statistic :statistics="tableRows" />
      <total-spectrum-dispute-statistic :statistics="tableRows" />
      <total-xyz-dispute-statistic :statistics="tableRows" />
      <total-created-disputes-chart />
    </div>
  </div>
</template>

<script>
import TotalDisputesStatistic from '@/components/DisputesDashboard/TotalDisputesStatistic';
import TotalSpectrumDisputeStatistic from '@/components/DisputesDashboard/TotalSpectrumDisputeStatistic';
import TotalXyzDisputeStatistic from '@/components/DisputesDashboard/TotalXyzDisputeStatistic';
import DisputesDashboardToolbar from '@/containers/DisputesDashboardToolbar';
import TotalCreatedDisputesChart from '@/containers/TotalCreatedDisputesChart';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputesDashboardPage',
  components: {
    DisputesDashboardToolbar,
    TotalDisputesStatistic,
    TotalSpectrumDisputeStatistic,
    TotalXyzDisputeStatistic,
    TotalCreatedDisputesChart,
  },
  mixins: [lazyLoadTable],
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES_DASHBOARD,
      initialLoad: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/extends.scss';

.statistic-list {
  @extend %thin-scrollbar;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 30px;
  padding: 0 10px 0;
  height: calc(100vh - #{$header-height} - #{$table-toolbar-height} - 50px);
}
</style>
