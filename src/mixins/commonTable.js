import { mapState } from 'vuex';
import { errorMessage } from '@/services/notifications';
import { CHANGE_ITEM } from '@/store/storage/mutationTypes';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import LazyLoadTable from '@/containers/LazyLoadTable';
import dateRange from '@/filters/boundaries';
import tableDateRange from '@/mixins/tableDateRange';

export default {
  components: {
    LazyLoadTable,
  },
  mixins: [tableDateRange],
  filters: {
    dateRange,
  },
  data() {
    return {
      historyShown: false,
      selected: {},
      processingIds: [],
    };
  },
  computed: {
    ...mapState({
      profileData: state => state.loggedInUser.profileData || {},
    }),
    displayName() {
      return this.profileData.displayName || '';
    },
  },
  methods: {
    async onChangeStatus({ id, statusId, comments }) {
      this.processingIds.push(id);
      const userName = this.displayName;
      const status = statusId;
      try {
        await this.changeStatus({ id, status, userName, comments });
        const entityInfo = await this.getEntityInfo(id);
        this.$store.commit(CHANGE_ITEM, {
          itemType: this.tableName,
          id,
          ...entityInfo,
        });
      } catch {
        errorMessage();
      } finally {
        this.processingIds = this.processingIds.filter(item => item !== id);
      }
    },
    async onSelectId(id) {
      try {
        const data = this.getSelectionFilters(id);
        await this.$store.dispatch(APPLY_FILTERS, data);
        this.historyShown = true;
      } catch {
        errorMessage();
      }
    },
  },
};
