<template>
  <Layout :has-top-bar="false">
    <router-link to="/money">
      <button>记一笔</button>
    </router-link>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>