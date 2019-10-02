<template>
  <disputes-content :table-name="tableName">
    <claims-disputes-toolbar slot="toolbar" :table-name="tableName" />
  </disputes-content>
</template>

<script>
import { ENTITY_TYPES } from '@/constants';
import DisputesContent from './DisputesContent';
import ClaimsDisputesToolbar from './ClaimsDisputesToolbar';

export default {
  name: 'ClaimsDisputes',
  components: {
    ClaimsDisputesToolbar,
    DisputesContent,
  },
  computed: {
    tableName() {
      return ENTITY_TYPES.CLAIMS_DISPUTES;
    },
  },
};
</script>
