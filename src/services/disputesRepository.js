import apiDisputes from './disputesApi';

export const getDispute = id => {
  return apiDisputes.get(`/dispute/${id}`).then(({ data }) => data);
};

export const getDisputes = filters => {
  const params = { ...filters };
  return apiDisputes.get('/dispute', { params }).then(({ data }) => data);
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

export const getDisputeAttachment = id => {
  return apiDisputes.get(`/disputeattachment/${id}`).then(({ data }) => data);
};

export const uploadDisputeAttachment = (id, updates = {}) => {
  return apiDisputes.post(`/disputeattachment/${id}`, updates, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const removeDisputeAttachment = (id, filename) => {
  return apiDisputes
    .delete(`/disputeattachment/${id}?filename=${filename}`)
    .then(({ status }) => status);
};

export const changeStatusDispute = (disputeId, statusId) => {
  return apiDisputes.patch(`/dispute/${disputeId}?status=${statusId}`).then(({ data }) => data);
};
