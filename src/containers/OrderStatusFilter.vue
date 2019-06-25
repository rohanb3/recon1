<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('orders.order.status')"
      boundaries-selector=".orders-table"
      name="name"
      :items="statusList"
      :useQuickBtn="false"
      :useSearchField="false"
      @select="toggleItem"
    />
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, ORDER_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { getOrderStatusList } from '@/services/ordersRepository';

export default {
  name: 'OrderStatusFilter',
  mixins: [tableFilterAutocomplete],
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  components: {
    TableFilter,
  },
  mounted() {
    this.loadStatusesList();
  },
  data() {
    return {
      filterName: FILTER_NAMES.ORDER_STATUS,
      [FILTER_NAMES.ORDER_STATUS]: [],
    };
  },
  computed: {
    statusList() {
      return this[this.filterName].map(({ id, orderStatusName, selected }) => {
        const translationKey = ORDER_STATUS_NAME_TRANSLATION_KEYS[orderStatusName];
        return {
          id,
          name: translationKey ? this.$t(translationKey) : orderStatusName,
          selected,
        };
      });
    },
  },
  methods: {
    loadStatusesList() {
      this.loading = true;
      getOrderStatusList()
        .then(data => {
          this[this.filterName] = data;
          this.displayPreselectItems();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
