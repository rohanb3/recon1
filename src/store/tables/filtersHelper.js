import {
  FILTER_NAMES,
  ENTITY_TYPES,
  SORTING_DIRECTION,
  TABLE_DISPUTE_COLUMNS_SORTED,
  TABLE_DISPUTES_BY_SUBMITTERS_COLUMNS_SORTED,
  TABLE_NAMES,
} from '@/constants';

const filters = {
  [ENTITY_TYPES.DISPUTES]: {
    [FILTER_NAMES.SEARCH_DISPUTES]: '',
    [FILTER_NAMES.SORT]: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.DESC,
    [FILTER_NAMES.DISPUTE_TYPE_IDS]: null,
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.DISPUTE_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.XYZ_STATUS_IDS]: [],
    [FILTER_NAMES.SPECTRUM_STATUS_IDS]: [],
    [FILTER_NAMES.DISPUTE_STATUS_IDS]: [],
  },
  [ENTITY_TYPES.RESUBMISSION]: {
    [FILTER_NAMES.SEARCH_DISPUTES]: '',
    [FILTER_NAMES.SORT]: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.DESC,
    [FILTER_NAMES.DISPUTE_TYPE_IDS]: null,
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.DISPUTE_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.SPECTRUM_STATUS_IDS]: [],
    [FILTER_NAMES.DISPUTE_STATUS_IDS]: [],
  },
  [ENTITY_TYPES.DISPUTES_BY_SUBMITTERS]: {
    [FILTER_NAMES.SORT]: TABLE_DISPUTES_BY_SUBMITTERS_COLUMNS_SORTED.CREATOR,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.ASC,
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
  },
  [ENTITY_TYPES.DISPUTE_HISTORY]: {
    [FILTER_NAMES.DISPUTE_ID]: null,
  },
  [TABLE_NAMES.CLAIMS_DASHBOARD]: {
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_TO]: null,
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
  },
  [TABLE_NAMES.DISPUTES_DASHBOARD]: {
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_TO]: null,
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.INSTALLATION_DATE_FROM]: '',
    [FILTER_NAMES.INSTALLATION_DATE_TO]: '',
  },
  [TABLE_NAMES.CLAIMS_ORDERS]: {
    [FILTER_NAMES.SEARCH_ORDERS]: '',
    [FILTER_NAMES.SORT]: null,
    [FILTER_NAMES.ORDER]: null,
    [FILTER_NAMES.ORDER_STATUS]: null,
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
  },
  [TABLE_NAMES.DISPUTES_ORDERS]: {
    [FILTER_NAMES.SEARCH_ORDERS]: '',
    [FILTER_NAMES.SORT]: null,
    [FILTER_NAMES.ORDER]: null,
    [FILTER_NAMES.ORDER_STATUS]: null,
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.INSTALLATION_DATE_FROM]: '',
    [FILTER_NAMES.INSTALLATION_DATE_TO]: '',
    [FILTER_NAMES.TYPE]: null,
  },
  [TABLE_NAMES.CLAIMS_DISPUTES]: {
    [FILTER_NAMES.SEARCH_DISPUTES]: '',
    [FILTER_NAMES.SORT]: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.DESC,
    [FILTER_NAMES.DISPUTE_TYPE_IDS]: null,
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.CLAIMS_AGE_FROM]: null,
    [FILTER_NAMES.CLAIMS_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.XYZ_STATUS_IDS]: [],
    [FILTER_NAMES.SPECTRUM_STATUS_IDS]: [],
    [FILTER_NAMES.CLAIMS_STATUS_IDS]: [],
    [FILTER_NAMES.INSTALLATION_DATE_FROM]: '',
    [FILTER_NAMES.INSTALLATION_DATE_TO]: '',
  },
  [TABLE_NAMES.DISPUTES_LIST]: {
    [FILTER_NAMES.SEARCH_DISPUTES]: '',
    [FILTER_NAMES.SORT]: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.DESC,
    [FILTER_NAMES.DISPUTE_TYPE_IDS]: null,
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.CLAIMS_AGE_FROM]: null,
    [FILTER_NAMES.CLAIMS_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.XYZ_STATUS_IDS]: [],
    [FILTER_NAMES.SPECTRUM_STATUS_IDS]: [],
    [FILTER_NAMES.CLAIMS_STATUS_IDS]: [],
    [FILTER_NAMES.INSTALLATION_DATE_FROM]: '',
    [FILTER_NAMES.INSTALLATION_DATE_TO]: '',
  },
};

export default itemType => ({ ...filters[itemType] } || {});
