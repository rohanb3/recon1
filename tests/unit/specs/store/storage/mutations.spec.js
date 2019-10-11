import Vue from 'vue';

import mutations from '@/store/storage/mutations';
import {
  INSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  CHANGE_ITEM,
  REMOVE_ITEM,
  SET_SYNC_ORDERS_STATUS,
  SET_ITEMS_TOTAL,
} from '@/store/storage/mutationTypes';
import { TABLE_NAMES } from '@/constants';

describe('storage mutations: ', () => {
  describe('INSERT_ITEMS: ', () => {
    it('should insert items', () => {
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          items: [{ id: 123 }],
        },
      };

      const expectedItems = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_ITEMS](state, {
        itemType: TABLE_NAMES.CLAIMS_ORDERS,
        items: [{ id: 321 }],
      });

      expect(state[TABLE_NAMES.CLAIMS_ORDERS].items).toEqual(expectedItems);
    });
  });

  describe('RESET_ITEMS: ', () => {
    it('should reset items', () => {
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          items: [{ id: 123 }],
          allItemsLoaded: true,
        },
      };

      mutations[RESET_ITEMS](state, TABLE_NAMES.CLAIMS_ORDERS);

      expect(state[TABLE_NAMES.CLAIMS_ORDERS].items).toEqual([]);
      expect(state[TABLE_NAMES.CLAIMS_ORDERS].allItemsLoaded).toBeFalsy();
    });
  });

  describe('SET_ALL_ITEMS_LOADED: ', () => {
    it('should set items loaded', () => {
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          allItemsLoaded: false,
        },
      };

      mutations[SET_ALL_ITEMS_LOADED](state, TABLE_NAMES.CLAIMS_ORDERS);

      expect(state[TABLE_NAMES.CLAIMS_ORDERS].allItemsLoaded).toBeTruthy();
    });
  });

  describe('SET_ITEMS_TOTAL: ', () => {
    it('should set total items', () => {
      const totalItems = 7;
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          total: 0,
        },
      };

      mutations[SET_ITEMS_TOTAL](state, {
        itemType: TABLE_NAMES.CLAIMS_ORDERS,
        total: totalItems,
      });

      expect(state[TABLE_NAMES.CLAIMS_ORDERS].total).toEqual(totalItems);
    });
  });

  describe('CHANGE_ITEM: ', () => {
    it('should change item', () => {
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const expectedItems = [
        { id: 1, description: 'Dear customer', title: 'Foxtrot' },
        { id: 2, description: 'Dear customer', title: 'Comfy' },
        {
          id: 3,
          description: 'We very happy',
          title: 'T-Mobile',
        },
      ];

      mutations[CHANGE_ITEM](state, {
        itemType: TABLE_NAMES.CLAIMS_ORDERS,
        id: 2,
        description: 'Dear customer',
        title: 'Comfy',
      });

      expect(state[TABLE_NAMES.CLAIMS_ORDERS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const vueSpy = jest.spyOn(Vue, 'set');

      mutations[CHANGE_ITEM](state, {
        itemType: TABLE_NAMES.CLAIMS_ORDERS,
        id: 10,
        description: 'Dear customer',
        title: 'Comfy',
      });

      expect(vueSpy).not.toHaveBeenCalled();
    });
  });

  describe('REMOVE_ITEM: ', () => {
    it('item should be deleted', () => {
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const expectedItems = [
        { id: 1, description: 'Dear customer', title: 'Foxtrot' },
        {
          id: 3,
          description: 'We very happy',
          title: 'T-Mobile',
        },
      ];

      mutations[REMOVE_ITEM](state, { itemType: TABLE_NAMES.CLAIMS_ORDERS, id: 2 });

      expect(state[TABLE_NAMES.CLAIMS_ORDERS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [TABLE_NAMES.CLAIMS_ORDERS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const vueSpy = jest.spyOn(Vue, 'delete');

      mutations[REMOVE_ITEM](state, { itemType: TABLE_NAMES.CLAIMS_ORDERS, id: 20 });

      expect(vueSpy).not.toHaveBeenCalled();
    });
  });

  describe('SET_SYNC_ORDERS_STATUS: ', () => {
    it('should set sync review status', () => {
      const tableName = 'tableName';

      const state = {
        [tableName]: {
          syncOrdersStatus: null,
        },
      };
      mutations[SET_SYNC_ORDERS_STATUS](state, { status: true, tableName });
      expect(state[tableName].syncOrdersStatus).toBeTruthy();
    });
  });
});
