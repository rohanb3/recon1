<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('disputes.dispute.type')"
      boundaries-selector=".disputes-table"
      name="name"
      :items="disputeTypeList"
      :useQuickBtn="false"
      :useSearchField="false"
      @select="toggleItem"
    />
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, DISPUTE_TYPES_ID, DISPUTE_TYPES_NAME_TRANSLATION_KEYS } from '@/constants';
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
  mounted() {
    this[this.filterName] = this.initDisputeTypeList;
  },
  data() {
    return {
      filterName: FILTER_NAMES.DISPUTE_TYPE_IDS,
      [FILTER_NAMES.DISPUTE_TYPE_IDS]: [],
    };
  },
  computed: {
    disputeTypeList() {
      return this[this.filterName];
    },
    initDisputeTypeList() {
      return Object.values(DISPUTE_TYPES_ID).map(id => {
        const translationKey = DISPUTE_TYPES_NAME_TRANSLATION_KEYS[id];
        return {
          id,
          name: this.$t(translationKey),
          selected: false,
        };
      });
    },
  },
};
</script>
