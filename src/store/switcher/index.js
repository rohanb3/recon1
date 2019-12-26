import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ENTITY_TYPES } from '@/constants';

const { CLAIMS, DISPUTES } = ENTITY_TYPES;

export default {
  state: {
    active: CLAIMS,
    tabs: [CLAIMS, DISPUTES],
  },
  getters,
  actions,
  mutations,
};
