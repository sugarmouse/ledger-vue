<template>
  <div class="chart-wrapper" ref="chartWrapper" >
    <div class='lineChart chart'></div>
  </div>


</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts, {EChartOption, ECharts} from 'echarts';
  import dayjs from 'dayjs';
  import _ from 'lodash';
  import store from '@/store';

  type Result = { title: string, total?: number, items: RecordItem[] }[]
  @Component
  export default class LineChart extends Vue {
    @Prop({default:'-'}) selectedType!: '-' | '+' ;
    myChart!: ECharts;

    @Watch('lineChartOptions')
    onOptionsChange(newValue: EChartOption) {
      this.lineChartOptions && this.myChart!.setOption(newValue);
    }
    created(): void {
      store.commit('fetchRecords');
    }

    mounted() {
      const chartDom = document.querySelector('.lineChart') as HTMLDivElement;
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.lineChartOptions);

      const $div = this.$refs.chartWrapper as HTMLDivElement;
      $div.scrollLeft = $div.scrollWidth;
    }

    get recordList(): RecordItem[] {
      return store.state.recordList;
    }

    get groupedList(): Result {

      const recordList = _.cloneDeep(this.recordList);
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

    get lineChartOptions():EChartOption {
      const today = new Date();
      const keyValueList = [];
      for (let i = 0; i <= 29; i++) {
        const date = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {title: date});
        const amount = found ? found.total : 0;
        keyValueList.push({key: date, value: amount});
      }
      const dateList = keyValueList.map(item => item.key).reverse();
      const amountList = keyValueList.map(item => item.value).reverse();

      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type:'category',
          data: dateList,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel: {
            formatter: function (value: string) {
              return value.substring(5);
            }

          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            symbolSize: 10,
            itemStyle: {borderWidth: 1, color: '#666'},
            data: amountList,
            type: 'line'
          }
        ],
        tooltip: {
          show: true,
          triggerOn: 'click',
          formatter: '{c}'
        },
      };
    }

  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.chart {
  width: 430%;
  height: $chart-height;

  &-wrapper {
    margin: 4px 0;
    overflow: scroll;
    width: $chart-width;
    background-color: #222222;
    border-radius: 10px;
    &::-webkit-scrollbar {
      display: none;
    }
  }

}

</style>