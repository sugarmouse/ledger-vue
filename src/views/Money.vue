<template>
  <Layout class-prefix="layout">
    <NumberPad @update-output="onUpdateOutput"/>
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
  import {Component} from 'vue-property-decorator';

  type Record = {
    tags: string[]
    notes: string
    type: string
    amount: number
  }

  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };

    onUpdateOutput(output: string) {
      this.record.amount = parseFloat(output)
    }

    onUpdateNotes(notes: string) {
      this.record.notes = notes
    }

    // onUpdateType(type: string) {
    //   this.record.type = type
    // }

    onUpdateTags(tags: string[]) {
      this.record.tags = tags
    }

  }
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>