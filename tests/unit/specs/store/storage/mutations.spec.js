import Vue from 'vue';

import mutations from '@/store/storage/mutations';
import {
  INSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  CHANGE_ITEM,
  REMOVE_ITEM,
} from '@/store/storage/mutationTypes';
import { ORDERS } from '@/constants/entityTypes';

describe('storage mutations: ', () => {
  describe('INSERT_ITEMS: ', () => {
    it('should insert items', () => {
      const state = {
        [ORDERS]: {
          items: [{ id: 123 }],
        },
      };

      const expectedItems = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_ITEMS](state, {
        itemType: ORDERS,
        items: [{ id: 321 }],
      });

      expect(state[ORDERS].items).toEqual(expectedItems);
    });
  });

  describe('RESET_ITEMS: ', () => {
    it('should reset items', () => {
      const state = {
        [ORDERS]: {
          items: [{ id: 123 }],
          allItemsLoaded: true,
        },
      };

      mutations[RESET_ITEMS](state, ORDERS);

      expect(state[ORDERS].items).toEqual([]);
      expect(state[ORDERS].allItemsLoaded).toBeFalsy();
    });
  });

  describe('SET_ALL_ITEMS_LOADED: ', () => {
    it('should set items loaded', () => {
      const state = {
        [ORDERS]: {
          allItemsLoaded: false,
        },
      };

      mutations[SET_ALL_ITEMS_LOADED](state, ORDERS);

      expect(state[ORDERS].allItemsLoaded).toBeTruthy();
    });
  });

  describe('CHANGE_ITEM: ', () => {
    it('should change item', () => {
      const state = {
        [ORDERS]: {
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
        itemType: ORDERS,
        id: 2,
        description: 'Dear customer',
        title: 'Comfy',
      });

      expect(state[ORDERS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [ORDERS]: {
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
        itemType: ORDERS,
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
        [ORDERS]: {
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

      mutations[REMOVE_ITEM](state, { itemType: ORDERS, id: 2 });

      expect(state[ORDERS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [ORDERS]: {
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

      mutations[REMOVE_ITEM](state, { itemType: ORDERS, id: 20 });

      expect(vueSpy).not.toHaveBeenCalled();
    });
  });
});
