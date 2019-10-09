<template>
  <div>
    {{ `${this.value} ${this.$t('days')}` | dashForEmptyValue }}
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import dashForEmptyValue from '../../filters/dashForEmptyValue';

export default {
  name: 'InstallationAgeCell',
  mixins: [nestedFieldCell],
  filters: { dashForEmptyValue },
};
</script>
