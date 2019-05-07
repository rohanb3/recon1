import disputesApi from '@/services/disputesApi';
import {
  getDispute,
  createDispute,
  updateDispute,
  deleteDispute,
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

  describe('createDispute', () => {
    it('should call api.post and return corect data', async () => {
      const orderId = 7;
      const data = { id: 1, orderId: 3, affiliateId: 3 };

      disputesApi.post = jest.fn(() => Promise.resolve({ data }));

      const response = await createDispute(orderId);

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
});
