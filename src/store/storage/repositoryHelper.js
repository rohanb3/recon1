import { ENTITY_TYPES } from '@/constants';
import { getOrders } from '@/services/ordersRepository';

const handlers = {
  [ENTITY_TYPES.ORDERS]: {
    getAll: getOrders,
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
