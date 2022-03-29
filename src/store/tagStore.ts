import createId from '@/lib/idCreator';

const localStorageName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    const data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    this.tagList = data
    return data;
  },
  createTag: function (name: string) {
    const tagsName = this.tagList.map(item => item.name);
    if (tagsName.indexOf(name) >= 0) {
      window.alert('duplicated');
    }
    this.tagList.push({id: createId().toString(), name: name});
    window.localStorage.setItem(localStorageName, JSON.stringify(tagStore.tagList));
    window.alert('添加成功');
    return;
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i <= this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.tagList.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        window.alert('标签重复了')
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    }
    return 'notFound';
  },
  findTag(id: string) {
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  saveTags() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags()
export default tagStore;