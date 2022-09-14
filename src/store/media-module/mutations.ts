import { MutationTree } from 'vuex';
import { MediaStateInterface } from './state';

const mutation: MutationTree<MediaStateInterface> = {
  addMedia(state, result) {
    state.allMedia.push(result.data);
  },
  getMedia(state, result) {
    state.allMedia = [];
    state.allMedia = result;
  },
  getAllMedia(state, payload){
    state.allMedia = [];
    state.allMedia.push(...payload);
  }
};

export default mutation;
