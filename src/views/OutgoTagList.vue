<template>
  <TagList type="-" bar-name="支出标签" :back-url="backUrl"/>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import TagList from '@/components/TagList.vue';

  @Component({
    components: {TagList}
  })
  export default class OutgoTagList extends Vue {
    backUrl = this.$route.query.from ? this.$route.query.from : '/home';


  }
</script>

<style lang="scss" scoped>

</style>