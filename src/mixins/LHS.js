import { mapState } from 'vuex';

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
    ...mapState({
      isTinySidebar: state => state.uiState.tinySidebarStatus,
    }),
    navigationLinks() {
      return this.items.filter(item => item.url || item.routeName);
    },
    groupOfItems() {
      return this.items.filter(item => item.items && item.items.length);
    },
    routeName() {
      return this.$route.name;
    },
  },
};
