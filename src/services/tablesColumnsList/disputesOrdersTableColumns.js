import { TABLE_ORDER_COLUMNS_SORTED } from '@/constants';

export default () => [
  {
    name: 'ordersNumber',
    field: 'orderNumber',
    fieldType: 'orderNumber',
    class: 'text',
    title: 'orders.number',
    width: '4',
    minWidth: '90px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.NUMBER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: 'orders.account.number',
    width: '6',
    minWidth: '70px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.ACCOUNT_NUMBER,
    fieldHeaderType: 'sortingHeader',
    showTitle: true,
  },
  {
    name: 'creationDate',
    field: 'createdOn',
    fieldType: 'dateYearMonthDay',
    class: 'grey-text-cell',
    title: 'orders.creation.date',
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.CREATED_ON,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'serviceName',
    field: 'service.bundleName',
    class: 'text',
    title: 'orders.service.name',
    width: '15',
    minWidth: '65px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.BUNDLE_NAME,
    fieldHeaderType: 'sortingHeader',
    showTitle: true,
  },
  {
    name: 'orderedUnits',
    field: 'orderedUnits',
    class: 'text',
    title: 'orders.ordered.units',
    width: '4',
    minWidth: '70px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.UNITS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'installedUnits',
    field: 'installedUnits',
    class: 'text',
    title: 'orders.installed.units',
    width: '4',
    minWidth: '70px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.INSTALLED_UNITS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderStatus',
    field: 'status.orderStatusName',
    fieldType: 'orderStatus',
    class: 'text',
    title: 'orders.order.status',
    width: '5',
    minWidth: '60px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.STATUS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'installationDate',
    field: 'installationDate',
    fieldType: 'dateYearMonthDay',
    class: 'text',
    title: 'dispute.installation.date',
    width: '5',
    minWidth: '60px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.INSTALLATION_DATE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'installationAge',
    field: 'installationAge',
    fieldType: 'installationAge',
    class: 'text',
    title: 'orders.age.after.installation',
    width: '4',
    minWidth: '90px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.INSTALLATION_AGE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'expectedCommission',
    field: 'expectedCommission',
    fieldType: 'price',
    class: 'text',
    title: 'orders.expected.comission',
    width: '6',
    minWidth: '85px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.EXPECTED_COMISSION,
    fieldHeaderType: 'commissionCell',
    visible: (store, getters) => getters.isShowOrderWithExpectedComission,
  },
  {
    name: 'receivedCommission',
    field: 'receivedCommission',
    fieldType: 'receivedCommissionCell',
    class: 'text',
    title: 'orders.recieved.comisson',
    width: '6',
    minWidth: '85px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.RECIEVED_COMISSON,
    fieldHeaderType: 'commissionCell',
    visible: (store, getters) => getters.isShowOrderWithExpectedComission,
  },
  {
    name: 'difference',
    field: 'difference',
    fieldType: 'price',
    class: 'text',
    title: 'orders.difference',
    width: '5',
    minWidth: '85px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.DIFFERENCE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'newDisputeButton',
    fieldType: 'disputeButton',
    class: 'text',
    title: 'orders.new.dispute',
    width: '5',
    minWidth: '105px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.DISPUTE_STATUS,
    fieldHeaderType: 'sortingHeader',
  },
];
