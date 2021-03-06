import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';
import { changeStatusDispute, getDispute } from '@/services/disputesRepository';
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
import History from '@/containers/History';
import commonTable from '@/mixins/commonTable';

export default {
  components: {
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
    History,
    DisputeStatusDescriptionCell,
  },
  mixins: [commonTable],
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
    };
  },
  methods: {
    changeStatus(data) {
      return changeStatusDispute(data);
    },
    getEntityInfo(id) {
      return getDispute(id);
    },
    getSelectionFilters(id) {
      return {
        tableName: ENTITY_TYPES.DISPUTE_HISTORY,
        filters: [
          {
            name: FILTER_NAMES.ID,
            value: id,
          },
        ],
      };
    },
  },
  computed: {
    historyTableName() {
      return ENTITY_TYPES.DISPUTE_HISTORY;
    },
  },
};
