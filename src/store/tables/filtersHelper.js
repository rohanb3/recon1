import {
  FILTER_NAMES,
  ENTITY_TYPES,
  SORTING_DIRECTION,
  TABLE_ORDER_COLUMNS_SORTED,
  TABLE_DISPUTE_COLUMNS_SORTED,
} from '@/constants';

const filters = {
  [ENTITY_TYPES.ORDERS]: {
    [FILTER_NAMES.SEARCH_ORDERS]: '',
    [FILTER_NAMES.SORT]: TABLE_ORDER_COLUMNS_SORTED.ORDER_NUMBER,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.ASC,
    [FILTER_NAMES.ORDER_STATUS]: null,
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.FISCAL_PERIOD_FROM]: '',
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
  },
  [ENTITY_TYPES.DISPUTES]: {
    [FILTER_NAMES.SEARCH_DISPUTES]: '',
    [FILTER_NAMES.SORT]: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.DESC,
    [FILTER_NAMES.DISPUTE_TYPE_IDS]: null,
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_FROM]: '',
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.DISPUTE_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
  },
  [ENTITY_TYPES.RESUBMISSION]: {
    [FILTER_NAMES.SEARCH_DISPUTES]: '',
    [FILTER_NAMES.SORT]: TABLE_DISPUTE_COLUMNS_SORTED.CREATION_DATE,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.DESC,
    [FILTER_NAMES.DISPUTE_TYPE_IDS]: null,
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_FROM]: '',
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
    [FILTER_NAMES.INSTALLATION_AGE_FROM]: null,
    [FILTER_NAMES.INSTALLATION_AGE_TO]: null,
    [FILTER_NAMES.DISPUTE_AGE_FROM]: null,
    [FILTER_NAMES.DISPUTE_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_TO]: null,
    [FILTER_NAMES.ORDER_AGE_FROM]: null,
  },
  [ENTITY_TYPES.DISPUTE_HISTORY]: {
    [FILTER_NAMES.DISPUTE_ID]: null,
  },
  [ENTITY_TYPES.DISPUTES_DASHBOARD]: {
    [FILTER_NAMES.FISCAL_PERIOD_ID]: null,
    [FILTER_NAMES.CREATED_FROM]: '',
    [FILTER_NAMES.CREATED_TO]: '',
    [FILTER_NAMES.FISCAL_PERIOD_FROM]: '',
    [FILTER_NAMES.FISCAL_PERIOD_TO]: '',
  },
  [ENTITY_TYPES.DISPUTE_HISTORY]: {
    [FILTER_NAMES.DISPUTE_ID]: null,
  },
};

export default itemType => ({ ...filters[itemType] } || {});
