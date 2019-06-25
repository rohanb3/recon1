<template>
  <div class="disputes_dashboard-table">
    <table-toolbar :title="$t('disputes.dashboard')" :table-name="tableName">
      <Disputes-Dashboard-Toolbar :tableName="tableName" slot="filters" />
    </table-toolbar>
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
import TableToolbar from '@/components/TableToolbar';

export default {
  name: 'DisputesDashboardPage',
  components: {
    TableToolbar,
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
      resetDataBeforeLeave: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/extends.scss';
@import '@/assets/styles/mixins.scss';

.statistic-list {
  @extend %thin-scrollbar;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 30px;
  padding: 0 10px 0;
  height: calc(100vh - #{$header-height} - #{$table-toolbar-height} - 60px);
}

.disputes_dashboard-table {
  .table__header {
    @include table-base-container;

    height: auto;
    padding-bottom: 5px;
  }
}
</style>
