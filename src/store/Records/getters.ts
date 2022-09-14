import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';

const getters: GetterTree<AccountStateInterface, StateInterface> = {
  studentAccount(state) {
    return state.allAccount.filter((i) =>
      /^student$/i.test(i.type || '')
    );
  },
  landlordAccount(state) {
    return state.allAccount.filter((i) =>
      /^landlord$/i.test(i.type || '')
    );
  },
};

export default getters;
