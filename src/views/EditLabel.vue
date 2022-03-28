<template>
  <div>{{name}}</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {tagListModel} from '@/models/tagListModel';

  @Component
  export default class EditLabel extends Vue {
    name = ''
    created() {
      const id = this.$route.params.id;
      this.name = id
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(tag => tag.id === id)[0];
      if(tag){
        console.log(tag);
      }else{
        this.$router.replace('/404')
      }

    }

  }
</script>

<style lang="scss" scoped>

</style>