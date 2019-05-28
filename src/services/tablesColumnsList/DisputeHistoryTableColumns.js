import i18n from '@/i18n';

export default () => [
  {
    name: 'datetime',
    field: 'timeStamp',
    fieldType: 'dayMonthYearTime',
    class: 'text',
    title: i18n.t('dispute.history.datetime'),
    width: '4',
    minWidth: '16px',
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
    field: 'status.name',
    class: 'text',
    title: i18n.t('dispute.history.status'),
    width: '3',
    minWidth: '16px',
  },
  {
    name: 'statusDescription',
    field: 'submitterComment',
    class: 'text-style-italic-cell',
    title: i18n.t('dispute.history.status.description'),
    width: '3',
    minWidth: '16px',
  },
];
