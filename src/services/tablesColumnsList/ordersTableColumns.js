import i18n from '@/i18n';
import { TABLE_ORDER_COLUMNS_SORTED } from '@/constants';

export default () => [
  {
    name: 'ordersNumber',
    field: 'orderNumber',
    fieldType: 'orderNumber',
    class: 'text',
    title: i18n.t('orders.number'),
    width: '4',
    minWidth: '90px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.NUMBER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: i18n.t('orders.account.number'),
    width: '6',
    minWidth: '70px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.ACCOUNT_NUMBER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'serviceName',
    field: 'sevice.bundleName',
    class: 'text',
    title: i18n.t('orders.service.name'),
    width: '15',
    minWidth: '65px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.BUNDLE_NAME,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderedUnits',
    field: 'orderedUnits',
    class: 'text',
    title: i18n.t('orders.ordered.units'),
    width: '4',
    minWidth: '70px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.UNITS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'installedUnits',
    field: 'installedUnits',
    class: 'text',
    title: i18n.t('orders.installed.units'),
    width: '4',
    minWidth: '75px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.INSTALLED_UNITS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderStatus',
    field: 'status.orderStatusName',
    fieldType: 'orderStatus',
    class: 'text',
    title: i18n.t('orders.order.status'),
    width: '5',
    minWidth: '60px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.STATUS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'creationAge',
    field: 'creationAge',
    fieldType: 'creationAge',
    class: 'text',
    title: i18n.t('orders.age.after.order'),
    width: '4',
    minWidth: '90px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.AGE_AFTER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'installationAge',
    field: 'installationAge',
    fieldType: 'installationAge',
    class: 'text',
    title: i18n.t('orders.age.after.installation'),
    width: '5',
    minWidth: '90px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.INSTALLATION_AGE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'expectedCommission',
    field: 'expectedCommission',
    fieldType: 'price',
    class: 'text',
    title: i18n.t('orders.expected.comission'),
    width: '5',
    minWidth: '85px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.EXPECTED_COMISSION,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'receivedCommission',
    field: 'receivedCommission',
    fieldType: 'recievedComisson',
    class: 'text',
    title: i18n.t('orders.recieved.comisson'),
    width: '5',
    minWidth: '85px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.RECIEVED_COMISSON,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderDifference',
    fieldType: 'orderDifference',
    class: 'text',
    title: i18n.t('orders.difference'),
    width: '4',
    minWidth: '85px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.DIFFERENCE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'newDisputeButton',
    fieldType: 'disputeButton',
    class: 'text',
    title: i18n.t('orders.new.dispute'),
    width: '5',
    minWidth: '105px',
    sortingFieldName: TABLE_ORDER_COLUMNS_SORTED.DISPUTE_STATUS,
    fieldHeaderType: 'sortingHeader',
  },
];
