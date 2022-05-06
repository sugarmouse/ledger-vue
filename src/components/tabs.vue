<template>
  <div class="tab-wrapper" :class="propClass('tab-wrapper')" >
    <div v-if="hasDescribe" class="describe" :class="propClass('describe')">
      {{ describe }}
    </div>
    <ul class="tabs" :class="propClass('tabs')">
      <li v-for="item in dataSource"
          :class="liClass(item)"
          :key="item.value"
          @click="select(item)">{{ item.text }}
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string, value: string }
  @Component
  export default class tabs extends Vue {
    @Prop({default: false, type: Boolean}) hasDescribe!: boolean;
    @Prop(String) describe!: string;
    @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;

    liClass(item: DataSourceItem) {
      return {selected: item.value === this.value, [this.classPrefix + '-tabs-item']: this.classPrefix};
    }
    propClass( defaultClass:string){
        return {[this.classPrefix+'-'+defaultClass]:this.classPrefix}
    }

    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tab-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: lighten($background, 30%);
  border-radius: 10px;
  margin: 4px 10px 0 10px;
  padding:0 8px;

  .describe {
    font-size: 24px;
    font-weight: bold;

  }

  .tabs {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 6px;
    text-align: center;
    font-size: 24px;
    height: $tab-height;

    > li {
      font-size: 18px;
      width: 70px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      border: 1px solid $darker-font;
      margin-right:20px ;
      &:last-child{
        margin-right:0 ;
      }

      &.selected {
        background: $color-highlight;
        border: 1px solid lighten($color-highlight,30%);
      }

    }
  }
}


</style>