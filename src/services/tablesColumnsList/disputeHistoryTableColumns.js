import dashForEmptyValue from '@/filters/dashForEmptyValue';
import { dateDefaultFormat } from '@/filters/dateFormat';

export default () => [
  {
    name: 'datetime',
    field: 'timeStamp',
    class: 'date-cell',
    title: 'dispute.history.datetime',
    width: '4',
    minWidth: '16px',
    filter: dateDefaultFormat,
  },
  {
    name: 'userName',
    field: 'userName',
    class: 'text',
    title: 'dispute.history.author',
    width: '4',
    minWidth: '16px',
  },
  {
    name: 'setStatus',
    field: 'status.disputeStatusName',
    class: 'text',
    title: 'dispute.history.status',
    width: '3',
    minWidth: '16px',
  },
  {
    name: 'statusDescription',
    field: 'submitterComment',
    fieldType: 'disputeStatusDescription',
    class: 'text-italic',
    title: 'dispute.history.status.description',
    width: '3',
    minWidth: '16px',
    filter: dashForEmptyValue,
  },
];
