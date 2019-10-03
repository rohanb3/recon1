<template>
  <disputes-content :table-name="tableName">
    <claims-list-toolbar slot="toolbar" :table-name="tableName" />
  </disputes-content>
</template>

<script>
import { TABLE_NAMES } from '@/constants';
import DisputesContent from './DisputesContent';
import ClaimsListToolbar from './ClaimsListToolbar';

export default {
  name: 'ClaimsList',
  components: {
    ClaimsListToolbar,
    DisputesContent,
  },
  computed: {
    tableName() {
      return TABLE_NAMES.CLAIMS_DISPUTES;
    },
  },
};
</script>
