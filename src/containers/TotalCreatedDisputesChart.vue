<template>
  <total-created-chart :get-daily-statistics="getDailyStatistics">
    <template #toolbar="{filters, onSelect}">
      <v-layout row>
        <v-flex>
          <p class="table-name">{{ $t('disputes.dashboard.total.created.disputes') }}</p>
        </v-flex>
        <total-created-disputes-toolbar :filters="filters" @select="onSelect" />
      </v-layout>
    </template>
  </total-created-chart>
</template>

<script>
import { getDisputesDailyStatistics } from '@/services/statisticsRepository';

import TotalCreatedChart from '@/containers/TotalCreatedChart';
import TotalCreatedDisputesToolbar from '@/components/DisputesDashboard/TotalCreatedDisputes/TotalCreatedDisputesToolbar';

export default {
  name: 'TotalCreatedDisputesChart',
  components: {
    TotalCreatedChart,
    TotalCreatedDisputesToolbar,
  },
  methods: {
    getDailyStatistics(data) {
      return getDisputesDailyStatistics(data);
    },
  },
};
</script>
