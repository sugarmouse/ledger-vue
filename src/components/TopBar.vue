<template>
  <div class="topBar">
    <Icon class="leftIcon" :name="leftIconName" @click="onClick"></Icon>
    <span>{{ barName }}</span>
    <span class="rightIcon"></span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class tabBar extends Vue {
    @Prop({required: true}) barName!: string;
    @Prop({default: true}) hasButton!: boolean;

    leftIconName = this.hasButton ? 'left' : '';

    onClick() {
      this.$emit('clickButton');
    }

  }
</script>

<style lang="scss" scoped>
.topBar {
  text-align: center;
  font-weight: bolder;
  font-size: 20px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;


  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

</style>