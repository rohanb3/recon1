<template>
  <age-filter
    :title="$t('orders.age.after.order')"
    :table-name="tableName"
    :filter-names="filterNames"
  />
</template>

<script>
import AgeFilter from './AgeFilter';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'OrderAgeFilter',
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
        from: FILTER_NAMES.ORDER_AGE_FROM,
        to: FILTER_NAMES.ORDER_AGE_TO,
      },
    };
  },
};
</script>
