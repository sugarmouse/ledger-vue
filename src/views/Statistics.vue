<template>
  <div>
    <Layout>

      <Tabs :data-source="typeData" class-prefix="types" :value.sync="selectedType"/>
      <Tabs :data-source="intervalData" class-prefix="interval" :value.sync="selectedInterval"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.createdAt" class="record">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>

            </li>
          </ol>
        </li>
      </ol>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/tabs.vue';
  import typeList from '@/constants/typeList';
  import intervalList from '@/constants/intervalList';
  import store from '@/store';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    created() {
      store.commit('fetchRecords');
    }

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    get recordList() {
      return store.state.recordList;
    }

    get result() {

      const recordList = this.recordList;
      type HashTableValue = { title: string, items: RecordItem[] }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        console.log(date);
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      console.log(hashTable);
      return hashTable;
    }

    selectedType = '-';
    selectedInterval = 'day';
    typeData = typeList;
    intervalData = intervalList;


  }
</script>

<style lang="scss" scoped>
::v-deep .types-tabs-item {
  background: #ffffff;

  &.selected {
    background-color: #c4c4c4;

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
.notes{
  margin-right: auto;
  margin-left: 8px;
  color:#999;
}


</style>