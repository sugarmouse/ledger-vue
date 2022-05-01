import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import defaultTagList from '@/constants/defaultTagList';
import createId from '@/lib/idCreator';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  selectedTag: Tag
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    selectedTag: {name: 'toBeSelected', text: '待选'}
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
      x.id = createId()
      state.recordList.push(x);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      let localTagList = window.localStorage.getItem('tagList');
      if (localTagList === null) {
        window.localStorage.setItem('tagList', JSON.stringify(defaultTagList));
        localTagList = window.localStorage.getItem('tagList');
      }
      state.tagList = JSON.parse(localTagList!);
    },
    setSelectedTag(state, name) {
      state.selectedTag = _.cloneDeep(state.tagList.filter(tag => tag.name === name)[0]);
    }

    // createTag(state, name: string) {
    //   const tagsName = state.tagList.map(item => item.name);
    //   if (tagsName.indexOf(name) >= 0) {
    //     window.alert('标签名重复了');
    //   } else {
    //     state.tagList.push({id: createId().toString(), name: name});
    //     store.commit('saveTags');
    //     window.alert('添加成功');
    //   }
    // },
    // removeTag(state, id: string) {
    //   let index = -1;
    //   for (let i = 0; i <= state.tagList.length; i++) {
    //     if (state.tagList[i].id === id) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   state.tagList.splice(index, 1);
    //   store.commit('saveTags');
    // },
    //
    // saveTags(state) {
    //   window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    // },
    // updateTag(state, payload: { id: string, name: string }) {
    //   const idList = state.tagList.map(item => item.id);
    //   if (idList.indexOf(payload.id) >= 0) {
    //     const nameList = state.tagList.map(item => item.name);
    //     if (nameList.indexOf(payload.name) >= 0) {
    //       window.alert('标签重复了');
    //     } else {
    //       const tag = state.tagList.filter(item => item.id === payload.id)[0];
    //       tag.name = payload.name;
    //       store.commit('saveTags');
    //     }
    //   }
    // },

  },
  actions: {},
  modules: {}
});

export default store;