import i18n from '@/i18n';
import dashForEmptyValue from '@/filters/dashForEmptyValue';
import { dateDefaultFormat } from '@/filters/dateFormat';

export default () => [
  {
    name: 'datetime',
    field: 'timeStamp',
    class: 'date-cell',
    title: i18n.t('dispute.history.datetime'),
    width: '4',
    minWidth: '16px',
    filter: dateDefaultFormat,
  },
  {
    name: 'userName',
    field: 'userName',
    class: 'text',
    title: i18n.t('dispute.history.author'),
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'setStatus',
    field: 'status.disputeStatusName',
    class: 'text',
    title: i18n.t('dispute.history.status'),
    width: '3',
    minWidth: '16px',
  },
  {
    name: 'statusDescription',
    field: 'submitterComment',
    fieldType: 'disputeStatusDescription',
    class: 'text-italic',
    title: i18n.t('dispute.history.status.description'),
    width: '3',
    minWidth: '16px',
    filter: dashForEmptyValue,
  },
];
