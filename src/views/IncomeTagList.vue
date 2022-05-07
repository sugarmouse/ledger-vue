<template>
  <TagList bar-name="收入标签" type="+"
           :back-url="backUrl"
           :backAmount="backAmount"
           :backNotes="backNotes"/>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import TagList from '@/components/TagList.vue';
  import {mixins} from 'vue-class-component';
  import {UrlParamsHandler} from '@/mixins/UrlParamsHandler';
  @Component({
    components: {TagList}
  })
  export default class IncomeTagList extends mixins(UrlParamsHandler) {
    created(){
      console.log(this.$route.query.backAmount);
      console.log(this.$route.query.backNotes);
    }
    get backType(){
      return this.urlParamsHandle(this.$route.query.backType,'paramsUndefined')
    }

    get backUrl() {
      return this.urlParamsHandle(this.$route.query.from, '/home');
    }

    get backAmount(){
      return this.urlParamsHandle(this.$route.query.backAmount,'paramsUndefined')
    }

    get backNotes(){
      return this.urlParamsHandle(this.$route.query.backNotes,'paramsUndefined')
    }
  }
</script>

<style lang="scss" scoped>

</style>