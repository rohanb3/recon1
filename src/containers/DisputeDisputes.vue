<template>
  <disputes-content :table-name="tableName">
    <disputes-list-toolbar slot="toolbar" :table-name="tableName" />
  </disputes-content>
</template>

<script>
import { TABLE_NAMES } from '@/constants';
import DisputesContent from './DisputesContent';
import DisputesListToolbar from './DisputesListToolbar';

export default {
  name: 'DisputesDisputes',
  components: {
    DisputesListToolbar,
    DisputesContent,
  },
  computed: {
    tableName() {
      return TABLE_NAMES.DISPUTES_LIST;
    },
  },
};
</script>
