import createId from '@/lib/idCreator';

const localStorageName = 'tagList';



const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.data;
  },
  add(name: string) {
    const tagsName = this.data.map(item => item.name);
    if (tagsName.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({id: createId().toString(), name: name});
    return 'success';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.data.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    }
    return 'notFound';
  },
  remove(id) {
    let index = -1;
    for (let i = 0; i <= this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    return true;
  }
  ,
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
};

export {tagListModel};
