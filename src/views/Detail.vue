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
  import Tabs from '@/components/tabs.vue';
  import store from '@/store';
  import TagItem from '@/components/TagItem.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import {mixins} from 'vue-class-component';
  import {RecordHelper} from '@/mixins/RecordHelper';

  @Component({
    components: {TagItem, Tabs}
  })
  export default class Detail extends mixins(RecordHelper) {
    selectedType: ExtendType = 'all';
    typeData = recordTypeList;

    created(): void {
      store.commit('fetchRecords');
    }

    get recordList(): RecordItem[] {
      return store.state.recordList;
    }

    get groupedList(): GroupedList {
      const copyList = _.cloneDeep(this.recordList);
      let typedList = this.typeRecordList(this.selectedType, copyList);
      if (typedList.length === 0) return [];
      return this.groupListWithTotal(this.selectedType, this.groupRecordList(typedList));
    }

    beautifyDate(date: string): string {
      const now = new Date();
      const day = dayjs(date);
      const toNowInDay = (n: number) => {
        return day.isSame(now.valueOf() - 86400 * 1000 * n, 'day');
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