<template>
  <TagList bar-name="收入标签" type="+" :back-url="backUrl"/>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import TagList from '@/components/TagList.vue';
  @Component({
    components: {TagList}
  })
  export default class IncomeTagList extends Vue {
    backUrl = this.$route.query.from ? this.$route.query.from : '/home';
  }
</script>

<style lang="scss" scoped>

</style>