import { TABLE_DISPUTE_COLUMNS_SORTED } from '@/constants';

export default () => [
  {
    name: 'disputesId',
    field: 'id',
    fieldType: 'disputeId',
    class: 'text',
    title: 'disputes.id',
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ID,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderNumber',
    field: 'orderNumber',
    class: 'text',
    fieldType: 'orderNumber',
    title: 'orders.number',
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ORDER_NUMBER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderCreationDate',
    field: 'orderCreationDate',
    fieldType: 'dateYearMonthDay',
    class: 'grey-text-cell',
    title: 'disputes.order.creation.date',
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ORDER_CREATION_DATE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'fiscalPeriod',
    field: 'fiscalPeriod.name',
    class: 'grey-text-cell',
    title: 'disputes.fiscal.period',
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.FISCAL_PERIOD,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: 'disputes.account.number',
    width: '3',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ACCOUNT_NUMBER,
    fieldHeaderType: 'sortingHeader',
    showTitle: true,
  },
  {
    name: 'creatorName',
    field: 'creatorName',
    class: 'text',
    title: 'disputes.disput.creator.name',
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.CREATOR_NAME,
    fieldHeaderType: 'sortingHeader',
    showTitle: true,
  },
  {
    name: 'creationDate',
    field: 'creationDate',
    fieldType: 'dateYearMonthDay',
    class: 'grey-text-cell',
    title: 'disputes.disput.creation.date',
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'serviceName',
    field: 'serviceName.bundleName',
    class: 'text',
    title: 'disputes.service.name',
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.SERVICE_NAME,
    fieldHeaderType: 'sortingHeader',
    showTitle: true,
  },
  {
    name: 'expectedCommission',
    field: 'expectedCommission',
    fieldType: 'price',
    class: 'text',
    title: 'orders.expected.comission',
    width: '5',
    minWidth: '85px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.EXPECTED_COMISSION,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'receivedCommission',
    field: 'receivedCommission',
    fieldType: 'receivedCommissionCell',
    class: 'text',
    title: 'orders.recieved.comisson',
    width: '5',
    minWidth: '85px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.RECEIVED_COMISSION,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'difference',
    field: 'difference',
    fieldType: 'differenceCell',
    class: 'text',
    title: 'orders.difference',
    width: '5',
    minWidth: '85px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.DIFFERENCE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'type',
    field: 'type.name',
    class: 'text',
    title: 'disputes.dispute.type',
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.TYPE,
    fieldHeaderType: 'sortingHeader',
    showTitle: true,
  },
  {
    name: 'ageAfterInstallation',
    field: 'ageAfterInstallation',
    fieldType: 'ageAfterInstallation',
    class: 'text',
    title: 'disputes.age.after.installation',
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.AGE_AFTER_INSTALLATION,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'ageAfterDispute',
    field: 'ageAfterDispute',
    fieldType: 'ageAfterDispute',
    class: 'text',
    title: 'disputes.age.after.disput',
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.AGE_AFTER_DISPUT,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'disputeStatus',
    fieldType: 'disputeStatus',
    class: 'text',
    title: 'disputes.dispute.status',
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.STATUS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'resubmitDispute',
    fieldType: 'resubmitDispute',
    class: 'text',
    title: 'resubmission.table.resubmit.dispute',
    width: '4',
    minWidth: '110px',
  },
  {
    name: 'reject',
    fieldType: 'rejectDisputeStatus',
    class: 'text',
    title: 'resubmission.table.reject',
    width: '4',
    minWidth: '110px',
  },
  {
    name: 'approve',
    fieldType: 'approveDisputeStatus',
    class: 'text',
    title: 'resubmission.table.approve',
    width: '4',
    minWidth: '110px',
  },
  {
    name: 'disputeStatusDescription',
    fieldType: 'disputeStatusDescription',
    class: 'text',
    title: 'disputes.dispute.status.description',
    width: '4',
    minWidth: '30px',
  },
];
