import { TABLE_DISPUTE_COLUMNS_SORTED } from '@/constants';

export default () => [
  {
    name: 'disputesId',
    field: 'id',
    fieldType: 'disputeId',
    class: 'text',
    title: 'disputes.id',
    width: '12',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ID,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderNumber',
    field: 'orderNumber',
    fieldType: 'orderNumber',
    class: 'text',
    title: 'orders.number',
    width: '5',
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
    width: '5',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ORDER_CREATION_DATE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'fiscalPeriod',
    field: 'fiscalPeriod.name',
    class: 'grey-text-cell',
    title: 'disputes.fiscal.period',
    width: '5',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.FISCAL_PERIOD,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: 'disputes.account.number',
    width: '5',
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
    width: '5',
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
    width: '5',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'serviceName',
    field: 'serviceName.bundleName',
    class: 'text',
    title: 'disputes.service.name',
    width: '8',
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
    tooltipTitle: 'orders.expected.commission',
    width: '5',
    minWidth: '85px',
    fieldHeaderType: 'commissionHeader',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.EXPECTED_COMISSION,
  },
  {
    name: 'receivedCommission',
    field: 'receivedCommission',
    fieldType: 'receivedCommissionCell',
    class: 'text',
    title: 'orders.recieved.comisson',
    tooltipTitle: 'orders.received.commission',
    width: '5',
    minWidth: '85px',
    fieldHeaderType: 'commissionHeader',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.RECEIVED_COMISSION,
  },
  {
    name: 'difference',
    field: 'difference',
    fieldType: 'differenceCell',
    class: 'text',
    title: 'orders.difference',
    width: '5',
    minWidth: '85px',
    fieldHeaderType: 'sortingHeader',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.DIFFERENCE,
  },
  {
    name: 'disputeType',
    field: 'type.name',
    class: 'text',
    title: 'disputes.dispute.type',
    width: '5',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.TYPE,
    fieldHeaderType: 'sortingHeader',
    showTitle: true,
  },
  {
    name: 'installationDate',
    field: 'installationDate',
    fieldType: 'dateYearMonthDay',
    class: 'grey-text-cell',
    title: 'dispute.installation.date',
    width: '5',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.INSTALLATION_DATE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'ageAfterOrder',
    field: 'ageAfterOrder',
    fieldType: 'ageAfterOrder',
    class: 'text',
    title: 'disputes.age.after.order',
    width: '5',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.AGE_AFTER_ORDER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'ageAfterDispute',
    field: 'ageAfterDispute',
    fieldType: 'ageAfterDispute',
    class: 'text',
    title: 'disputes.age.after.disput',
    width: '5',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.AGE_AFTER_DISPUT,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'xyzStatus',
    field: 'xyzStatus',
    fieldType: 'xyzStatus',
    class: 'text',
    title: 'disputes.xyz.status',
    width: '5',
    minWidth: '190px',
  },
  {
    name: 'disputeStatus',
    fieldType: 'disputeStatus',
    class: 'text',
    title: 'disputes.dispute.status',
    width: '5',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.STATUS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'statusDescription',
    field: 'statusDescription',
    fieldType: 'disputeStatusDescription',
    class: 'text',
    title: 'disputes.dispute.status.description',
    width: '5',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.STATUS_DESCRIPTION,
    fieldHeaderType: 'sortingHeader',
  },
];
