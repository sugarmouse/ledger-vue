<template>
  <Layout class-prefix="layout">
    <NumberPad @update-output="onUpdateOutput" @submit="saveRecord"/>
    <div class="notes">
      <FormItem
          :value="''"
          @update-value="onUpdateNotes"
          field-name="备注"
          placeholder="在这里输入备注"/>
    </div>
    <Types :type.sync="record.type"/>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';

  const recordList = store.recordList;
  @Component({
    components: {Tags, FormItem, Types, NumberPad},
    computed:{
      recordList () {
        return store.recordList
      }
    }
  })
  export default class Money extends Vue {
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

    saveRecord() {
      store.createRecord(this.record);
    }
  }
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>