<template>
  <type-filter
    title="disputes.claim.type"
    :table-name="tableName"
    :load-data="getDisputesOrderStatusList"
    :filter-name="filterName"
    :translation-keys="keys"
  />
</template>

<script>
import TypeFilter from './TypeFilter';
import { FILTER_NAMES, CLAIMS_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';
import { getClaimTypes } from '@/services/disputesRepository';

export default {
  name: 'ClaimTypesFilter',
  components: { TypeFilter },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    keys() {
      return CLAIMS_STATUS_NAME_TRANSLATION_KEYS;
    },
    filterName() {
      return FILTER_NAMES.CLAIMS_TYPE_IDS;
    },
    getDisputesOrderStatusList() {
      return getClaimTypes;
    },
  },
};
</script>
