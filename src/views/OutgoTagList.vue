<template>
  <TagList type="-" bar-name="支出标签"/>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import TagList from '@/components/TagList.vue';

  @Component({
    components: {TagList}
  })
  export default class OutgoTagList extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>