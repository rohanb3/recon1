import CommissionLoader from './CommissionLoader';
import { ItemsLoaderWithCommission } from './ItemsLoader';

import { TABLE_NAMES } from '@/constants';

const getLoader = data => {
  const { itemType } = data;
  if (itemType === TABLE_NAMES.RECEIVED_COMMISSION) {
    return new CommissionLoader();
  }
  return new ItemsLoaderWithCommission();
};

export default getLoader;
