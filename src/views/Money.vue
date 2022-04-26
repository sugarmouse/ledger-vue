<template>
  <Layout class-prefix="money">
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
      <Tags @update-tags="record.tags = $event"
            :value="record.tags" :type="record.type"/>
    </div>

    <div class="tabs">
      <Tabs :data-source="typeData"
            class-prefix="types"
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

  @Component({
    components: {Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0,
      createdAt: new Date().toISOString()
    };
    typeData = typeList;

    get recordList() {
      return store.state.recordList;
    }

    created() {
      store.commit('fetchRecords');
    }

    onUpdateOutput(output: string) {
      this.record.amount = parseFloat(output);
    }


    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        window.alert('请至少选择一个标签');
        return;
      }
      store.commit('createRecord', this.record);
      window.alert('保存成功');
      this.record.notes = '';
      this.record.tags = [];
    }
  }
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;

  .tags{
    flex-grow: 1;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notes {
    padding: 12px 0;
  }
}


</style>