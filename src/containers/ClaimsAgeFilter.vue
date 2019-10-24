<template>
  <age-filter
    :title="$t('disputes.age.after.claim')"
    :table-name="tableName"
    :filter-names="filterNames"
  />
</template>

<script>
import AgeFilter from './AgeFilter';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'ClaimsAgeFilter',
  components: {
    AgeFilter,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filterNames: {
        from: FILTER_NAMES.CREATION_AGE_FROM,
        to: FILTER_NAMES.CREATION_AGE_TO,
      },
    };
  },
};
</script>
