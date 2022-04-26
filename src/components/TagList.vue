<template>
  <div class="wrapper">
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"></Icon>
      <span>{{ barName }}</span>
      <span class="rightIcon"></span>
    </div>
    <div class="tagList-wrapper">
      <ul class="tagList">
        <li class="tag" v-for="tag in outgoTagList" :key="tag.name" :value="tag.name">
          <Icon :name="tag.name"></Icon>
          <span class="text">{{ tag.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import store from '@/store';
  import TagItem from '@/components/TagItem.vue';

  @Component({
    components: {TagItem}
  })
  export default class OutgoTagList extends Vue {
    @Prop({required: true}) barName!: string;
    @Prop({required: true}) type!: '-' | '+';
    tagList:Tag[]=[]


    created():void {
      store.commit('fetchTags')
      this.tagList = store.state.tagList
    }


    get outgoTagList() {
      return this.tagList.filter(tag => tag.type === this.type);
    }

    goBack():void {
      this.$router.replace('/money');
    }
  }
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "~@/assets/style/helper.scss";

.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: $background;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.tagList-wrapper {
  height: calc(100vh - 48px);
  background: #000000;

  .tagList {
    font-size: 16px;
    padding: 0 16px;
    overflow: scroll;
    height: 100%;

    li {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(27, 26, 28, 0.99);

      svg {
        $length: 40px;
        background: #ffffff;
        padding: 4px;
        width: $length;
        height: $length;
        border-radius: math.div($length, 2);
      }

      .text {
        font-size: 16px;
      }
    }
  }
}


</style>