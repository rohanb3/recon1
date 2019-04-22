import i18n from '@/i18n';
import * as sortableColumns from '@/constants/tableСolumnsSorted';

/* eslint-disable-next-line import/prefer-default-export */
export const getOrdersTableColumns = () => [
  {
    name: 'ordersNumber',
    field: 'orderNumber',
    class: 'text',
    title: i18n.t('order.number'),
    width: '3',
    sortingFieldName: sortableColumns.ORDER_NUMBER,
    fieldHeaderType: 'sortingHeader',
  },
  {
    name: 'accountNumber',
    field: 'accountNumber',
    class: 'text',
    title: i18n.t('account.number'),
    width: '15',
    minWidth: '0px',
    sortingFieldName: sortableColumns.ACCOUNT_NUMBER,
    fieldHeaderType: 'sortingHeader',
  },
];
