<template>
  <Layout class-prefix="money"
          bar-name="添加记录"
          @clickLeftButton="goBack"
          :has-nav="false">
    <div class="numberPad">
      <NumberPad
          @update-output="onUpdateOutput"
          @submit="saveRecord"/>
    </div>

    <div class="createdAt">
      <FormItem
          type="date"
          :value.sync="record.createdAt"
          field-name="日期"/>
    </div>

    <div class="notes">
      <FormItem
          :value.sync="record.notes"
          field-name="备注"
          placeholder="在这里输入备注"/>
    </div>

    <div class="tags">
      <Tags :selected-tag="record.tag"
            :type="record.type"
            @onTagClick="onUpdateTag"/>
    </div>

    <div class="tabs">
      <Tabs :data-source="typeData"
            class-prefix="types"
            :has-describe="true"
            describe="选择分类："
            :value.sync="record.type"/>
    </div>


  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store';
  import Tabs from '@/components/tabs.vue';
  import typeList from '@/constants/typeList';
  import TabBar from '@/components/TopBar.vue';
  import defaultTagList from '@/constants/defaultTagList';
  import _ from 'lodash';

  @Component({
    components: {TabBar, Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {

    get newTagName(): string | (string | null)[] {
      return this.$route.query.tagName;
    }

    get newTag(): Tag | undefined {
      if (this.newTagName) {
        return _.find(defaultTagList, tag => tag.name === this.newTagName);
      } else {
        return this.record.tag;
      }
    }


    record: RecordItem = {
      tag: {name: 'toBeSelected', text: '待选'},
      notes: '',
      type: '-',
      id: -1,
      amount: 0,
      createdAt: new Date().toISOString()
    };
    typeData = typeList;

    get recordList(): RecordItem[] {
      return store.state.recordList;
    }

    created(): void {
      store.commit('fetchRecords');
      if (this.newTag) this.record.tag = this.newTag;
    }

    goBack(): void {
      this.$router.push('/home');
    }

    onUpdateOutput(output: string): void {
      this.record.amount = parseFloat(output);
    }

    onUpdateTag(tagName: string): void {
      const newTag = _.find(defaultTagList, tag => tag.name === tagName);
      if (newTag) this.record.tag = newTag;
    }


    saveRecord(): void {
      if (this.record.tag.name === 'toBeSelected') {
        window.alert('请选择一个标签');
        return;
      }
      store.commit('createRecord', this.record);
      window.alert('保存成功');
      this.record.notes = '';
      this.record.tag = {name: 'toBeSelected', text: '待选'};
    }
  }
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;

  .numberPad {
    margin-bottom: 8px;
  }

  .tags {
    flex-grow: 1;
    background-color: #000000;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .notes {
    padding: 12px 0;
  }
}


</style>