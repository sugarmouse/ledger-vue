<template>
  <Layout class-prefix="layout">
    <NumberPad @update-output="onUpdateOutput" @submit="saveRecord"/>
    <div class="notes">
      <FormItem @update-notes="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
    </div>
    <Types :type.sync="record.type"/>
    <Tags :data-source.sync="tags" @update-tags="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import {recordListModel} from '@/models/recordListModel';
  import {tagListModel} from '@/models/tagListModel';


  @Component({
    components: {Tags, FormItem, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    recordList = recordListModel.fetch();
    tagList = tagListModel.fetch()
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };


    onUpdateOutput(output: string) {
      this.record.amount = parseFloat(output);
    }

    onUpdateNotes(notes: string) {
      this.record.notes = notes;
    }


    onUpdateTags(tags: string[]) {
      this.record.tags = tags;
    }

    saveRecord() {
      const x = recordListModel.clone(this.record);
      x.createdAt = new Date();
      this.recordList.push(x);
    }

    @Watch('recordList')
    onRecordListChanged() {
      recordListModel.save(this.recordList);
    }
  }
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding: 12px 0;
}
</style>