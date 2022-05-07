<template>
  <TagList type="-"
           bar-name="支出标签"
           :back-url="backUrl"
           :back-amount="backAmount"
           :back-notes="backNotes"/>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import TagList from '@/components/TagList.vue';
  import {mixins} from 'vue-class-component';
  import {UrlParamsHandler} from '@/mixins/UrlParamsHandler'

  @Component({
    components: {TagList}
  })
  export default class OutgoTagList extends mixins(UrlParamsHandler)  {

    get backUrl() {
      return this.urlParamsHandle(this.$route.query.from, '/home');
    }

    get backAmount(){
      return this.urlParamsHandle(this.$route.query.backAmount,'paramsUndefined')
    }

    get backNotes(){
      return this.urlParamsHandle(this.$route.query.backNotes,'paramsUndefined')
    }

    get backType(){
      return this.urlParamsHandle(this.$route.query.backType,'paramsUndefined')
    }
  }
</script>

<style lang="scss" scoped>

</style>