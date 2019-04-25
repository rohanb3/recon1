import disputesApi from '@/services/disputesApi';
import { getDisput } from '@/services/disputesRepository';

describe('disputesRepository', () => {
  describe('getDisput', () => {
    it('should call api.get and return corect data', async () => {
      const id = 7;
      const data = { id: 1, orderId: 3, affiliateId: 3 };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisput(id);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith(`/dispute/${id}`);
    });
  });
});
