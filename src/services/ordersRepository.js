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

export const getOrderStatusList = () => {
  return apiDisputes.get('/order/disputing/status').then(({ data }) => data);
};

export const orderSync = dateRange => {
  return apiDisputes.post('/ordersync', dateRange).then(({ data }) => data);
};

export const checkOrderSync = taskId => {
  return apiDisputes.get(`/ordersync/${taskId}`).then(({ data }) => data);
};

export const getOrdersCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/order/orders/disputing/csv', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getFiscalPeriods = () => {
  return apiDisputes.get('/order/fiscalperiod').then(({ data }) => data);
};
