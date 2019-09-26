import { FILTER_NAMES } from '@/constants';

export default {
  props: {
    tableName: {
      type: String,
      required: true,
    },
    filteredFieldFrom: {
      type: String,
      required: true,
    },
    filteredFieldTo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quickSearchFilterName: FILTER_NAMES.SEARCH_ORDERS,
    };
  },
};
