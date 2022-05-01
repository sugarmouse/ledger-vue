<template>
  <div class="chart-wrapper" ref="chartWrapper">
    <div class='lineChart chart'></div>
  </div>


</template>

<script lang="ts">
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts, {EChartOption, ECharts} from 'echarts';
  import dayjs from 'dayjs';
  import _ from 'lodash';
  import store from '@/store';
  import {mixins} from 'vue-class-component';
  import {RecordHelper} from '@/mixins/RecordHelper';

  type Result = { title: string, total?: number, items: RecordItem[] }[]
  @Component
  export default class LineChart extends mixins(RecordHelper) {
    @Prop({default: '-'}) selectedType!: '-' | '+';
    myChart!: ECharts;

    @Watch('lineChartOptions')
    onOptionsChange(newValue: EChartOption): void {
      if (this.lineChartOptions) this.myChart.setOption(newValue);
    }

    created(): void {
      store.commit('fetchRecords');
    }

    mounted(): void {
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
      const copyList = _.cloneDeep(this.recordList);
      let typedList = this.typeRecordList(this.selectedType, copyList);
      if (typedList.length === 0) return [];
      return this.groupListWithTotal(this.selectedType, this.groupRecordList(typedList));
    }

    get lineChartOptions(): EChartOption {
      // const keyValueList: { key: string, value: number }[] = [];
      const monthRecordData =  this.complementGroupedRecordList(29, this.groupedList);
      const dateList = monthRecordData.map(item => item.title).reverse();
      const amountList = monthRecordData.map(item => item.total).reverse();

      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
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