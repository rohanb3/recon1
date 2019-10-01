import { ENTITY_TYPES, TABLE_NAMES } from '@/constants';
import { getOrders, getClaimsOrders } from '@/services/ordersRepository';
import {
  getDisputes as getDisputeStatistics,
  getClaims as getClaimsStatistics,
} from '@/services/statisticsRepository';
import {
  getDisputes,
  getDisputeHistory,
  getDisputesStatisticsBySubmitters,
} from '@/services/disputesRepository';

const handlers = {
  [TABLE_NAMES.CLAIMS_ORDERS]: {
    getAll: getClaimsOrders,
  },
  [TABLE_NAMES.DISPUTES_ORDERS]: {
    getAll: getOrders,
  },
  [ENTITY_TYPES.DISPUTES]: {
    getAll: getDisputes,
  },
  [ENTITY_TYPES.RESUBMISSION]: {
    getAll: getDisputes,
  },
  [ENTITY_TYPES.DISPUTES_BY_SUBMITTERS]: {
    getAll: getDisputesStatisticsBySubmitters,
  },
  [TABLE_NAMES.CLAIMS_DASHBOARD]: {
    getAll: getClaimsStatistics,
  },
  [TABLE_NAMES.DISPUTES_DASHBOARD]: {
    getAll: getDisputeStatistics,
  },
  [ENTITY_TYPES.DISPUTE_HISTORY]: {
    getAll: getDisputeHistory,
  },
};

const defaultHandler = itemType => () => {
  throw new Error(`Handler for ${itemType} type is not supported yet!`);
};

/* eslint-disable-next-line import/prefer-default-export */
export const getEntityActions = type => ({
  getAll: handlers[type].getAll || defaultHandler(type),
  create: handlers[type].create || defaultHandler(type),
  update: handlers[type].update || defaultHandler(type),
  delete: handlers[type].delete || defaultHandler(type),
});
