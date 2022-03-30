import store from '@/store';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export class TagHelper extends Vue{
  addTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {window.alert('标签名不能为空');}
    store.commit('createTag', name);
  }
}