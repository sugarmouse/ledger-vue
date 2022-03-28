<template>
  <Layout class-prefix="layout">
    <NumberPad @update-output="onUpdateOutput" @submit="saveRecord"/>
    <Notes @update-notes="onUpdateNotes"/>
    <Types :type.sync="record.type"/>
    <Tags :data-source.sync="tags" @update-tags="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import {model} from '@/model';


  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    recordList = model.fetch();
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
      const x = model.clone(this.record);
      x.createdAt = new Date();
      this.recordList.push(x);
    }

    @Watch('recordList')
    onRecordListChanged() {
      model.save(this.recordList);
    }
  }
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>