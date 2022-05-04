<template>
  <Layout :has-top-bar="false" class-prefix="home">
    <Icon name="moneyIcon"/>
    <div class="date">
      <div class="common-date">
        {{ today.month }}
        {{ today.day }}
      </div>
      <div v-if="lunarDate.msg==='success'" class="lunar-date">
        {{ lunarDate.year }}
        {{ lunarDate.month }}
        {{ lunarDate.day }}
      </div>
    </div>
    <div class="record-today">
      <div class="in">
        +{{ moneyToday.in }}
      </div>
      <div class="out">
        -{{ moneyToday.out }}
      </div>
      <div class="total">
        今天总共{{ moneyToday.total > 0 ? '赚了' : '花了' }}{{ Math.abs(moneyToday.total) }}元
      </div>
    </div>
    <router-link to="/money">
      <button>记一笔</button>
    </router-link>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index';
  import dayjs from 'dayjs';
  import {mixins} from 'vue-class-component';
  import {RecordHelper} from '@/mixins/RecordHelper';
  import _ from 'lodash';
  import {accAdd, accSub} from '@/lib/math';

  @Component
  export default class Home extends mixins(RecordHelper) {
    lunarDate = store.state.lunarDate;

    created() {
      store.dispatch('lunarDate');
      store.commit('fetchRecords');
    }

    get recordList() {
      return store.state.recordList;
    }

    get today() {
      const now = dayjs(new Date()).format('YYYY-MM-DD');
      const x = now.split('-');
      return {
        year: x[0],
        month: x[1],
        day: x[2],
      };
    }

    get todayRecord() {
      const x = this.groupRecordList(this.sortRecordList(this.recordList));
      return _.find(x, item => item.title === dayjs(new Date()).format('YYYY-MM-DD'));
    }


    get moneyToday() {
      const res = {in: 0, out: 0, total: 0};
      if (this.todayRecord !== undefined) {
        const todayIncomeList = this.typeRecordList('+', this.todayRecord.items);
        const todayOutgoList = this.typeRecordList('-', this.todayRecord.items);
        res.in = todayIncomeList.reduce((sum, item) => accAdd(sum, item.amount), 0);
        res.out = todayOutgoList.reduce((sum, item) => accAdd(sum, item.amount), 0);
        res.total = accSub(res.in, res.out);
      }
      return res;
    }


  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

::v-deep .home-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 200px;
  }

  .date {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .common-date {
      font-size: 32px;
    }
  }

  .record-today {
    margin: 40px 0;

    %common{
      height: 48px;
      width: 40vw;
      border-radius: 10px;
      margin: 0  0 6px  0 ;
      line-height: 48px;
      text-align: center;
      font-size: 30px;
    }
    .in {
      @extend %common;
      background-image: linear-gradient(215deg, #7e1781, #98689e, #aaacba, #b5f0d6);

    }

    .out {
      @extend %common;
      background-image: linear-gradient(25deg, #5c4bff, #5977ff, #499eff, #07c3ff);
    }

    .total {
      text-align: center;

    }
  }

  a {
    button {
      border: none;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 26px;
      background: $color-highlight;
      color: $basic-font;
      margin-bottom: 20px;
    }
  }


}

</style>