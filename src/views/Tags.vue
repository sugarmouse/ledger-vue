<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link
            :to="`/labels/edit/${tag.id}`"
            class="tag" v-for="tag in tags" :key="tag.id">
          <span>{{ tag.name }}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="addTag">新建标签</Button>
      </div>
    </Layout>

  </div>
</template>

<script lang="ts">

  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import Button from '@/components/Button.vue';
  import store from '@/store/index';
  import {mixins} from 'vue-class-component';
  import {TagHelper} from '@/mixins/TagHelper';

  @Component({
    components: {Button, Icon},
  })
  export default class Tags extends mixins(TagHelper) {

    get tags():Tag[] {
      return store.state.tagList;
    }

    created():void {
      store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}

.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>