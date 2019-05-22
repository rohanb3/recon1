import i18n from '@/i18n';

export default () => [
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
    field: 'recevedComission',
    fieldType: 'recievedComisson',
    class: 'text',
    title: i18n.t('orders.recieved.comisson'),
    width: '5',
    minWidth: '85px',
  },
  {
    name: 'orderDifference',
    fieldType: 'orderDifference',
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
  },
];
