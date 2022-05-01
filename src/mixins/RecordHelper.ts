import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import {accAdd, accSub} from '@/lib/math';


@Component
export class RecordHelper extends Vue {
  typeRecordList(type: ExtendType, recordList: RecordItem[]):RecordItem[] {
    if (type !== 'all') {
      return recordList.filter(r => r.type === type);
    } else {
      return recordList;
    }
  }

  sortRecordList(recordList: RecordItem[]):RecordItem[]{
    return recordList
      .sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf())
      .reverse();
  }

  groupRecordList(recordList: RecordItem[]):GroupedList {

    if (recordList.length === 0) return [];
    const sortedRecordList = this.sortRecordList(recordList);

    const result: GroupedList = [{
      title: dayjs(sortedRecordList[0].createdAt).format('YYYY-MM-DD'),
      items: [sortedRecordList[0]]
    }];

    for (let i = 1; i < sortedRecordList.length; i++) {
      const current = sortedRecordList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(sortedRecordList[i]);
      } else {
        result.push({title: dayjs(sortedRecordList[i].createdAt).format('YYYY-MM-DD'), items: [sortedRecordList[i]]});
      }
    }
    return result;
  }

  groupListWithTotal(type: ExtendType, groupedList: GroupedList):GroupedList {
    if (groupedList.length === 0) return [];
    if (type === 'all') {
       groupedList.map(group => {
        group.total = group.items.reduce((sum, item) => {
          if (item.type === '-') {
            return accSub(sum, item.amount);
          } else {
            return accAdd(sum, item.amount);
          }
        }, 0);
      });
    } else {
       groupedList.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
    }
    return groupedList
  }



}