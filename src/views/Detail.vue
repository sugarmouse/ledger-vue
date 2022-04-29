<template>
  <div>
    <Layout bar-name="收支明细" :has-top-button="false">
      <Tabs :data-source="typeData" class-prefix="detail" :value.sync="selectedType"/>
      <ol class="all-tags-wrapper" v-if="groupedList.length>0">
        <li class="group-tags-wrapper" v-for="(groupedRecords,index) in groupedList" :key="index">
          <h3 class="title">{{ beautifyDate(groupedRecords.title) }} <span>{{ groupedRecords.total }}</span></h3>
          <ol>
            <li v-for="record in groupedRecords.items" :key="record.createdAt" class="record">
              <TagItem :tag="{name:record.tag.name, text:record.tag.text}"/>
              <span class="notes">{{ record.notes }}</span>
              <span class="amount" :class="record.type === '-' ? 'out' : 'in' ">{{
                  record.type === '-' ? '-' : '+'
                }}￥{{ record.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">目前没有相关记录</div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import _ from 'lodash';
  import dayjs from 'dayjs';
  import {Component} from 'vue-property-decorator';
  import Vue from 'vue';
  import Tabs from '@/components/tabs.vue';
  import store from '@/store';
  import Chart from '@/components/Chart.vue';
  import TagItem from '@/components/TagItem.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import {accAdd, accSub} from '@/lib/math.ts';


  const oneDay = 86400 * 1000;
  type Result = { title: string, total?: number, items: RecordItem[] }[]
  @Component({
    components: {TagItem, Tabs, Chart}
  })
  export default class Detail extends Vue {
    selectedType = 'all';
    typeData = recordTypeList;

    created(): void {
      store.commit('fetchRecords');
      return;
    }


    get recordList(): RecordItem[] {
      return store.state.recordList;
    }

    sortRecordList(recordList: RecordItem[]): RecordItem[] {
      if (this.selectedType !== 'all') {
        return recordList
            .filter(r => r.type === this.selectedType)
            .sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf())
            .reverse();
      } else {
        return recordList
            .sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf())
            .reverse();
      }
    }

    get groupedList(): Result {
      const recordList = _.cloneDeep(this.recordList);
      if (recordList.length === 0) return [];

      const sortedRecordList = this.sortRecordList(recordList);
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
        group.total = group.items.reduce((sum, item) => {
          if (item.type === '-') {
            return accSub(sum, item.amount);
          } else {
            return accAdd(sum, item.amount);
          }
        }, 0);
      });
      return result;
    }


    beautifyDate(date: string):string {
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
@import "~@/assets/style/helper.scss";

::v-deep .detail-tab-wrapper {
  margin: 0;
  padding: 0;
  background: $background;

  .detail-describe {

  }

  .detail-tabs {
    margin: 0;
    display: flex;
    justify-content: flex-start;

    .detail-tabs-item {
      font-size: 16px;
      height: 34px;
      width: 58px;
      margin: 0 6px 0 0;

      &.selected {

      }
    }
  }

}


.noResult {
  padding: 16px;
  text-align: center;
}

%item {
  padding: 8px 16px;
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.all-tags-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }

  height: calc(100vh - #{$tab-height} - #{$nav-height} - #{$top-bar-height});
  overflow: scroll;
  margin: 0 2px;

  .group-tags-wrapper {
    margin-bottom: 6px;
    border-radius: 20px;

    .title {
      @extend %item;
      background: #333;
      border-radius: 20px 20px 0 0;
    }

    ol {
      .record {
        @extend %item;

        .notes {
          margin-right: auto;
          margin-left: 8px;
          color: $lighter-font;
          font-size: 18px;
          white-space: nowrap;
          flex-shrink: 999999;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .amount {
          display: inline-block;
          height: 24px;
          line-height: 24px;
          vertical-align: baseline;
          margin-left: 6px;

          &.in {
            color: $color-highlight;
          }

          &.out {
            color: rgb(203, 85, 73);
          }
        }
      }

    }


  }
}


</style>