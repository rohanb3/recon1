import { mapState } from 'vuex';
import { errorMessage } from '@/services/notifications';
import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';
import { CHANGE_ITEM } from '@/store/storage/mutationTypes';
import { changeStatusDispute, getDispute } from '@/services/disputesRepository';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';

import LazyLoadTable from '@/containers/LazyLoadTable';
import DefaultCell from '@/components/tableCells/DefaultCell';
import RecievedComissonCell from '@/components/tableCells/RecievedComissonCell';
import DifferenceComissonCell from '@/components/tableCells/DifferenceComissonCell';
import DateYearMonthDayCell from '@/components/tableCells/DateYearMonthDayCell';
import OrderAgeCell from '@/components/tableCells/OrderAgeCell';
import PriceCell from '@/components/tableCells/PriceCell';
import ResubmitCell from '@/components/tableCells/ResubmitCell';
import RejectDisputeStatusCell from '@/components/tableCells/RejectDisputeStatusCell';
import ApproveDisputeStatusCell from '@/components/tableCells/ApproveDisputeStatusCell';
import DisputeStatusCell from '@/components/tableCells/DisputeStatusCell';
import IdCell from '@/components/tableCells/IdCell';
import DisputeStatusDescriptionCell from '@/components/tableCells/DisputeStatusDescriptionCell';

import DisputeHistory from '@/containers/DisputeHistory';

import dateRange from '@/filters/boundaries';

import tableDateRange from '@/mixins/tableDateRange';

export default {
  components: {
    LazyLoadTable,
    DefaultCell,
    RecievedComissonCell,
    DifferenceComissonCell,
    DateYearMonthDayCell,
    OrderAgeCell,
    PriceCell,
    ResubmitCell,
    RejectDisputeStatusCell,
    ApproveDisputeStatusCell,
    DisputeStatusCell,
    IdCell,
    DisputeHistory,
    DisputeStatusDescriptionCell,
  },
  mixins: [tableDateRange],
  filters: {
    dateRange,
  },
  data() {
    return {
      rowComponentsHash: {
        default: 'DefaultCell',
        price: 'PriceCell',
        recievedComisson: 'RecievedComissonCell',
        differenceComisson: 'DifferenceComissonCell',
        dateYearMonthDay: 'DateYearMonthDayCell',
        ageAfterOrder: 'OrderAgeCell',
        ageAfterInstallation: 'OrderAgeCell',
        ageAfterDispute: 'OrderAgeCell',
        disputeId: 'IdCell',
        disputeStatus: 'DisputeStatusCell',
        disputeStatusDescription: 'DisputeStatusDescriptionCell',
      },
      disputeHistoryShown: false,
      selectedDispute: {},
      processingDisputeIds: [],
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
    async onChangeDisputeStatus({ disputeId, statusId, comments }) {
      this.processingDisputeIds.push(disputeId);
      const userName = this.displayName;
      const status = statusId;
      try {
        await changeStatusDispute({ disputeId, status, userName, comments });
        const disputeInfo = await getDispute(disputeId);
        this.$store.commit(CHANGE_ITEM, {
          itemType: this.tableName,
          id: disputeId,
          ...disputeInfo,
        });
      } catch {
        errorMessage();
      } finally {
        this.processingDisputeIds = this.processingDisputeIds.filter(
          dispute => dispute !== disputeId
        );
      }
    },
    async onSelectIdDispute(idDispute) {
      try {
        const data = {
          tableName: ENTITY_TYPES.DISPUTE_HISTORY,
          filters: [
            {
              name: FILTER_NAMES.DISPUTE_ID,
              value: idDispute,
            },
          ],
        };
        await this.$store.dispatch(APPLY_FILTERS, data);
        this.disputeHistoryShown = true;
      } catch {
        errorMessage();
      }
    },
  },
};
