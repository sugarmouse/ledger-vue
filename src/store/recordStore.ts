import clone from '@/lib/clone.ts';

const localStorageName = 'recordList';
const recordStore = {
  recordList:[] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  },
  createRecord (record: RecordItem)  {
    const x = clone(record);
    x.createdAt = new Date();
    this.recordList && this.recordList.push(x);
    this.saveRecords();
  }
};
recordStore.fetchRecords()

export default recordStore;



