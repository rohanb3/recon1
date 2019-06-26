<template>
  <v-container fluid grid-list-md class="disputes-dashboard-toolbar">
    <div class="table-filter-container">
      <age-filter
        :title="$t('orders.age.after.order')"
        :table-name="tableName"
        :filter-names="filterNames.orderAge"
      />
      <age-filter
        :title="$t('disputes.age.after.disput')"
        :table-name="tableName"
        :filter-names="filterNames.disputAge"
      />
    </div>
    <v-spacer />
    <div class="table-filter-container">
      <fiscal-period-filter :tableName="tableName" />
      <custom-range-filter :tableName="tableName" />
    </div>
  </v-container>
</template>

<script>
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import AgeFilter from '@/containers/AgeFilter';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'DisputesDashboardToolbar',
  components: {
    AgeFilter,
    FiscalPeriodFilter,
    CustomRangeFilter,
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
        orderAge: {
          from: FILTER_NAMES.ORDER_AGE_FROM,
          to: FILTER_NAMES.ORDER_AGE_TO,
        },
        disputAge: {
          from: FILTER_NAMES.DISPUTE_AGE_FROM,
          to: FILTER_NAMES.DISPUTE_AGE_TO,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.disputes-dashboard-toolbar {
  align-items: center;
  display: flex;
  flex: 1;

  .table-title {
    font-size: 20px;
    font-weight: bold;
    color: $base-text-color;
  }

  .table-filter-container {
    display: flex;
    padding-left: 10px;
  }
}

.table-filter-container /deep/ {
  @include table-filter-container;
}
</style>
