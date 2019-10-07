<template>
  <xyz-status-filter :table-name="tableName" :filter-field="filterField" />
</template>

<script>
import XyzStatusFilter from '@/containers/XyzStatusFilter';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'DisputesXyzStatusFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  components: { XyzStatusFilter },
  computed: {
    filterField() {
      return FILTER_NAMES.DISPUTE_STATUS_IDS;
    },
  },
};
</script>
