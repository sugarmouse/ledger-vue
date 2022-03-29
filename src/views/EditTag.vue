<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"></Icon>
      <span>编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名"
                :value="tag.name"
                @update-value="onUpdateTag"
                placeholder="在这里输入标签名"></FormItem>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Icon from '@/components/Icon.vue';
  import Layout from '@/components/layout.vue';
  import {Component} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';
  import FormItem from '@/components/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem, Icon, Layout}
  })
  export default class EditTag extends Vue {
    tag?: Tag = undefined;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;

      const tag = tags.filter(tag => tag.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    onUpdateTag(name: string) {
      if (this.tag) {
        tagListModel.update(this.tag.id, name);
        tagListModel.save()
      }
    }

    remove() {
      console.log('=======');
      if (this.tag) {
        tagListModel.remove(this.tag.id);
        tagListModel.save()
        this.$router.replace('/tags')
      }
    }
    goBack(){
      this.$router.replace('/tags')
    }
  }
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
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

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>