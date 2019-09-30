import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';

function getClaimsFilterNames() {
  return {
    from: FILTER_NAMES.CREATED_FROM,
    to: FILTER_NAMES.CREATED_TO,
    search: FILTER_NAMES.SEARCH_ORDERS,
  };
}

function getDisputesFiltersNames() {
  return {
    from: FILTER_NAMES.INSTALLATION_DATE_FROM,
    to: FILTER_NAMES.INSTALLATION_DATE_TO,
    search: FILTER_NAMES.SEARCH_ORDERS,
  };
}

export default tableName => {
  console.log(tableName);
  switch (tableName) {
    case ENTITY_TYPES.DISPUTES_ORDERS:
      return getDisputesFiltersNames();
    case ENTITY_TYPES.CLAIMS_ORDERS:
      return getClaimsFilterNames();
    default:
      return {};
  }
};
