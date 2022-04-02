<template>
  <div class="lineChart"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import echarts,{EChartOption} from 'echarts';

  @Component
  export default class Chart extends Vue {
    @Prop() options?: EChartOption;

    mounted() {
      const chartDom = document.querySelector('.lineChart') as HTMLDivElement;
      const myChart = echarts.init(chartDom);
      this.options && myChart.setOption(this.options);
    }
  }
</script>

<style lang="scss" scoped>
.lineChart {
  height: 400px;
}
</style>