<template>
  <div>
    <Layout>

      <Tabs :data-source="typeData" class-prefix="types" :value.sync="selectedType"/>
      <Tabs :data-source="intervalData" class-prefix="interval" :value.sync="selectedInterval"/>
      <p>statistics</p>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/tabs.vue';
  import typeList from '@/constants/typeList';
  import intervalList from '@/constants/intervalList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    selectedType = '-';
    selectedInterval = 'day';
    typeData = typeList;
    intervalData = intervalList;
  }
</script>

<style lang="scss" scoped>
::v-deep .types-tabs-item {
  background: #ffffff;

  &.selected {
    background-color: #c4c4c4;

    &::after {
      display: none;
    }
  }
}
.interval-tabs::v-deep {
  .interval-tabs-item {
    height: 48px;
  }
}


</style>