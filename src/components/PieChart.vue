<template>
  <div class="chart-wrapper" ref="chartWrapper">
    <div class='pieChart chart'></div>
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
  import {accAdd, accSub} from '@/lib/math';

  type Result = { title: string, total?: number, items: RecordItem[] }[]
  @Component
  export default class PieChart extends mixins(RecordHelper) {
    @Prop({default: '-'}) selectedType!: '-' | '+';
    myChart!: ECharts;

    @Watch('pieChartOptions')
    onOptionsChange(newValue: EChartOption) {
      this.pieChartOptions && this.myChart!.setOption(newValue);
    }

    created(): void {
      store.commit('fetchRecords');
    }

    mounted() {
      const chartDom = document.querySelector('.pieChart') as HTMLDivElement;
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.pieChartOptions);
    }

    get recordList(): RecordItem[] {
      return store.state.recordList;
    }


    get tagGroupedList(): TagGroupRecordList {
      return this.tagGroupRecordList( this.typeRecordList(this.selectedType,this.recordList));
    }

    get pieChartOptions(): EChartOption {
      const data: { value: number, name: string }[] = [];
      for (let i = 0; i < this.tagGroupedList.length; i++) {
        const index = _.findIndex(data, item => item.name === this.tagGroupedList[i].tag.text);
        if (index >= 0) {
          data[index].value = this.tagGroupedList[i].items.reduce((sum, item) => sum + item.amount, 0);
        } else {
          const value = this.tagGroupedList[i].items.reduce((sum, item) => sum + item.amount, 0);
          data.push({value: value, name: this.tagGroupedList[i].tag.text});
        }
      }

      return {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '70%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }

  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.chart {
  height: $chart-height;

  &-wrapper {
    width: $chart-width;
    overflow: auto;
    background-color: #222222;
    border-radius: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

}

</style>