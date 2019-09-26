<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('disputes.dispute.type')"
      boundaries-selector=".disputes-table"
      :items="disputeTypeList"
      :useQuickBtn="false"
      :useSearchField="false"
      :show-clear-button="true"
      @select="toggleItem"
      @clearAll="onClearAllItemDisplayed"
    />
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, ORDERS_DISPUTE_TYPES } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

export default {
  name: 'OrdersDisputeTypeFilter',
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
  data() {
    return {
      filterName: FILTER_NAMES.TYPE,
      [FILTER_NAMES.TYPE]: [
        {
          id: ORDERS_DISPUTE_TYPES.COMMISSION_RECEIVED_LESS_EXPECTED,
          name: this.$t('commission.received.less.expected'),
        },
        {
          id: ORDERS_DISPUTE_TYPES.COMMISSION_RECEIVED_MORE_EXPECTED,
          name: this.$t('commission.received.more.expected'),
        },
        {
          id: ORDERS_DISPUTE_TYPES.ORDER_INSTALLED_WITHOUT_COMMISSION_RECEIVED,
          name: this.$t('order.installed.without.commission.received'),
        },
      ],
    };
  },
  computed: {
    disputeTypeList() {
      return this[this.filterName];
    },
  },
  methods: {
    selectOneItem(itemIndex, status) {
      for (let i = 0; i < this[this.filterName].length; i += 1) {
        this.$set(this[this.filterName][i], 'selected', false);
      }
      this.$set(this[this.filterName][itemIndex], 'selected', status);
    },
  },
};
</script>
