import i18n from '@/i18n';

import { TABLE_COLUMNS_SORTED, ROUTE_NAMES } from '@/constants';

export const getOrdersTableColumns = () => [
  {
    name: 'ordersNumber',
    field: 'orderNumber',
    fieldType: 'orderNumber',
    class: 'text',
    title: i18n.t('orders.number'),
    width: '4',
    minWidth: '90px',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: i18n.t('orders.account.number'),
    width: '6',
    minWidth: '70px',
  },
  {
    name: 'serviceName',
    field: 'sevice.bundleName',
    class: 'text',
    title: i18n.t('orders.service.name'),
    width: '15',
    minWidth: '65px',
  },
  {
    name: 'orderedUnits',
    field: 'orderedUnits',
    class: 'text',
    title: i18n.t('orders.ordered.units'),
    width: '4',
    minWidth: '70px',
  },
  {
    name: 'installedUnits',
    field: 'installedUnits',
    class: 'text',
    title: i18n.t('orders.installed.units'),
    width: '4',
    minWidth: '75px',
  },
  {
    name: 'orderStatus',
    field: 'status.statusName',
    fieldType: 'orderStatus',
    class: 'text',
    title: i18n.t('orders.order.status'),
    width: '5',
    minWidth: '60px',
  },
  {
    name: 'creationAge',
    field: 'creationAge',
    fieldType: 'creationAge',
    class: 'text',
    title: i18n.t('orders.age.after.order'),
    width: '4',
    minWidth: '90px',
  },
  {
    name: 'installationAge',
    field: 'installationAge',
    fieldType: 'installationAge',
    class: 'text',
    title: i18n.t('orders.age.after.installation'),
    width: '5',
    minWidth: '90px',
  },
  {
    name: 'expectedComission',
    field: 'expectedComission',
    fieldType: 'price',
    class: 'text',
    title: i18n.t('orders.expected.comission'),
    width: '5',
    minWidth: '85px',
  },
  {
    name: 'recevedComission',
    fieldType: 'recievedComisson',
    class: 'text',
    title: i18n.t('orders.recieved.comisson'),
    width: '5',
    minWidth: '85px',
  },
  {
    name: 'orderDifference',
    fieldType: 'differenceComisson',
    class: 'text',
    title: i18n.t('orders.difference'),
    width: '4',
    minWidth: '85px',
  },
  {
    name: 'newDisputeButton',
    fieldType: 'disputeButton',
    class: 'text',
    title: i18n.t('orders.new.dispute'),
    width: '5',
    minWidth: '105px',
    sortingFieldName: TABLE_COLUMNS_SORTED.DISPUTE_STATUS,
    fieldHeaderType: 'sortingHeader',
  },
];

export const getDisputesTableColumns = () => [
  {
    name: 'disputesId',
    field: 'id',
    class: 'text',
    title: i18n.t('disputes.id'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'fiscalPeriod',
    field: 'fiscalPeriod.name',
    class: 'grey-text-cell',
    title: i18n.t('disputes.fiscal.period'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: i18n.t('disputes.account.number'),
    width: '3',
    minWidth: '16px',
  },
  {
    name: 'expectedComission',
    field: 'expectedComission',
    fieldType: 'price',
    class: 'text',
    title: i18n.t('disputes.expected.comission'),
    width: '3',
    minWidth: '16px',
  },
  {
    name: 'recievedComisson',
    fieldType: 'recievedComisson',
    class: 'text',
    title: i18n.t('disputes.recieved.comisson'),
    width: '3',
    minWidth: '16px',
  },
  {
    name: 'differenceComisson',
    fieldType: 'differenceComisson',
    class: 'text',
    title: i18n.t('disputes.difference'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'creatorName',
    field: 'creatorName',
    class: 'text',
    title: i18n.t('disputes.disput.creator.name'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'creationDate',
    field: 'creationDate',
    fieldType: 'dateYearMonthDay',
    class: 'grey-text-cell',
    title: i18n.t('disputes.disput.creation.date'),
    width: '4',
    minWidth: '30px',
  },
  {
    name: 'serviceName',
    field: 'serviceName.bundleName',
    class: 'text',
    title: i18n.t('disputes.service.name'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'disputeType',
    field: 'disputeType.name',
    class: 'text',
    title: i18n.t('disputes.dispute.type'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'ageAfterOrder',
    field: 'ageAfterOrder',
    fieldType: 'ageAfterOrder',
    class: 'text',
    title: i18n.t('disputes.age.after.order'),
    width: '4',
    minWidth: '30px',
  },
  {
    name: 'ageAfterInstallation',
    field: 'ageAfterInstallation',
    fieldType: 'ageAfterOrder',
    class: 'text',
    title: i18n.t('disputes.age.after.installation'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'ageAfterDispute',
    field: 'ageAfterDispute',
    fieldType: 'ageAfterDispute',
    class: 'text',
    title: i18n.t('disputes.age.after.disput'),
    width: '4',
    minWidth: '30px',
  },
  {
    name: 'xyzStatus',
    field: 'xyzStatus',
    fieldType: 'xyzStatus',
    class: 'text',
    title: i18n.t('disputes.xyz.status'),
    width: '5',
    minWidth: '170px',
    routeName: ROUTE_NAMES.DISPUTE_LIST,
  },
  {
    name: 'disputeStatus',
    fieldType: 'disputeStatus',
    class: 'text',
    title: i18n.t('disputes.dispute.status'),
    width: '4',
    minWidth: '30px',
  },
  {
    name: 'disputeStatusDescription',
    field: 'disputeStatusDescription',
    class: 'text',
    title: i18n.t('disputes.dispute.status.description'),
    width: '4',
    minWidth: '30px',
    routeName: ROUTE_NAMES.DISPUTE_LIST,
  },
  {
    name: 'resubmitClaim',
    fieldType: 'resubmitClaim',
    class: 'text',
    title: i18n.t('resubmission.table.resubmit.claim'),
    width: '4',
    minWidth: '110px',
    routeName: ROUTE_NAMES.RESUBMISSION_TABLE,
  },
  {
    name: 'reject',
    fieldType: 'rejectDisputeStatus',
    class: 'text',
    title: i18n.t('resubmission.table.reject'),
    width: '4',
    minWidth: '110px',
    routeName: ROUTE_NAMES.RESUBMISSION_TABLE,
  },
  {
    name: 'approve',
    fieldType: 'approveDisputeStatus',
    class: 'text',
    title: i18n.t('resubmission.table.approve'),
    width: '4',
    minWidth: '110px',
    routeName: ROUTE_NAMES.RESUBMISSION_TABLE,
  },
];
