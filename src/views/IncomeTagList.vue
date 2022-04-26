<template>
  <TagList bar-name="收入标签" type="+"/>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import TagList from '@/components/TagList.vue';
  @Component({
    components: {TagList}
  })
  export default class IncomeTagList extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>