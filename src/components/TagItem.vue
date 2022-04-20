<template>
  <div class="tagItem-wrapper">
    <Icon :name="name"/>
    <div class="tagName">{{name}}</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class TagItem extends Vue {
    @Prop() name?:string

  }
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "~@/assets/style/helper.scss";
$length: 60px;
.tagItem-wrapper{
  background: rgba(256,256,256,0.2);
  font-size: 30px;
  width: $length;
  height: $length;
  border-radius: math.div($length,2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tagName{
    font-size: 14px;
    color: $lighter-font;
  }

}

</style>