<template>
  <type-filter
    title="dispute.dispute.type"
    :table-name="tableName"
    :load-data="getDisputesOrderStatusList"
    :filter-name="filterName"
    :translation-keys="keys"
  />
</template>

<script>
import TypeFilter from './TypeFilter';
import { FILTER_NAMES, DISPUTES_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';
import { getDisputeTypes } from '@/services/disputesRepository';

export default {
  name: 'DisputeTypesFilter',
  components: { TypeFilter },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    keys() {
      return DISPUTES_STATUS_NAME_TRANSLATION_KEYS;
    },
    filterName() {
      return FILTER_NAMES.DISPUTE_TYPE_IDS;
    },
    getDisputesOrderStatusList() {
      return getDisputeTypes;
    },
  },
};
</script>
