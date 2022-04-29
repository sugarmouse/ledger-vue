<template>
  <div class="wrapper">
    <Layout :has-nav="false" @clickLeftButton="goBack" bar-name="支出标签">
      <div class="tagList-wrapper">
        <ul class="tagList" @click="onTagClick">
          <li class="tag" v-for="tag in outgoTagList" :key="tag.name" :value="tag.name">
            <Icon :name="tag.name"></Icon>
            <span class="text">{{ tag.text }}</span>
          </li>
        </ul>
      </div>
    </Layout>
  </div>


</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import store from '@/store';
  import TagItem from '@/components/TagItem.vue';
  import {mixins} from 'vue-class-component';
  import {TagHelper} from '@/mixins/TagHelper';
  import TabBar from '@/components/TopBar.vue';

  @Component({
    components: {TabBar, TagItem}
  })
  export default class OutgoTagList extends mixins(TagHelper) {
    @Prop({required: true}) barName!: string;
    @Prop({required: true}) type!: '-' | '+';


    created(): void {
      store.commit('fetchTags');
    }

    get tagList() {
      return store.state.tagList;
    }

    get outgoTagList() {
      return this.tagList.filter(tag => tag.type === this.type);
    }

    onTagClick(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Element) {
        const li = target.closest('li');
        if (li) {
          const name = li.getAttribute('value');
          if (name) {
            const selectedTag = this.findTag(name, this.tagList);
            if (selectedTag) {
              store.commit('setSelectedTag', selectedTag.name);
              this.goBack();
            } else {
              window.alert('出错了');
            }
          }
        }
      }
    }


    goBack(): void {
      this.$router.replace('/money');
    }
  }
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "~@/assets/style/helper.scss";

.tagList-wrapper {
  height: calc(100vh - 48px);
  background: #000000;

  .tagList {
    font-size: 16px;
    padding: 0 8px;
    overflow: scroll;
    height: 100%;

    li {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      background-color: lighten($background, 20%);
      margin: 6px 0;
      border-radius: 8px;

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