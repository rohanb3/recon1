<template>
  <total-created-chart :get-daily-statistics="getDailyStatistics">
    <template #toolbar="{filters, onSelect}">
      <v-layout row>
        <v-flex>
          <p class="table-name">{{ $t('disputes.dashboard.total.created.claims') }}</p>
        </v-flex>
        <total-created-claims-toolbar :filters="filters" @select="onSelect" />
      </v-layout>
    </template>
  </total-created-chart>
</template>

<script>
import { getClaimsDailyStatistics } from '@/services/statisticsRepository';

import TotalCreatedChart from '@/containers/TotalCreatedChart';
import TotalCreatedClaimsToolbar from '@/components/DisputesDashboard/TotalCreatedDisputes/TotalCreatedClaimsToolbar';

export default {
  name: 'TotalCreatedClaimsChart',
  components: {
    TotalCreatedChart,
    TotalCreatedClaimsToolbar,
  },
  methods: {
    getDailyStatistics(data) {
      return getClaimsDailyStatistics(data);
    },
  },
};
</script>
