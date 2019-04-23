import disputsApi from '@/services/disputsApi';
import { getOrders } from '@/services/ordersRepository';

describe('ordersRepository', () => {
  describe('getOrders', () => {
    it('should call api.get and return corect data', async () => {
      const filters = {
        skip: 0,
        take: 10,
        orderIdFilter: 'Installed',
        creationAgeFilter: 10,
      };

      const data = { id: '777' };

      disputsApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getOrders(filters);

      expect(response).toEqual(data);
      expect(disputsApi.get).toHaveBeenCalledWith('/order', {
        params: { ...filters },
      });
    });
  });
});
