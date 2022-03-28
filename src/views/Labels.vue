<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link
            :to="`/labels/edit/${tag.id}`"
            class="tag" v-for="tag in tagList" :key="tag.id">
          <span>{{ tag.name }}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <button class="createTag" @click="addTag">新建标签</button>
      </div>
    </Layout>

  </div>
</template>

<script lang="ts">

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import {tagListModel} from '@/models/tagListModel';

  tagListModel.fetch();
  @Component({
    components: {Icon}
  })
  export default class Labels extends Vue {
    tagList = tagListModel.fetch();

    addTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        const isAdd = tagListModel.add(name);
        if (isAdd === 'duplicated') {
          alert('标签名不能重复');
          return;
        }
        tagListModel.save();
      }
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

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>