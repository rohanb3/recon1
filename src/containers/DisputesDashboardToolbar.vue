<template>
  <v-container fluid grid-list-md class="disputes-dashboard-toolbar">
    <div class="table-title">{{ $t('disputes.dashboard') }}</div>
  </v-container>
</template>

<script>
export default {
  name: 'DisputesDashboardToolbar',
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.disputes-dashboard-toolbar {
  @include table-base-container;

  .table-title {
    font-size: 20px;
    font-weight: bold;
    color: $base-text-color;
  }
}
</style>
