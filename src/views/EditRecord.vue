<template>
  <Layout bar-name="编辑记录"
          class-prefix="edit-record"
          :has-nav="false"
          @clickLeftButton="goBack">
    <div class="amount">
      <span class="describe">金额 </span>
      <input type="number"
             class="amount-input"
             v-model="currentRecord.amount"/>
    </div>
    <div class="createdAt">
      <span class="describe">日期</span>
      <FormItem type="date"
                class-prefix="edit"
                :value.sync="currentRecord.createdAt"/>
    </div>
    <div class="tag">
      <span class="describe">标签</span>
      <div class="tagItem">
        <TagItem class-prefix="edit" :tag="currentRecord.tag"/>
      </div>

      <router-link v-if="this.currentRecord.type==='-'"
                   :to="{
                     name:'outgoTagList',
                     query:{
                       from:`/detail/edit/${currentRecord.id}`,
                       backAmount: currentRecord.amount.toString(),
                       backNotes:currentRecord.notes,
                   }}">

        <Icon name="right"/>
      </router-link>
      <router-link v-if="this.currentRecord.type==='+'"
                   :to="{
                     name:'incomeTagList',
                     query:{
                       from:`/detail/edit/${currentRecord.id}`,
                       backAmount: currentRecord.amount.toString(),
                       backNotes:currentRecord.notes,
                   }}">
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="type">
      <span class="describe">类型</span>
      <Tabs :data-source="typeData" :value.sync="currentRecord.type" class-prefix="edit"/>
    </div>
    <div class="notes">
      <span class="describe">备注</span>
      <FormItem type="text"
                class-prefix="edit"
                placeholder="在这里输入备注"
                :value.sync="currentRecord.notes"/>
    </div>
    <div class="buttons">
      <button class="modify" @click="onModify">确认修改</button>
      <button class="delete" @click="onDelete">删除记录</button>
    </div>

  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index';
  import {mixins} from 'vue-class-component';
  import {RecordHelper} from '@/mixins/RecordHelper';
  import _ from 'lodash';
  import Tabs from '@/components/tabs.vue';
  import typeData from '@/constants/typeList';
  import TagItem from '@/components/TagItem.vue';
  import FormItem from '@/components/FormItem.vue';
  import defaultTagList from '@/constants/defaultTagList';
  import {UrlParamsHandler} from '@/mixins/UrlParamsHandler';

  @Component({
    components: {TagItem, Tabs, FormItem}
  })
  export default class EditRecord extends mixins(RecordHelper, UrlParamsHandler) {
    id = parseInt(this.$route.params.id);
    typeData = typeData;


    created(): void {
      this.$store.commit('fetchRecords');
      if (this.newTag === 'get newTag error' || this.currentRecord === 'currentRecord error') {
        this.$router.replace('/error');
      } else {
        this.currentRecord.tag = this.newTag;
        if (this.cachedType !== 'paramsUndefined' && (this.cachedType === '-' || this.cachedType === '+')) this.currentRecord.type = this.cachedType;
        if (this.cachedAmount && this.cachedAmount !== 'paramsUndefined') this.currentRecord.amount = parseFloat(this.cachedAmount);
        if (this.cachedNotes && this.cachedNotes !== 'paramsUndefined') this.currentRecord.notes = this.cachedNotes;
      }
    }

    get cachedType(){
      return this.urlParamsHandle(this.$route.query.type, 'paramsUndefined');
    }

    get currentRecord(): RecordItem | 'currentRecord error' {
      const found = this.findRecord(this.id);
      if (found === 'findRecord error') {
        return 'currentRecord error';
      } else {
        return found;
      }
    }

    get newTagName(): string {
      return (typeof (this.$route.query.tagName) === 'string') ? this.$route.query.tagName : 'notFound';
    }

    get cachedAmount() {
      return this.urlParamsHandle(this.$route.query.backAmount, 'paramsUndefined');
    }

    get cachedNotes() {
      return this.urlParamsHandle(this.$route.query.backNotes, 'paramsUndefined');
    }

    get newTag(): Tag | 'get newTag error' {
      if (this.newTagName !== 'notFound') {
        const newTag = _.find(defaultTagList, tag => tag.name === this.newTagName);
        return newTag ? newTag : 'get newTag error';
      } else {
        return this.currentRecord !== 'currentRecord error' ? this.currentRecord.tag : 'get newTag error';
      }
    }

    get recordList(): RecordItem[] {
      return store.state.recordList;
    }


    findRecord(id: number): RecordItem | 'findRecord error' {
      const record = _.find(this.recordList, record => record.id === id);
      return record ? record : 'findRecord error';
    }

    goBack(): void {
      this.$router.replace('/detail');
    }

    onModify(): void {
      const willModify = window.confirm('确认修改?');
      if (willModify) {
        if (this.currentRecord !== 'currentRecord error') store.commit('deleteRecord', this.currentRecord.id);
        store.commit('createRecord', this.currentRecord);
        this.$router.replace('/detail');
      }

    }

    onDelete(): void {
      const isDelete = window.confirm('确认删除?');
      if (isDelete) {
        if (this.currentRecord !== 'currentRecord error') store.commit('deleteRecord', this.currentRecord.id);
      }
      this.$router.replace('/detail');
    }

  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

$padding-lef: 20px;
$font-size: 24px;
$item-color: #111111;

%flexDistribute {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $item-color;
  padding: 6px 10px;
  border-radius: 10px;
}

::v-deep .edit-record-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  padding: 4vh 10px 0 10px;


  .describe {
    color: $darker-font;
    white-space: nowrap;
  }

  input {
    border: none;
    color: $lighter-font;
  }

  .type {
    @extend %flexDistribute;

    .edit-tab-wrapper {
      margin: 0;
      background-color: $item-color;
      padding-left: $padding-lef;
      flex-grow: 1;

      .edit-tabs {
        display: flex;
        justify-content: flex-start;

        .edit-tabs-item {
          font-size: 20px;
          margin: 0 10px 0 0;
        }
      }

    }

  }

  .tag {
    @extend %flexDistribute;

    .tagItem {
      margin-right: auto;
      padding-left: $padding-lef;
    }

    a {
      background: #616161;
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
    }
  }

  .amount {
    @extend %flexDistribute;
    overflow: clip;

    .describe {
      white-space: nowrap;
    }

    .amount-input {
      padding-left: $padding-lef;
      background: $item-color;
      font-size: $font-size;
    }


  }

  .createdAt, .notes {
    @extend %flexDistribute;

    .edit-formItem-wrapper {
      flex-grow: 1;

      .edit-formItem {
        .edit-input {
          font-size: $font-size;
        }
      }
    }

  }


  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10vh 0;
    color: $basic-font;

    button {
      border: none;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 26px;
    }

    .modify {
      background: $color-highlight;
      color: $basic-font;
      margin-bottom: 20px;
    }

    .delete {
      background: #777777;
      color: $basic-font;
    }


  }


}

</style>