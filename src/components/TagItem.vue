<template>
  <div class="tagItem-wrapper" :class=" classPrefix && `${classPrefix}-tagItem-wrapper`">
    <Icon :name="tag.name"/>
    <div class="tagName" >{{ tag.text }}</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class TagItem extends Vue {
    @Prop({required:true}) tag!: { name: string, text: string };
    @Prop() classPrefix?:string

  }
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "~@/assets/style/helper.scss";

$length: 60px;
.tagItem-wrapper {
  background: rgba(256, 256, 256);
  font-size: 40px;
  width: $length;
  height: $length;
  border-radius: math.div($length, 2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tagName {
    font-size: 10px;
    color: #000000;
  }

}

</style>