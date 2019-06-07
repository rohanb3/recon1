import i18n from '@/i18n';
import { TABLE_DISPUTE_COLUMNS_SORTED } from '@/constants';

export default () => [
  {
    name: 'disputesId',
    field: 'id',
    fieldType: 'disputeId',
    class: 'text',
    title: i18n.t('disputes.id'),
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ID,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'orderNumber',
    field: 'orderNumber',
    fieldType: 'orderNumber',
    class: 'text',
    title: i18n.t('dispute.orders.number'),
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
    title: i18n.t('disputes.order.creation.date'),
    width: '4',
    minWidth: '30px',
  },
  {
    name: 'fiscalPeriod',
    field: 'fiscalPeriod.name',
    class: 'grey-text-cell',
    title: i18n.t('disputes.fiscal.period'),
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.FISCAL_PERIOD,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: i18n.t('disputes.account.number'),
    width: '3',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.ACCOUNT_NUMBER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'creatorName',
    field: 'creatorName',
    class: 'text',
    title: i18n.t('disputes.disput.creator.name'),
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.CREATOR_NAME,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'creationDate',
    field: 'creationDate',
    fieldType: 'dateYearMonthDay',
    class: 'grey-text-cell',
    title: i18n.t('disputes.disput.creation.date'),
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'serviceName',
    field: 'serviceName.bundleName',
    class: 'text',
    title: i18n.t('disputes.service.name'),
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.SERVICE_NAME,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'disputeType',
    field: 'disputeType.name',
    class: 'text',
    title: i18n.t('disputes.dispute.type'),
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.TYPE,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'ageAfterOrder',
    field: 'ageAfterOrder',
    fieldType: 'ageAfterOrder',
    class: 'text',
    title: i18n.t('disputes.age.after.order'),
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.AGE_AFTER_ORDER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'ageAfterInstallation',
    field: 'ageAfterInstallation',
    fieldType: 'ageAfterOrder',
    class: 'text',
    title: i18n.t('disputes.age.after.installation'),
    width: '4',
    minWidth: '16px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.AGE_AFTER_INSTALLATION,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'ageAfterDispute',
    field: 'ageAfterDispute',
    fieldType: 'ageAfterDispute',
    class: 'text',
    title: i18n.t('disputes.age.after.disput'),
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.AGE_AFTER_DISPUT,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'xyzStatus',
    field: 'xyzStatus',
    fieldType: 'xyzStatus',
    class: 'text',
    title: i18n.t('disputes.xyz.status'),
    width: '5',
    minWidth: '170px',
  },
  {
    name: 'disputeStatus',
    fieldType: 'disputeStatus',
    class: 'text',
    title: i18n.t('disputes.dispute.status'),
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.STATUS,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'disputeStatusDescription',
    field: 'disputeStatusDescription',
    class: 'text',
    title: i18n.t('disputes.dispute.status.description'),
    width: '4',
    minWidth: '30px',
    sortingFieldName: TABLE_DISPUTE_COLUMNS_SORTED.STATUS_DESCRIPTION,
    fieldHeaderType: 'sortingHeader',
  },
];
