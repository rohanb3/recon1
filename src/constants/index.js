export const DATE_FORMATS = {
  DEFAULT_DATE_FORMAT: 'DD MMM YYYY, hh:mm',
  DAY_FULL_MONTH: 'DD MMMM',
  FULL_YEAR_SHORT_MONTH_SHORT_DAY: 'YYYY-MM-DD',
  MONTH_ONLY: 'MMMM',
  SHORT_DAY_SHORT_MONTH_FULL_YEAR: 'DD MMM YYYY',
  SHORT_DAY_MONTH_FULL_YEAR: 'DD MMMM YYYY',
  MONTH_FULL_YEAR: 'MMMM YYYY',
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

export const TABLE_СOLUMNS_SORTED = {
  ORDER_NUMBER: 'ordernumber',
  ACCOUNT_NUMBER: 'accountnumber',
  DISPUTE_STATUS: 'disputeStatus',
};

export const ENTITY_TYPES = {
  ORDERS: 'ORDERS',
  DISPUTES: 'DISPUTES',
};

export const FILTER_NAMES = {
  SEARCH_ORDERS: 'Search',
  SEARCH_DISPUTES: 'SearchPhrase',
  SORT: 'sort',
  ORDER: 'SortOrder',
};

export const TABLE_СOLUMN_ID_NAMES = {
  [ENTITY_TYPES.ORDERS]: 'orderId',
};

export const ROUTE_NAMES = {
  SELECT_ORDER: 'select-order',
  EDIT_DISPUTE: 'edit-dispute',
  CREAT_DISPUTE: 'creat-dispute',
  DISPUTE_LIST: 'dispute-list',
  RESUBMISSION_TABLE: 'resubmission-table',
  LOGIN: 'login',
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
