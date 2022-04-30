<template>
  <Layout bar-name="统计图示"
          :has-top-button="false"
          class-prefix="statistic">
    <Tabs :data-source="typeData"
          class-prefix="typesInStatistics"
          :value.sync="selectedType"/>
    <LineChart :selected-type="selectedType"/>
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
  align-items: center;
  .typesInStatistics-tab-wrapper{
    margin: 0;
    padding: 0;
    width: 94vw;

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