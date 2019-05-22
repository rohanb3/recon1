import apiDisputes from './disputesApi';
import { paramsSerializer } from '@/services/repositoryUtils';

export const getOrders = filters => {
  const params = { ...filters };
  return apiDisputes.get('/order', { params, paramsSerializer }).then(({ data }) => data);
};

export const getServiceList = () => {
  return apiDisputes.get('/order/service').then(({ data }) => data);
};

export const getOrderStatusList = () => {
  return apiDisputes.get('/order/status').then(({ data }) => data);
};

export const orderSync = dateRange => {
  return apiDisputes.post('/ordersync', dateRange).then(({ data }) => data);
};

export const checkOrderSync = taskId => {
  return apiDisputes.get(`/ordersync/${taskId}`).then(({ data }) => data);
};

export const getOrdersCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes.get('/order/csv', { params, paramsSerializer }).then(({ data }) => data);
};
