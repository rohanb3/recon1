import apiDisputes from './disputesApi';

export const getOrders = filters => {
  const params = { ...filters };
  return apiDisputes.get('/order', { params }).then(({ data }) => data);
};

export const getServiceList = () => {
  return apiDisputes.get('/order/service').then(({ data }) => data);
};

export const getOrderStatusList = () => {
  return apiDisputes.get('/order/status').then(({ data }) => data);
};
