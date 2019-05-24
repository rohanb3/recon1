export const DATE_FORMATS = {
  DEFAULT_DATE_FORMAT: 'DD MMM YYYY, hh:mm',
  DAY_FULL_MONTH: 'DD MMMM',
  FULL_YEAR_SHORT_MONTH_SHORT_DAY: 'YYYY-MM-DD',
  MONTH_ONLY: 'MMMM',
  SHORT_DAY_SHORT_MONTH_FULL_YEAR: 'DD MMM YYYY',
  SHORT_DAY_MONTH_FULL_YEAR: 'DD MMMM YYYY',
  MONTH_FULL_YEAR: 'MMMM YYYY',
  MONTH_DAY_FULL_YEAR: 'MM-DD-YYYY',
};

export const DISPUTE_STATUSES_ID = {
  APPROVED: '0d3bf7cc-ba34-4c1e-afe1-1a7076bca43c',
  RE_SENT: '64592b25-cd4e-4cc5-973b-38ca6845066b',
  SENT: 'd0aa7b12-4b6a-40a2-9032-9ee04e4bf32d',
  PRE_LOAD: '549faa27-5aa5-41d7-9404-1e60100f46d2',
  DRAFT: '75274550-87ff-454b-a80e-7d6d8a2f567e',
  REJECTED: 'cd795072-c46c-4a67-8e5b-3f5de946b16c',
  IN_PROGRESS: '82404a5d-966c-4ca9-b714-a039a8176b07',
  CONFIRM_REJECTED: '8f1bd01e-a153-41e7-b05f-fe3bce68ac26',
  CONFIRM_APPROVED: '2a4b15f3-9ed3-4bc7-9788-fedbd3404f14',
};

export const DISPUTE_TYPES_ID = {
  ORDER_INSTALLED: '6630cffe-777b-4bca-90f3-50b4910ff3bb',
  EXPECTED_COMMISION: '79eb1607-2a85-42ed-a409-4f6c15b06fe3',
  MISSING_TRANSACTION: 'e0e82612-96d7-4602-bc24-56436a25240c',
};

export const ORDER_STATUSES_NAME = {
  NOT_INSTALLED: 'Not Installed',
  INSTALLED: 'Installed',
  CANCELED: 'Canceled',
  CLAIM_SUBMITTED: 'ClaimSubmitted',
  ONLINE_ORDER: 'OnlineOrder',
  PENDING: 'Pending',
  CALL_IN_ORDER: 'CallInOrder',
};

export const ORDER_STATUS_NAME_TRANSLATION_KEYS = {
  [ORDER_STATUSES_NAME.NOT_INSTALLED]: 'orders.order.status.not.installed',
  [ORDER_STATUSES_NAME.INSTALLED]: 'orders.order.status.installed',
  [ORDER_STATUSES_NAME.CANCELED]: 'orders.order.status.canceled',
  [ORDER_STATUSES_NAME.CLAIM_SUBMITTED]: 'orders.order.status.claim.submitted',
  [ORDER_STATUSES_NAME.ONLINE_ORDER]: 'orders.order.status.online.order',
  [ORDER_STATUSES_NAME.PENDING]: 'orders.order.status.pending',
  [ORDER_STATUSES_NAME.CALL_IN_ORDER]: 'orders.order.status.call.in.order',
};

export const RESPONSE_STATUSES = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  REQUEST_ENTITY_TOO_LARGE: 413,
};

export const SORTING_DIRECTION = {
  DESC: 'desc',
  ASC: 'asc',
};

export const TABLE_ORDER_СOLUMNS_SORTED = {
  NUMBER: 'ordernumber',
  ACCOUNT_NUMBER: 'accountnumber',
  DISPUTE_STATUS: 'disputeStatus',
  UNITS: 'orderedUnits',
  STATUS: 'statusName',
  AGE_AFTER: 'creationAge',
  INSTALLATION_AGE: 'installationAge',
  EXPECTED_COMISSION: 'expectedComission',
  RECIEVED_COMISSON: 'recevedComission',
  DIFFERENCE: 'difference',
};

export const TABLE_DISPUTE_СOLUMNS_SORTED = {
  ID: 'id',
  FISCAL_PERIOD: 'fiscalPeriod',
  ACCOUNT_NUMBER: 'accountNumber',
  EXPECTED_COMISSION: 'expectedcomission',
  RECEIVED_COMISSION: 'recevedСomission',
  DIFFERENCE: 'difference',
  CREATOR_NAME: 'creatorName',
  CREATION_DATE: 'disputecreationdate',
  SERVICE_NAME: 'serviceName',
  TYPE: 'disputeType',
  AGE_AFTER_ORDER: 'ageAfterOrder',
  AGE_AFTER_INSTALLATION: 'ageAfterInstallation',
  AGE_AFTER_DISPUT: 'ageAfterDispute',
  XYZ_STATUS: 'xyzStatus',
  STATUS: 'disputeStatus',
  STATUS_DESCRIPTION: 'disputeStatusDescription',
};

export const ENTITY_TYPES = {
  ORDERS: 'ORDERS',
  DISPUTES: 'DISPUTES',
  RESUBMISSION: 'RESUBMISSION',
};

export const FILTER_NAMES = {
  SEARCH_ORDERS: 'Search',
  SEARCH_DISPUTES: 'SearchPhrase',
  SORT: 'SortBy',
  ORDER: 'SortOrder',
  ORDER_STATUS: 'OrderStatusIds',
  DISPUTE_TYPE_IDS: 'DisputeTypeIds',
  CREATED_FROM: 'CreatedFrom',
  CREATED_TO: 'CreatedTo',
  FISCAL_PERIOD_FROM: 'FiscalPeriodFrom',
  FISCAL_PERIOD_TO: 'FiscalPeriodTo',
};

export const TABLE_COLUMN_ID_NAMES = {
  [ENTITY_TYPES.ORDERS]: 'orderId',
};

export const ROUTE_NAMES = {
  SELECT_ORDER: 'select-order',
  EDIT_DISPUTE: 'edit-dispute',
  CREAT_DISPUTE: 'creat-dispute',
  DISPUTE_LIST: 'dispute-list',
  RESUBMISSION_TABLE: 'resubmission-table',
  LOGIN: 'login',
  LOGOUT: 'logout',
  PASSWORD_RECOVERY: 'password-recovery',
  VERIFICATION_CODE: 'verification-code',
  RESET_PASSWORD: 'reset-password',
  MAIN_PAGE: 'main-page',
};

export const ROLE_TYPES = {
  SUPER_ADMIN: 'SuperAdmin',
  OPERATION_ADMIN: 'OperationAdmin',
  SYSTEM_ADMIN: 'SystemAdmin',
  ACCOUNT_ADMIN: 'AccountAdmin',
  SUPPORT_ADMIN: 'SupportAdmin',
  SALES_REP: 'SalesRep',
};

export const ORDER_SYNC_STATUS = {
  HAVENT: 'Havent',
  POSTED: 'Posted',
  WORKING: 'Working',
  FINISHED: 'Finished',
  ERROR: 'Error',
};
