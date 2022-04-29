<template>
  <div class="layout-wrapper">
    <TopBar v-if="hasTopBar" :bar-name="barName" :has-button="hasTopButton" @clickButton="onClickButton"/>
    <div class="content" :class=" classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav v-if="hasNav"/>
  </div>
</template>

<script lang="ts">
  import TopBar from '@/components/TopBar.vue';
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component({
    components:{TopBar}
  })
  export default  class Layout extends Vue{
    @Prop() classPrefix!:string
    @Prop() barName!:string
    @Prop({default:true}) hasTopButton!:boolean
    @Prop({default:true}) hasTopBar!:boolean
    @Prop({default:true}) hasNav!:boolean

    onClickButton(){
      this.$emit('clickLeftButton')
    }
  }
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  overflow: auto;
}
</style>