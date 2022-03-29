const localStorageName = 'tagList';

interface TagListModel {
  data: Tag[];
  fetch: () => Tag[];
  add: (name: string) => 'success' | 'duplicated';
  save: () => void;
}

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.data;
  },
  add(name: string) {
    const tagsName = this.data.map(item => item.name);
    if (tagsName.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({id: name, name: name});
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
};

export {tagListModel};
