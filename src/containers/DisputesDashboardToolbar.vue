<template>
  <v-container fluid grid-list-md class="disputes-dashboard-toolbar">
    <div class="table-title">{{ $t('disputes.dashboard') }}</div>
    <v-spacer />
    <div class="table-filter-container">
      <custom-range-filter :tableName="tableName" />
    </div>
  </v-container>
</template>

<script>
import CustomRangeFilter from '@/containers/CustomRangeFilter';

export default {
  name: 'DisputesDashboardToolbar',
  components: { CustomRangeFilter },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.disputes-dashboard-toolbar {
  @include table-base-container;

  align-items: center;
  display: flex;
  flex: 1;

  .table-title {
    font-size: 20px;
    font-weight: bold;
    color: $base-text-color;
  }
}
</style>
