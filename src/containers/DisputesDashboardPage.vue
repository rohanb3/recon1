<template>
  <div class="disputes_dashboard-table">
    <Disputes-Dashboard-Toolbar :tableName="tableName" />
    <VuePerfectScrollbar class="statistic-list">
      <total-disputes-statistic :statistics="rows" />
      <total-spectrum-dispute-statistic :statistics="rows" />
      <total-xyz-dispute-statistic :statistics="rows" />
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import TotalDisputesStatistic from '@/components/DisputesDashboard/TotalDisputesStatistic';
import TotalSpectrumDisputeStatistic from '@/components/DisputesDashboard/TotalSpectrumDisputeStatistic';
import TotalXyzDisputeStatistic from '@/components/DisputesDashboard/TotalXyzDisputeStatistic';
import DisputesDashboardToolbar from '@/containers/DisputesDashboardToolbar';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputesDashboardPage',
  components: {
    DisputesDashboardToolbar,
    TotalDisputesStatistic,
    TotalSpectrumDisputeStatistic,
    TotalXyzDisputeStatistic,
    VuePerfectScrollbar,
  },
  mixins: [lazyLoadTable],
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES_DASHBOARD,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.statistic-list {
  margin-top: 30px;
  padding: 0 10px 30px;
  height: calc(100vh - #{$header-height} - #{$table-toolbar-height});
}
</style>
