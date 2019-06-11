<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('disputes.dispute.type')"
      boundaries-selector=".disputes-table"
      :items="disputeTypeList"
      :useQuickBtn="false"
      :useSearchField="false"
      @select="toggleItem"
    />
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, DISPUTE_TYPES_ID } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

export default {
  name: 'DisputeTypeFilter',
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
      filterName: FILTER_NAMES.DISPUTE_TYPE_IDS,
      [FILTER_NAMES.DISPUTE_TYPE_IDS]: [
        {
          id: DISPUTE_TYPES_ID.ORDER_INSTALLED,
          name: this.$t('dispute.order.installed'),
        },
        {
          id: DISPUTE_TYPES_ID.EXPECTED_COMMISION,
          name: this.$t('dispute.order.not.canceled'),
        },
        {
          id: DISPUTE_TYPES_ID.MISSING_TRANSACTION,
          name: this.$t('dispute.missing.transaction'),
        },
      ],
    };
  },
  computed: {
    disputeTypeList() {
      return this[this.filterName];
    },
  },
};
</script>
