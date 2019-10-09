<template>
  <div v-if="value">
    {{ `${this.value} ${this.$t('days')}` }}
  </div>
  <div v-else>-</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'InstallationAgeCell',
  mixins: [nestedFieldCell],
};
</script>
