<template>
  <div class="layout-wrapper" :class=" {ios:isIOS&&'ios'} ">
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
    components: {TopBar}
  })
  export default class Layout extends Vue {
    @Prop() classPrefix!: string;
    @Prop() barName!: string;
    @Prop({default: true}) hasTopButton!: boolean;
    @Prop({default: true}) hasTopBar!: boolean;
    @Prop({default: true}) hasNav!: boolean;



    onClickButton():void {
      this.$emit('clickLeftButton');
    }

    get isIOS():boolean {
      return this.judgeClient() === 'IOS';
    }

    /*判断客户端*/
    judgeClient():string {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

      if (isAndroid) {
        return 'Android';
      } else if (isIOS) {
        return 'IOS';
      } else {
        return 'PC';
      }
    }


  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";



.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-end;
  &.ios {
    height: calc(100vh - 54px);
  }
}

.content {
  flex-grow: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>