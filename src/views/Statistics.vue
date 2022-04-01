<template>
  <div>
    <Layout>
      <Tabs :data-source="typeData" class-prefix="types" :value.sync="selectedType"/>
      <ol v-if="groupedList.length>0">
        <li  v-for="(groupedRecords,index) in groupedList" :key="index">
          <h3 class="title">{{ beautifyDate(groupedRecords.title) }} <span>{{ groupedRecords.total }}</span></h3>
          <ol>
            <li v-for="record in groupedRecords.items" :key="record.createdAt" class="record">
              <span v-if="record.tags.length === 0">无</span>
              <span v-else v-for="tag in record.tags" :key="tag.id">{{ tag.name }}</span>
              <span class="notes">{{ record.notes }}</span>
              <span>￥{{ record.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">目前没有相关记录</div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/tabs.vue';
  import typeList from '@/constants/typeList';
  import store from '@/store';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  const oneDay = 86400 * 1000;
  type Result = { title: string, total?: number, items: RecordItem[] }[]
  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    selectedType = '-';
    typeData = typeList;

    created(): void {
      store.commit('fetchRecords');
      return;
    }

    get recordList(): RecordItem[] {
      return store.state.recordList;
    }

    get groupedList(): Result {

      const recordList = clone(this.recordList);
      if (recordList.length === 0) return [];

      const sortedRecordList = recordList
          .filter(r => r.type === this.selectedType)
          .sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf())
          .reverse();
      if (sortedRecordList.length === 0) return [];

      const result: Result = [{
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
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      return result;
    }


    beautifyDate(date: string) {
      const now = new Date();
      const day = dayjs(date);
      const toNowInDay = (n: number) => {
        return day.isSame(now.valueOf() - oneDay * n, 'day');
      };
      if (toNowInDay(0)) return '今天';
      if (toNowInDay(1)) return '昨天';
      if (toNowInDay(2)) return '前天';
      if (day.isSame(now, 'year')) return day.format('MM月DD日');
      return day.format('YYYY年MM月DD日');
    }
  }
</script>

<style lang="scss" scoped>
.noResult{
  padding: 16px;
  text-align: center;
}
::v-deep .types-tabs-item {
  background: #c4c4c4;

  &.selected {
    background-color: #fff;

    &::after {
      display: none;
    }
  }
}

.interval-tabs::v-deep {
  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item
}

.record {
  background: #ffffff;
  @extend %item
}

.notes {
  margin-right: auto;
  margin-left: 8px;
  color: #999;
}


</style>