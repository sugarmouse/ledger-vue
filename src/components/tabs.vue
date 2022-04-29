<template>
  <div class="tab-wrapper">
    <div v-if="hasDescribe" class="describe">
      {{ describe }}
    </div>
    <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
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
  margin: 10px 20px 0 20px;
  padding: 8px;
  border-radius: 10px;

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
      border: 1px solid $lighter-font;
      &:first-child{
        margin-right:20px ;
      }

      &.selected {
        background: $color-highlight;
        border: 1px solid lighten($color-highlight,30%);
      }

    }
  }
}


</style>