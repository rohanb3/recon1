import apiDisputes from './disputesApi';
import { paramsSerializer } from '@/services/serializers';

export const getOrders = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/order/orders/disputing', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getServiceList = () => {
  return apiDisputes.get('/order/service').then(({ data }) => data);
};

export const getDisputesOrderStatusList = () => {
  return apiDisputes.get('/order/disputing/status').then(({ data }) => data);
};

export const getClaimsOrderStatusList = () => {
  return apiDisputes.get('/order/claiming/status').then(({ data }) => data);
};

export const orderSync = dateRange => {
  return apiDisputes.post('/ordersync', dateRange).then(({ data }) => data);
};

export const checkOrderSync = taskId => {
  return apiDisputes.get(`/ordersync/${taskId}`).then(({ data }) => data);
};

export const getDisputesOrdersCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/order/orders/disputing/csv', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getClaimsOrdersCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/order/orders/claiming/csv', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getFiscalPeriods = () => {
  return apiDisputes.get('/order/fiscalperiod').then(({ data }) => data);
};

export const getClaimsOrders = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/order/orders/claiming', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getReceivedCommission = id => {
  return apiDisputes.get(`/order/${id}/reseivedcommissions`).then(({ data }) => data);
};
