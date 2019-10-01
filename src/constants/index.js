export const DATE_FORMATS = {
  DEFAULT_DATE_FORMAT: 'DD MMM YYYY, hh:mm a',
  DAY_FULL_MONTH: 'DD MMMM',
  DAY_SHORT_MONTH: 'DD MMM',
  FULL_YEAR_SHORT_MONTH_SHORT_DAY: 'YYYY-MM-DD',
  MONTH_ONLY: 'MMMM',
  SHORT_DAY_SHORT_MONTH_FULL_YEAR: 'DD MMM YYYY',
  SHORT_DAY_MONTH_FULL_YEAR: 'DD MMMM YYYY',
  MONTH_FULL_YEAR: 'MMMM YYYY',
  MONTH_DAY_FULL_YEAR: 'MM-DD-YYYY',
  FULL_MONTH_DAY: 'MMMM DD',
};

export const DISPUTE_STATUSES_ID = {
  APPROVED: '0d3bf7cc-ba34-4c1e-afe1-1a7076bca43c',
  RE_SENT: '64592b25-cd4e-4cc5-973b-38ca6845066b',
  SENT: 'd0aa7b12-4b6a-40a2-9032-9ee04e4bf32d',
  DRAFT: '75274550-87ff-454b-a80e-7d6d8a2f567e',
  REJECTED: 'cd795072-c46c-4a67-8e5b-3f5de946b16c',
  IN_PROGRESS: '82404a5d-966c-4ca9-b714-a039a8176b07',
  CONFIRM_REJECTED: '8f1bd01e-a153-41e7-b05f-fe3bce68ac26',
  CONFIRM_APPROVED: '2a4b15f3-9ed3-4bc7-9788-fedbd3404f14',
};

export const DISPUTE_SECTION_NAME = {
  WAITED_SPECTRUM_ANSWER: 'Waited Spectrum answer',
  WAITED_XYZ_ANSWER: 'Waited Xyz answer',
  APPROVED_FOR_PAY: 'Approved for pay',
  DENIED_FOR_PAY: 'Denied for pay',
  ANSWERED: 'Answered',
  CONFIRM_REJECTED: 'Confirm rejected disputes',
  CONFIRM_APPROVED: 'Confirm approved disputes',
  WAITING_FOR_ANSWER: 'Waiting for answer',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  RE_SENT_DISPUTES: 'Re-sent disputes',
};

export const DISPUTE_TYPES_ID = {
  ORDER_INSTALLED: '6630cffe-777b-4bca-90f3-50b4910ff3bb',
  EXPECTED_COMMISION: '79eb1607-2a85-42ed-a409-4f6c15b06fe3',
  MISSING_TRANSACTION: 'e0e82612-96d7-4602-bc24-56436a25240c',
};

export const ORDERS_DISPUTE_TYPES = {
  ORDER_INSTALLED_WITHOUT_COMMISSION_RECEIVED: 'OrderInstalledWithoutCommissionReceived',
  COMMISSION_RECEIVED_LESS_EXPECTED: 'CommissionReceivedLessExpected',
  COMMISSION_RECEIVED_MORE_EXPECTED: 'CommissionReceivedMoreExpected',
};

export const ORDER_STATUSES_NAME = {
  NOT_INSTALLED: 'Not Installed',
  INSTALLED: 'Installed',
  CANCELED: 'Canceled',
  CLAIM_SUBMITTED: 'ClaimSubmitted',
  ONLINE_ORDER: 'OnlineOrder',
  PENDING: 'Pending',
  CALL_IN_ORDER: 'CallInOrder',
  PAID: 'Paid',
};

