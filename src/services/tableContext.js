import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';

function getClaimsFilterNames() {
  return {
    from: FILTER_NAMES.CREATED_FROM,
    to: FILTER_NAMES.CREATED_TO,
    search: FILTER_NAMES.SEARCH,
  };
}

function getDisputesFiltersNames() {
  return {
    from: FILTER_NAMES.INSTALLATION_DATE_FROM,
    to: FILTER_NAMES.INSTALLATION_DATE_TO,
    search: FILTER_NAMES.SEARCH,
  };
}

export default tableName => {
  const [entityTypes] = tableName.split('_');
  switch (entityTypes) {
    // dashboard
    // orders
    case ENTITY_TYPES.DISPUTES:
      return getDisputesFiltersNames();
    case ENTITY_TYPES.CLAIMS:
      return getClaimsFilterNames();
    default:
      return {};
  }
};
