import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import defaultTagList from '@/constants/defaultTagList';
import createId from '@/lib/idCreator';
import dayjs from 'dayjs';
import axios from 'axios';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  selectedTag: Tag,
  lunarDate: { year: string, month: string, day: string, msg:string};
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    selectedTag: {name: 'toBeSelected', text: '待选'},
    lunarDate: {year: '', month: '', day: '',msg:''}
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
  actions: {
    lunarDate({state}) {
      const today = new Date();
      const date = dayjs(new Date()).format('YYYY-MM-DD-HH');
      const unix_time = Math.floor(today.valueOf() / 1000);

      axios.post('https://v2.alapi.cn/api/lunar', {
        token: '7TfVHs1tnc72Sena',
        date: date,
        unix_time: unix_time
      })
        .then(res => {
          state.lunarDate.year = res.data.data.lunar_year_chinese;
          state.lunarDate.month = res.data.data.lunar_month_chinese;
          state.lunarDate.day = res.data.data.lunar_day_chinese;
          state.lunarDate.msg = res.data.msg;
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  },
  modules: {}
});

export default store;