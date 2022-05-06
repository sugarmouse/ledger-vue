<template>
  <Layout bar-name="统计图示"
          :has-top-button="false"
          class-prefix="statistic">
    <Tabs :data-source="typeData"
          class-prefix="typesInStatistics"
          :value.sync="selectedType"/>
    <div class="describe">最近一个月金额走势</div>
    <LineChart :selected-type="selectedType"/>
    <div class="describe">所有金额的分配</div>
    <PieChart :selected-type="selectedType"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/tabs.vue';
  import typeList from '@/constants/typeList';
  import LineChart from '@/components/LineChart.vue';
  import PieChart from '@/components/PieChart.vue';


  @Component({
    components: {PieChart, LineChart, Tabs}
  })
  export default class Statistics extends Vue {
    selectedType: '-' | '+' = '-';
    typeData = typeList;

  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep .statistic-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .describe{
    width: 96%;
    display: flex;
    justify-content: flex-start;
    padding: 4px 10px;
    color: $darker-font;
  }
  .typesInStatistics-tab-wrapper{
    margin: 0;
    padding: 0;
    width: 96%;

    .typesInStatistics-tabs{
      margin: 0;
      display: flex;
      justify-content: flex-start;
      .typesInStatistics-tabs-item {
        &.selected {
        }
      }
    }
  }



}


</style>