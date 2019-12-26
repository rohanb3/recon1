<template>
  <age-filter
    :title="$t('disputes.age.after.installation')"
    :table-name="tableName"
    :filter-names="filterNames"
  />
</template>

<script>
import AgeFilter from './AgeFilter';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'InstallationAgeFilter',
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
        from: FILTER_NAMES.INSTALLATION_AGE_FROM,
        to: FILTER_NAMES.INSTALLATION_AGE_TO,
      },
    };
  },
};
</script>
