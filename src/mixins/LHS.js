import { mapState, mapGetters } from 'vuex';

import LhsItemHeader from '@/components/LHS/LHSItemHeader';
import LhsItem from '@/components/LHS/LHSItem';

export default {
  components: {
    LhsItemHeader,
    LhsItem,
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    ...mapGetters([
      'isShowOrderWithoutExpectedComission',
      'isShowDisputeDashboard',
      'isShowDispute',
      'isShowResubmissionTable',
      'isShowOrderWithExpectedComission',
    ]),
    ...mapState({
      isTinySidebar: state => state.uiState.tinySidebarStatus,
    }),
    navigationLinks() {
      return this.items.filter(item => item.url || item.routeName);
    },
    groupOfItems() {
      return this.items.filter(item => item.items && item.items.length);
    },
  },
};
