import apiDisputes from './disputesApi';

export const getDispute = id => {
  return apiDisputes.get(`/dispute/${id}`).then(({ data }) => data);
};

export const createDispute = orderId => {
  return apiDisputes.post(`/dispute?orderId=${orderId}`).then(({ data }) => data);
};

export const updateDispute = (id, updates = {}) => {
  return apiDisputes.put(`/dispute/${id}`, updates).then(({ data, status }) => ({
    data,
    status,
  }));
};

export const deleteDispute = id => {
  return apiDisputes.delete(`/dispute/${id}`).then(({ status }) => status);
};