export const ORDER_STATUS_NAME_TRANSLATION_KEYS = {
  [ORDER_STATUSES_NAME.NOT_INSTALLED]: 'orders.order.status.not.installed',
  [ORDER_STATUSES_NAME.INSTALLED]: 'orders.order.status.installed',
  [ORDER_STATUSES_NAME.CANCELED]: 'orders.order.status.canceled',
  [ORDER_STATUSES_NAME.CLAIM_SUBMITTED]: 'orders.order.status.claim.submitted',
  [ORDER_STATUSES_NAME.ONLINE_ORDER]: 'orders.order.status.online.order',
  [ORDER_STATUSES_NAME.PENDING]: 'orders.order.status.pending',
  [ORDER_STATUSES_NAME.CALL_IN_ORDER]: 'orders.order.status.call.in.order',
  [ORDER_STATUSES_NAME.PAID]: 'orders.order.status.paid',
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

export const TABLE_ORDER_COLUMNS_SORTED = {
  NUMBER: 'ordernumber',
  ACCOUNT_NUMBER: 'accountnumber',
  DISPUTE_STATUS: 'disputeStatusName',
  UNITS: 'orderedUnits',
  STATUS: 'orderStatusName',
  AGE_AFTER: 'creationAge',
  INSTALLATION_AGE: 'installationAge',
  EXPECTED_COMISSION: 'expectedCommission',
  RECIEVED_COMISSON: 'receivedCommission',
  DIFFERENCE: 'difference',
  BUNDLE_NAME: 'bundleName',
  INSTALLED_UNITS: 'installedUnits',
  CREATED_ON: 'createdOn',
  INSTALLATION_DATE: 'installationDate',
};

export const TABLE_DISPUTE_COLUMNS_SORTED = {
  ID: 'id',
  FISCAL_PERIOD: 'fiscalPeriod',
  ACCOUNT_NUMBER: 'accountNumber',
  EXPECTED_COMISSION: 'expectedcommission',
  RECEIVED_COMISSION: 'receivedCommission',
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
  ORDER_NUMBER: 'ordernumber',
  ORDER_CREATION_DATE: 'orderCreationDate',
};

export const TABLE_DISPUTES_BY_SUBMITTERS_COLUMNS_SORTED = {
  CREATOR: 'creatorName',
  ENTERED: 'entered',
  UNITS: 'units',
  CLOSED: 'closed',
  CLOSED_PERCENT: 'closedPercent',
  APPROVED: 'approved',
  APPROVED_PERCENT: 'approvedPercent',
  REJECTED: 'rejected',
  REJECTED_PERCENT: 'rejectedPercent',
  APPROVED_COMMISSION: 'approvedComission',
  RESUBMITTED: 'resubmited',
  RESUBMITTED_PERCENT: 'resubmitedPercent',
  PENDING: 'pending',
  PENDING_PERCENT: 'pendingPercent',
};

export const ENTITY_TYPES = {
  ORDERS: 'ORDERS',
  DISPUTES: 'DISPUTES',
  RESUBMISSION: 'RESUBMISSION',
  DISPUTES_BY_SUBMITTERS: 'DISPUTES_BY_SUBMITTERS',
  DISPUTE_HISTORY: 'DISPUTE_HISTORY',
  CLAIMS: 'CLAIMS',
};

export const TABLE_NAMES = {
  CLAIMS_ORDERS: 'CLAIMS_ORDERS',
  CLAIMS_DASHBOARD: 'CLAIMS_DASHBOARD',
  DISPUTES_ORDERS: 'DISPUTES_ORDERS',
  DISPUTES_DASHBOARD: 'DISPUTES_DASHBOARD',
};

export const DISPUTES_BY_SUBMITTERS_STATISTICS_TYPES = {
  BY_APPROVE: 'Confirm Approved',
  BY_REJECTION: 'Confirm Rejected',
};

export const FILTER_NAMES = {
  SEARCH_ORDERS: 'Search',
  SEARCH_DISPUTES: 'SearchPhrase',
  SORT: 'SortBy',
  ORDER: 'SortOrder',
  ORDER_STATUS: 'OrderStatusIds',
  ORDER_AGE_FROM: 'OrderAgeFrom',
  ORDER_AGE_TO: 'OrderAgeTo',
  INSTALLATION_AGE_FROM: 'InstallationAgeFrom',
  INSTALLATION_AGE_TO: 'InstallationAgeTo',
  DISPUTE_TYPE_IDS: 'DisputeTypeIds',
  CREATED_FROM: 'CreatedFrom',
  CREATED_TO: 'CreatedTo',
  FISCAL_PERIOD_ID: 'FiscalPeriodId',
  FISCAL_PERIOD_TO: 'FiscalPeriodTo',
  FISCAL_PERIOD: 'FiscalPeriod',
  DISPUTE_AGE_FROM: 'DisputeAgeFrom',
  DISPUTE_AGE_TO: 'DisputeAgeTo',
  DISPUTE_STATUS_IDS: 'DisputeStatusIds',
  XYZ_STATUS_IDS: 'XYZStatusIds',
  SPECTRUM_STATUS_IDS: 'SpectrumStatusIds',
  DISPUTE_ID: 'disputeId',
  INSTALLATION_DATE_FROM: 'InstallationDateFrom',
  INSTALLATION_DATE_TO: 'InstallationDateTo',
  TYPE: 'Type',
};

export const TABLE_COLUMN_ID_NAMES = {
  [TABLE_NAMES.CLAIMS_ORDERS]: 'orderId',
  [TABLE_NAMES.DISPUTES_ORDERS]: 'orderId',
};

export const ROUTE_NAMES = {
  SELECT_ORDER: 'select-order',
  EDIT_DISPUTE: 'edit-dispute',
  CREAT_DISPUTE: 'creat-dispute',
  DISPUTE_LIST: 'dispute-list',
  CLAIMS_BY_SUBMITTERS: 'claims-by-submitters',
  DISPUTES_BY_SUBMITTERS: 'disputes-by-submitters',
  RESUBMISSION_TABLE: 'resubmission-table',
  LOGIN: 'login',
  LOGOUT: 'logout',
  PASSWORD_RECOVERY: 'password-recovery',
  VERIFICATION_CODE: 'verification-code',
  RESET_PASSWORD: 'reset-password',
  MAIN_PAGE: 'main-page',
  DISPUTES_DASHBOARD: 'disputes-dashboard',
  CLAIMS_DASHBOARD: 'claims-dashboard',
  CLAIMS_ORDERS: 'claims-orders',
  DISPUTES_ORDERS: 'disputes-orders',
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

export const SCOPES = {
  DISPUTE_READ: 'xyzies.reconciliation.dispute.read',
  DISPUTE_UPDATE: 'xyzies.reconciliation.dispute.update',
  DISPUTE_CREATE: 'xyzies.reconciliation.dispute.create',
  DISPUTE_PATCH: 'xyzies.reconciliation.dispute.patch',
  DISPUTE_PATCH_SAM: 'xyzies.reconciliation.dispute.patch.sam',
  DISPUTE_STATISTIC: 'xyzies.reconciliation.web.disputestatistic',
  DISPUTE_DASHBOARD: 'xyzies.reconciliation.web.disputedashboard',
  RESUBMISSION_TABLE_READ: 'xyzies.reconciliation.web.resubmissiontable.read',
  ORDER_READ_WITHOUT_EXPECTED_COMISSION: 'xyzies.reconciliation.web.order.read',
  AUTHORIZATION: 'xyzies.authorization.reconciliation.web',
  TEAM_STATISTIC: 'xyzies.reconciliation.web.teamstatistic',
  ORDER_READ_WITH_EXPECTED_COMISSION: 'xyzies.reconciliation.web.order.read.systemadmin',
};
