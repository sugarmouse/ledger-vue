<template>
  <div class="lineChart"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts, {EChartOption, ECharts} from 'echarts';

  @Component
  export default class Chart extends Vue {
    myChart?: ECharts;
    @Prop() options?: EChartOption;

    @Watch('options')
    onOptionsChange(newValue: EChartOption) {
      this.options && this.myChart!.setOption(newValue);
    }

    mounted() {
      const chartDom = document.querySelector('.lineChart') as HTMLDivElement;
      this.myChart = echarts.init(chartDom);
      this.options && this.myChart.setOption(this.options);
    }
  }
</script>

<style lang="scss" scoped>
.lineChart {
  height: 400px;
}
</style>