import disputesApi from '@/services/disputesApi';
import {
  getDispute,
  creatDispute,
  updateDispute,
  deleteDispute,
  getDisputeAttachment,
  uploadDisputeAttachment,
  removeDisputeAttachment,
} from '@/services/disputesRepository';

import { STATUS_OK } from '@/constants/responseStatuses';

describe('disputesRepository', () => {
  describe('getDispute', () => {
    it('should call api.get and return corect data', async () => {
      const id = 7;
      const data = { id: 1, orderId: 3, affiliateId: 3 };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDispute(id);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith(`/dispute/${id}`);
    });
  });

  describe('creatDispute', () => {
    it('should call api.post and return corect data', async () => {
      const orderId = 7;
      const data = { id: 1, orderId: 3, affiliateId: 3 };

      disputesApi.post = jest.fn(() => Promise.resolve({ data }));

      const response = await creatDispute(orderId);

      expect(response).toEqual(data);
      expect(disputesApi.post).toHaveBeenCalledWith(`/dispute?orderId=${orderId}`);
    });
  });

  describe('updateDispute', () => {
    it('should call api.put and return corect data', async () => {
      const disputerId = 7;
      const updateData = {
        id: 1,
      };
      const data = { id: 1, orderId: 3, affiliateId: 3 };
      const status = STATUS_OK;

      disputesApi.put = jest.fn(() => Promise.resolve({ status, data }));

      const response = await updateDispute(disputerId, updateData);

      expect(response).toEqual({ data, status });
      expect(disputesApi.put).toHaveBeenCalledWith(`/dispute/${disputerId}`, updateData);
    });
  });

  describe('deleteDispute', () => {
    it('should call api.delete and return corect data', async () => {
      const disputerId = 7;
      const status = STATUS_OK;

      disputesApi.delete = jest.fn(() => Promise.resolve({ status }));

      const response = await deleteDispute(disputerId);

      expect(response).toEqual(status);
      expect(disputesApi.delete).toHaveBeenCalledWith(`/dispute/${disputerId}`);
    });
  });

  describe('getDisputeAttachment', () => {
    it('should call api.get and return corect data', async () => {
      const disputerId = 7;
      const data = { id: 1 };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputeAttachment(disputerId);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith(`/disputeattachment/${disputerId}`);
    });
  });

  describe('uploadDisputeAttachment', () => {
    it('should call api.post and return corect data', async () => {
      const disputerId = 7;
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const updateData = {
        id: 1,
      };

      disputesApi.post = jest.fn(() => Promise.resolve());

      await uploadDisputeAttachment(disputerId, updateData);

      expect(disputesApi.post).toHaveBeenCalledWith(
        `/disputeattachment/${disputerId}`,
        updateData,
        { headers }
      );
    });
  });

  describe('removeDisputeAttachment', () => {
    it('should call api.delete and return corect data', async () => {
      const disputerId = 7;
      const filename = 'example.txt';
      const status = STATUS_OK;

      disputesApi.delete = jest.fn(() => Promise.resolve({ status }));

      const response = await removeDisputeAttachment(disputerId, filename);

      expect(response).toEqual(status);
      expect(disputesApi.delete).toHaveBeenCalledWith(
        `/disputeattachment/${disputerId}?filename=${filename}`
      );
    });
  });
});
