<template>
  <Layout :has-top-bar="false">
    <div class="date">
      <div v-if="lunarDate.msg==='success'" class="lunar-date">
        {{ lunarDate.year }}
        {{ lunarDate.month }}
        {{ lunarDate.day }}
      </div>

    </div>
    <div class="record-today">

    </div>
    <router-link to="/money">
      <button>记一笔</button>
    </router-link>


  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index';

  @Component
  export default class Home extends Vue {
    lunarDate = store.state.lunarDate;

    created() {
      store.dispatch('lunarDate');
    }
  }
</script>

<style lang="scss" scoped>

</style>