<template>
  <div class="orders-table-toolbar">
    <quick-search-filter :table-name="tableName" :filter-name="quickSearchFilterName" />
    <div class="table-filter-container">
      <order-status-filter :table-name="tableName" />
      <order-age-filter :table-name="tableName" />
    </div>
    <v-spacer></v-spacer>
    <div class="table-filter-container">
      <table-button
        :disabled="isOrdersSyncing"
        :preloader="isOrdersSyncing"
        :title="$t('sync.orders')"
        @click="$emit('syncOrders')"
      />
      <export-to-csv-file-button
        :tableName="tableName"
        :filters="filters"
        :repository="handlerCsvFile()"
      />
      <fiscal-period-filter :tableName="tableName" />
      <custom-range-filter :table-name="tableName" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import OrderStatusFilter from '@/containers/OrderStatusFilter';
import TableButton from '@/components/TableButton';
import OrderAgeFilter from '@/containers/OrderAgeFilter';
import { ORDER_SYNC_STATUS, FILTER_NAMES } from '@/constants';
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';
import ExportToCsvFileButton from '@/containers/ExportToCsvFileButton';
import { getOrdersCsvFile } from '@/services/ordersRepository';

export default {
  name: 'OrdersTableToolbar',
  components: {
    CustomRangeFilter,
    QuickSearchFilter,
    OrderStatusFilter,
    TableButton,
    FiscalPeriodFilter,
    ExportToCsvFileButton,
    OrderAgeFilter,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quickSearchFilterName: FILTER_NAMES.SEARCH_ORDERS,
    };
  },
  computed: {
    ...mapGetters(['tableData', 'storageData']),
    isOrdersSyncing() {
      return this.storageData(this.tableName).syncOrdersStatus === ORDER_SYNC_STATUS.WORKING;
    },
    filters() {
      return this.tableData(this.tableName).filters;
    },
  },
  methods: {
    handlerCsvFile() {
      return getOrdersCsvFile;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.orders-table-toolbar {
  display: flex;
  flex: 1;
  margin-left: 20px;
  align-items: center;

  .quick-search {
    flex: 0;
  }
}

.table-filter-container /deep/ {
  @include table-filter-container;
  flex-wrap: wrap;
}
</style>
