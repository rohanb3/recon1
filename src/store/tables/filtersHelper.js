import { FILTER_NAMES, ENTITY_TYPES, SORTING_DIRECTION, TABLE_СOLUMNS_SORTED } from '@/constants';

const filters = {
  [ENTITY_TYPES.ORDERS]: {
    [FILTER_NAMES.SEARCH_ORDERS]: '',
    [FILTER_NAMES.SORT]: TABLE_СOLUMNS_SORTED.ORDER_NUMBER,
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.ASC,
  },
  [ENTITY_TYPES.DISPUTES]: {},
};

export default itemType => ({ ...filters[itemType] } || {});
