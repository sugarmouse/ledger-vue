<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource"
        :class="liClass(item)"
        :key="item.value"
        @click="select(item)">{{ item.text }}</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string, value: string }
  @Component
  export default class tabs extends Vue {
    @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;

    liClass (item:DataSourceItem){
     return  {selected:item.value===this.value,[this.classPrefix+'-tabs-item']:this.classPrefix}
    }

    select(item: DataSourceItem) {
      this.$emit('update:value',item.value)
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs {
  background: $background;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 6px;
  text-align: center;
  font-size: 24px;
  height: $tab-height;

  > li {
    width: 20%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 8px;

    &.selected{
      background: lighten($color-highlight, 20%) ;
      color: #000000;
    }

  }
}

</style>