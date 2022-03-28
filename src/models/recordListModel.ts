const localStorageName = 'recordList';
const recordListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as RecordItem[];
  },
  save(data:RecordItem[]) {
    window.localStorage.setItem('recordList', JSON.stringify(data));
  },
  clone(data:RecordItem){
    return JSON.parse(JSON.stringify(data)) as RecordItem
  }
};

export {recordListModel};
