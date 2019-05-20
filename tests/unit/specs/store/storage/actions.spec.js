/* eslint-disable import/first */

jest.mock('@/store/storage/repositoryHelper');

import actions from '@/store/storage/actions';
import {
  LOAD_ITEMS,
  LOAD_MORE_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SYNC_ORDERS,
} from '@/store/storage/actionTypes';

import {
  INSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  CHANGE_ITEM,
  REMOVE_ITEM,
  SET_SYNC_ORDERS_STATUS,
} from '@/store/storage/mutationTypes';

import * as repositoryHelper from '@/store/storage/repositoryHelper';
import * as ordersRepository from '@/services/ordersRepository';

import { ORDER_SYNC_STATUS } from '@/constants';

const itemType = 'SOME_TYPE';

describe('storage actions: ', () => {
  describe('LOAD_ITEMS: ', () => {
    it('should load items', async () => {
      let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };
      const expectedFilters = {
        skip: 0,
        take: 50,
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_ITEMS](fakeStore, { itemType });

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_ITEMS, {
        itemType,
        items: result,
      });
      expect(fakeStore.commit).toHaveBeenCalledWith(RESET_ITEMS, itemType);
      expect(fakeStore.commit).not.toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
      expect(getAll).toHaveBeenCalledWith(expectedFilters);
    });

    it('should set allItemsLoaded to true if got less items than could', async () => {
      let result = [1, 2];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_ITEMS](fakeStore, { itemType });
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
    });
  });

  describe('LOAD_MORE_ITEMS: ', () => {
    it('should load more items', async () => {
      let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };
      const expectedFilters = {
        skip: 2,
        take: 50,
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_MORE_ITEMS](fakeStore, { itemType });

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_ITEMS, {
        itemType,
        items: result,
      });
      expect(fakeStore.commit).not.toHaveBeenCalledWith(RESET_ITEMS, itemType);
      expect(fakeStore.commit).not.toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
      expect(getAll).toHaveBeenCalledWith(expectedFilters);
    });

    it('should set allItemsLoaded to true if got less items than could', async () => {
      let result = [1, 2];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_MORE_ITEMS](fakeStore, { itemType });
      expect(fakeStore.commit).not.toHaveBeenCalledWith(RESET_ITEMS, itemType);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
    });
  });

  describe('CREATE_ITEM: ', () => {
    it('should create item', async () => {
      const item = { id: 123, _new: true };
      const fakeStore = {
        commit: jest.fn(),
      };

      const create = jest.fn(() => Promise.resolve(item));
      repositoryHelper.getEntityActions = jest.fn(() => ({ create }));

      await actions[CREATE_ITEM](fakeStore, { itemType, data: item });

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_ITEMS, {
        itemType,
        items: [item],
      });
    });
  });

  describe('UPDATE_ITEM: ', () => {
    it('should update item', async () => {
      const item = { id: 1, title: 'Foxtrot' };
      const fakeStore = {
        commit: jest.fn(),
      };

      const update = jest.fn(() => Promise.resolve(item));
      repositoryHelper.getEntityActions = jest.fn(() => ({ update }));

      await actions[UPDATE_ITEM](fakeStore, item);

      expect(fakeStore.commit).toHaveBeenCalledWith(CHANGE_ITEM, item);
    });
  });

  describe('DELETE_ITEM: ', () => {
    it('should delete item', async () => {
      const id = 2;

      const fakeStore = {
        commit: jest.fn(),
      };

      const deleteItem = jest.fn(() => Promise.resolve());
      repositoryHelper.getEntityActions = jest.fn(() => ({
        delete: deleteItem,
      }));

      await actions[DELETE_ITEM](fakeStore, { itemType, id });

      expect(deleteItem).toHaveBeenCalledWith(id);
      expect(fakeStore.commit).toHaveBeenCalledWith(REMOVE_ITEM, {
        itemType,
        id,
      });
    });
  });

  describe('SYNC_ORDERS: ', () => {
    it('should sync start', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      const dateRange = {
        syncOrderFromDate: '2018-11-20T00:00:00Z',
        syncOrderToDate: '2019-05-20T23:59:59Z',
      };

      const taskId = '28fec555-817d-4ded-a3cf-1f74c01dcb30';

      ordersRepository.orderSync = jest.fn(() => Promise.resolve({ data: taskId }));

      await actions[SYNC_ORDERS](fakeStore, dateRange);

      expect(ordersRepository.orderSync).toHaveBeenCalledWith(dateRange);
      expect(fakeStore.commit).toHaveBeenCalledWith(
        SET_SYNC_ORDERS_STATUS,
        ORDER_SYNC_STATUS.WORKING
      );
      expect(fakeStore.commit).not.toHaveBeenCalledWith(
        SET_SYNC_ORDERS_STATUS,
        ORDER_SYNC_STATUS.ERROR
      );
    });
  });
});
