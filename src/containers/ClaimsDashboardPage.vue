<template>
  <div class="claims_dashboard-table">
    <table-toolbar :title="$t('claims.dashboard')" :table-name="tableName">
      <claims-dashboard-toolbar :tableName="tableName" slot="filters" />
    </table-toolbar>
    <div class="statistic-list">
      <total-claims-statistic :statistics="tableRows" />
      <total-spectrum-claim-statistic :statistics="tableRows" />
      <total-xyz-claim-statistic :statistics="tableRows" />
      <total-created-disputes-chart />
    </div>
  </div>
</template>

<script>
import TotalClaimsStatistic from '@/components/ClaimsDashboard/TotalClaimsStatistic';
import TotalSpectrumClaimStatistic from '@/components/ClaimsDashboard/TotalSpectrumClaimStatistic';
import TotalXyzClaimStatistic from '@/components/ClaimsDashboard/TotalXyzClaimStatistic';
import ClaimsDashboardToolbar from '@/containers/ClaimsDashboardToolbar';
import TotalCreatedDisputesChart from '@/containers/TotalCreatedDisputesChart';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { TABLE_NAMES } from '@/constants';
import TableToolbar from '@/components/TableToolbar';

export default {
  name: 'ClaimsDashboardPage',
  components: {
    TableToolbar,
    ClaimsDashboardToolbar,
    TotalClaimsStatistic,
    TotalSpectrumClaimStatistic,
    TotalXyzClaimStatistic,
    TotalCreatedDisputesChart,
  },
  mixins: [lazyLoadTable],
  data() {
    return {
      tableName: TABLE_NAMES.CLAIMS_DASHBOARD,
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
  height: calc(
    100vh - #{$header-height} - #{$table-toolbar-height} - 60px - #{$switcher-height}
  );
}

.claims_dashboard-table {
  .table__header {
    @include table-base-container;

    height: auto;
    padding-bottom: 5px;
  }
}
</style>
