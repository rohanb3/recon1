<template>
  <div class="filter-wrapper">
    <type-filter
      :table-name="tableName"
      :load-data="getDisputesOrderStatusList"
      title="disputes.claim.type"
    />
  </div>
</template>

<script>
import { getClaimTypes } from '@/services/disputesRepository';
import TypeFilter from './TypeFilter';

export default {
  name: 'DisputeClaimsTypeFilter',
  components: {
    TypeFilter,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    getDisputesOrderStatusList() {
      return getClaimTypes;
    },
  },
};
</script>
