<template>
  <xyz-status-filter :table-name="tableName" :filter-field="filterField" />
</template>

<script>
import XyzStatusFilter from '@/containers/XyzStatusFilter';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'ClaimsXyzStatusFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  components: { XyzStatusFilter },
  computed: {
    filterField() {
      return FILTER_NAMES.CLAIMS_STATUS_IDS;
    },
  },
};
</script>
