import { ORDERS } from '@/constants/entityTypes';
import { ORDER_BY_ASC } from '@/constants/sortingDirection';
import * as filterList from '@/constants/filtersNames';
import * as sortableColumns from '@/constants/tableСolumnsSorted';

const filters = {
  [ORDERS]: {
    [filterList.SEARCH_PHRASE]: '',
    [filterList.SORT]: sortableColumns.ORDER_NUMBER,
    [filterList.ORDER]: ORDER_BY_ASC,
  },
};

export default itemType => ({ ...filters[itemType] } || {});
