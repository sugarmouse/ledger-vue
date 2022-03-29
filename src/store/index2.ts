import {tagListModel} from '@/models/tagListModel';
import {recordListModel} from '@/models/recordListModel';

const store = {
  // tags store
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.add(name);
    if (message === 'duplicated') {
      alert('标签名不能重复');
    } else if (message === 'success') {
      tagListModel.save();
      window.alert('添加成功');
    }
    return;
  },
  removeTag: (id: string) => {
    const isRemove = tagListModel.remove(id);
    tagListModel.save();
    return isRemove;
  },
  updateTag: (id: string, name: string) => {
    const message = tagListModel.update(id, name);
    tagListModel.save();
    return message;
  },
  findTag:function (id: string) {
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  // recordList store
  recordList: recordListModel.fetch(),
  createRecord: (record:RecordItem) => {
    return recordListModel.create(record);
  }
};

export default  store