<template>
  <div class="disputes-dashboard-page">
    <Disputes-Dashboard-Toolbar />
    <disput-statistic />
  </div>
</template>

<script>
import DisputesDashboardToolbar from '@/containers/DisputesDashboardToolbar';
import DisputStatistic from '@/components/DisputStatistic';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputesDashboardPage',
  components: {
    DisputesDashboardToolbar,
    DisputStatistic,
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
