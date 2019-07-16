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
import { ENTITY_TYPES } from '@/constants';

describe('storage mutations: ', () => {
  describe('INSERT_ITEMS: ', () => {
    it('should insert items', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          items: [{ id: 123 }],
        },
      };

      const expectedItems = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_ITEMS](state, {
        itemType: ENTITY_TYPES.ORDERS,
        items: [{ id: 321 }],
      });

      expect(state[ENTITY_TYPES.ORDERS].items).toEqual(expectedItems);
    });
  });

  describe('RESET_ITEMS: ', () => {
    it('should reset items', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          items: [{ id: 123 }],
          allItemsLoaded: true,
        },
      };

      mutations[RESET_ITEMS](state, ENTITY_TYPES.ORDERS);

      expect(state[ENTITY_TYPES.ORDERS].items).toEqual([]);
      expect(state[ENTITY_TYPES.ORDERS].allItemsLoaded).toBeFalsy();
    });
  });

  describe('SET_ALL_ITEMS_LOADED: ', () => {
    it('should set items loaded', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          allItemsLoaded: false,
        },
      };

      mutations[SET_ALL_ITEMS_LOADED](state, ENTITY_TYPES.ORDERS);

      expect(state[ENTITY_TYPES.ORDERS].allItemsLoaded).toBeTruthy();
    });
  });

  describe('SET_ITEMS_TOTAL: ', () => {
    it('should set total items', () => {
      const totalItems = 7;
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          total: 0,
        },
      };

      mutations[SET_ITEMS_TOTAL](state, { itemType: ENTITY_TYPES.ORDERS, total: totalItems });

      expect(state[ENTITY_TYPES.ORDERS].total).toEqual(totalItems);
    });
  });

  describe('CHANGE_ITEM: ', () => {
    it('should change item', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
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
        itemType: ENTITY_TYPES.ORDERS,
        id: 2,
        description: 'Dear customer',
        title: 'Comfy',
      });

      expect(state[ENTITY_TYPES.ORDERS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
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
        itemType: ENTITY_TYPES.ORDERS,
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
        [ENTITY_TYPES.ORDERS]: {
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

      mutations[REMOVE_ITEM](state, { itemType: ENTITY_TYPES.ORDERS, id: 2 });

      expect(state[ENTITY_TYPES.ORDERS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
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

      mutations[REMOVE_ITEM](state, { itemType: ENTITY_TYPES.ORDERS, id: 20 });

      expect(vueSpy).not.toHaveBeenCalled();
    });
  });

  describe('SET_SYNC_ORDERS_STATUS: ', () => {
    it('should set sync review status', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          syncOrdersStatus: null,
        },
      };
      mutations[SET_SYNC_ORDERS_STATUS](state, true);
      expect(state[ENTITY_TYPES.ORDERS].syncOrdersStatus).toBeTruthy();
    });
  });
});
