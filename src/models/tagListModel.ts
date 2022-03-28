const localStorageName = 'tagList';

interface TagListModel {
  data: string[];
  fetch: () => string[];
  add: (name: string) => 'success'|'duplicated';
  save: () => void;
}

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.data;
  },
  add(name: string) {
    if (this.data.indexOf(name) >= 0) {return 'duplicated'}
    this.data.push(name);
    return 'success';

  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
};

export {tagListModel};
