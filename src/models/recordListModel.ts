import clone from "@/lib/clone.ts"
const localStorageName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as RecordItem[];
    return this.data;
  },
  create(record:RecordItem){
    const x = clone(record);
    x.createdAt = new Date();
    this.data.push(x);
    recordListModel.save()
  },
  save() {
    window.localStorage.setItem('recordList', JSON.stringify(this.data));
  }
};

export {recordListModel};
