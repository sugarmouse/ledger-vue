<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app{
  max-width: 500px;
  margin: 0 auto;
}
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $basic-font;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: $background;
}
</style>
