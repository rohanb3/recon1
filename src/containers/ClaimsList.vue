<template>
  <claims-content :table-name="tableName">
    <claims-list-toolbar slot="toolbar" :table-name="tableName" />
  </claims-content>
</template>

<script>
import { TABLE_NAMES } from '@/constants';
import ClaimsListToolbar from './ClaimsListToolbar';
import ClaimsContent from './ClaimsContent';

export default {
  name: 'ClaimsList',
  components: {
    ClaimsContent,
    ClaimsListToolbar,
  },
  computed: {
    tableName() {
      return TABLE_NAMES.CLAIMS_DISPUTES;
    },
  },
};
</script>
