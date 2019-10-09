import { LOAD_ITEMS } from '@/store/storage/actionTypes';
import { TABLE_NAMES } from '@/constants';

export default {
  methods: {
    getReceivedCommission(id) {
      const data = { itemType: TABLE_NAMES.RECEIVED_COMMISSION, id };
      return this.$store.dispatch(LOAD_ITEMS, data).finally(() => {
        this.showCommissionPopup = true;
      });
    },
  },
};
