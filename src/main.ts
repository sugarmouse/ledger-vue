import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/nav.vue';
import Layout from '@/components/layout.vue';
import Icon from '@/components/Icon.vue';
import {tagListModel} from '@/models/tagListModel';
import resetModuleRegistry = jest.resetModuleRegistry;

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
  const message = tagListModel.add(name);
  if (message === 'duplicated') {
    alert('标签名不能重复');
  } else if (message === 'success') {
    tagListModel.save();
    window.alert('添加成功');
  }
  return;
};
window.removeTag = (id: string) => {
  const isRemove = tagListModel.remove(id);
  tagListModel.save();
  return isRemove;
};
window.updateTag = (id: string, name: string) => {
  const message = tagListModel.update(id, name);
  tagListModel.save();
  return message;
};
window.findTag = (id) => {
  return window.tagList.filter(tag => tag.id === id)[0];
};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

