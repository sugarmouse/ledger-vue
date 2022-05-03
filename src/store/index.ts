import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import defaultTagList from '@/constants/defaultTagList';
import createId from '@/lib/idCreator';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  selectedTag: Tag,
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    selectedTag: {name: 'toBeSelected', text: '待选'},
  } as RootState,
  getters: {
    getSelectedTag: state => {
      return state.selectedTag;
    }
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },

    createRecord(state, record: RecordItem) {
      const x = _.cloneDeep(record);
      x.createdAt = x.createdAt || new Date().toISOString();
      x.id = record.id === -1 ? createId() : record.id;
      state.recordList.push(x);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    deleteRecord(state, id: number) {
      const newRecordList = _.remove(state.recordList, record => record.id === id);
      store.commit('saveRecords', newRecordList);
    },
    fetchTags(state) {
      let localTagList = window.localStorage.getItem('tagList');
      if (localTagList === null) {
        window.localStorage.setItem('tagList', JSON.stringify(defaultTagList));
        localTagList = window.localStorage.getItem('tagList');
      }
      if (localTagList) state.tagList = JSON.parse(localTagList);
    },
  },
  actions: {},
  modules: {}
});

export default store;